import { GalleryItem } from '@/types';

export const galleryItems: GalleryItem[] = [
  {
    id: 'art-01',
    title: 'Torso Obscuro',
    imageSrc: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/258.png',
    category: 'halfbody',
    renderStyle: 'full_render',
    rating: 'sfw',
    tags: ['original', 'armadura']
  },
  {
    id: 'art-02',
    title: 'Rascunho Ícone',
    imageSrc: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png',
    category: 'icon',
    renderStyle: 'sketch',
    rating: 'sfw',
    tags: ['fanart', 'fogo']
  },
  {
    id: 'art-03',
    title: 'Corpo Inteiro (Restrito)',
    imageSrc: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/094.png',
    category: 'fullbody',
    renderStyle: 'full_render',
    rating: 'nsfw', 
    tags: ['monstro', 'sangue', 'sombrio', 'armadura']
  },
  {
    id: 'art-04',
    title: 'Lineart Torso',
    imageSrc: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/104.png',
    category: 'halfbody',
    renderStyle: 'lineart',
    rating: 'sfw',
    tags: ['original', 'ossos']
  },
];