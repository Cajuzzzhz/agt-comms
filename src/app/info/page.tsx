'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Check, 
  X, 
  Copy, 
  CheckCheck, 
  Clock, 
  CreditCard, 
  Mail, 
  ExternalLink,
  ShieldAlert,
  FileText
} from 'lucide-react';
import Link from 'next/link';
import { artistInfo } from '@/data/info';

export default function InfoPage() {
  const [copiedDiscord, setCopiedDiscord] = useState(false);

  const copyDiscord = () => {
    navigator.clipboard.writeText(artistInfo.socials.discord);
    setCopiedDiscord(true);
    setTimeout(() => setCopiedDiscord(false), 2500);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 md:py-16 space-y-16 md:space-y-24 min-h-screen">
      
      {/* 1. CABEÇALHO DA PÁGINA */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-gothic tracking-wider text-neutral-100">
          DIRETRIZES & TERMOS
        </h1>
        
        <p className="text-neutral-400 font-serif-gothic text-sm md:text-base max-w-xl mx-auto leading-relaxed">
          Leia atentamente as regras e o fluxo de trabalho antes de solicitar uma encomenda.
          Ao encomendar, você concorda com todos os termos descritos abaixo.
        </p>
      </section>

      {/* 2. DO'S AND DON'TS */}
      <section className="space-y-6">
        <div className="text-center space-y-1 mb-8">
          <h2 className="text-2xl md:text-3xl font-gothic text-neutral-100 tracking-wider">
            O que eu desenho e o que não desenho
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* O QUE DESENHO (DO'S) */}
          <div className="border border-red-900/40 bg-[#08080a] p-5 md:p-8 relative rounded-sm shadow-xl shadow-red-950/20">
            <div className="flex items-center gap-3 border-b border-red-950/60 pb-4 mb-6">
              <span className="text-red-500 text-lg">✦</span>
              <h3 className="font-gothic text-xl text-neutral-100 tracking-wider">
                Eu Desenho (Do&apos;s)
              </h3>
            </div>
            
            <ul className="space-y-3.5 font-serif-gothic text-xs uppercase tracking-wider text-neutral-300">
              {artistInfo.dos.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-red-500 text-xs mt-0.5">✦</span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* O QUE NÃO DESENHO (DON'TS) */}
          <div className="border border-neutral-900 bg-[#060608] p-5 md:p-8 relative rounded-sm shadow-xl">
            <div className="flex items-center gap-3 border-b border-neutral-900 pb-4 mb-6">
              <span className="text-neutral-600 text-lg">♰</span>
              <h3 className="font-gothic text-xl text-neutral-400 tracking-wider">
                Não Desenho (Don&apos;ts)
              </h3>
            </div>
            
            <ul className="space-y-3.5 font-serif-gothic text-xs uppercase tracking-wider text-neutral-500">
              {artistInfo.donts.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-neutral-700 text-xs mt-0.5">✕</span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        <p className="text-neutral-500 font-serif-gothic text-xs tracking-wider text-center pt-2">
          Mesmo que não mencionado nos don&apos;ts, eu posso recusar qualquer solicitação pelo motivo que seja.
        </p>
      </section>

      {/* 3. FLUXO DE TRABALHO */}
      <section className="space-y-8">
        <div className="text-center space-y-1 mb-10">
          <span className="text-red-700 text-sm">◈</span>
          <h2 className="text-2xl md:text-3xl font-gothic text-neutral-100 tracking-wider">
            Fluxo do Trabalho
          </h2>
          <p className="text-neutral-500 font-serif-gothic text-xs tracking-wider uppercase">
            Como sua ideia ganha vida em 4 etapas
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {artistInfo.workflowSteps.map((step) => (
            <div 
              key={step.step}
              className="border border-red-950/60 bg-[#08080b] p-6 space-y-4 relative group hover:border-red-800 transition-colors rounded-sm"
            >
              <div className="font-gothic text-4xl font-bold text-red-950 group-hover:text-red-900 transition-colors">
                {step.step}
              </div>
              <h4 className="font-gothic text-lg text-neutral-200 tracking-wider">
                {step.title}
              </h4>
              <p className="font-serif-gothic text-xs text-neutral-400 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. PRAZOS E FORMAS DE PAGAMENTO */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Tempo de Espera */}
        <div className="border border-red-950/50 bg-[#08080a] p-8 space-y-4 rounded-sm">
          <div className="flex items-center gap-2 text-red-500">
            <Clock size={20} />
            <h3 className="font-gothic text-lg tracking-wider text-neutral-200 uppercase">Tempo de Espera</h3>
          </div>
          <p className="font-gothic text-4xl text-neutral-100">{artistInfo.turnaroundTime}</p>
          <p className="font-serif-gothic text-xs text-neutral-400 leading-relaxed">
            Essa estimativa pode variar dependendo da complexidade do pedido e da minha agenda. Sempre aviso se houver atrasos.
          </p>
        </div>

        {/* Métodos de Pagamento */}
        <div className="border border-red-950/50 bg-[#08080a] p-8 space-y-4 rounded-sm">
          <div className="flex items-center gap-2 text-red-500">
            <CreditCard size={20} />
            <h3 className="font-gothic text-lg tracking-wider text-neutral-200 uppercase">Formas de Pagamento</h3>
          </div>
          <div className="space-y-2.5 pt-1">
            {artistInfo.paymentMethods.map((pm, i) => (
              <div key={i} className="font-serif-gothic text-xs">
                <span className="text-red-200 font-semibold uppercase">{pm.name}: </span>
                <span className="text-neutral-400">{pm.detail}</span>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* 5. TERMOS DE SERVIÇO & CLÁUSULAS (MAP DO DATA/INFO.TS) */}
      <section className="space-y-8">
        <div className="text-center space-y-1 mb-8">
          <span className="text-red-700 text-sm">♰</span>
          <h2 className="text-2xl md:text-3xl font-gothic text-neutral-100 tracking-wider">
            Termos de Serviço & Cláusulas
          </h2>
          <p className="text-neutral-500 font-serif-gothic text-xs tracking-wider uppercase">
            Acordo legal e direitos da encomenda
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {artistInfo.terms.map((term, idx) => (
            <div
              key={idx}
              className="border border-red-950/50 bg-[#08080a] p-6 space-y-3 rounded-sm relative group hover:border-red-900 transition-colors flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-red-500">
                  <ShieldAlert size={18} />
                  <h3 className="font-gothic text-base tracking-wider text-neutral-200">
                    {term.title}
                  </h3>
                </div>
                <p className="font-serif-gothic text-xs text-neutral-400 leading-relaxed">
                  {term.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. SEÇÃO DE CONTATO DIRETO & REDES */}
      <section className="border border-red-900/40 bg-gradient-to-b from-[#0e0a0d] to-black p-5 sm:p-8 md:p-12 text-center space-y-8 rounded-sm shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(160,10,10,0.12),transparent_70%)] pointer-events-none" />
        
        <div className="space-y-2 relative z-10">
          <h2 className="text-3xl md:text-5xl font-gothic tracking-wider text-neutral-100">
            Pronto para encomendar?
          </h2>
          <p className="text-neutral-400 font-serif-gothic text-xs md:text-sm uppercase tracking-widest max-w-md mx-auto">
            Entre em contato através das vias abaixo com as referências do seu pedido.
          </p>
        </div>

        {/* BOTÕES DE REDE SOCIAL E CONTATO */}
        <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center gap-3 sm:gap-4 pt-2 relative z-10 font-serif-gothic text-xs uppercase tracking-wider">
          
          {/* Botão Discord */}
          <button
            onClick={copyDiscord}
            className="flex items-center justify-center gap-3 px-4 sm:px-6 py-3.5 bg-[#0a0a0d] border border-red-900/60 hover:border-red-500 text-red-200 hover:bg-red-950/40 transition-all rounded-sm group cursor-pointer"
            title="Clique para copiar o usuário do Discord"
          >
            {copiedDiscord ? (
              <>
                <CheckCheck size={16} className="text-green-500" />
                <span className="text-green-400 font-bold">Discord Copiado!</span>
              </>
            ) : (
              <>
                <Copy size={16} className="text-red-500 group-hover:scale-110 transition-transform" />
                <span>Discord: <strong className="text-white lowercase">{artistInfo.socials.discord}</strong></span>
              </>
            )}
          </button>

          {/* Botão Twitter / X */}
          <a
            href={artistInfo.socials.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 px-4 sm:px-6 py-3.5 bg-[#0a0a0d] border border-red-900/60 hover:border-red-500 text-red-200 hover:bg-red-950/40 transition-all rounded-sm group"
          >
            <span>Twitter / X: <strong className="text-white">{artistInfo.socials.twitterHandle}</strong></span>
            <ExternalLink size={14} className="text-red-500 group-hover:translate-x-0.5 transition-transform" />
          </a>

          {/* Botão Email */}
          <a
            href={`mailto:${artistInfo.socials.email}`}
            className="flex items-center justify-center gap-3 px-4 sm:px-6 py-3.5 bg-[#0a0a0d] border border-red-900/60 hover:border-red-500 text-red-200 hover:bg-red-950/40 transition-all rounded-sm group"
          >
            <Mail size={16} className="text-red-500 group-hover:scale-110 transition-transform" />
            <span>E-mail</span>
          </a>

        </div>

        {/* Link para o Oráculo de Preços */}
        <div className="pt-6 relative z-10">
          <Link
            href="/calculadora"
            className="text-xs uppercase tracking-[0.2em] text-neutral-500 hover:text-red-400 transition-colors font-serif-gothic underline underline-offset-4"
          >
            [ Calcular estimativa na Calculadora de Preço ]
          </Link>
        </div>
      </section>

    </div>
  );
}