export interface User {
  id: string;
  email: string;
  username: string;
  avatar?: string;
  isAdmin?: boolean;
  createdAt: Date;
}

export interface Prize {
  id: string;
  name: string;
  description: string;
  image?: string;
  rarity?: 'common' | 'rare' | 'epic' | 'legendary';
  probability?: number;
  position?: number;
}

export interface GachaPrize {
  id: string;
  name: string;
  description: string;
  image?: string;
  ballColor: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  emotionLevel: number; // 1-5
  probability: number; // Percentage chance of getting this prize
}

export interface RaritySettings {
  common: number;
  rare: number;
  epic: number;
  legendary: number;
}

export interface Raffle {
  id: string;
  title: string;
  description: string;
  image?: string;
  creatorId: string;
  creator: User;
  mode: 'raffle' | 'gacha';
  theme: 'summer' | 'autumn' | 'spring' | 'winter' | 'fantasy' | 'pixel' | 'minimal';
  visualStyle: 'pixel' | 'minimal';
  maxNumbers: number;
  pricePerNumber: number;
  currency: 'CLP' | 'USD' | 'BTC' | 'USDT' | 'ETH' | 'BNB';
  prizes: Prize[];
  drawDate: Date;
  isAutomatic: boolean;
  isAnonymous: boolean;
  isActive: boolean;
  soldNumbers: number[];
  maxAttempts?: number; // For gacha mode
  featured?: boolean; // Admin featured flag
  priority?: 'high' | 'medium' | 'low'; // Admin priority level
  buffExtra?: boolean; // New buff extra feature
  createdAt: Date;
}

export interface GachaData {
  id: string;
  title: string;
  description: string;
  pricePerPlay: number;
  currency: string;
  maxAttemptsPerPerson: number;
  prizes: GachaPrize[];
  raritySettings: RaritySettings; // Custom probability settings for each rarity
  showAnimation: boolean;
  showPrizeList: boolean;
  showPublicResults: boolean;
  featured?: boolean;
  verified?: boolean;
  createdAt: Date;
}

export interface Purchase {
  id: string;
  raffleId: string;
  buyerId: string;
  buyer: User;
  numbers: number[];
  amount: number;
  currency: string;
  isAnonymous: boolean;
  buffExtra?: boolean; // If user paid for buff extra
  createdAt: Date;
}

export interface GachaResult {
  id: string;
  gachaId: string;
  buyerId: string;
  prizeId: string;
  prize: GachaPrize;
  attempt: number;
  createdAt: Date;
}

export interface AdminSettings {
  featuredRaffles: string[]; // Array of raffle IDs
  featuredGachas: string[]; // Array of gacha IDs
  priorityLevels: {
    [raffleId: string]: 'high' | 'medium' | 'low';
  };
}

export interface PricingSuggestion {
  min: number;
  recommended: number;
  max: number;
  description: string;
}

export interface PricingSuggestions {
  common: PricingSuggestion;
  rare: PricingSuggestion;
  epic: PricingSuggestion;
  legendary: PricingSuggestion;
}