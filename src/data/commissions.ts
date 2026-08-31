import { CommissionTier } from '@/types';

export const commissionTiers: CommissionTier[] = [
  {
    id: 'icon',
    title: 'Ícone / Headshot',
    startingPrice: 35,
    description: 'Focado no rosto. Ideal para avatares de redes sociais.',
    examples: [
      '/images/commissions/icon_1.png',
      '/images/commissions/icon_2.png',
      '/images/commissions/icon_3.png',
    ],
  },
  {
    id: 'halfbody',
    title: 'Meio Corpo / Torso',
    startingPrice: 65,
    description: 'Do quadril para cima.',
    examples: [
      '/images/commissions/halfbody_1.png',
      '/images/commissions/halfbody_2.png',
      '/images/commissions/halfbody_3.png',
    ],
  },
  {
    id: 'fullbody',
    title: 'Corpo Inteiro',
    startingPrice: 110,
    description: 'Design completo do personagem da cabeça aos pés, com pose personalizada.',
    examples: [
      '/images/commissions/fullbody_1.png',
      '/images/commissions/fullbody_2.png',
      '/images/commissions/fullbody_3.png',
    ],
  },
];