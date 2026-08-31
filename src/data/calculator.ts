export interface BaseArtType {
  id: string;
  name: string;
  basePrice: number;
  description: string;
}

export interface RenderOption {
  id: string;
  name: string;
  multiplier: number; // 0.6 = 60% do valor base, 1.0 = valor normal
  description: string;
}

export interface BackgroundOption {
  id: string;
  name: string;
  price: number;
  description: string;
}

export interface AddonOption {
  id: string;
  name: string;
  description: string;
  type: 'fixed' | 'percentage';
  value: number; // Valor fixo em $ ou decimal (0.5 = +50%)
  badge: string; // Como aparece visualmente (ex: "+$15" ou "+50%")
}

// 1. Tipos Base
export const baseArtTypes: BaseArtType[] = [
  {
    id: 'icon',
    name: 'Ícone / Headshot',
    basePrice: 35,
    description: 'Focado na cabeça e expressões faciais. Ideal para avatares.',
  },
  {
    id: 'halfbody',
    name: 'Meio Corpo / Torso',
    basePrice: 65,
    description: 'Do quadril para cima com detalhes de vestimenta e pose.',
  },
  {
    id: 'fullbody',
    name: 'Corpo Inteiro',
    basePrice: 110,
    description: 'Personagem completo da cabeça aos pés em pose personalizada.',
  },
];

// 2. Níveis de Acabamento (Multiplicadores)
export const renderOptions: RenderOption[] = [
  {
    id: 'full_render',
    name: 'Render Completo (Padrão)',
    multiplier: 1.0,
    description: 'Pintura completa com luz, sombra volumétrica e texturas.',
  },
  {
    id: 'flat_color',
    name: 'Cores Base / Cel Shading',
    multiplier: 0.8,
    description: 'Lineart limpa com cores sólidas e sombreamento simples (-20%).',
  },
  {
    id: 'sketch',
    name: 'Rascunho / Sketch',
    multiplier: 0.6,
    description: 'Esboço expressivo monocromático ou com cor básica (-40%).',
  },
];

// 3. Tipos de Fundo
export const backgroundOptions: BackgroundOption[] = [
  {
    id: 'none',
    name: 'Transparente / Simples',
    price: 0,
    description: 'Fundo transparente (PNG) ou cor sólida/gradiente simples.',
  },
  {
    id: 'abstract',
    name: 'Elementos Gráficos / Abstrato',
    price: 15,
    description: 'Símbolos, névoa, manchas de sangue e efeitos.',
  },
  {
    id: 'complex',
    name: 'Cenário Completo Detalhado',
    price: 45,
    description: 'Ambiente completo desenhado (quarto, floresta, trono, arquitetura).',
  },
];

// 4. Adicionais e Modificadores
export const addonOptions: AddonOption[] = [
  {
    id: 'nsfw',
    name: 'Conteúdo NSFW / Sensual',
    description: 'Nudez explícita.',
    type: 'percentage',
    value: 0.25, // +25%
    badge: '+25%',
  },
  {
    id: 'gore',
    name: 'Gore / Sangue Intenso',
    description: 'Ferimentos detalhados, órgãos, mutações ou horror corporal.',
    type: 'fixed',
    value: 15,
    badge: '+$15',
  },
  {
    id: 'extra_char',
    name: 'Personagem Adicional',
    description: 'Adiciona um segundo personagem interagindo na mesma ilustração.',
    type: 'percentage',
    value: 0.30, // +30% do valor base
    badge: '+30%',
  },
  {
    id: 'details',
    name: 'Detalhes Complexos',
    description: 'Mechas leves, asas articuladas, armas ornamentadas ou armaduras intrincadas.',
    type: 'fixed',
    value: 20,
    badge: '+$20',
  },
  {
    id: 'commercial',
    name: 'Direitos de Uso Comercial',
    description: 'Permissão para usar a arte em capas de música, jogos, produtos e marketing.',
    type: 'percentage',
    value: 0.50, // +50%
    badge: '+50%',
  },
];