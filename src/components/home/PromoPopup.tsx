'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Copy, CheckCheck, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { currentPromotion } from '@/data/promotions';

export default function PromoPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Só abre se a promoção estiver ativa no arquivo de dados
    if (currentPromotion.isActive) {
      // Delay sutil de 1 segundo para não assustar o usuário assim que abre a página
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const copyCode = () => {
    navigator.clipboard.writeText(currentPromotion.promoCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!currentPromotion.isActive) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 max-w-sm w-[calc(100vw-2rem)] border border-red-900/80 bg-[#0c090c] p-6 rounded-sm shadow-[0_10px_40px_rgba(180,10,10,0.25)]"
        >
          {/* Botão Fechar */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-3 right-3 p-1.5 text-neutral-500 hover:text-red-400 transition-colors"
            title="Fechar aviso"
          >
            <X size={18} />
          </button>

          <div className="space-y-4">
            
            {/* Tag / Badge */}
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-red-950/80 border border-red-800 text-red-400 font-serif-gothic text-[10px] uppercase tracking-widest font-bold">
                {currentPromotion.badge}
              </span>
              <span className="text-red-600 text-xs">♰</span>
            </div>

            {/* Título e Texto */}
            <div className="space-y-1">
              <h3 className="font-gothic text-lg text-neutral-100 tracking-wider">
                {currentPromotion.title}
              </h3>
              <p className="font-serif-gothic text-xs text-neutral-400 leading-relaxed">
                {currentPromotion.description}
              </p>
            </div>

            {/* Caixa com o Código Copiável */}
            <div className="p-3 bg-black/60 border border-red-950 flex items-center justify-between">
              <div>
                <p className="text-[9px] uppercase tracking-widest text-neutral-500 font-serif-gothic">
                  Código:
                </p>
                <p className="font-mono text-sm font-bold text-red-400 tracking-widest">
                  {currentPromotion.promoCode}
                </p>
              </div>

              <button
                onClick={copyCode}
                className="px-3 py-1.5 bg-red-950/60 border border-red-900 hover:border-red-600 text-red-200 text-[11px] font-serif-gothic uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <CheckCheck size={12} className="text-green-400" />
                    <span className="text-green-400 font-bold">Copiado</span>
                  </>
                ) : (
                  <>
                    <Copy size={12} />
                    <span>Copiar</span>
                  </>
                )}
              </button>
            </div>

            {/* Botão de Ação Direta para a Calculadora */}
            <Link
              href="/calculadora"
              onClick={() => setIsOpen(false)}
              className="w-full py-2.5 bg-red-950 border border-red-800 hover:border-red-500 hover:bg-red-900 text-red-100 font-serif-gothic text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all"
            >
              <span>Usar Desconto na Calculadora</span>
              <ArrowRight size={14} className="text-red-400" />
            </Link>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}