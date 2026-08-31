export interface PromoCode {
  code: string;
  discountPercentage: number; // Porcentagem (ex: 15 = 15% OFF)
  description: string;
}

export interface ActivePromotion {
  isActive: boolean; // Se for FALSE, o popup da Home NÃO aparece!
  title: string;
  badge: string;
  description: string;
  promoCode: string; // Código exibido no popup
  discountPercentage: number;
}

// 1. Promoção Atual (Controla o Popup da Página Inicial)
export const currentPromotion: ActivePromotion = {
  isActive: true, // Mude para false quando não houver promoção ativa!
  title: 'Lua de Sangue · Oferta Especial',
  badge: '15% OFF',
  description: 'Todas as encomendas estão com 15% de desconto usando o cupom na nossa calculadora de preços!',
  promoCode: 'SANGUE15',
  discountPercentage: 15,
};

// 2. Lista de Todos os Cupons Válidos Aceitos na Calculadora
export const validPromoCodes: PromoCode[] = [
  {
    code: 'SANGUE15',
    discountPercentage: 15,
    description: '15% de Desconto de Inauguração',
  },
];