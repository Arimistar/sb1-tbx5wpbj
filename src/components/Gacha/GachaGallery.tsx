import React, { useState, useEffect } from 'react';
import { ArrowLeft, Gamepad2, Star, Users, Coins, Filter } from 'lucide-react';

interface GachaGalleryProps {
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

interface GachaData {
  id: string;
  title: string;
  description: string;
  pricePerPlay: number;
  currency: string;
  maxAttemptsPerPerson: number;
  prizes: GachaPrize[];
  showAnimation: boolean;
  showPrizeList: boolean;
  showPublicResults: boolean;
  createdAt: Date;
}

export const GachaGallery: React.FC<GachaGalleryProps> = ({ onNavigate }) => {
  const [gachas, setGachas] = useState<GachaData[]>([]);
  const [filter, setFilter] = useState<'all' | 'recent' | 'popular' | 'verified' | 'featured'>('all');

  useEffect(() => {
    const savedGachas = JSON.parse(localStorage.getItem('gachas') || '[]');
    setGachas(savedGachas);
  }, []);

  const filteredGachas = gachas.filter(gacha => {
    switch (filter) {
      case 'recent':
        return new Date(gacha.createdAt).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000;
      case 'popular':
        return gacha.prizes.length >= 5;
      case 'verified':
        return gacha.showPrizeList;
      case 'featured':
        return gacha.showAnimation;
      default:
        return true;
    }
  });

  const getTopPrizes = (prizes: GachaPrize[]) => {
    return prizes
      .sort((a, b) => {
        const rarityOrder = { legendary: 4, epic: 3, rare: 2, common: 1 };
        return rarityOrder[b.rarity] - rarityOrder[a.rarity] || b.emotionLevel - a.emotionLevel;
      })
      .slice(0, 3);
  };

  const rarityColors = {
    common: 'from-gray-400 to-gray-500',
    rare: 'from-blue-400 to-blue-500',
    epic: 'from-purple-400 to-purple-500',
    legendary: 'from-yellow-400 to-orange-500'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-indigo-900/20 dark:to-purple-900/20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={() => onNavigate('home')}
            className="mr-4 p-2 rounded-xl hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors"
          >
            <ArrowLeft className="h-6 w-6 text-gray-600 dark:text-gray-400" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Galería de Gachas</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Descubre máquinas gacha increíbles</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={() => setFilter('all')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all ${
              filter === 'all'
                ? 'bg-indigo-600 text-white'
                : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20'
            }`}
          >
            <Filter className="h-4 w-4" />
            <span>Todas</span>
          </button>
          <button
            onClick={() => setFilter('recent')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all ${
              filter === 'recent'
                ? 'bg-green-600 text-white'
                : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/20'
            }`}
          >
            <span>🆕</span>
            <span>Recientes</span>
          </button>
          <button
            onClick={() => setFilter('popular')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all ${
              filter === 'popular'
                ? 'bg-orange-600 text-white'
                : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-orange-900/20'
            }`}
          >
            <span>🎁</span>
            <span>Más jugadas</span>
          </button>
          <button
            onClick={() => setFilter('verified')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all ${
              filter === 'verified'
                ? 'bg-blue-600 text-white'
                : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20'
            }`}
          >
            <span>🧊</span>
            <span>Verificadas</span>
          </button>
          <button
            onClick={() => setFilter('featured')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all ${
              filter === 'featured'
                ? 'bg-purple-600 text-white'
                : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20'
            }`}
          >
            <span>✨</span>
            <span>Destacadas</span>
          </button>
        </div>

        {filteredGachas.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <Gamepad2 className="h-12 w-12 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {filter === 'all' ? '¡Aún no hay gachas!' : 'No hay gachas en esta categoría'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
              {filter === 'all' 
                ? 'Sé el primero en crear una máquina gacha y comenzar a ganar dinero con tus premios.'
                : 'Prueba con otro filtro o crea tu propia máquina gacha.'
              }
            </p>
            <button
              onClick={() => onNavigate('create-gacha')}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
            >
              Crear primera gacha
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGachas.map((gacha) => (
              <div
                key={gacha.id}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
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
                            className="w-3 h-3 rounded-full shadow-sm"
                            style={{ backgroundColor: prize.ballColor }}
                          />
                        ))}
                        {Array.from({ length: Math.max(0, 24 - getTopPrizes(gacha.prizes).length) }).map((_, index) => (
                          <div
                            key={`empty-${index}`}
                            className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600"
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
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col space-y-2">
                    {gacha.showAnimation && (
                      <span className="px-2 py-1 bg-purple-500 text-white text-xs rounded-full">
                        ✨ Animado
                      </span>
                    )}
                    {gacha.showPrizeList && (
                      <span className="px-2 py-1 bg-blue-500 text-white text-xs rounded-full">
                        🧊 Verificado
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">
                    {gacha.title}
                  </h3>
                  
                  {gacha.description && (
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 text-sm">
                      {gacha.description}
                    </p>
                  )}

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <Coins className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        ${gacha.pricePerPlay.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        {gacha.maxAttemptsPerPerson} max
                      </span>
                    </div>
                  </div>

                  {/* Top Prizes Preview */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Premios destacados:</h4>
                    <div className="flex space-x-2">
                      {getTopPrizes(gacha.prizes).map((prize, index) => (
                        <div key={index} className="flex items-center space-x-1">
                          <div
                            className="w-4 h-4 rounded-full shadow-sm"
                            style={{ backgroundColor: prize.ballColor }}
                          />
                          <span className={`px-1.5 py-0.5 rounded text-xs text-white bg-gradient-to-r ${rarityColors[prize.rarity]}`}>
                            {prize.rarity}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Play Button */}
                  <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center space-x-2">
                    <Gamepad2 className="h-5 w-5" />
                    <span>¡Jugar Gacha!</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};