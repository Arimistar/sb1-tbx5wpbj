import React, { useState, useEffect } from 'react';
import { Calendar, Users, DollarSign, Sparkles, Star, Crown, Zap } from 'lucide-react';

interface FeaturedRafflesProps {
  onNavigate: (view: string, raffleId?: string) => void;
}

interface FeaturedRaffle {
  id: string;
  title: string;
  description: string;
  image: string;
  creator: string;
  theme: string;
  maxNumbers: number;
  soldNumbers: number;
  pricePerNumber: number;
  currency: string;
  drawDate: string;
  featured: boolean;
  priority: 'high' | 'medium' | 'low';
}

// Mock data for featured raffles with admin priority
const mockFeaturedRaffles: FeaturedRaffle[] = [
  {
    id: '1',
    title: 'iPhone 15 Pro Max Titanio',
    description: 'El último iPhone con 1TB de almacenamiento y cámara profesional',
    image: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    creator: 'TechRaffles',
    theme: 'invierno',
    maxNumbers: 500,
    soldNumbers: 387,
    pricePerNumber: 15000,
    currency: 'CLP',
    drawDate: '2024-12-25T20:00:00',
    featured: true,
    priority: 'high'
  },
  {
    id: '2',
    title: 'PlayStation 5 + Juegos',
    description: 'Consola PS5 con 5 juegos exclusivos y control adicional',
    image: 'https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    creator: 'GamerHub',
    theme: 'primavera',
    maxNumbers: 300,
    soldNumbers: 234,
    pricePerNumber: 8000,
    currency: 'CLP',
    drawDate: '2024-12-30T19:00:00',
    featured: true,
    priority: 'high'
  },
  {
    id: '3',
    title: 'MacBook Air M3',
    description: 'Laptop Apple con chip M3, 16GB RAM y 512GB SSD',
    image: 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    creator: 'AppleStore',
    theme: 'otoño',
    maxNumbers: 400,
    soldNumbers: 156,
    pricePerNumber: 12000,
    currency: 'CLP',
    drawDate: '2024-12-28T18:00:00',
    featured: true,
    priority: 'medium'
  },
  {
    id: '4',
    title: 'Viaje a París para 2',
    description: 'Vuelos + hotel 5 estrellas por 7 días en la ciudad del amor',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    creator: 'TravelDreams',
    theme: 'verano',
    maxNumbers: 200,
    soldNumbers: 89,
    pricePerNumber: 25000,
    currency: 'CLP',
    drawDate: '2024-12-31T23:59:00',
    featured: true,
    priority: 'medium'
  }
];

export const FeaturedRaffles: React.FC<FeaturedRafflesProps> = ({ onNavigate }) => {
  const [featuredRaffles, setFeaturedRaffles] = useState<FeaturedRaffle[]>([]);

  useEffect(() => {
    // Sort by priority and limit to top 4
    const sortedRaffles = mockFeaturedRaffles
      .sort((a, b) => {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      })
      .slice(0, 4);
    
    setFeaturedRaffles(sortedRaffles);
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

  if (featuredRaffles.length === 0) {
    return null;
  }

  return (
    <div className="py-16 bg-gradient-to-br from-purple-100/50 via-pink-100/50 to-indigo-100/50 dark:from-purple-900/10 dark:via-pink-900/10 dark:to-indigo-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full">
              <Star className="h-5 w-5" />
              <span className="font-semibold">Rifas Destacadas</span>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Las Mejores Rifas del Momento
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Descubre las rifas más populares seleccionadas por nuestros administradores
          </p>
        </div>

        {/* Featured Raffles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {featuredRaffles.map((raffle) => (
            <div
              key={raffle.id}
              className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer border border-purple-100 dark:border-purple-800"
              onClick={() => onNavigate('raffle', raffle.id)}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={raffle.image}
                  alt={raffle.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                
                {/* Priority Badge */}
                <div className="absolute top-3 left-3">
                  <div className="flex items-center space-x-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-2 py-1 rounded-full">
                    {getPriorityIcon(raffle.priority)}
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                      {getPriorityLabel(raffle.priority)}
                    </span>
                  </div>
                </div>

                {/* Theme Badge */}
                <div className="absolute top-3 right-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${getThemeColors(raffle.theme)}`}>
                    {getThemeEmoji(raffle.theme)} {raffle.theme}
                  </span>
                </div>

                {/* Featured Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">
                  {raffle.title}
                </h3>
                
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                  {raffle.description}
                </p>

                <div className="text-xs text-purple-600 dark:text-purple-400 mb-3 font-medium">
                  Por {raffle.creator}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                  <div className="flex items-center space-x-1">
                    <DollarSign className="h-3 w-3 text-green-600 dark:text-green-400" />
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      ${raffle.pricePerNumber.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      {raffle.soldNumbers}/{raffle.maxNumbers}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 col-span-2">
                    <Calendar className="h-3 w-3 text-purple-600 dark:text-purple-400" />
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      {new Date(raffle.drawDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                    <span>Progreso</span>
                    <span>{Math.round((raffle.soldNumbers / raffle.maxNumbers) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full bg-gradient-to-r ${getThemeColors(raffle.theme)}`}
                      style={{ width: `${(raffle.soldNumbers / raffle.maxNumbers) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Action Button */}
                <button className={`w-full bg-gradient-to-r ${getThemeColors(raffle.theme)} text-white py-2 rounded-lg font-medium text-sm hover:shadow-lg transition-all duration-300 transform group-hover:scale-105`}>
                  Ver Rifa
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <button
            onClick={() => onNavigate('gallery')}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2 mx-auto"
          >
            <Sparkles className="h-6 w-6" />
            <span>Ver Todas las Rifas</span>
          </button>
        </div>
      </div>
    </div>
  );
};