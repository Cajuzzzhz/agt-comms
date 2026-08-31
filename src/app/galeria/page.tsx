'use client';
import { useState, useEffect, useRef, Suspense, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, Maximize2, FilterX, ChevronDown, Search, SlidersHorizontal } from 'lucide-react';
import { galleryItems } from '@/data/gallery';

// 1. SELECT CUSTOMIZADO
interface Option {
  value: string;
  label: string;
}

function CustomSelect({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (val: string) => void;
  options: Option[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((o) => o.value === value);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between bg-[#08080a] border border-red-950/80 hover:border-red-800 text-neutral-200 p-2.5 sm:p-3 px-3.5 sm:px-4 font-serif-gothic text-xs uppercase tracking-wider transition-all focus:outline-none focus:border-red-600 rounded-sm"
      >
        <span className="truncate text-neutral-200 font-medium">
          {selectedOption?.label}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-red-600 transition-transform duration-300 ml-2 flex-shrink-0 ${
            isOpen ? 'rotate-180 text-red-400' : ''
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 right-0 top-full mt-1.5 z-40 bg-[#0a0a0d] border border-red-900/60 shadow-[0_12px_40px_rgba(0,0,0,0.95)] p-1.5 rounded-sm max-h-60 overflow-y-auto"
          >
            {options.map((opt) => {
              const isSelected = opt.value === value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    onChange(opt.value);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left flex items-center justify-between px-3 py-2 my-0.5 rounded-xs font-serif-gothic text-xs uppercase tracking-wider transition-all ${
                    isSelected
                      ? 'bg-red-950/60 text-red-200 font-semibold border-l-2 border-red-600'
                      : 'text-neutral-300 hover:bg-red-950/30 hover:text-red-300'
                  }`}
                >
                  <span>{opt.label}</span>
                  {isSelected && <span className="text-red-500 text-[10px]">✦</span>}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// 2. CHECKBOX
const CustomCheckbox = ({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) => (
  <label className="flex items-center gap-2.5 cursor-pointer group w-full select-none" title={label}>
    <input type="checkbox" className="sr-only" checked={checked} onChange={onChange} />
    <div
      className={`w-4 h-4 flex-shrink-0 border flex items-center justify-center transition-all rounded-xs ${
        checked
          ? 'border-red-600 bg-red-950/80 shadow-[0_0_8px_rgba(220,38,38,0.4)]'
          : 'border-neutral-800 bg-[#08080a] group-hover:border-red-900'
      }`}
    >
      {checked && <span className="text-red-400 text-[10px] leading-none mt-[1px]">✦</span>}
    </div>
    <span
      className={`font-serif-gothic text-xs uppercase tracking-wider transition-colors truncate ${
        checked
          ? 'text-red-200 font-semibold'
          : 'text-neutral-300 group-hover:text-red-400'
      }`}
    >
      {label}
    </span>
  </label>
);

function GalleryContent() {
  const searchParams = useSearchParams();

  const renderStyleOptions: Option[] = [
    { value: 'all', label: 'Qualquer Acabamento' },
    { value: 'sketch', label: 'Rascunho' },
    { value: 'lineart', label: 'Lineart' },
    { value: 'flat_color', label: 'Cores Base' },
    { value: 'full_render', label: 'Render Completo' },
  ];

  const ratingOptions: Option[] = [
    { value: 'sfw', label: 'Apenas SFW (Seguro)' },
    { value: 'nsfw', label: 'Apenas NSFW (Restrito)' },
    { value: 'all', label: 'Mostrar Tudo' },
  ];

  const availableTags = useMemo(() => {
    const tags = galleryItems.flatMap((item) => item.tags || []);
    return Array.from(new Set(tags)).sort();
  }, []);

  const allCategories = ['icon', 'halfbody', 'fullbody'];
  const urlCategory = searchParams.get('category');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    urlCategory ? [urlCategory] : allCategories
  );

  const [renderStyle, setRenderStyle] = useState<string>('all');
  const [rating, setRating] = useState<string>('sfw');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tagSearch, setTagSearch] = useState('');
  const [fullscreenImg, setFullscreenImg] = useState<string | null>(null);

  // Estado para abrir/fechar filtros no celular
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const visibleTags = availableTags.filter((tag) =>
    tag.toLowerCase().includes(tagSearch.toLowerCase())
  );

  const filteredItems = galleryItems.filter((item) => {
    const matchCategory = selectedCategories.includes(item.category);
    const matchStyle = renderStyle === 'all' || item.renderStyle === renderStyle;
    const matchRating = rating === 'all' || item.rating === rating;
    const matchTags =
      selectedTags.length === 0 || selectedTags.some((tag) => item.tags?.includes(tag));

    return matchCategory && matchStyle && matchRating && matchTags;
  });

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSelectedCategories(allCategories);
    setRenderStyle('all');
    setRating('sfw');
    setSelectedTags([]);
    setTagSearch('');
  };

  useEffect(() => {
    document.body.style.overflow = fullscreenImg ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [fullscreenImg]);

  return (
    <div className="max-w-[1440px] mx-auto px-3.5 sm:px-6 py-6 sm:py-10 md:py-12 flex flex-col md:flex-row gap-6 md:gap-12 min-h-screen">
      
      {/* BARRA LATERAL DE FILTROS */}
      <aside className="w-full md:w-72 lg:w-80 flex-shrink-0 space-y-4 md:space-y-8">
        
        {/* Cabeçalho da Sidebar + Botão de Toggle Mobile */}
        <div className="flex items-center justify-between border-b border-red-950/60 pb-3 md:pb-0 md:border-none">
          <div className="space-y-1">
            <p className="text-red-600 text-[10px] sm:text-xs tracking-[0.3em] font-serif-gothic uppercase">
              ♰ Arquivo ♰
            </p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-gothic tracking-wider text-neutral-100">
              Filtros
            </h1>
          </div>

          {/* Botão de Toggle visível APENAS em celular */}
          <button
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="md:hidden flex items-center gap-2 px-3 py-1.5 bg-red-950/40 border border-red-900/60 text-red-300 text-xs font-serif-gothic uppercase tracking-wider rounded-sm"
          >
            <SlidersHorizontal size={14} />
            <span>{mobileFiltersOpen ? 'Ocultar' : 'Ajustar'}</span>
          </button>
        </div>

        {/* Bloco de Filtros (No celular abre/fecha com animação; no desktop sempre aberto) */}
        <div className={`space-y-7 md:block ${mobileFiltersOpen ? 'block pt-2' : 'hidden md:block'}`}>
          
          {/* 1. TIPOS DE OBRA */}
          <div className="space-y-3">
            <h3 className="font-serif-gothic text-xs uppercase tracking-widest text-neutral-400 font-medium border-b border-red-950/60 pb-2">
              Tipo de Obra
            </h3>
            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <CustomCheckbox
                label="Ícone"
                checked={selectedCategories.includes('icon')}
                onChange={() => toggleCategory('icon')}
              />
              <CustomCheckbox
                label="Torso"
                checked={selectedCategories.includes('halfbody')}
                onChange={() => toggleCategory('halfbody')}
              />
              <CustomCheckbox
                label="Completo"
                checked={selectedCategories.includes('fullbody')}
                onChange={() => toggleCategory('fullbody')}
              />
            </div>
          </div>

          {/* 2. ACABAMENTO */}
          <div className="space-y-2.5">
            <h3 className="font-serif-gothic text-xs uppercase tracking-widest text-neutral-400 font-medium border-b border-red-950/60 pb-2">
              Acabamento
            </h3>
            <CustomSelect
              value={renderStyle}
              onChange={setRenderStyle}
              options={renderStyleOptions}
            />
          </div>

          {/* 3. CONTEÚDO */}
          <div className="space-y-2.5">
            <h3 className="font-serif-gothic text-xs uppercase tracking-widest text-neutral-400 font-medium border-b border-red-950/60 pb-2">
              Conteúdo
            </h3>
            <CustomSelect
              value={rating}
              onChange={setRating}
              options={ratingOptions}
            />
          </div>

          {/* 4. TAGS */}
          {availableTags.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-serif-gothic text-xs uppercase tracking-widest text-neutral-400 font-medium border-b border-red-950/60 pb-2 flex items-center justify-between">
                <span>Elementos / Tags</span>
                <span className="text-[10px] text-neutral-600 font-mono">({availableTags.length})</span>
              </h3>

              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar tag..."
                  value={tagSearch}
                  onChange={(e) => setTagSearch(e.target.value)}
                  className="w-full bg-[#08080a] border border-red-950/80 text-neutral-200 p-2.5 pl-9 font-serif-gothic text-xs tracking-wider focus:outline-none focus:border-red-700 placeholder-neutral-500 rounded-sm"
                />
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-red-800" />
              </div>

              <div className="grid grid-cols-2 gap-x-2 gap-y-3 max-h-48 overflow-y-auto pr-2 pt-1">
                {visibleTags.length > 0 ? (
                  visibleTags.map((tag) => (
                    <CustomCheckbox
                      key={tag}
                      label={tag}
                      checked={selectedTags.includes(tag)}
                      onChange={() => toggleTag(tag)}
                    />
                  ))
                ) : (
                  <p className="col-span-2 text-neutral-500 font-serif-gothic text-xs italic py-2">
                    Nenhuma tag encontrada.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Botão de Redefinir */}
          <button
            onClick={clearFilters}
            className="pt-1 flex items-center gap-2 text-red-700 hover:text-red-400 transition-colors font-serif-gothic text-xs uppercase tracking-widest"
          >
            <FilterX size={14} />
            <span>Redefinir Filtros</span>
          </button>
        </div>
      </aside>

      {/* GRADE DE IMAGENS */}
      <main className="flex-1">
        {filteredItems.length === 0 ? (
          <div className="w-full h-64 flex flex-col items-center justify-center border border-red-950/40 bg-black/30 text-neutral-400 font-serif-gothic text-xs tracking-widest uppercase p-6 text-center space-y-2 rounded-sm">
            <span className="text-red-700 text-lg">♰</span>
            <p>Nenhuma obra encontrada no arquivo com estes critérios.</p>
            <button
              onClick={clearFilters}
              className="text-red-500 hover:text-red-400 underline underline-offset-4 text-[11px] pt-2"
            >
              Limpar filtros
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6"
          >
            <AnimatePresence>
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setFullscreenImg(item.imageSrc)}
                  className="w-full aspect-square relative border border-red-900/30 bg-neutral-950 shadow-lg cursor-zoom-in group overflow-hidden rounded-xs"
                >
                  <Image
                    src={item.imageSrc}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 48vw, (max-width: 1024px) 30vw, 25vw"
                    className={`object-cover transition-all duration-700 ${
                      item.rating === 'nsfw'
                        ? 'blur-2xl scale-125 opacity-70'
                        : 'group-hover:scale-110'
                    }`}
                  />

                  {/* Overlay Escuro com Ícone */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-3 text-center z-10">
                    <Maximize2 className="text-red-500 w-6 h-6 sm:w-8 sm:h-8 mb-1.5 drop-shadow-md" />
                    <span className="font-serif-gothic text-[11px] sm:text-xs text-neutral-100 font-semibold tracking-wider uppercase line-clamp-2">
                      {item.rating === 'nsfw' ? 'Revelar Restrito' : item.title}
                    </span>
                  </div>

                  {item.rating === 'nsfw' && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                      <div className="bg-red-950/90 border border-red-800 text-red-400 text-[10px] sm:text-xs font-serif-gothic px-2.5 py-1 uppercase tracking-widest backdrop-blur-sm shadow-2xl">
                        NSFW
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </main>

      {/* MODAL TELA CHEIA */}
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
            <p className="absolute top-6 sm:top-8 text-neutral-400 font-serif-gothic text-[10px] sm:text-xs tracking-widest uppercase pointer-events-none text-center px-12">
              [ Toque em qualquer lugar para fechar ]
            </p>

            <div className="relative w-full h-full max-w-5xl max-h-[75vh] sm:max-h-[85vh] flex items-center justify-center mt-4 sm:mt-0">
              <Image
                src={fullscreenImg}
                alt="Arte Expandida"
                fill
                className="object-contain"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function GalleryPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center font-gothic text-2xl text-red-800 animate-pulse">
          Carregando o Arquivo...
        </div>
      }
    >
      <GalleryContent />
    </Suspense>
  );
}