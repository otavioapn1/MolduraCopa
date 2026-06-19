import { useState } from 'react';
import { Download, Share2, RefreshCw, CheckCircle, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface ResultPreviewProps {
  generatedDataUrl: string;
  onReset: () => void;
}

export default function ResultPreview({ generatedDataUrl, onReset }: ResultPreviewProps) {
  const [copied, setCopied] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  // Directly trigger download to download folder
  const handleDownload = () => {
    const link = document.createElement('a');
    link.download = 'story-brasil.png';
    link.href = generatedDataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Quick copy indicator success
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Web Share API to share the actual binary image file directly
  const handleShare = async () => {
    if (isSharing) return;
    setIsSharing(true);

    try {
      // 1. Convert Base64 dataURL into a File object
      const res = await fetch(generatedDataUrl);
      const blob = await res.blob();
      const file = new File([blob], 'story-brasil.png', { type: 'image/png' });

      // 2. Check if the browser supports sharing files
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'Meu Story Seleção Brasileira',
          text: 'Mostre sua torcida pelo Brasil com esse Story personalizado! 🇧🇷 #Brasil',
        });
      } else if (navigator.share) {
        // Fallback standard text share if files aren't shareable
        await navigator.share({
          title: 'Meu Story Seleção Brasileira',
          text: 'Acabei de gerar meu Story personalizado para torcer pelo Brasil!',
          url: window.location.href,
        });
      } else {
        // Double-down on download fallback if sharing is unsupported
        handleDownload();
      }
    } catch (err) {
      console.warn('Erro ao compartilhar ou cancelado:', err);
      // Fallback fallback: direct download
      handleDownload();
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="w-full max-w-sm mx-auto px-4 py-2"
      id="result-preview-container"
    >
      {/* Branding Header Area */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center space-x-1.5 bg-green-50 px-3.5 py-1.5 rounded-full border border-green-100 mb-2">
          <CheckCircle className="w-4.5 h-4.5 text-green-600 fill-green-100" />
          <span className="text-xs font-bold text-green-800 tracking-wide" id="ready-status">
            Story pronto para postar!
          </span>
        </div>
        <h2 className="text-2xl font-display font-black text-slate-800 tracking-tight" id="result-title">
          Ficou Espetacular!
        </h2>
        <p className="text-xs text-slate-500 font-medium mt-1" id="result-subtitle">
          Compartilhe agora no seu Instagram, WhatsApp ou salve no álbum de fotos
        </p>
      </div>

      {/* Visual Sandbox containing cropped story */}
      <div className="flex flex-col items-center">
        <div className="relative group w-[240px] h-[426px] bg-slate-900 rounded-[28px] overflow-hidden shadow-2xl shadow-green-900/10 border-4 border-white" id="final-image-card">
          <img
            src={generatedDataUrl}
            alt="Seu Story Brasil pronto"
            className="w-full h-full object-cover rounded-2xl select-none"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex items-end justify-center pb-6">
            <span className="bg-white/90 backdrop-blur-xs text-[10px] font-bold text-slate-800 px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-yellow-500 fill-yellow-400" />
              Garantia de Qualidade CBF
            </span>
          </div>
        </div>

        {/* ACTIONS CONTROLS GRID */}
        <div className="w-full mt-6 space-y-3" id="actions-layout">
          {/* Main Download Button */}
          <button
            onClick={handleDownload}
            className="w-full flex items-center gap-3.5 p-4 bg-slate-50 hover:bg-slate-100 rounded-2xl border border-slate-200 transition-colors text-slate-800 tracking-wide text-left cursor-pointer"
            id="btn-download-img"
          >
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white shrink-0">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold">Baixar Imagem</p>
              <p className="text-[10px] text-slate-400 font-medium">PNG Alta Qualidade</p>
            </div>
          </button>

          {/* Share Button using Web Share API */}
          <button
            onClick={handleShare}
            disabled={isSharing}
            className="w-full flex items-center gap-3.5 p-4 bg-green-600 hover:bg-green-700 rounded-2xl text-white transition-colors shadow-lg shadow-green-100 text-left disabled:opacity-50 cursor-pointer"
            id="btn-share-img"
          >
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <Share2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold">{isSharing ? 'Compartilhando...' : 'Compartilhar'}</p>
              <p className="text-[10px] text-green-100 font-medium font-sans">Instagram / WhatsApp / Status</p>
            </div>
          </button>

          {/* Reset / Restart flow button without page reload */}
          <button
            onClick={onReset}
            className="w-full text-xs font-bold text-slate-400 hover:text-slate-600 uppercase tracking-tighter py-3 flex items-center justify-center space-x-1 hover:bg-slate-100 rounded-xl transition cursor-pointer"
            id="btn-re-create"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
            <span>Gerar outra foto</span>
          </button>
        </div>

        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-2.5 bg-green-50 text-green-700 rounded-xl text-xs font-semibold border border-green-100 block text-center w-full"
            id="download-success-card"
          >
            ✓ Download concluído com sucesso!
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
