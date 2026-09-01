'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { commissionTiers } from '@/data/commissions';
import { CommissionTier } from '@/types';
import CommissionDeck from '@/components/home/CommissionDeck';
import CommissionModal from '@/components/home/CommissionModal';
import PromoPopup from '@/components/home/PromoPopup';

export default function Home() {
  const [selectedTier, setSelectedTier] = useState<CommissionTier | null>(null);

  return (
    <div className="min-h-screen overflow-x-hidden">
      
      {/* SEÇÃO 1: HERO / SANTUÁRIO */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-24 flex flex-col-reverse md:flex-row items-center gap-10 md:gap-16 min-h-[85vh]">
        <div className="flex-1 space-y-6 md:space-y-8 text-center md:text-left">
          
          <div className="space-y-3 flex flex-col items-center md:items-start">
            <div className="flex items-center gap-3 w-full max-w-[260px] md:max-w-[288px]">
              <span className="h-px w-full bg-red-800" />
            </div>
            
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-gothic tracking-wider text-neutral-100 leading-none py-1">
              CAJU
            </h1>

            <div className="flex items-center gap-3 w-full max-w-[260px] md:max-w-[288px]">
              <span className="h-px w-full bg-red-800" />
            </div>
          </div>
          
          <p className="text-neutral-400 font-serif-gothic text-sm sm:text-base leading-relaxed max-w-lg mx-auto md:mx-0">
            Ola! Sou Cajuzzzhz, uma artista digital especializada em ilustração e design. Aqui você encontrará uma variedade de opções de comissões personalizadas, desde retratos de personagens, monstros e até simbolos.
            <br></br><br></br>
            Tenho o costume de desenhar personagens de rpg com foco em Ordem Paranormal, mas também posso criar ilustrações de outros estilos e temas.
          </p>
          
          {/* Navegação Rápida */}
          <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-2.5">
            <span className="text-xs uppercase tracking-widest text-neutral-600 font-serif-gothic">Sumário:</span>
            {commissionTiers.map(tier => (
              <a 
                key={tier.id} 
                href={`#${tier.id}`}
                className="px-3 py-1 text-xs uppercase tracking-wider font-serif-gothic border border-neutral-800 text-neutral-400 hover:border-red-800 hover:text-red-400 transition-all bg-black/40"
              >
                {tier.title}
              </a>
            ))}
          </div>
        </div>

        {/* Persona */}
        <div className="flex-1 flex justify-center md:justify-end relative">
          <div className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-red-900/25 blur-3xl -z-10" />
          
          <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-96 md:h-96 rounded-full border-2 border-red-950 p-2 shadow-[0_0_60px_rgba(180,10,10,0.2)] bg-[#070709]">
            <div className="w-full h-full rounded-full border border-red-900/60 overflow-hidden relative bg-neutral-950">
               <Image src="/images/avatar/persona_neutral.png" alt="Cajuzzzhz Persona" fill className="object-cover" /> 
            </div>
          </div>
        </div>
      </section>

      {/* DIVISOR DE SEÇÃO */}
      <div className="flex items-center justify-center gap-4 py-6 md:py-8 opacity-40">
        <span className="h-[2px] w-24 sm:w-40 bg-gradient-to-r from-transparent to-red-900" />
        <span className="text-red-700 text-sm">❖ ♰ ❖</span>
        <span className="h-[2px] w-24 sm:w-40 bg-gradient-to-l from-transparent to-red-900" />
      </div>

      {/* SEÇÃO 2: TABELA DE PREÇOS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-16 md:space-y-24">
        {commissionTiers.map((tier, index) => {
          const isEven = index % 2 === 0;

          return (
            <div 
              key={tier.id} 
              id={tier.id}
              className={`relative flex flex-col md:flex-row items-center gap-10 md:gap-16 ${isEven ? '' : 'md:flex-row-reverse'} py-6 md:py-10`}
            >
              {/* Coluna de Textos */}
              <div className="flex-1 space-y-4 md:space-y-6 relative z-10 text-center md:text-left">
                
                {/* PREÇO GIGANTE EM MARCA D'ÁGUA (Ajustado para nunca transbordar no mobile) */}
                <div 
                  aria-hidden="true"
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none -z-10 opacity-50 flex items-center justify-center w-full"
                >
                  <span className="font-gothic font-bold text-[6.5rem] sm:text-[10rem] md:text-[14rem] lg:text-[18rem] text-red-900/40 leading-none tracking-tighter blur-[1px]">
                    R${tier.startingPrice}
                  </span>
                </div>

                <div className="flex items-center justify-center md:justify-start gap-3">
                  <span className="text-red-600 text-xs">◈</span>
                  <span className="text-xs uppercase tracking-[0.25em] font-serif-gothic text-red-500 font-medium">
                     A partir de R${tier.startingPrice}
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-gothic tracking-wider text-neutral-100 drop-shadow-md">
                  {tier.title}
                </h2>

                <p className="text-neutral-400 font-serif-gothic text-sm sm:text-base leading-relaxed max-w-md mx-auto md:mx-0">
                  {tier.description}
                </p>

                <div className="pt-1">
                  <p className="text-[10px] sm:text-[11px] font-serif-gothic text-neutral-600 tracking-wider uppercase">
                    Passe o cursor sobre as artes para revelar ou clique para ampliar
                  </p>
                </div>
              </div>

              {/* Baralho */}
              <div className="flex-1 flex justify-center relative z-10 scale-90 sm:scale-100">
                <CommissionDeck 
                  tier={tier} 
                  onOpen={() => setSelectedTier(tier)} 
                />
              </div>
            </div>
          );
        })}
      </section>

      {/* SEÇÃO 3: CHAMADO FINAL */}
      <section className="border-t border-red-950/30 mt-16 md:mt-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(150,10,10,0.15),transparent_70%)] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 md:py-28 text-center space-y-6 md:space-y-8 relative z-10">
          <span className="text-red-600 text-xl">♰</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-gothic tracking-widest text-neutral-100">
            Deseja Encomendar uma Obra?
          </h2>
          <p className="text-neutral-400 font-serif-gothic text-xs sm:text-sm max-w-md mx-auto tracking-wide">
            Consulte as diretrizes de trabalho, formas de pagamento aceitas e prazos de entrega.
          </p>

          <div className="pt-2">
            <Link 
              href="/info" 
              className="inline-block px-8 sm:px-10 py-3.5 bg-red-950 border border-red-800 text-red-200 hover:bg-red-900 hover:text-white transition-all font-serif-gothic uppercase tracking-[0.25em] text-xs"
            >
              Acessar Diretrizes & Contato
            </Link>
          </div>

          <div className="pt-4">
            <Link 
              href="/calculadora" 
              className="text-xs uppercase tracking-[0.2em] text-neutral-500 hover:text-red-400 transition-colors font-serif-gothic"
            >
              [ Ou consulte a calculadora de Preços ]
            </Link>
          </div>
        </div>
      </section>

      {/* MODAL GLOBAL */}
      <CommissionModal 
        tier={selectedTier} 
        onClose={() => setSelectedTier(null)} 
      />

      {/* POPUP DE PROMOÇÃO ATIVA (Aparece se currentPromotion.isActive for true) */}
      <PromoPopup />

    </div>
  );
}