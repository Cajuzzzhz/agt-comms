export type ArtCategory = 'icon' | 'bust' | 'halfbody' | 'fullbody' | 'chibi' | 'scenery';
export type RenderStyle = 'sketch' | 'lineart' | 'flat_color' | 'full_render';
export type ContentRating = 'sfw' | 'nsfw';

export interface GalleryItem {
  id: string;
  title: string;
  imageSrc: string;
  category: ArtCategory;
  renderStyle: RenderStyle;
  rating: ContentRating;
  tags?: string[]; // tags extras opcionais: ['fanart', 'original', 'mecha', 'furry']
  date?: string;
}

export interface CommissionTier {
  id: ArtCategory;
  title: string;
  startingPrice: number;
  description: string;
  examples: [string, string, string]; // Exatamente 3 imagens para o baralho
}