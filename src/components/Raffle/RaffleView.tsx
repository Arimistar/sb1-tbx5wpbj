import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, Users, Eye, Sparkles, Share2, Play, Trophy } from 'lucide-react';

interface RaffleViewProps {
  raffleId: string;
  onNavigate: (view: string) => void;
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
  buffExtra: boolean;
  createdAt: Date;
}

export const RaffleView: React.FC<RaffleViewProps> = ({ raffleId, onNavigate }) => {
  const [raffle, setRaffle] = useState<RaffleData | null>(null);
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [winnerNumber, setWinnerNumber] = useState<number | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Mock raffle data since we don't have localStorage working
    const mockRaffle: RaffleData = {
      id: raffleId,
      title: 'iPhone 15 Pro Max Titanio',
      description: 'El último iPhone con 1TB de almacenamiento y cámara profesional. Incluye cargador, audífonos y funda protectora.',
      prizeImages: [
        'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
        'https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
      ],
      maxParticipants: 500,
      theme: 'invierno',
      drawDate: '2024-12-25T20:00:00',
      showNames: true,
      autoRaffle: true,
      buffExtra: false,
      createdAt: new Date()
    };
    setRaffle(mockRaffle);
  }, [raffleId]);

  const getThemeColors = (theme: string) => {
    switch (theme) {
      case 'primavera': return 'from-pink-400 to-rose-400';
      case 'verano': return 'from-yellow-400 to-orange-400';
      case 'otoño': return 'from-orange-400 to-red-400';
      case 'invierno': return 'from-blue-400 to-indigo-400';
      case 'gatitos': return 'from-pink-400 to-purple-400';
      case 'magico': return 'from-purple-400 via-indigo-400 to-cyan-400';
      default: return 'from-purple-400 to-pink-400';
    }
  };

  const getThemeBg = (theme: string) => {
    switch (theme) {
      case 'primavera': return 'bg-pink-50 dark:bg-pink-900/20';
      case 'verano': return 'bg-yellow-50 dark:bg-yellow-900/20';
      case 'otoño': return 'bg-orange-50 dark:bg-orange-900/20';
      case 'invierno': return 'bg-blue-50 dark:bg-blue-900/20';
      case 'gatitos': return 'bg-pink-50 dark:bg-pink-900/20';
      case 'magico': return 'bg-gradient-to-br from-purple-50 via-indigo-50 to-cyan-50 dark:from-purple-900/20 dark:via-indigo-900/20 dark:to-cyan-900/20';
      default: return 'bg-purple-50 dark:bg-purple-900/20';
    }
  };

  const toggleNumber = (number: number) => {
    setSelectedNumbers(prev => 
      prev.includes(number) 
        ? prev.filter(n => n !== number)
        : [...prev, number]
    );
  };

  // Enhanced spin wheel animation for winner selection
  const drawWinner = async () => {
    if (!raffle || selectedNumbers.length === 0) return;
    
    setIsDrawing(true);
    setWinnerNumber(null);
    
    // Phase 1: Fast spinning through all numbers (2 seconds)
    const fastSpinDuration = 2000;
    const fastSpinInterval = 50;
    let currentStep = 0;
    const totalFastSteps = fastSpinDuration / fastSpinInterval;
    
    const fastSpinTimer = setInterval(() => {
      const randomNumber = Math.floor(Math.random() * raffle.maxParticipants) + 1;
      setWinnerNumber(randomNumber);
      currentStep++;
      
      if (currentStep >= totalFastSteps) {
        clearInterval(fastSpinTimer);
        
        // Phase 2: Slow down and highlight selected numbers only (2 seconds)
        let slowCurrentStep = 0;
        const slowSpinDuration = 2000;
        const slowSpinInterval = 200;
        const totalSlowSteps = slowSpinDuration / slowSpinInterval;
        
        const slowSpinTimer = setInterval(() => {
          const randomSelectedNumber = selectedNumbers[Math.floor(Math.random() * selectedNumbers.length)];
          setWinnerNumber(randomSelectedNumber);
          slowCurrentStep++;
          
          if (slowCurrentStep >= totalSlowSteps) {
            clearInterval(slowSpinTimer);
            
            // Phase 3: Final selection with dramatic pause
            setTimeout(() => {
              const finalWinner = selectedNumbers[Math.floor(Math.random() * selectedNumbers.length)];
              setWinnerNumber(finalWinner);
              setIsDrawing(false);
              
              // Show confetti and celebration
              setShowConfetti(true);
              setTimeout(() => setShowConfetti(false), 5000);
            }, 500);
          }
        }, slowSpinInterval);
      }
    }, fastSpinInterval);
  };

  // Seasonal decorations component
  const SeasonalDecorations = ({ theme }: { theme: string }) => {
    switch (theme) {
      case 'primavera':
        return (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Cherry blossoms */}
            {Array.from({ length: 15 }).map((_, i) => (
              <div
                key={i}
                className="absolute animate-cherryfloat text-pink-300 dark:text-pink-400"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${3 + Math.random() * 2}s`
                }}
              >
                🌸
              </div>
            ))}
          </div>
        );
      case 'verano':
        return (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Beach sunset gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-orange-200 via-yellow-200 to-transparent dark:from-orange-900/30 dark:via-yellow-900/30 opacity-30"></div>
            {/* Sun */}
            <div className="absolute top-10 right-10 w-16 h-16 bg-gradient-to-br from-yellow-300 to-orange-400 dark:from-yellow-400 dark:to-orange-500 rounded-full opacity-40 animate-pulse"></div>
          </div>
        );
      case 'otoño':
        return (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Falling autumn leaves */}
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="absolute animate-leaffall text-orange-600 dark:text-orange-500 opacity-60"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 4}s`,
                  animationDuration: `${4 + Math.random() * 3}s`,
                  transform: `rotate(${Math.random() * 360}deg)`
                }}
              >
                🍂
              </div>
            ))}
          </div>
        );
      case 'invierno':
        return (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Falling snowflakes */}
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute text-blue-200 dark:text-blue-400 opacity-70 animate-snowfall animate-shimmer"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${5 + Math.random() * 5}s`
                }}
              >
                ❄️
              </div>
            ))}
          </div>
        );
      case 'magico':
        return (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Magical sparkles */}
            {Array.from({ length: 25 }).map((_, i) => (
              <div
                key={i}
                className="absolute fantasy-sparkle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 4}s`,
                  animationDuration: `${3 + Math.random() * 3}s`
                }}
              >
                ✨
              </div>
            ))}
          </div>
        );
      case 'gatitos':
        return (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Cat paws and hearts */}
            {Array.from({ length: 14 }).map((_, i) => (
              <div
                key={i}
                className="absolute animate-float text-pink-400 dark:text-pink-300 opacity-70"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 4}s`,
                  animationDuration: `${4 + Math.random() * 2}s`
                }}
              >
                {i % 2 === 0 ? '🐾' : '💕'}
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  if (!raffle) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Rifa no encontrada</h2>
          <button
            onClick={() => onNavigate('gallery')}
            className="bg-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-purple-700 transition-colors"
          >
            Volver a la galería
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${getThemeBg(raffle.theme)} transition-all duration-500 relative`}>
      <SeasonalDecorations theme={raffle.theme} />
      
      {/* Enhanced Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {Array.from({ length: 150 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-10px`,
                backgroundColor: ['#ff6b9d', '#54a0ff', '#5f27cd', '#00d2d3', '#ff9ff3', '#feca57'][Math.floor(Math.random() * 6)],
                width: `${4 + Math.random() * 8}px`,
                height: `${4 + Math.random() * 8}px`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
                borderRadius: Math.random() > 0.5 ? '50%' : '0%'
              }}
            />
          ))}
        </div>
      )}
      
      <div className="relative z-10 max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <button
              onClick={() => onNavigate('gallery')}
              className="mr-4 p-2 rounded-xl hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors"
            >
              <ArrowLeft className="h-6 w-6 text-gray-600 dark:text-gray-400" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{raffle.title}</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Selecciona tus números de la suerte</p>
            </div>
          </div>
          <button className="flex items-center space-x-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-4 py-2 rounded-xl hover:bg-white dark:hover:bg-gray-800 transition-colors">
            <Share2 className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            <span className="text-gray-700 dark:text-gray-300 font-medium">Compartir</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Prize Images */}
            {raffle.prizeImages.length > 0 && (
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Premios</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {raffle.prizeImages.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Premio ${index + 1}`}
                      className="w-full h-32 object-cover rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            {raffle.description && (
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Descripción</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{raffle.description}</p>
              </div>
            )}

            {/* Number Selection */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Selecciona tus números</h2>
              <div className="grid grid-cols-10 gap-2">
                {Array.from({ length: raffle.maxParticipants }, (_, i) => i + 1).map(number => (
                  <button
                    key={number}
                    onClick={() => toggleNumber(number)}
                    className={`
                      aspect-square rounded-lg font-medium text-sm transition-all duration-200 transform hover:scale-105 relative
                      ${selectedNumbers.includes(number)
                        ? `bg-gradient-to-br ${getThemeColors(raffle.theme)} text-white shadow-lg`
                        : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
                      }
                      ${winnerNumber === number && isDrawing
                        ? 'ring-4 ring-yellow-400 animate-pulse bg-yellow-400 text-white scale-110'
                        : ''
                      }
                      ${winnerNumber === number && !isDrawing && winnerNumber
                        ? 'ring-4 ring-green-400 bg-green-400 text-white animate-bounce scale-110'
                        : ''
                      }
                    `}
                  >
                    {number}
                    {winnerNumber === number && !isDrawing && (
                      <Trophy className="absolute -top-2 -right-2 h-4 w-4 text-yellow-500" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Enhanced Draw Winner Section */}
            {raffle.autoRaffle && selectedNumbers.length > 0 && (
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Sorteo Automático</h2>
                <div className="text-center">
                  <button
                    onClick={drawWinner}
                    disabled={isDrawing}
                    className={`bg-gradient-to-r ${getThemeColors(raffle.theme)} text-white px-8 py-4 rounded-2xl font-bold text-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 flex items-center space-x-3 mx-auto ${
                      isDrawing ? 'animate-pulse' : 'hover:shadow-2xl'
                    }`}
                  >
                    <Play className={`h-6 w-6 ${isDrawing ? 'animate-spin' : ''}`} />
                    <span>{isDrawing ? 'Sorteando...' : 'Iniciar Sorteo'}</span>
                  </button>
                  
                  {isDrawing && (
                    <div className="mt-4 text-center">
                      <div className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                        🎰 Girando la rueda de la fortuna...
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full animate-pulse" style={{ width: '100%' }}></div>
                      </div>
                    </div>
                  )}
                  
                  {winnerNumber && !isDrawing && (
                    <div className="mt-6 p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl border border-green-200 dark:border-green-700 animate-fadeIn">
                      <h3 className="text-3xl font-bold text-green-700 dark:text-green-300 mb-2">🎉 ¡GANADOR! 🎉</h3>
                      <div className="text-6xl font-bold text-green-600 dark:text-green-400 mb-4 animate-bounce">
                        #{winnerNumber}
                      </div>
                      <p className="text-xl text-green-600 dark:text-green-400 mb-4">
                        {raffle.showNames ? 'Usuario Demo' : 'Participante Anónimo'}
                      </p>
                      <div className="flex items-center justify-center space-x-2 text-green-700 dark:text-green-300">
                        <Trophy className="h-6 w-6" />
                        <span className="font-semibold">¡Felicidades por tu premio!</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Raffle Info */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Información de la rifa</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Fecha del sorteo</p>
                    <p className="font-medium text-gray-900 dark:text-white">{new Date(raffle.drawDate).toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Números disponibles</p>
                    <p className="font-medium text-gray-900 dark:text-white">{raffle.maxParticipants} números</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Eye className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Privacidad</p>
                    <p className="font-medium text-gray-900 dark:text-white">{raffle.showNames ? 'Nombres visibles' : 'Anónimo'}</p>
                  </div>
                </div>
                {raffle.autoRaffle && (
                  <div className="flex items-center space-x-3">
                    <Sparkles className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Sorteo</p>
                      <p className="font-medium text-gray-900 dark:text-white">Automático con efectos</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Selected Numbers */}
            {selectedNumbers.length > 0 && (
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Números seleccionados</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedNumbers.map(number => (
                    <span
                      key={number}
                      className={`px-3 py-1 rounded-lg text-sm font-medium text-white bg-gradient-to-r ${getThemeColors(raffle.theme)}`}
                    >
                      {number}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Total: {selectedNumbers.length} número{selectedNumbers.length !== 1 ? 's' : ''}
                </p>
                <button className={`w-full bg-gradient-to-r ${getThemeColors(raffle.theme)} text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105`}>
                  Comprar números
                </button>
              </div>
            )}

            {/* Probability */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Probabilidad de ganar</h3>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                  {selectedNumbers.length > 0 
                    ? `${((selectedNumbers.length / raffle.maxParticipants) * 100).toFixed(2)}%`
                    : '0%'
                  }
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {selectedNumbers.length} de {raffle.maxParticipants} números
                </p>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mt-3">
                  <div 
                    className={`h-3 rounded-full bg-gradient-to-r ${getThemeColors(raffle.theme)} transition-all duration-500`}
                    style={{ width: `${(selectedNumbers.length / raffle.maxParticipants) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};