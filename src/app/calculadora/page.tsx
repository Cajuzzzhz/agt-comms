'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Trash2, 
  Copy, 
  CheckCheck, 
  ChevronDown,
  Tag,
  XCircle,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';
import { 
  baseArtTypes, 
  renderOptions, 
  backgroundOptions, 
  addonOptions 
} from '@/data/calculator';
import { validPromoCodes, PromoCode } from '@/data/promotions';

// Estrutura de cada desenho no pedido
interface CommissionPiece {
  id: string;
  typeId: string;
  renderId: string;
  backgroundId: string;
  selectedAddons: string[];
}

export default function CalculatorPage() {
  // Lista de desenhos no pedido (inicia com 1)
  const [pieces, setPieces] = useState<CommissionPiece[]>([
    {
      id: 'piece-1',
      typeId: 'halfbody',
      renderId: 'full_render',
      backgroundId: 'none',
      selectedAddons: [],
    },
  ]);

  // Estados do Cupom de Desconto
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);

  const [copiedSummary, setCopiedSummary] = useState(false);

  // Adicionar novo desenho
  const addPiece = () => {
    const newPiece: CommissionPiece = {
      id: `piece-${Date.now()}`,
      typeId: 'halfbody',
      renderId: 'full_render',
      backgroundId: 'none',
      selectedAddons: [],
    };
    setPieces([...pieces, newPiece]);
  };

  // Remover um desenho
  const removePiece = (id: string) => {
    if (pieces.length === 1) return;
    setPieces(pieces.filter((p) => p.id !== id));
  };

  // Atualizar campo de um desenho
  const updatePiece = (id: string, field: keyof CommissionPiece, value: unknown) => {
    setPieces(
      pieces.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  // Alternar tag adicional
  const toggleAddon = (pieceId: string, addonId: string) => {
    const piece = pieces.find((p) => p.id === pieceId);
    if (!piece) return;

    const newAddons = piece.selectedAddons.includes(addonId)
      ? piece.selectedAddons.filter((id) => id !== addonId)
      : [...piece.selectedAddons, addonId];

    updatePiece(pieceId, 'selectedAddons', newAddons);
  };

  // Aplicar Cupom
  const handleApplyPromo = () => {
    setPromoError(null);
    const cleanedCode = promoInput.trim().toUpperCase();

    if (!cleanedCode) {
      setPromoError('Digite um código promocional.');
      return;
    }

    const found = validPromoCodes.find(
      (p) => p.code.toUpperCase() === cleanedCode
    );

    if (found) {
      setAppliedPromo(found);
      setPromoError(null);
    } else {
      setPromoError('Código inválido ou inexistente.');
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoInput('');
    setPromoError(null);
  };

  // Cálculo individual de cada obra
  const calculatePiecePrice = (piece: CommissionPiece) => {
    const baseType = baseArtTypes.find((t) => t.id === piece.typeId) || baseArtTypes[0];
    const render = renderOptions.find((r) => r.id === piece.renderId) || renderOptions[0];
    const bg = backgroundOptions.find((b) => b.id === piece.backgroundId) || backgroundOptions[0];

    const adjustedBase = baseType.basePrice * render.multiplier;
    let total = adjustedBase + bg.price;

    piece.selectedAddons.forEach((addonId) => {
      const addon = addonOptions.find((a) => a.id === addonId);
      if (addon) {
        if (addon.type === 'percentage') {
          total += adjustedBase * addon.value;
        } else {
          total += addon.value;
        }
      }
    });

    return Math.round(total);
  };

  // Subtotal sem desconto
  const subtotalBeforeDiscount = pieces.reduce(
    (sum, piece) => sum + calculatePiecePrice(piece),
    0
  );

  // Valor do Desconto
  const discountAmount = appliedPromo
    ? Math.round(subtotalBeforeDiscount * (appliedPromo.discountPercentage / 100))
    : 0;

  // Valor Total Final
  const grandTotal = Math.max(0, subtotalBeforeDiscount - discountAmount);

  // Copiar resumo formatado
  const copyOrderSummary = () => {
    let text = `♰ PEDIDO DE COMISSÃO · CAJUZZZHZ ♰\n\n`;

    pieces.forEach((piece, index) => {
      const baseType = baseArtTypes.find((t) => t.id === piece.typeId);
      const render = renderOptions.find((r) => r.id === piece.renderId);
      const bg = backgroundOptions.find((b) => b.id === piece.backgroundId);
      const piecePrice = calculatePiecePrice(piece);

      text += `[ OBRA #${index + 1} - ${baseType?.name?.toUpperCase()} ]\n`;
      text += `• Acabamento: ${render?.name}\n`;
      text += `• Fundo: ${bg?.name} (+$${bg?.price})\n`;

      if (piece.selectedAddons.length > 0) {
        text += `• Adicionais:\n`;
        piece.selectedAddons.forEach((addonId) => {
          const addon = addonOptions.find((a) => a.id === addonId);
          text += `  - ${addon?.name} (${addon?.badge})\n`;
        });
      } else {
        text += `• Adicionais: Nenhum\n`;
      }

      text += `• Subtotal da Obra #${index + 1}: $${piecePrice}\n\n`;
    });

    text += `━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `• Subtotal: $${subtotalBeforeDiscount}\n`;

    if (appliedPromo) {
      text += `• Cupom Aplicado: ${appliedPromo.code} (-${appliedPromo.discountPercentage}%) -> -$${discountAmount}\n`;
    }

    text += `♰ VALOR TOTAL ESTIMADO: $${grandTotal}\n`;
    text += `(Orçamento gerado pelo site oficial)`;

    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-16 space-y-10 md:space-y-16 min-h-screen">
      
      {/* 1. CABEÇALHO */}
      <section className="text-center space-y-3 sm:space-y-4">
        <div className="flex items-center justify-center gap-3">
          <span className="h-px w-12 bg-red-800" />
          <p className="text-red-500 text-xs font-serif-gothic uppercase tracking-[0.35em]">
            Oráculo de Valores
          </p>
          <span className="h-px w-12 bg-red-800" />
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-gothic tracking-wider text-neutral-100">
          CALCULADORA
        </h1>

        <p className="text-neutral-400 font-serif-gothic text-xs sm:text-sm max-w-xl mx-auto leading-relaxed px-4">
          Configure os parâmetros da sua encomenda abaixo para obter uma estimativa de preço instantânea.
        </p>
      </section>

      {/* 2. CORPO PRINCIPAL */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
        
        {/* COLUNA ESQUERDA: LISTA DE OBRAS CONFIGURÁVEIS (8 colunas) */}
        <div className="lg:col-span-8 space-y-8 md:space-y-10">
          
          {pieces.map((piece, index) => {
            const pieceSubtotal = calculatePiecePrice(piece);

            return (
              <div 
                key={piece.id}
                className="border border-red-950/70 bg-[#08080a] p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8 relative rounded-sm shadow-xl"
              >
                {/* Cabeçalho da Obra com Botão de Excluir */}
                <div className="flex items-center justify-between border-b border-red-950/60 pb-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <span className="text-red-600 font-gothic text-base sm:text-lg">♰</span>
                    <h2 className="font-gothic text-lg sm:text-xl text-neutral-100 tracking-wider">
                      Obra #{index + 1}
                    </h2>
                  </div>

                  <div className="flex items-center gap-3 sm:gap-4">
                    <span className="font-gothic text-base sm:text-lg text-red-400">
                      ${pieceSubtotal}
                    </span>
                    {pieces.length > 1 && (
                      <button
                        onClick={() => removePiece(piece.id)}
                        className="text-neutral-500 hover:text-red-500 p-1.5 transition-colors"
                        title="Remover esta obra"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                </div>

                {/* PASSO 1: TIPO DE ARTE */}
                <div className="space-y-2.5">
                  <label className="font-serif-gothic text-xs uppercase tracking-widest text-neutral-400 font-semibold block">
                    1. Formato da Ilustração
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
                    {baseArtTypes.map((type) => {
                      const isSelected = piece.typeId === type.id;
                      return (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => updatePiece(piece.id, 'typeId', type.id)}
                          className={`p-3.5 sm:p-4 text-left border rounded-xs transition-all flex sm:flex-col justify-between items-center sm:items-start space-y-0 sm:space-y-2 ${
                            isSelected
                              ? 'bg-red-950/50 border-red-600 text-red-100 shadow-[0_0_15px_rgba(220,38,38,0.2)]'
                              : 'bg-black/40 border-neutral-900 text-neutral-400 hover:border-red-950 hover:text-neutral-200'
                          }`}
                        >
                          <div className="flex justify-between items-center sm:items-start w-full">
                            <span className="font-gothic text-xs sm:text-sm font-semibold tracking-wider">
                              {type.name}
                            </span>
                            {isSelected && <span className="text-red-500 text-xs hidden sm:inline">✦</span>}
                          </div>
                          <span className="font-serif-gothic text-xs text-red-400 font-medium">
                            Base: ${type.basePrice}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* PASSO 2: ACABAMENTO E FUNDO */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  
                  {/* Acabamento */}
                  <div className="space-y-2">
                    <label className="font-serif-gothic text-xs uppercase tracking-widest text-neutral-400 font-semibold block">
                      2. Estilo de Acabamento
                    </label>
                    <div className="relative">
                      <select
                        value={piece.renderId}
                        onChange={(e) => updatePiece(piece.id, 'renderId', e.target.value)}
                        className="w-full appearance-none bg-[#050507] border border-red-950/80 text-neutral-200 p-2.5 sm:p-3 pl-3.5 pr-10 font-serif-gothic text-xs uppercase tracking-wider focus:outline-none focus:border-red-600 cursor-pointer rounded-xs"
                      >
                        {renderOptions.map((r) => (
                          <option key={r.id} value={r.id}>
                            {r.name}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-red-700 pointer-events-none" />
                    </div>
                  </div>

                  {/* Fundo */}
                  <div className="space-y-2">
                    <label className="font-serif-gothic text-xs uppercase tracking-widest text-neutral-400 font-semibold block">
                      3. Cenário / Fundo
                    </label>
                    <div className="relative">
                      <select
                        value={piece.backgroundId}
                        onChange={(e) => updatePiece(piece.id, 'backgroundId', e.target.value)}
                        className="w-full appearance-none bg-[#050507] border border-red-950/80 text-neutral-200 p-2.5 sm:p-3 pl-3.5 pr-10 font-serif-gothic text-xs uppercase tracking-wider focus:outline-none focus:border-red-600 cursor-pointer rounded-xs"
                      >
                        {backgroundOptions.map((bg) => (
                          <option key={bg.id} value={bg.id}>
                            {bg.name} {bg.price > 0 ? `(+$${bg.price})` : '(Grátis)'}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-red-700 pointer-events-none" />
                    </div>
                  </div>

                </div>

                {/* PASSO 3: TAGS DE ADICIONAIS */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="font-serif-gothic text-xs uppercase tracking-widest text-neutral-400 font-semibold block">
                      4. Modificadores & Adicionais
                    </label>
                    <span className="hidden sm:block text-[10px] text-neutral-600 font-serif-gothic uppercase tracking-wider">
                      Passe o cursor para ver detalhes
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                    {addonOptions.map((addon) => {
                      const isChecked = piece.selectedAddons.includes(addon.id);

                      return (
                        <div key={addon.id} className="relative group">
                          <button
                            type="button"
                            onClick={() => toggleAddon(piece.id, addon.id)}
                            className={`w-full p-3 sm:p-3.5 border rounded-xs transition-all flex items-center justify-between text-left ${
                              isChecked
                                ? 'bg-red-950/60 border-red-600 text-red-100 shadow-[0_0_10px_rgba(220,38,38,0.2)]'
                                : 'bg-[#050507] border-neutral-900 text-neutral-400 hover:border-red-950 hover:text-neutral-300'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <div
                                className={`w-3.5 h-3.5 border flex items-center justify-center rounded-xs ${
                                  isChecked
                                    ? 'border-red-500 bg-red-900 text-red-300'
                                    : 'border-neutral-800'
                                }`}
                              >
                                {isChecked && <span className="text-[9px]">✦</span>}
                              </div>
                              <span className="font-serif-gothic text-xs tracking-wider">
                                {addon.name}
                              </span>
                            </div>

                            <span className="font-serif-gothic text-[11px] font-bold px-2 py-0.5 bg-black/60 border border-red-950 text-red-400 rounded-xs">
                              {addon.badge}
                            </span>
                          </button>

                          {/* TOOLTIP NO HOVER */}
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-2.5 bg-[#0e0a0d] border border-red-900/80 text-neutral-300 text-[11px] font-serif-gothic rounded-xs opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-30 shadow-2xl shadow-black text-center leading-relaxed">
                            <p className="text-red-400 font-bold mb-1 uppercase tracking-wider">
                              {addon.name} ({addon.badge})
                            </p>
                            <p className="text-neutral-400">{addon.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            );
          })}

          {/* BOTÃO PARA ADICIONAR MAIS UMA COMISSÃO */}
          <button
            onClick={addPiece}
            className="w-full py-3.5 sm:py-4 border-2 border-dashed border-red-950/80 hover:border-red-800 bg-[#060608] hover:bg-red-950/20 text-neutral-400 hover:text-red-300 transition-all flex items-center justify-center gap-3 font-serif-gothic text-xs uppercase tracking-widest rounded-sm group cursor-pointer"
          >
            <Plus size={16} className="text-red-600 group-hover:scale-125 transition-transform" />
            <span>Adicionar Outra Ilustração ao Pedido</span>
          </button>

        </div>

        {/* COLUNA DIREITA: ALTAR DE RESUMO (4 colunas) */}
        <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
          
          <div className="border border-red-900/50 bg-gradient-to-b from-[#0e0a0d] to-[#060608] p-5 sm:p-7 space-y-6 rounded-sm shadow-2xl relative">
            <div className="space-y-1 text-center border-b border-red-950/60 pb-3 sm:pb-4">
              <span className="text-red-600 text-sm">♰</span>
              <h3 className="font-gothic text-xl sm:text-2xl text-neutral-100 tracking-wider">
                Total Estimado
              </h3>
            </div>

            {/* Resumo discriminado de cada obra */}
            <div className="space-y-2.5 font-serif-gothic text-xs divide-y divide-red-950/40">
              {pieces.map((piece, idx) => {
                const baseType = baseArtTypes.find((t) => t.id === piece.typeId);
                const sub = calculatePiecePrice(piece);

                return (
                  <div key={piece.id} className="pt-2 first:pt-0 flex justify-between items-center text-neutral-300">
                    <div>
                      <p className="font-semibold text-neutral-200">
                        Obra #{idx + 1} ({baseType?.name})
                      </p>
                      <p className="text-[10px] text-neutral-500">
                        {piece.selectedAddons.length} adicional(is)
                      </p>
                    </div>
                    <span className="font-gothic text-sm sm:text-base text-red-400 font-bold">
                      ${sub}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* SEÇÃO DO CUPOM DE DESCONTO */}
            <div className="pt-2 border-t border-red-950/60 space-y-2.5">
              <label className="font-serif-gothic text-[11px] uppercase tracking-wider text-neutral-400 font-semibold flex items-center gap-1.5">
                <Tag size={13} className="text-red-500" />
                <span>Cupom promocional</span>
              </label>

              {!appliedPromo ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    className="flex-1 bg-[#050507] border border-red-950/80 text-neutral-200 p-2 sm:p-2.5 font-mono text-xs uppercase tracking-widest focus:outline-none focus:border-red-600 rounded-xs placeholder-neutral-600"
                  />
                  <button
                    onClick={handleApplyPromo}
                    className="px-3.5 py-2 bg-red-950/80 border border-red-800 hover:border-red-500 text-red-200 text-xs font-serif-gothic uppercase tracking-wider rounded-xs transition-colors cursor-pointer"
                  >
                    Aplicar
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between p-2.5 bg-red-950/40 border border-red-800/80 rounded-xs">
                  <div className="flex items-center gap-2">
                    <Sparkles size={14} className="text-red-400" />
                    <span className="font-mono text-xs font-bold text-red-200 tracking-wider">
                      {appliedPromo.code} (-{appliedPromo.discountPercentage}%)
                    </span>
                  </div>
                  <button
                    onClick={handleRemovePromo}
                    className="text-neutral-400 hover:text-red-400 transition-colors"
                    title="Remover cupom"
                  >
                    <XCircle size={16} />
                  </button>
                </div>
              )}

              {promoError && (
                <p className="text-[10px] font-serif-gothic text-red-500 tracking-wider">
                  {promoError}
                </p>
              )}
            </div>

            {/* TOTAL GERAL COM DESCONTO */}
            <div className="border-t border-red-950/80 pt-4 space-y-1.5">
              {appliedPromo && (
                <div className="flex justify-between text-xs font-serif-gothic text-neutral-400">
                  <span>Subtotal:</span>
                  <span>${subtotalBeforeDiscount}</span>
                </div>
              )}
              {appliedPromo && (
                <div className="flex justify-between text-xs font-serif-gothic text-red-400 font-semibold">
                  <span>Desconto ({appliedPromo.discountPercentage}%):</span>
                  <span>-${discountAmount}</span>
                </div>
              )}

              <div className="flex items-baseline justify-between pt-1">
                <span className="font-serif-gothic text-xs uppercase tracking-widest text-neutral-400">
                  Valor Final:
                </span>
                <span className="font-gothic text-4xl sm:text-5xl font-bold text-red-500 drop-shadow-[0_0_20px_rgba(220,38,38,0.4)]">
                  ${grandTotal}
                </span>
              </div>
            </div>

            {/* Botão Copiar Pedido Formatado */}
            <button
              onClick={copyOrderSummary}
              className="w-full py-3.5 bg-red-950 border border-red-800 hover:border-red-500 text-red-100 hover:bg-red-900 transition-all font-serif-gothic uppercase tracking-widest text-xs flex items-center justify-center gap-2 rounded-xs shadow-lg cursor-pointer"
            >
              {copiedSummary ? (
                <>
                  <CheckCheck size={16} className="text-green-400" />
                  <span className="text-green-300 font-bold">Resumo Copiado!</span>
                </>
              ) : (
                <>
                  <Copy size={16} className="text-red-400" />
                  <span>Copiar Pedido Formatado</span>
                </>
              )}
            </button>

            {/* Link para envio de mensagem */}
            <Link
              href="/info"
              className="block text-center text-xs uppercase tracking-wider text-neutral-500 hover:text-red-400 transition-colors font-serif-gothic"
            >
              Ir para Contato & Diretrizes ➔
            </Link>

            {/* Aviso de Estimativa */}
            <div className="pt-2 border-t border-red-950/40 text-[10px] font-serif-gothic text-neutral-500 text-center leading-relaxed">
              *Este valor é uma estimativa. Designs com complexidade extrema podem sofrer pequenas variações após análise prévia.
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}