export interface PromoCode {
  code: string;
  discountPercentage: number; 
  description: string;
}

export interface ActivePromotion {
  isActive: boolean;
  title: string;
  badge: string;
  description: string;
  promoCode: string; 
  discountPercentage: number;
}

// 1. Promoção Atual (Controla o Popup da Página Inicial)
export const currentPromotion: ActivePromotion = {
  isActive: false, // Mude para false quando não houver promoção ativa!
  title: 'Halloween · Oferta Especial',
  badge: '15% OFF',
  description: 'Todas as encomendas estão com 15% de desconto durante o periodo de 1 de setembro a 31 de outubro!',
  promoCode: 'HALLOY15',
  discountPercentage: 15,
};

// 2. Lista de Todos os Cupons Válidos Aceitos na Calculadora
export const validPromoCodes: PromoCode[] = [
  // {
  //   code: 'HALLOY15',
  //   discountPercentage: 15,
  //   description: '15% de Desconto',
  // },
];