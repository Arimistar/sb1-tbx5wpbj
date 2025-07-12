import React, { useState, useEffect } from 'react';
import { ArrowLeft, Play, Gift, Star, Users, Sparkles, Coins, TrendingUp, Ticket } from 'lucide-react';

interface GachaViewProps {
  gachaId: string;
  onNavigate: (view: string) => void;
}

interface GachaPrize {
  id: string;
  name: string;
  description: string;
  image?: string;
  ballColor: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  emotionLevel: number;
  probability: number;
}

interface RaritySettings {
  common: number;
  rare: number;
  epic: number;
  legendary: number;
}

interface GachaData {
  id: string;
  title: string;
  description: string;
  pricePerPlay: number;
  currency: string;
  maxAttemptsPerPerson: number;
  prizes: GachaPrize[];
  raritySettings: RaritySettings;
  machineColor: string;
  showAnimation: boolean;
  showPrizeList: boolean;
  showPublicResults: boolean;
  createdAt: Date;
}

interface PlayResult {
  prize: GachaPrize;
  timestamp: Date;
}

export const GachaView: React.FC<GachaViewProps> = ({ gachaId, onNavigate }) => {
  const [gacha, setGacha] = useState<GachaData | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [lastResult, setLastResult] = useState<PlayResult | null>(null);
  const [userAttempts, setUserAttempts] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [animationPhase, setAnimationPhase] = useState<'idle' | 'ticket' | 'lighting' | 'ball' | 'opening' | 'result'>('idle');

  useEffect(() => {
    // Mock gacha data since we don't have localStorage working
    const mockGacha: GachaData = {
      id: gachaId,
      title: 'Gacha Kawaii Peluches',
      description: 'Adorables peluches de animales con diferentes rarezas y colores únicos',
      pricePerPlay: 2000,
      currency: 'CLP',
      maxAttemptsPerPerson: 15,
      prizes: [
        { 
          id: '1', 
          name: 'Gatito Rosa', 
          description: 'Súper suave', 
          ballColor: '#ff6b9d', 
          rarity: 'legendary', 
          emotionLevel: 5, 
          probability: 3,
          image: 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop'
        },
        { 
          id: '2', 
          name: 'Osito Azul', 
          description: 'Muy tierno', 
          ballColor: '#54a0ff', 
          rarity: 'epic', 
          emotionLevel: 4, 
          probability: 12,
          image: 'https://images.pexels.com/photos/1661471/pexels-photo-1661471.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop'
        },
        { 
          id: '3', 
          name: 'Conejito Blanco', 
          description: 'Esponjoso', 
          ballColor: '#ecf0f1', 
          rarity: 'rare', 
          emotionLevel: 3, 
          probability: 25,
          image: 'https://images.pexels.com/photos/326012/pexels-photo-326012.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop'
        },
        { 
          id: '4', 
          name: 'Perrito Café', 
          description: 'Leal compañero', 
          ballColor: '#8b4513', 
          rarity: 'common', 
          emotionLevel: 3, 
          probability: 60,
          image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop'
        }
      ],
      raritySettings: { common: 60, rare: 25, epic: 12, legendary: 3 },
      machineColor: '#ff4757',
      showAnimation: true,
      showPrizeList: true,
      showPublicResults: false,
      createdAt: new Date()
    };
    setGacha(mockGacha);
  }, [gachaId]);

  const rarityColors = {
    common: 'from-gray-400 to-gray-500',
    rare: 'from-blue-400 to-blue-500',
    epic: 'from-purple-400 to-purple-500',
    legendary: 'from-yellow-400 to-orange-500'
  };

  const rarityLabels = {
    common: 'Común',
    rare: 'Raro',
    epic: 'Épico',
    legendary: 'Legendario'
  };

  // Enhanced Gacha Ball Component
  const GachaBall = ({ prize, size = 'medium', isAnimating = false }: { 
    prize: GachaPrize, 
    size?: 'small' | 'medium' | 'large',
    isAnimating?: boolean 
  }) => {
    const sizeClasses = {
      small: 'w-8 h-8',
      medium: 'w-16 h-16',
      large: 'w-32 h-32'
    };
    
    const imageSizeClasses = {
      small: 'w-6 h-6',
      medium: 'w-12 h-12',
      large: 'w-24 h-24'
    };

    return (
      <div className={`relative ${sizeClasses[size]} ${isAnimating ? 'animate-bounce' : ''}`}>
        {/* Ball container */}
        <div className="relative w-full h-full">
          {/* Top transparent half */}
          <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/40 to-white/20 rounded-t-full border-2 border-gray-300 dark:border-gray-600 backdrop-blur-sm"></div>
          
          {/* Bottom colored half */}
          <div 
            className="absolute bottom-0 left-0 w-full h-1/2 rounded-b-full border-2 border-gray-300 dark:border-gray-600"
            style={{ backgroundColor: prize.ballColor }}
          ></div>
          
          {/* Prize image inside */}
          {prize.image && (
            <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${imageSizeClasses[size]} rounded-full overflow-hidden border border-white/50`}>
              <img
                src={prize.image}
                alt={prize.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          {/* Legendary crown */}
          {prize.rarity === 'legendary' && (
            <img 
              src="/src/assets/iconogacga.png" 
              alt="Corona" 
              className={`absolute -top-2 -right-2 ${size === 'large' ? 'h-8 w-8' : size === 'medium' ? 'h-6 w-6' : 'h-4 w-4'} object-contain`}
            />
          )}
          
          {/* Shine effect */}
          <div className="absolute top-2 left-2 w-3 h-3 bg-white/60 rounded-full blur-sm"></div>
        </div>
      </div>
    );
  };

  const playGacha = async () => {
    if (!gacha || userAttempts >= gacha.maxAttemptsPerPerson || isPlaying) return;
    
    setIsPlaying(true);
    setAnimationPhase('ticket');
    
    // Phase 1: Ticket insertion (1 second)
    await new Promise(resolve => setTimeout(resolve, 1000));
    setAnimationPhase('lighting');
    
    // Phase 2: Machine lighting up (1.5 seconds)
    await new Promise(resolve => setTimeout(resolve, 1500));
    setAnimationPhase('ball');
    
    // Select prize using weighted random
    const weightedPrizes: GachaPrize[] = [];
    Object.entries(gacha.raritySettings).forEach(([rarity, weight]) => {
      const rarityPrizes = gacha.prizes.filter(p => p.rarity === rarity);
      if (rarityPrizes.length > 0) {
        for (let i = 0; i < weight; i++) {
          const randomPrize = rarityPrizes[Math.floor(Math.random() * rarityPrizes.length)];
          weightedPrizes.push(randomPrize);
        }
      }
    });
    
    const selectedPrize = weightedPrizes[Math.floor(Math.random() * weightedPrizes.length)];
    
    // Phase 3: Ball appears and zooms (1.5 seconds)
    await new Promise(resolve => setTimeout(resolve, 1500));
    setAnimationPhase('opening');
    
    // Phase 4: Ball opens (1 second)
    await new Promise(resolve => setTimeout(resolve, 1000));
    setAnimationPhase('result');
    
    setLastResult({
      prize: selectedPrize,
      timestamp: new Date()
    });
    
    setUserAttempts(prev => prev + 1);
    
    // Show confetti for epic/legendary prizes
    if (selectedPrize.rarity === 'epic' || selectedPrize.rarity === 'legendary') {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
    
    // Reset after showing result
    setTimeout(() => {
      setIsPlaying(false);
      setAnimationPhase('idle');
    }, 3000);
  };

  if (!gacha) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Gacha no encontrada</h2>
          <button
            onClick={() => onNavigate('gachas')}
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-indigo-700 transition-colors"
          >
            Volver a la galería
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-indigo-900/20 dark:to-purple-900/20 transition-colors duration-300 relative">
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {Array.from({ length: 100 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random()}s`
              }}
            />
          ))}
        </div>
      )}

      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <button
              onClick={() => onNavigate('gachas')}
              className="mr-4 p-2 rounded-xl hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors"
            >
              <ArrowLeft className="h-6 w-6 text-gray-600 dark:text-gray-400" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{gacha.title}</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">¡Gira la manivela y descubre tu premio!</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Enhanced Gacha Machine */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Máquina Gacha</h2>
              
              {/* Enhanced Gacha Machine Visual */}
              <div className="relative mx-auto mb-8">
                <div 
                  className={`w-96 h-[500px] rounded-3xl shadow-2xl relative transition-all duration-500 ${
                    animationPhase === 'lighting' ? 'animate-pulse' : ''
                  }`}
                  style={{ 
                    backgroundColor: gacha.machineColor,
                    boxShadow: animationPhase === 'lighting' 
                      ? `0 0 50px ${gacha.machineColor}80` 
                      : undefined
                  }}
                >
                  {/* Machine Body */}
                  <div className="absolute inset-4 bg-gradient-to-b from-white/20 to-white/10 rounded-2xl">
                    {/* Large Glass Window */}
                    <div className="absolute top-4 left-4 right-4 h-64 bg-gradient-to-b from-blue-100/80 to-blue-200/80 dark:from-blue-900/50 dark:to-blue-800/50 rounded-xl border-4 border-gray-300 dark:border-gray-600 overflow-hidden">
                      {/* Gacha Balls Grid */}
                      <div className="grid grid-cols-8 gap-2 p-3">
                        {gacha.prizes.map((prize, index) => (
                          <GachaBall 
                            key={index} 
                            prize={prize} 
                            size="small"
                            isAnimating={animationPhase === 'ball' && index === 0}
                          />
                        ))}
                        {Array.from({ length: Math.max(0, 32 - gacha.prizes.length) }).map((_, index) => (
                          <div
                            key={`empty-${index}`}
                            className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 opacity-50"
                          />
                        ))}
                      </div>
                    </div>
                    
                    {/* Ticket Slot with Animation */}
                    <div className="absolute top-72 left-1/2 transform -translate-x-1/2 w-20 h-6 bg-gray-800 dark:bg-gray-900 rounded-lg overflow-hidden">
                      {animationPhase === 'ticket' && (
                        <div className="w-16 h-4 bg-yellow-400 rounded animate-pulse transform translate-x-full transition-transform duration-1000"></div>
                      )}
                    </div>
                    
                    {/* Handle */}
                    <div className="absolute top-80 right-2 w-10 h-20 bg-gray-600 dark:bg-gray-700 rounded-full"></div>
                    <div className="absolute top-84 right-0 w-6 h-12 bg-gray-500 dark:bg-gray-600 rounded-r-full"></div>
                    
                    {/* Prize Dispenser */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-10 bg-gray-800 dark:bg-gray-900 rounded-lg">
                      {/* Ball coming out animation */}
                      {animationPhase === 'ball' && lastResult && (
                        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 animate-bounce">
                          <GachaBall prize={lastResult.prize} size="medium" isAnimating={true} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Play Button */}
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-4 text-lg font-semibold text-gray-700 dark:text-gray-300">
                  <Coins className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                  <span>${gacha.pricePerPlay.toLocaleString()} {gacha.currency}</span>
                </div>
                
                <button
                  onClick={playGacha}
                  disabled={isPlaying || userAttempts >= gacha.maxAttemptsPerPerson}
                  className={`w-full py-4 rounded-2xl font-bold text-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 flex items-center space-x-3 justify-center ${
                    isPlaying || userAttempts >= gacha.maxAttemptsPerPerson
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg'
                  }`}
                >
                  {isPlaying ? (
                    <>
                      {animationPhase === 'ticket' && (
                        <>
                          <Ticket className="h-6 w-6 animate-pulse" />
                          <span>Insertando ticket...</span>
                        </>
                      )}
                      {animationPhase === 'lighting' && (
                        <>
                          <Sparkles className="h-6 w-6 animate-spin" />
                          <span>Máquina activándose...</span>
                        </>
                      )}
                      {animationPhase === 'ball' && (
                        <>
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                          <span>Seleccionando premio...</span>
                        </>
                      )}
                      {(animationPhase === 'opening' || animationPhase === 'result') && (
                        <>
                          <Gift className="h-6 w-6 animate-bounce" />
                          <span>¡Abriendo premio!</span>
                        </>
                      )}
                    </>
                  ) : userAttempts >= gacha.maxAttemptsPerPerson ? (
                    'Límite alcanzado'
                  ) : (
                    <>
                      <Play className="h-6 w-6" />
                      <span>¡JUGAR GACHA!</span>
                    </>
                  )}
                </button>
                
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Intentos: {userAttempts}/{gacha.maxAttemptsPerPerson}
                </p>
              </div>

              {/* Enhanced Result Display */}
              {lastResult && animationPhase === 'result' && (
                <div className="mt-8 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl border border-yellow-200 dark:border-yellow-700 animate-fadeIn">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">¡Felicidades! 🎉</h3>
                  <div className="flex flex-col items-center space-y-4">
                    <GachaBall prize={lastResult.prize} size="large" />
                    <div className="text-center">
                      <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{lastResult.prize.name}</h4>
                      <p className="text-lg text-gray-600 dark:text-gray-400 mb-3">{lastResult.prize.description}</p>
                      <div className="flex items-center justify-center space-x-4">
                        <span className={`px-4 py-2 rounded-full text-white font-bold bg-gradient-to-r ${rarityColors[lastResult.prize.rarity]}`}>
                          {rarityLabels[lastResult.prize.rarity]}
                        </span>
                        <span className="text-lg font-bold text-purple-600 dark:text-purple-400">
                          {lastResult.prize.probability}% de probabilidad
                        </span>
                      </div>
                      <div className="flex items-center justify-center mt-2">
                        {Array.from({ length: lastResult.prize.emotionLevel }).map((_, i) => (
                          <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Gacha Info */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Información</h3>
              {gacha.description && (
                <p className="text-gray-600 dark:text-gray-400 mb-4">{gacha.description}</p>
              )}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Precio por tirada</span>
                  <span className="font-medium text-gray-900 dark:text-white">${gacha.pricePerPlay.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Máximo intentos</span>
                  <span className="font-medium text-gray-900 dark:text-white">{gacha.maxAttemptsPerPerson}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Total premios</span>
                  <span className="font-medium text-gray-900 dark:text-white">{gacha.prizes.length}</span>
                </div>
              </div>
            </div>

            {/* Probability Display */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" />
                Probabilidades
              </h3>
              <div className="space-y-3">
                {Object.entries(gacha.raritySettings).map(([rarity, probability]) => (
                  <div key={rarity} className="flex items-center justify-between">
                    <span className={`px-2 py-1 rounded-full text-white text-sm bg-gradient-to-r ${rarityColors[rarity as keyof typeof rarityColors]}`}>
                      {rarityLabels[rarity as keyof typeof rarityLabels]}
                    </span>
                    <span className="font-bold text-gray-900 dark:text-white">{probability}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Prize List */}
            {gacha.showPrizeList && (
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Gift className="h-5 w-5 mr-2 text-purple-600 dark:text-purple-400" />
                  Premios Posibles
                </h3>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {gacha.prizes
                    .sort((a, b) => {
                      const rarityOrder = { legendary: 4, epic: 3, rare: 2, common: 1 };
                      return rarityOrder[b.rarity] - rarityOrder[a.rarity];
                    })
                    .map((prize) => (
                      <div key={prize.id} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                        <GachaBall prize={prize} size="small" />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 dark:text-white text-sm truncate">{prize.name}</h4>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className={`px-2 py-0.5 rounded-full text-xs text-white bg-gradient-to-r ${rarityColors[prize.rarity]}`}>
                              {rarityLabels[prize.rarity]}
                            </span>
                            <span className="text-xs font-bold text-purple-600 dark:text-purple-400">
                              {prize.probability}%
                            </span>
                            <div className="flex items-center">
                              {Array.from({ length: prize.emotionLevel }).map((_, i) => (
                                <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};