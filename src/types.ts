export interface CarouselItem {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  tagline: string;
}

export interface CatBreed {
  id: string;
  name: string;
  engName: string;
  origin: string;
  character: string;
  physical: string;
  lifeSpan: string;
  priceRange?: string; // 价格参考
  image: string;
  description: string;
  tags: string[];
  ratings: {
    affection: number; // 粘人程度
    energy: number; // 活泼程度
    grooming: number; // 梳理难度
    intelligence: number; // 智商水平
  };
}

export interface GalleryImage {
  id: string;
  url: string;
  title: string;
  breed: string;
  category: 'all' | 'cute' | 'funny' | 'sleeping' | 'kitten';
  description: string;
  likes: number;
  saves: number;
}

export interface CareTip {
  id: string;
  category: 'diet' | 'health' | 'behavior' | 'daily';
  title: string;
  summary: string;
  content: string[];
  author: string;
  readTime: string;
  views: number;
}

export interface UserComment {
  id: string;
  username: string;
  avatar: string;
  content: string;
  time: string;
  likes: number;
}
