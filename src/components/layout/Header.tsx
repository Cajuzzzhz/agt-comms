'use client';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed top-0 w-full z-40 bg-black/80 backdrop-blur-md border-b border-red-950/40">
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 min-h-20 py-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        
        {/* Logotipo / Nome com Glifo */}
        <Link href="/" className="group flex items-center gap-2">
          <span className="font-gothic text-xl sm:text-2xl font-bold tracking-[0.18em] sm:tracking-widest text-neutral-100 group-hover:text-red-500 transition-colors">
            CAJUZZZHZ
          </span>
        </Link>

        <nav className="w-full sm:w-auto flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:gap-8 text-[10px] sm:text-xs uppercase tracking-[0.18em] sm:tracking-[0.25em] font-serif-gothic">
          <Link href="/" className="text-neutral-400 hover:text-red-500 hover:tracking-[0.3em] transition-all">
            Início
          </Link>
          <Link href="/galeria" className="text-neutral-400 hover:text-red-500 hover:tracking-[0.3em] transition-all">
            Galeria
          </Link>
          <Link href="/info" className="text-neutral-400 hover:text-red-500 hover:tracking-[0.3em] transition-all">
            Diretrizes
          </Link>
          <Link 
            href="/calculadora" 
            className="px-3 sm:px-4 py-1.5 border border-red-900/60 bg-red-950/20 text-red-400 hover:bg-red-900/40 hover:border-red-600 transition-all rounded-sm text-center"
          >
            Calculadora de Preço
          </Link>
        </nav>
      </div>
    </header>
  );
}