import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Globe, Flag, Sparkles } from 'lucide-react';

import UploadArea from './components/UploadArea';
import ImageEditor from './components/ImageEditor';
import ResultPreview from './components/ResultPreview';

type StoryFlowStep = 'UPLOAD' | 'EDIT' | 'RESULT';

export default function App() {
  const [step, setStep] = useState<StoryFlowStep>('UPLOAD');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [generatedDataUrl, setGeneratedDataUrl] = useState<string>('');

  const handleImageSelected = (file: File) => {
    setImageFile(file);
    setStep('EDIT');
  };

  const handleStoryGenerated = (dataUrl: string) => {
    setGeneratedDataUrl(dataUrl);
    setStep('RESULT');
  };

  const handleBackToUpload = () => {
    setImageFile(null);
    setStep('UPLOAD');
  };

  const handleReset = () => {
    setImageFile(null);
    setGeneratedDataUrl('');
    setStep('UPLOAD');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between font-sans antialiased selection:bg-green-100 selection:text-green-900" id="app-wrapper">
      
      {/* Visual background details for larger screens */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" id="decorative-grid"></div>

      {/* HEADER BAR */}
      <header className="relative w-full h-16 bg-white border-b border-slate-200 px-8 z-10 flex items-center justify-between shadow-sm" id="app-header">
        <div className="flex items-center gap-3 cursor-pointer" onClick={handleReset} id="logo-block">
          {/* Logo element representing green-yellow soccer spirit */}
          <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center shadow-xs" id="logo-badge">
            <svg className="w-6 h-6 text-yellow-400 fill-current" viewBox="0 0 24 24">
              <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/>
            </svg>
          </div>
          <div>
            <span className="font-bold text-xl tracking-tight text-green-800">
              BRASIL<span className="text-yellow-500 underline decoration-2 underline-offset-4">STORIES</span>
            </span>
          </div>
        </div>

        {/* Dynamic header stats or status label */}
        <div className="flex items-center space-x-2 bg-green-50 border border-green-100 px-3 py-1.5 rounded-full select-none" id="header-interactive-tag">
          <Flag className="w-3.5 h-3.5 text-green-600 fill-green-500" />
          <span className="text-[10px] font-extrabold text-green-800 tracking-wider">
            SELEÇÃO 2026
          </span>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="relative flex-1 flex items-center justify-center py-8 z-1" id="main-frame">
        <div className="w-full max-w-lg min-h-[500px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {step === 'UPLOAD' && (
              <motion.div
                key="step-upload"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="w-full"
                id="viewport-upload"
              >
                <UploadArea onImageSelected={handleImageSelected} />
              </motion.div>
            )}

            {step === 'EDIT' && imageFile && (
              <motion.div
                key="step-edit"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="w-full"
                id="viewport-edit"
              >
                <ImageEditor
                  imageFile={imageFile}
                  onBack={handleBackToUpload}
                  onStoryGenerated={handleStoryGenerated}
                />
              </motion.div>
            )}

            {step === 'RESULT' && generatedDataUrl && (
              <motion.div
                key="step-result"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="w-full"
                id="viewport-result"
              >
                <ResultPreview
                  generatedDataUrl={generatedDataUrl}
                  onReset={handleReset}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="relative w-full bg-white/40 backdrop-blur-xs border-t border-slate-100 py-4 text-center text-[10px] font-bold text-slate-400 tracking-widest uppercase z-1" id="app-footer">
        <div className="flex items-center justify-center space-x-1" id="footer-text-block">
          <span>Criado de forma independente para a</span>
          <span className="text-green-600">Torcida Brasileira</span>
          <Sparkles className="w-3 h-3 text-yellow-500 fill-yellow-400" />
        </div>
      </footer>
    </div>
  );
}
