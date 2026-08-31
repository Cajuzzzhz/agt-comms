'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { CommissionTier } from '@/types';

interface CommissionDeckProps {
  tier: CommissionTier;
  onOpen: () => void;
}

export default function CommissionDeck({ tier, onOpen }: CommissionDeckProps) {
  const rotations = [-8, 0, 8];
  const xOffsets = [-24, 0, 24];
  const numerals = ['I', 'II', 'III'];

  return (
    <div 
      className="relative w-full max-w-72 h-72 cursor-pointer group flex items-center justify-center"
      onClick={onOpen}
    >
      {/* Brilho vermelho no fundo */}
      <div className="absolute inset-0 bg-red-900/10 rounded-full blur-3xl group-hover:bg-red-800/25 transition-all duration-700 pointer-events-none" />

      {tier.examples.map((src, idx) => (
        <motion.div
          key={idx}
          className="absolute w-[min(16rem,88vw)] aspect-square rounded-sm border border-red-900/40 p-2 bg-[#0a0a0c] shadow-[0_10px_30px_rgba(0,0,0,0.9)] overflow-hidden"
          initial={{ rotate: rotations[idx], x: xOffsets[idx] }}
          whileHover={{ 
            rotate: rotations[idx] * 1.6, 
            x: xOffsets[idx] * 2.2,
            y: -14,
            zIndex: 20
          }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          style={{ zIndex: idx === 1 ? 10 : 2 }}
        >
          {/* Moldura Interna Gótica (agora quadrada) */}
          <div className="w-full h-full border border-red-950/80 p-1 flex flex-col justify-between relative bg-black/40">
            
            <div className="flex justify-between items-center text-[10px] font-gothic text-red-600/70 px-1 pt-0.5">
              <span>✦</span>
              <span>{numerals[idx]}</span>
              <span>✦</span>
            </div>

            {/* Imagem da carta pequena */}
            <div className="w-full flex-1 my-1 relative border border-neutral-900 overflow-hidden bg-neutral-950">
              <Image 
                src={src} 
                alt={`${tier.title} ${idx + 1}`} 
                fill 
                sizes="(max-width: 768px) 100vw, 256px"
                className="object-cover grayscale-[20%] contrast-125 group-hover:grayscale-0 transition-all duration-500" 
              />
            </div>

            <div className="flex justify-between items-center text-[9px] uppercase tracking-widest text-neutral-600 px-1 pb-0.5 font-serif-gothic">
              <span>♰</span>
              <span>{tier.title}</span>
              <span>♰</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}