'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Maximize2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { CommissionTier } from '@/types';

interface CommissionModalProps {
  tier: CommissionTier | null;
  onClose: () => void;
}

export default function CommissionModal({ tier, onClose }: CommissionModalProps) {
  const [fullscreenImg, setFullscreenImg] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (fullscreenImg) {
          setFullscreenImg(null);
        } else {
          onClose();
        }
      }
    };

    if (tier) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [tier, fullscreenImg, onClose]);

  const handleCloseModal = () => {
    setFullscreenImg(null);
    onClose();
  };

  return (
    <>
      <AnimatePresence>
        {tier && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
            className="fixed inset-0 z-[999] flex flex-col items-center justify-start md:justify-center bg-black/95 backdrop-blur-md p-4 sm:p-6 md:p-8 overflow-y-auto"
          >
            {/* Botão de Fechar Modal Fixo */}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                handleCloseModal();
              }}
              className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[1000] p-2.5 sm:p-3 rounded-full bg-neutral-900/90 border border-red-900/60 text-red-500 hover:bg-red-950 hover:text-red-300 transition-all shadow-2xl cursor-pointer"
              title="Fechar (ESC)"
            >
              <X size={20} className="sm:w-6 sm:h-6" />
            </button>

            {/* Conteúdo Central */}
            <div 
              className="w-full max-w-5xl flex flex-col items-center my-auto pt-14 pb-8 sm:py-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center space-y-1.5 mb-6 sm:mb-8 px-4">
                <p className="text-red-600 text-[10px] sm:text-xs tracking-[0.3em] font-serif-gothic uppercase">
                  ♰ Registro de Obras ♰
                </p>
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-gothic text-neutral-100 tracking-wider">
                  {tier.title}
                </h2>
              </div>

              {/* Grid das 3 Imagens */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 md:gap-8 w-full max-w-xs sm:max-w-5xl px-2 sm:px-4">
                {tier.examples.map((src, idx) => (
                  <motion.div
                    key={idx}
                    layoutId={`artwork-${src}`}
                    onClick={() => setFullscreenImg(src)}
                    className="w-full aspect-square border-2 border-red-950/80 p-1.5 sm:p-2 bg-[#0c0c0e] shadow-[0_0_30px_rgba(150,10,10,0.15)] relative rounded-sm cursor-zoom-in group hover:border-red-800 transition-colors"
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  >
                    <div className="w-full h-full border border-red-900/40 relative overflow-hidden bg-neutral-950">
                      <Image 
                        src={src} 
                        alt={`${tier.title} exemplo ${idx + 1}`} 
                        fill 
                        sizes="(max-width: 640px) 90vw, (max-width: 1024px) 33vw, 300px"
                        className="object-cover group-hover:scale-110 transition-transform duration-700" 
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Maximize2 className="text-red-500 w-8 h-8 sm:w-10 sm:h-10 drop-shadow-lg" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Botão para ir à Galeria */}
              <Link 
                href={`/galeria?category=${tier.id}`}
                onClick={handleCloseModal}
                className="mt-8 sm:mt-12 flex items-center gap-3 px-6 sm:px-8 py-3 bg-red-950/60 text-red-200 border border-red-800 hover:border-red-500 hover:bg-red-900/50 transition-all font-serif-gothic uppercase tracking-widest text-xs rounded-sm group text-center"
              >
                Ver mais exemplos
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform text-red-500" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* OVERLAY DE TELA CHEIA (Fullscreen Image) */}
      <AnimatePresence>
        {fullscreenImg && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={() => setFullscreenImg(null)}
            className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/98 p-3 sm:p-6 md:p-12 cursor-zoom-out"
          >
            <button 
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-[2010] p-2.5 sm:p-3 rounded-full bg-neutral-900/90 border border-red-900/60 text-red-500 hover:bg-red-950 hover:text-red-300 transition-all shadow-2xl cursor-pointer"
            >
              <X size={20} className="sm:w-6 sm:h-6" />
            </button>
            <p className="absolute top-6 sm:top-8 text-neutral-500 font-serif-gothic text-[10px] sm:text-xs tracking-widest uppercase pointer-events-none text-center px-12">
              [ Toque em qualquer lugar para fechar ]
            </p>
            
            <motion.div 
              layoutId={`artwork-${fullscreenImg}`}
              className="relative w-full h-full max-w-5xl max-h-[75vh] sm:max-h-[85vh] rounded-sm overflow-hidden border border-red-900/30 shadow-[0_0_80px_rgba(150,10,10,0.15)] bg-neutral-950 mt-4 sm:mt-0"
            >
              <Image 
                src={fullscreenImg} 
                alt="Arte em Tela Cheia" 
                fill 
                className="object-contain" 
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}