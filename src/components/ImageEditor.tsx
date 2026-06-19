import { useState, useEffect, useRef, MouseEvent as ReactMouseEvent, TouchEvent as ReactTouchEvent } from 'react';
import { Move, ZoomIn, ZoomOut, Check, ArrowLeft, RefreshCw, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { FRAME_WIDTH, FRAME_HEIGHT, getFrameSvgDataUrl, FRAME_SVG_CONTENT } from '../utils/frameSvg';
import { getCleanTransparentFrame } from '../utils/frameProcessor';
import frameImgUrl from './frame.png';

interface ImageEditorProps {
  imageFile: File;
  onBack: () => void;
  onStoryGenerated: (dataUrl: string) => void;
}

export default function ImageEditor({ imageFile, onBack, onStoryGenerated }: ImageEditorProps) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imgDimensions, setImgDimensions] = useState({ width: 0, height: 0 });
  const [zoom, setZoom] = useState<number>(1.2); // Default zoom factor is 1.2
  const [translateX, setTranslateX] = useState<number>(0);
  const [translateY, setTranslateY] = useState<number>(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [cleanFrameUrl, setCleanFrameUrl] = useState<string>(frameImgUrl);

  useEffect(() => {
    getCleanTransparentFrame(frameImgUrl).then((url) => {
      setCleanFrameUrl(url);
    });
  }, []);

  // Drag states
  const dragStart = useRef({ x: 0, y: 0 });
  const initialOffset = useRef({ x: 0, y: 0 });

  // Viewport measurements (standard 9:16 aspect ratio box)
  const VIEWPORT_WIDTH = 340; 
  const VIEWPORT_HEIGHT = 604; // 340 * 16 / 9

  useEffect(() => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setImageSrc(e.target.result as string);
        
        // Load image to get original intrinsic dimensions
        const img = new Image();
        img.onload = () => {
          setImgDimensions({ width: img.width, height: img.height });
        };
        img.src = e.target.result as string;
      }
    };
    reader.readAsDataURL(imageFile);
  }, [imageFile]);

  // Calculations for default "cover" scale fit
  const getCoverFitParams = () => {
    if (imgDimensions.width === 0 || imgDimensions.height === 0) {
      return { wFit: 0, hFit: 0, xInit: 0, yInit: 0 };
    }
    const ratioW = VIEWPORT_WIDTH / imgDimensions.width;
    const ratioH = VIEWPORT_HEIGHT / imgDimensions.height;
    const fitScale = Math.max(ratioW, ratioH);

    const wFit = imgDimensions.width * fitScale;
    const hFit = imgDimensions.height * fitScale;
    const xInit = (VIEWPORT_WIDTH - wFit) / 2;
    const yInit = (VIEWPORT_HEIGHT - hFit) / 2;

    return { wFit, hFit, xInit, yInit };
  };

  const { wFit, hFit, xInit, yInit } = getCoverFitParams();

  // Mouse drag handlers
  const handleMouseDown = (e: ReactMouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
    initialOffset.current = { x: translateX, y: translateY };
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStart.current.x;
    const deltaY = e.clientY - dragStart.current.y;
    setTranslateX(initialOffset.current.x + deltaX);
    setTranslateY(initialOffset.current.y + deltaY);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch drag handlers
  const handleTouchStart = (e: ReactTouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      dragStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      initialOffset.current = { x: translateX, y: translateY };
    }
  };

  const handleTouchMove = (e: ReactTouchEvent<HTMLDivElement>) => {
    if (!isDragging || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - dragStart.current.x;
    const deltaY = e.touches[0].clientY - dragStart.current.y;
    setTranslateX(initialOffset.current.x + deltaX);
    setTranslateY(initialOffset.current.y + deltaY);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const handleZoomChange = (val: number) => {
    setZoom(val);
  };

  const handleGenerateStory = async () => {
    if (!imageSrc || isGenerating) return;
    setIsGenerating(true);

    try {
      // Create offscreen canvas of 1080x1920
      const canvas = document.createElement('canvas');
      canvas.width = FRAME_WIDTH;
      canvas.height = FRAME_HEIGHT;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Não foi possível inicializar o editor de imagens.');

      // Clear Canvas
      ctx.clearRect(0, 0, FRAME_WIDTH, FRAME_HEIGHT);

      // Load User Image Element
      const userImg = await new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = imageSrc;
      });

      // Projection multiplier from preview UI (340px max width) to Export Canvas (1080px)
      const exportFactor = FRAME_WIDTH / VIEWPORT_WIDTH;

      // Calculate coordinates projected to 1080x1920 scale
      const wFitExport = wFit * exportFactor;
      const hFitExport = hFit * exportFactor;
      const xInitExport = xInit * exportFactor;
      const yInitExport = yInit * exportFactor;
      const tXExport = translateX * exportFactor;
      const tYExport = translateY * exportFactor;

      // Calculate coordinate center of target image on export canvas to rotate/scale properly around its center
      const centerXExport = xInitExport + (wFitExport / 2) + tXExport;
      const centerYExport = yInitExport + (hFitExport / 2) + tYExport;

      ctx.save();
      // Apply translation and zoom transform around center point
      ctx.translate(centerXExport, centerYExport);
      ctx.scale(zoom, zoom);
      
      // Draw User Photo centered on transform coordinates
      ctx.drawImage(
        userImg, 
        -wFitExport / 2, 
        -hFitExport / 2, 
        wFitExport, 
        hFitExport
      );
      ctx.restore();

      // Load and Draw Frame Layer using processed clean transparent frame
      const frameImg = await new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => {
          // Robust fallback to high-quality vector dynamic representation
          const fallbackImg = new Image();
          const svgBlob = new Blob([FRAME_SVG_CONTENT], { type: 'image/svg+xml;charset=utf-8' });
          const url = URL.createObjectURL(svgBlob);
          fallbackImg.onload = () => {
            URL.revokeObjectURL(url);
            resolve(fallbackImg);
          };
          fallbackImg.onerror = () => {
            URL.revokeObjectURL(url);
            reject(new Error('Falha ao carregar elementos da moldura brasileira.'));
          };
          fallbackImg.src = url;
        };
        img.src = cleanFrameUrl;
      });

      // Draw Frame exactly on top of user photo
      ctx.drawImage(frameImg, 0, 0, FRAME_WIDTH, FRAME_HEIGHT);

      // Export to lossless high quality PNG
      const generatedDataUrl = canvas.toDataURL('image/png', 1.0);
      onStoryGenerated(generatedDataUrl);
    } catch (err) {
      console.error(err);
      alert('Ocorreu um erro ao gerar o seu Story. Por favor, tente novamente.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="w-full max-w-lg mx-auto px-4 py-3"
      id="image-editor-container"
    >
      {/* Navigation Headers */}
      <div className="flex items-center justify-between mb-4" id="editor-header">
        <button
          onClick={onBack}
          className="flex items-center justify-center space-x-2 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 px-4 py-2 rounded-2xl transition duration-200 text-xs font-semibold"
          id="btn-back"
        >
          <ArrowLeft className="w-4 h-4 text-slate-700 font-bold" />
          <span>Trocar Foto</span>
        </button>
        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1" id="subtle-status-stars">
          <span className="animate-pulse inline-block w-2 h-2 rounded-full bg-green-500"></span>
          Ajustando Foto
        </span>
      </div>

      {/* Editor Viewport Sandbox */}
      <div className="flex flex-col items-center justify-center">
        <div
          style={{ width: `${VIEWPORT_WIDTH}px`, height: `${VIEWPORT_HEIGHT}px` }}
          className="relative bg-black rounded-[40px] overflow-hidden shadow-2xl select-none touch-none cursor-grab active:cursor-grabbing ring-8 ring-slate-800 border-4 border-white"
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          id="crop-viewport"
        >
          {/* USER IMAGE UNDERLAY CONTAINER */}
          {imageSrc && wFit > 0 && (
            <div
              style={{
                position: 'absolute',
                width: `${wFit}px`,
                height: `${hFit}px`,
                left: `${xInit}px`,
                top: `${yInit}px`,
                transform: `translate(${translateX}px, ${translateY}px) scale(${zoom})`,
                transformOrigin: 'center center',
                transition: isDragging ? 'none' : 'transform 0.1s ease-out',
              }}
              className="pointer-events-none select-none"
              id="user-photo-underlay"
            >
              <img
                src={imageSrc}
                alt="Upload preview"
                className="w-full h-full object-fill pointer-events-none select-none"
                referrerPolicy="no-referrer"
              />
            </div>
          )}

          {/* DRAG INSTRUCTION WATERMARK */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900/40 backdrop-blur-xs p-3.5 rounded-full select-none pointer-events-none flex items-center justify-center animate-pulse opacity-0 hover:opacity-100 transition-opacity duration-300" id="drag-indicator">
            <Move className="w-4 h-4 text-white" />
          </div>

          {/* OFFICIAL FRAME OVERLAY */}
          <div className="absolute inset-0 pointer-events-none select-none" id="frame-vector-overlay">
            <img
              src={cleanFrameUrl}
              onError={(e) => {
                // Safe runtime fallback to vector SVG representation
                (e.currentTarget as HTMLImageElement).src = getFrameSvgDataUrl();
              }}
              alt="Moldura da Seleção Brasileira"
              className="w-full h-full object-fill pointer-events-none select-none"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* CONTROLS SLIDER: Zoom adjustment */}
        <div className="w-full max-w-[340px] mt-6 bg-white border border-slate-100 p-4 rounded-3xl shadow-xs" id="controls-slider-box">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1.5">
              <Move className="w-3.5 h-3.5 text-slate-400" />
              Arraste para mover • Slider de zoom
            </span>
            <span className="text-xs font-mono font-bold text-green-700 bg-green-50 px-2.5 py-0.5 rounded-lg">
              {Math.round(zoom * 100)}%
            </span>
          </div>

          <div className="flex items-center space-x-3" id="zoom-slider-wrapper">
            <ZoomOut className="w-4 h-4 text-slate-400" />
            <input
              type="range"
              min="0.8"
              max="3.0"
              step="0.01"
              value={zoom}
              onChange={(e) => handleZoomChange(parseFloat(e.target.value))}
              className="w-full accent-green-600 h-1.5 bg-slate-100 rounded-lg cursor-pointer"
              id="zoom-slider-input"
            />
            <ZoomIn className="w-4 h-4 text-slate-400" />
          </div>
        </div>

        {/* ACTION BUTTON: Generate Story with high DPI Canvas */}
        <button
          onClick={handleGenerateStory}
          disabled={isGenerating}
          className="w-full max-w-[340px] mt-5 py-4 bg-green-600 hover:bg-green-700 disabled:bg-slate-300 text-white rounded-xl font-bold text-sm shadow-md shadow-green-150 transition-all active:scale-[0.99] flex items-center justify-center space-x-2 tracking-wide disabled:cursor-not-allowed cursor-pointer"
          id="btn-generate-story"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="w-4.5 h-4.5 animate-spin" />
              <span>Gerando Imagem Ultra HD...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4.5 h-4.5 fill-white/20 animate-pulse text-yellow-300" />
              <span>GERAR MEU STORY BRASIL</span>
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}
