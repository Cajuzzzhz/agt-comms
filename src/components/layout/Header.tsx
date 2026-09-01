'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-40 bg-black/90 backdrop-blur-md border-b border-red-950/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        
        {/* Logotipo */}
        <Link href="/" className="group flex items-center gap-2">
          <span className="font-gothic text-xl sm:text-2xl font-bold tracking-widest text-neutral-100 group-hover:text-red-500 transition-colors">
            CAJUZZZHZ
          </span>
        </Link>

        {/* Navegação Desktop */}
        <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.25em] font-serif-gothic">
          <Link href="/" className="text-neutral-400 hover:text-red-500 transition-colors">
            Início
          </Link>
          <Link href="/galeria" className="text-neutral-400 hover:text-red-500 transition-colors">
            Galeria
          </Link>
          <Link href="/info" className="text-neutral-400 hover:text-red-500 transition-colors">
            Diretrizes
          </Link>
          <Link 
            href="/calculadora" 
            className="px-4 py-1.5 border border-red-900/60 bg-red-950/20 text-red-400 hover:bg-red-900/40 hover:border-red-600 transition-all rounded-sm"
          >
            Calculadora de Preço
          </Link>
        </nav>

        {/* Botão Hambúrguer Mobile */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-neutral-400 hover:text-red-400 transition-colors"
          aria-label="Menu de Navegação"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Menu Gaveta Mobile */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-red-950 bg-black/95 px-6 py-6 space-y-4 font-serif-gothic text-xs uppercase tracking-[0.2em] text-center">
          <Link 
            href="/" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-neutral-300 hover:text-red-400"
          >
            Início
          </Link>
          <Link 
            href="/galeria" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-neutral-300 hover:text-red-400"
          >
            Galeria
          </Link>
          <Link 
            href="/info" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-neutral-300 hover:text-red-400"
          >
            Diretrizes
          </Link>
          <Link 
            href="/calculadora" 
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2.5 bg-red-950/60 border border-red-800 text-red-300 rounded-sm"
          >
            Calculadora de Preço
          </Link>
        </div>
      )}
    </header>
  );
}