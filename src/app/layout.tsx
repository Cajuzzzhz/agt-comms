import type { Metadata } from 'next';
import { Cinzel, Cinzel_Decorative, Playfair_Display } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import SmoothScroll from '@/components/layout/SmoothScroll';

const cinzel = Cinzel({ 
  subsets: ['latin'], 
  variable: '--font-gothic-serif' 
});

const cinzelDeco = Cinzel_Decorative({ 
  weight: ['700', '900'], 
  subsets: ['latin'], 
  variable: '--font-gothic-title' 
});

export const metadata: Metadata = {
  title: 'Cajuzzzhz Comissões',
  description: 'I was meant to be beautiful',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${cinzel.variable} ${cinzelDeco.variable}`}>
      <body className="font-serif antialiased bg-black text-neutral-300 relative selection:bg-red-950 selection:text-red-400">
        
        {/* Camada de Grão de Filme Analógico / Textura de Ruído */}
        <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.035] mix-blend-overlay noise-bg" />

        {/* Névoa de Sangue de Fundo (Vignette) */}
        <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,10,10,0.25),rgba(0,0,0,0.95))]" />

        <SmoothScroll>
          <Header />
          <main className="relative z-10 pt-36 sm:pt-24">
            {children}
          </main>
        </SmoothScroll>
      </body>
    </html>
  );
}