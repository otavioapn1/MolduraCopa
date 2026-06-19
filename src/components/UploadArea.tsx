import { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { Upload, Image as ImageIcon, Sparkles, Check } from 'lucide-react';
import { motion } from 'motion/react';

interface UploadAreaProps {
  onImageSelected: (file: File) => void;
}

export default function UploadArea({ onImageSelected }: UploadAreaProps) {
  const [isDragActive, setIsDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const processFile = (file: File) => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!validTypes.includes(file.type)) {
      setError('Formato inválido. Por favor, envie uma foto em JPG, JPEG ou PNG.');
      return;
    }
    setError(null);
    onImageSelected(file);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="w-full max-w-md mx-auto px-4"
      id="upload-area-container"
    >
      <div className="text-center mb-8">
        <motion.div 
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="inline-flex items-center justify-center space-x-1 mb-3 bg-green-50 px-3 py-1 rounded-full border border-green-100"
          id="pentacampeao-badge"
        >
          <span className="text-xs font-semibold text-green-700 uppercase tracking-widest flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-yellow-500 fill-yellow-400" />
            Pentacampeão
          </span>
          <div className="flex gap-0.5 ml-1">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-yellow-500 font-bold text-xs">★</span>
            ))}
          </div>
        </motion.div>
        
        <h1 className="text-3xl font-display font-extrabold text-slate-900 tracking-tight leading-none mb-2" id="main-title">
          Mostre sua torcida <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-yellow-500 to-blue-600">
            pelo Brasil!
          </span>
        </h1>
        <p className="text-slate-600 font-medium text-sm mt-3" id="main-subtitle">
          Envie sua foto e gere seu Story personalizado em segundos
        </p>
      </div>

      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={onButtonClick}
        className={`relative cursor-pointer transition-all duration-300 rounded-3xl border-2 border-dashed p-8 text-center flex flex-col items-center justify-center min-h-[290px] ${
          isDragActive
            ? 'border-green-500 bg-green-50/50 scale-[1.01]'
            : 'border-slate-200 bg-white hover:border-green-400 hover:bg-slate-50/20 hover:shadow-xl hover:shadow-slate-100/30'
        }`}
        id="drag-drop-zone"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".jpg,.jpeg,.png"
          onChange={handleFileChange}
          className="hidden"
          id="file-input"
        />

        {/* Framing Corner Visual accents inside upload zone */}
        <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-green-500 pointer-events-none rounded-tl-md"></div>
        <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-yellow-500 pointer-events-none rounded-tr-md"></div>
        <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-yellow-500 pointer-events-none rounded-bl-md"></div>
        <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-green-500 pointer-events-none rounded-br-md"></div>

        {/* Centered Upload Icon & Visual Info */}
        <motion.div
          animate={{ y: isDragActive ? -6 : 0 }}
          transition={{ repeat: isDragActive ? Infinity : 0, duration: 0.6, repeatType: "reverse" }}
          className="w-16 h-16 bg-gradient-to-tr from-green-100 to-yellow-100 rounded-2xl flex items-center justify-center text-green-600 mb-5 shadow-inner"
          id="upload-icon-wrapper"
        >
          <Upload className="w-8 h-8 stroke-[2.25] text-green-700" />
        </motion.div>

        <p className="text-base font-semibold text-slate-800 mb-1" id="upload-primary-instruction">
          Arraste sua foto aqui
        </p>
        <p className="text-xs text-slate-500 mb-4" id="upload-secondary-instruction">
          ou <span className="text-green-600 font-bold underline">navegue pelos arquivos</span>
        </p>

        <div className="flex items-center space-x-1 justify-center mt-2" id="format-badges">
          <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 bg-slate-100 text-slate-600 rounded">JPG</span>
          <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 bg-slate-100 text-slate-600 rounded">JPEG</span>
          <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 bg-slate-100 text-slate-600 rounded">PNG</span>
        </div>
      </div>

      {error ? (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3.5 bg-red-50 text-red-700 text-xs font-medium rounded-2xl text-center border border-red-100"
          id="upload-error-container"
        >
          {error}
        </motion.div>
      ) : (
        <p className="text-[11px] text-slate-400 text-center mt-4 flex items-center justify-center gap-1 font-medium" id="security-note">
          <Check className="w-3.5 h-3.5 text-green-500 font-bold" />
          Seus dados estão seguros. Todo processamento é feito localmente no seu aparelho.
        </p>
      )}
    </motion.div>
  );
}
