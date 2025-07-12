import React, { useState, useEffect } from 'react';
import { Gamepad2, Star, Coins, Users, Sparkles, Crown, Zap } from 'lucide-react';

interface FeaturedGachasProps {
  onNavigate: (view: string, gachaId?: string) => void;
}

interface GachaPrize {
  id: string;
  name: string;
  description: string;
  image?: string;
  ballColor: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  emotionLevel: number;
}

interface FeaturedGacha {
  id: string;
  title: string;
  description: string;
  creator: string;
  pricePerPlay: number;
  currency: string;
  maxAttemptsPerPerson: number;
  prizes: GachaPrize[];
  totalPlays: number;
  featured: boolean;
  priority: 'high' | 'medium' | 'low';
}

// Mock data for featured gachas with admin priority
const mockFeaturedGachas: FeaturedGacha[] = [
  {
    id: '1',
    title: 'Gacha Kawaii Peluches',
    description: 'Adorables peluches de animales con diferentes rarezas y colores únicos',
    creator: 'KawaiiStore',
    pricePerPlay: 2000,
    currency: 'CLP',
    maxAttemptsPerPerson: 15,
    prizes: [
      { id: '1', name: 'Gatito Rosa', description: 'Súper suave', ballColor: '#ff6b9d', rarity: 'legendary', emotionLevel: 5 },
      { id: '2', name: 'Osito Azul', description: 'Muy tierno', ballColor: '#54a0ff', rarity: 'epic', emotionLevel: 4 },
      { id: '3', name: 'Conejito Blanco', description: 'Esponjoso', ballColor: '#ecf0f1', rarity: 'rare', emotionLevel: 3 },
      { id: '4', name: 'Perrito Café', description: 'Leal compañero', ballColor: '#8b4513', rarity: 'common', emotionLevel: 3 }
    ],
    totalPlays: 1247,
    featured: true,
    priority: 'high'
  },
  {
    id: '2',
    title: 'Accesorios Gamer RGB',
    description: 'Mousepads, keycaps y stickers con efectos RGB y diseños únicos',
    creator: 'GamerHub',
    pricePerPlay: 1500,
    currency: 'CLP',
    maxAttemptsPerPerson: 10,
    prizes: [
      { id: '1', name: 'Mousepad RGB Dragon', description: 'Con luces LED', ballColor: '#9400d3', rarity: 'legendary', emotionLevel: 5 },
      { id: '2', name: 'Keycaps Holográficos', description: 'Brillan en la oscuridad', ballColor: '#00ffff', rarity: 'epic', emotionLevel: 4 },
      { id: '3', name: 'Sticker Pack Anime', description: '20 stickers únicos', ballColor: '#ff00ff', rarity: 'rare', emotionLevel: 3 },
      { id: '4', name: 'Cable USB Neon', description: 'Cable colorido', ballColor: '#00ff00', rarity: 'common', emotionLevel: 2 }
    ],
    totalPlays: 892,
    featured: true,
    priority: 'high'
  },
  {
    id: '3',
    title: 'Ilustraciones Digitales',
    description: 'Arte digital personalizado y prints exclusivos de artistas independientes',
    creator: 'ArtistsCollective',
    pricePerPlay: 3000,
    currency: 'CLP',
    maxAttemptsPerPerson: 8,
    prizes: [
      { id: '1', name: 'Comisión Personalizada', description: 'Arte único para ti', ballColor: '#ffd700', rarity: 'legendary', emotionLevel: 5 },
      { id: '2', name: 'Print Firmado A3', description: 'Edición limitada', ballColor: '#ff4500', rarity: 'epic', emotionLevel: 4 },
      { id: '3', name: 'Sticker Holográfico', description: 'Diseño exclusivo', ballColor: '#ff1493', rarity: 'rare', emotionLevel: 3 },
      { id: '4', name: 'Wallpaper HD', description: 'Para tu dispositivo', ballColor: '#00bfff', rarity: 'common', emotionLevel: 2 }
    ],
    totalPlays: 634,
    featured: true,
    priority: 'medium'
  },
  {
    id: '4',
    title: 'Snacks Internacionales',
    description: 'Dulces y snacks únicos de diferentes países del mundo',
    creator: 'WorldSnacks',
    pricePerPlay: 1000,
    currency: 'CLP',
    maxAttemptsPerPerson: 20,
    prizes: [
      { id: '1', name: 'Kit Snacks Japoneses', description: 'Sabores únicos', ballColor: '#ff6348', rarity: 'legendary', emotionLevel: 5 },
      { id: '2', name: 'Chocolates Suizos', description: 'Premium quality', ballColor: '#8b4513', rarity: 'epic', emotionLevel: 4 },
      { id: '3', name: 'Gomas Coreanas', description: 'Súper masticables', ballColor: '#ff69b4', rarity: 'rare', emotionLevel: 3 },
      { id: '4', name: 'Chicles Americanos', description: 'Sabor clásico', ballColor: '#00ff00', rarity: 'common', emotionLevel: 2 }
    ],
    totalPlays: 1456,
    featured: true,
    priority: 'medium'
  }
];

