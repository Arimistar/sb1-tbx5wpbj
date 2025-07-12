import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, Users, Eye, Sparkles } from 'lucide-react';

interface RaffleGalleryProps {
  onNavigate: (view: string, raffleId?: string) => void;
}

interface RaffleData {
  id: string;
  title: string;
  description: string;
  prizeImages: string[];
  maxParticipants: number;
  theme: string;
  drawDate: string;
  showNames: boolean;
  autoRaffle: boolean;
  createdAt: Date;
}

export const RaffleGallery: React.FC<RaffleGalleryProps> = ({ onNavigate }) => {
  const [raffles, setRaffles] = useState<RaffleData[]>([]);

  useEffect(() => {
    const savedRaffles = JSON.parse(localStorage.getItem('raffles') || '[]');
    setRaffles(savedRaffles);
  }, []);

  const getThemeColors = (theme: string) => {
    switch (theme) {
      case 'primavera': return 'from-pink-400 to-rose-400';
      case 'verano': return 'from-yellow-400 to-orange-400';
      case 'otoño': return 'from-orange-400 to-red-400';
      case 'invierno': return 'from-blue-400 to-indigo-400';
      default: return 'from-purple-400 to-pink-400';
    }
  };

  const getThemeEmoji = (theme: string) => {
    switch (theme) {
      case 'primavera': return '🌸';
      case 'verano': return '☀️';
      case 'otoño': return '🍂';
      case 'invierno': return '❄️';
      default: return '✨';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-indigo-900/20 transition-colors duration-300">
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
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Galería de rifas</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Descubre todas las rifas disponibles</p>
          </div>
        </div>

        {raffles.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles className="h-12 w-12 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">¡Aún no hay rifas!</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
              Sé el primero en crear una rifa y comenzar a ganar dinero con tus premios.
            </p>
            <button
              onClick={() => onNavigate('create')}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105"
            >
              Crear primera rifa
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {raffles.map((raffle) => (
              <div
                key={raffle.id}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
                onClick={() => onNavigate('raffle', raffle.id)}
              >
                {raffle.prizeImages.length > 0 && (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={raffle.prizeImages[0]}
                      alt={raffle.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium text-white bg-gradient-to-r ${getThemeColors(raffle.theme)}`}>
                        {getThemeEmoji(raffle.theme)} {raffle.theme}
                      </span>
                    </div>
                    {raffle.prizeImages.length > 1 && (
                      <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded-lg text-sm">
                        +{raffle.prizeImages.length - 1} más
                      </div>
                    )}
                  </div>
                )}

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                    {raffle.title}
                  </h3>
                  
                  {raffle.description && (
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                      {raffle.description}
                    </p>
                  )}

                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      <span className="font-medium text-gray-700 dark:text-gray-300">{raffle.maxParticipants} números</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        {new Date(raffle.drawDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                      {raffle.showNames ? (
                        <Eye className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4 opacity-50" />
                      )}
                      <span>{raffle.showNames ? 'Nombres visibles' : 'Anónimo'}</span>
                    </div>
                    
                    {raffle.autoRaffle && (
                      <div className="flex items-center space-x-1 text-sm text-purple-600 dark:text-purple-400">
                        <Sparkles className="h-4 w-4" />
                        <span>Auto</span>
                      </div>
                    )}
                  </div>

                  <button className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300">
                    Ver rifa
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