export const FeaturedGachas: React.FC<FeaturedGachasProps> = ({ onNavigate }) => {
  const [featuredGachas, setFeaturedGachas] = useState<FeaturedGacha[]>([]);

  useEffect(() => {
    // Sort by priority and limit to top 4
    const sortedGachas = mockFeaturedGachas
      .sort((a, b) => {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      })
      .slice(0, 4);
    
    setFeaturedGachas(sortedGachas);
  }, []);

  const rarityColors = {
    common: 'from-gray-400 to-gray-500',
    rare: 'from-blue-400 to-blue-500',
    epic: 'from-purple-400 to-purple-500',
    legendary: 'from-yellow-400 to-orange-500'
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <Crown className="h-4 w-4 text-yellow-500" />;
      case 'medium': return <Star className="h-4 w-4 text-blue-500" />;
      default: return <Zap className="h-4 w-4 text-purple-500" />;
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high': return 'Premium';
      case 'medium': return 'Destacado';
      default: return 'Popular';
    }
  };

  const getTopPrizes = (prizes: GachaPrize[]) => {
    return prizes
      .sort((a, b) => {
        const rarityOrder = { legendary: 4, epic: 3, rare: 2, common: 1 };
        return rarityOrder[b.rarity] - rarityOrder[a.rarity] || b.emotionLevel - a.emotionLevel;
      })
      .slice(0, 3);
  };

  if (featuredGachas.length === 0) {
    return null;
  }

  return (
    <div className="py-16 bg-gradient-to-br from-indigo-100/50 via-purple-100/50 to-pink-100/50 dark:from-indigo-900/10 dark:via-purple-900/10 dark:to-pink-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-full">
              <Gamepad2 className="h-5 w-5" />
              <span className="font-semibold">Gachas Destacadas</span>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Las Mejores Máquinas Gacha del Momento
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Descubre experiencias gacha únicas seleccionadas por nuestros administradores
          </p>
        </div>

        {/* Featured Gachas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {featuredGachas.map((gacha) => (
            <div
              key={gacha.id}
              className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer border border-indigo-100 dark:border-indigo-800"
              onClick={() => onNavigate('gacha', gacha.id)}
            >
              {/* Gacha Machine Preview */}
              <div className="relative h-48 bg-gradient-to-b from-red-400 to-red-600 p-4">
                <div className="w-full h-full bg-gradient-to-b from-red-300 to-red-500 rounded-xl relative">
                  {/* Glass Window */}
                  <div className="absolute top-2 left-2 right-2 h-24 bg-gradient-to-b from-blue-100 to-blue-200 dark:from-blue-900/50 dark:to-blue-800/50 rounded-lg border-2 border-gray-300 dark:border-gray-600 overflow-hidden">
                    {/* Preview Balls */}
                    <div className="grid grid-cols-8 gap-0.5 p-1">
                      {getTopPrizes(gacha.prizes).map((prize, index) => (
                        <div
                          key={index}
                          className="w-3 h-3 rounded-full shadow-sm gacha-ball"
                          style={{ backgroundColor: prize.ballColor }}
                        />
                      ))}
                      {Array.from({ length: Math.max(0, 24 - getTopPrizes(gacha.prizes).length) }).map((_, index) => (
                        <div
                          key={`empty-${index}`}
                          className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600 gacha-ball"
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* Machine Details */}
                  <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center">
                    <div className="w-8 h-2 bg-gray-800 dark:bg-gray-900 rounded-full"></div>
                    <div className="w-4 h-8 bg-gray-600 dark:bg-gray-700 rounded-full"></div>
                  </div>
                </div>
                
                {/* Priority Badge */}
                <div className="absolute top-3 left-3">
                  <div className="flex items-center space-x-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-2 py-1 rounded-full">
                    {getPriorityIcon(gacha.priority)}
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                      {getPriorityLabel(gacha.priority)}
                    </span>
                  </div>
                </div>

                {/* Featured Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">
                  {gacha.title}
                </h3>
                
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                  {gacha.description}
                </p>

                <div className="text-xs text-indigo-600 dark:text-indigo-400 mb-3 font-medium">
                  Por {gacha.creator}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                  <div className="flex items-center space-x-1">
                    <Coins className="h-3 w-3 text-yellow-600 dark:text-yellow-400" />
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      ${gacha.pricePerPlay.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      {gacha.totalPlays} jugadas
                    </span>
                  </div>
                </div>

                {/* Top Prizes Preview */}
                <div className="mb-3">
                  <div className="flex space-x-1">
                    {getTopPrizes(gacha.prizes).map((prize, index) => (
                      <div key={index} className="flex items-center space-x-1">
                        <div
                          className="w-3 h-3 rounded-full shadow-sm"
                          style={{ backgroundColor: prize.ballColor }}
                        />
                        <span className={`px-1 py-0.5 rounded text-xs text-white bg-gradient-to-r ${rarityColors[prize.rarity]}`}>
                          {prize.rarity === 'legendary' ? '⭐' : prize.rarity === 'epic' ? '💜' : prize.rarity === 'rare' ? '💙' : '⚪'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 rounded-lg font-medium text-sm hover:shadow-lg transition-all duration-300 transform group-hover:scale-105">
                  ¡Jugar Gacha!
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <button
            onClick={() => onNavigate('gachas')}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2 mx-auto"
          >
            <Gamepad2 className="h-6 w-6" />
            <span>Ver Todas las Gachas</span>
          </button>
        </div>
      </div>
    </div>
  );
};