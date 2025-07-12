import React, { useState } from 'react';
import { Upload, Calendar, Users, Sparkles, ArrowLeft, Save, Gamepad2, Palette, Star, TrendingUp, DollarSign, AlertCircle, Image } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

interface CreateGachaProps {
  onNavigate: (view: string, gachaId?: string) => void;
}

interface GachaPrize {
  id: string;
  name: string;
  description: string;
  image?: string;
  ballColor: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  emotionLevel: number; // 1-5
  probability: number; // Percentage chance
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

export const CreateGacha: React.FC<CreateGachaProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState<Omit<GachaData, 'id' | 'createdAt'>>({
    title: '',
    description: '',
    pricePerPlay: 1000,
    currency: 'CLP',
    maxAttemptsPerPerson: 10,
    prizes: [],
    raritySettings: {
      common: 60,
      rare: 25,
      epic: 12,
      legendary: 3
    },
    machineColor: '#ff4757', // Default red machine
    showAnimation: true,
    showPrizeList: true,
    showPublicResults: false,
  });

  const [newPrize, setNewPrize] = useState<Omit<GachaPrize, 'id' | 'probability'>>({
    name: '',
    description: '',
    ballColor: '#ff6b9d',
    rarity: 'common',
    emotionLevel: 3,
  });

  const [showPricingSuggestions, setShowPricingSuggestions] = useState(false);

  // Colores específicos para las bolitas de gacha
  const gachaBallColors = [
    { name: 'Negro', color: '#000000' },
    { name: 'Verde', color: '#22c55e' },
    { name: 'Rosa', color: '#ff6b9d' },
    { name: 'Blanco', color: '#ffffff' },
    { name: 'Gris', color: '#6b7280' },
    { name: 'Azul', color: '#3b82f6' },
    { name: 'Amarillo', color: '#fbbf24' },
    { name: 'Verde Agua', color: '#06b6d4' },
    { name: 'Morado', color: '#8b5cf6' },
    { name: 'Celeste', color: '#0ea5e9' },
    { name: 'Dorado', color: '#f59e0b' },
    { name: 'Metálico', color: '#9ca3af' },
    { name: 'Lila', color: '#c084fc' },
    { name: 'Violeta', color: '#7c3aed' },
  ];

  // Colores para la máquina gacha
  const machineColors = [
    { name: 'Rojo Clásico', color: '#ff4757' },
    { name: 'Azul Océano', color: '#3742fa' },
    { name: 'Verde Esmeralda', color: '#2ed573' },
    { name: 'Rosa Sakura', color: '#ff6b9d' },
    { name: 'Morado Mágico', color: '#a55eea' },
    { name: 'Dorado Premium', color: '#ffa502' },
    { name: 'Negro Elegante', color: '#2f3542' },
    { name: 'Blanco Puro', color: '#f1f2f6' },
  ];

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

  // Pricing suggestions based on rarity and market analysis
  const getPricingSuggestions = () => {
    const basePrice = 500; // Base price in CLP
    const suggestions = {
      common: {
        min: basePrice * 0.5,
        recommended: basePrice * 1,
        max: basePrice * 2,
        description: "Productos accesibles que generen volumen de ventas"
      },
      rare: {
        min: basePrice * 1.5,
        recommended: basePrice * 3,
        max: basePrice * 5,
        description: "Precio medio que mantenga el interés sin ser prohibitivo"
      },
      epic: {
        min: basePrice * 4,
        recommended: basePrice * 8,
        max: basePrice * 15,
        description: "Precio premium que refleje la exclusividad"
      },
      legendary: {
        min: basePrice * 10,
        recommended: basePrice * 20,
        max: basePrice * 50,
        description: "Precio alto para premios únicos y muy deseados"
      }
    };
    return suggestions;
  };

  const calculateExpectedValue = () => {
    const totalProbability = Object.values(formData.raritySettings).reduce((sum, prob) => sum + prob, 0);
    if (totalProbability === 0) return 0;

    const suggestions = getPricingSuggestions();
    let expectedValue = 0;

    Object.entries(formData.raritySettings).forEach(([rarity, probability]) => {
      const rarityKey = rarity as keyof typeof suggestions;
      expectedValue += (probability / 100) * suggestions[rarityKey].recommended;
    });

    return expectedValue;
  };

  const getRecommendedPrice = () => {
    const expectedValue = calculateExpectedValue();
    const profitMargin = 0.3; // 30% profit margin
    return Math.round(expectedValue * (1 + profitMargin));
  };

  const handlePrizeImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setNewPrize(prev => ({ ...prev, image: e.target!.result as string }));
      }
    };
    reader.readAsDataURL(file);
  };

  const addPrize = () => {
    if (!newPrize.name.trim()) return;
    
    const prize: GachaPrize = {
      ...newPrize,
      id: uuidv4(),
      probability: formData.raritySettings[newPrize.rarity],
    };
    
    setFormData(prev => ({
      ...prev,
      prizes: [...prev.prizes, prize]
    }));
    
    setNewPrize({
      name: '',
      description: '',
      ballColor: gachaBallColors[Math.floor(Math.random() * gachaBallColors.length)].color,
      rarity: 'common',
      emotionLevel: 3,
    });
  };

  const removePrize = (id: string) => {
    setFormData(prev => ({
      ...prev,
      prizes: prev.prizes.filter(p => p.id !== id)
    }));
  };

  const updateRaritySettings = (rarity: keyof RaritySettings, value: number) => {
    setFormData(prev => ({
      ...prev,
      raritySettings: {
        ...prev.raritySettings,
        [rarity]: value
      },
      prizes: prev.prizes.map(prize => 
        prize.rarity === rarity 
          ? { ...prize, probability: value }
          : prize
      )
    }));
  };

  const getTotalProbability = () => {
    return Object.values(formData.raritySettings).reduce((sum, prob) => sum + prob, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.prizes.length === 0) {
      alert('Debes agregar al menos un premio');
      return;
    }

    const totalProb = getTotalProbability();
    if (totalProb !== 100) {
      alert(`Los porcentajes de rareza deben sumar 100%. Actualmente suman ${totalProb}%`);
      return;
    }
    
    const gachaData: GachaData = {
      ...formData,
      id: uuidv4(),
      createdAt: new Date(),
    };

    // Save to localStorage for demo purposes
    const existingGachas = JSON.parse(localStorage.getItem('gachas') || '[]');
    localStorage.setItem('gachas', JSON.stringify([...existingGachas, gachaData]));

    // Navigate to the created gacha
    onNavigate('gacha', gachaData.id);
  };

  const pricingSuggestions = getPricingSuggestions();
  const recommendedPrice = getRecommendedPrice();
  const totalProbability = getTotalProbability();

  // Enhanced Gacha Ball Preview Component with larger size and transparent top
  const GachaBallPreview = ({ prize, size = 'large' }: { prize: Partial<GachaPrize>, size?: 'small' | 'medium' | 'large' }) => {
    const ballSizes = {
      small: 'w-12 h-12',
      medium: 'w-20 h-20',
      large: 'w-32 h-32'
    };
    
    const imageSizes = {
      small: 'w-8 h-8',
      medium: 'w-14 h-14',
      large: 'w-24 h-24'
    };
    
    return (
      <div className={`relative ${ballSizes[size]} mx-auto`}>
        {/* Ball container */}
        <div className="relative w-full h-full">
          {/* Top transparent half - much more transparent */}
          <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/60 to-white/30 rounded-t-full border-2 border-gray-300 dark:border-gray-600 backdrop-blur-sm"></div>
          
          {/* Bottom colored half */}
          <div 
            className="absolute bottom-0 left-0 w-full h-1/2 rounded-b-full border-2 border-gray-300 dark:border-gray-600"
            style={{ backgroundColor: prize.ballColor || '#ff6b9d' }}
          ></div>
          
          {/* Prize image inside - larger and more visible */}
          {prize.image && (
            <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${imageSizes[size]} rounded-full overflow-hidden border-2 border-white/70 shadow-lg`}>
              <img
                src={prize.image}
                alt={prize.name || 'Premio'}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          {/* Legendary crown */}
          {prize.rarity === 'legendary' && (
            <img 
              src="/src/assets/iconogacga.png" 
              alt="Corona" 
              className={`absolute -top-2 -right-2 ${size === 'large' ? 'h-10 w-10' : size === 'medium' ? 'h-8 w-8' : 'h-6 w-6'} object-contain drop-shadow-lg`}
            />
          )}
          
          {/* Enhanced shine effect */}
          <div className="absolute top-3 left-3 w-4 h-4 bg-white/80 rounded-full blur-sm"></div>
          <div className="absolute top-1 left-1 w-2 h-2 bg-white rounded-full"></div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-indigo-900/20 dark:to-purple-900/20 transition-colors duration-300">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={() => onNavigate('home')}
            className="mr-4 p-2 rounded-xl hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors"
          >
            <ArrowLeft className="h-6 w-6 text-gray-600 dark:text-gray-400" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Crear Máquina Gacha</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Diseña tu experiencia gacha personalizada</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg p-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <img 
                src="/src/assets/iconogacga.png" 
                alt="Icono Gacha" 
                className="h-6 w-6 mr-2 object-contain"
              />
              Información Básica
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Título de la máquina gacha *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Ej: Gacha de Peluches Kawaii"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Descripción
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Describe tu máquina gacha y los premios disponibles..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Precio por tirada *
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    value={formData.pricePerPlay}
                    onChange={(e) => setFormData(prev => ({ ...prev, pricePerPlay: Number(e.target.value) }))}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPricingSuggestions(!showPricingSuggestions)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
                  >
                    <TrendingUp className="h-5 w-5" />
                  </button>
                </div>
                {recommendedPrice > 0 && (
                  <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                    💡 Precio recomendado: ${recommendedPrice.toLocaleString()} CLP
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Máximo intentos por persona
                </label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={formData.maxAttemptsPerPerson}
                  onChange={(e) => setFormData(prev => ({ ...prev, maxAttemptsPerPerson: Number(e.target.value) }))}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Enhanced Machine Color Selection */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg p-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <Palette className="h-6 w-6 mr-2 text-pink-600 dark:text-pink-400" />
              Color de la Máquina Gacha
            </h2>
            
            <div className="grid grid-cols-4 md:grid-cols-8 gap-4 mb-6">
              {machineColors.map((colorOption, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, machineColor: colorOption.color }))}
                  className={`relative group flex flex-col items-center p-3 rounded-xl border-2 transition-all duration-200 ${
                    formData.machineColor === colorOption.color 
                      ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 scale-105' 
                      : 'border-gray-200 dark:border-gray-600 hover:border-indigo-300 dark:hover:border-indigo-500'
                  }`}
                  title={colorOption.name}
                >
                  <div
                    className="w-8 h-8 rounded-lg shadow-md border-2 border-white dark:border-gray-800 mb-2"
                    style={{ backgroundColor: colorOption.color }}
                  />
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300 text-center">
                    {colorOption.name}
                  </span>
                </button>
              ))}
            </div>

            {/* Enhanced Machine Preview - Much Larger and Rectangular */}
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Vista Previa de la Máquina</h3>
              <div className="inline-block">
                <div 
                  className="w-96 h-[500px] rounded-3xl shadow-2xl relative transition-all duration-500"
                  style={{ 
                    backgroundColor: formData.machineColor,
                    boxShadow: `0 25px 50px -12px ${formData.machineColor}40`
                  }}
                >
                  {/* Machine Body */}
                  <div className="absolute inset-4 bg-gradient-to-b from-white/20 to-white/10 rounded-2xl">
                    {/* Large Glass Window - Much bigger */}
                    <div className="absolute top-4 left-4 right-4 h-80 bg-gradient-to-b from-blue-100/80 to-blue-200/80 dark:from-blue-900/50 dark:to-blue-800/50 rounded-xl border-4 border-gray-300 dark:border-gray-600 overflow-hidden">
                      {/* Enhanced Preview Balls Grid */}
                      <div className="grid grid-cols-8 gap-2 p-4">
                        {formData.prizes.slice(0, 32).map((prize, index) => (
                          <GachaBallPreview key={index} prize={prize} size="small" />
                        ))}
                        {Array.from({ length: Math.max(0, 32 - formData.prizes.length) }).map((_, index) => (
                          <div
                            key={`empty-${index}`}
                            className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-600 opacity-50 border-2 border-gray-400"
                          />
                        ))}
                      </div>
                    </div>
                    
                    {/* Coin Slot */}
                    <div className="absolute top-96 left-1/2 transform -translate-x-1/2 w-20 h-6 bg-gray-800 dark:bg-gray-900 rounded-lg shadow-inner"></div>
                    
                    {/* Handle */}
                    <div className="absolute top-80 right-2 w-10 h-20 bg-gray-600 dark:bg-gray-700 rounded-full shadow-lg"></div>
                    <div className="absolute top-84 right-0 w-6 h-12 bg-gray-500 dark:bg-gray-600 rounded-r-full"></div>
                    
                    {/* Prize Dispenser */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-12 bg-gray-800 dark:bg-gray-900 rounded-lg shadow-inner"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Rarity Settings */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg p-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <Sparkles className="h-6 w-6 mr-2 text-purple-600 dark:text-purple-400" />
              Configuración de Rarezas y Probabilidades
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {Object.entries(formData.raritySettings).map(([rarity, probability]) => (
                <div key={rarity} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-full text-white font-medium bg-gradient-to-r ${rarityColors[rarity as keyof typeof rarityColors]}`}>
                      {rarityLabels[rarity as keyof typeof rarityLabels]}
                    </span>
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      {probability}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={probability}
                    onChange={(e) => updateRaritySettings(rarity as keyof RaritySettings, Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={probability}
                    onChange={(e) => updateRaritySettings(rarity as keyof RaritySettings, Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              ))}
            </div>

            <div className={`p-4 rounded-xl border-2 ${
              totalProbability === 100 
                ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700' 
                : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700'
            }`}>
              <div className="flex items-center space-x-2">
                <span className={`font-bold ${
                  totalProbability === 100 
                    ? 'text-green-700 dark:text-green-300' 
                    : 'text-red-700 dark:text-red-300'
                }`}>
                  Total: {totalProbability}%
                </span>
                {totalProbability === 100 ? (
                  <span className="text-green-600 dark:text-green-400">✅ Perfecto</span>
                ) : (
                  <span className="text-red-600 dark:text-red-400">
                    ⚠️ Debe sumar exactamente 100%
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Enhanced Add Prize Section */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg p-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <Star className="h-6 w-6 mr-2 text-yellow-600 dark:text-yellow-400" />
              Agregar Premio (hasta 30 premios distintos)
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nombre del premio *
                </label>
                <input
                  type="text"
                  value={newPrize.name}
                  onChange={(e) => setNewPrize(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Ej: Peluche de Gato Rosa"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Descripción
                </label>
                <input
                  type="text"
                  value={newPrize.description}
                  onChange={(e) => setNewPrize(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Ej: Súper suave y adorable"
                />
              </div>

              {/* Prize Image Upload */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Imagen del premio
                </label>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-indigo-700 transition-colors cursor-pointer">
                    <Image className="h-5 w-5" />
                    <span>Subir imagen</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => e.target.files?.[0] && handlePrizeImageUpload(e.target.files[0])}
                      className="hidden"
                    />
                  </label>
                  {newPrize.image && (
                    <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
                      <span className="text-sm">✅ Imagen cargada</span>
                      <button
                        type="button"
                        onClick={() => setNewPrize(prev => ({ ...prev, image: undefined }))}
                        className="text-red-600 hover:text-red-700 text-sm"
                      >
                        Eliminar
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Color de la bolita gacha
                </label>
                
                {/* Enhanced Vista previa de la bolita con imagen */}
                <div className="flex items-center space-x-6 mb-6 p-6 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Vista previa:</div>
                  <GachaBallPreview prize={newPrize} size="large" />
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <p className="font-medium">Color: {gachaBallColors.find(c => c.color === newPrize.ballColor)?.name || 'Personalizado'}</p>
                    {newPrize.image && <p className="text-green-600 dark:text-green-400 font-medium">✅ Con imagen del premio</p>}
                    <p className="text-xs mt-1">La parte superior es transparente para mostrar el premio</p>
                  </div>
                </div>

                {/* Enhanced Selector de colores predefinidos */}
                <div className="grid grid-cols-7 gap-3 mb-4">
                  {gachaBallColors.map((colorOption, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setNewPrize(prev => ({ ...prev, ballColor: colorOption.color }))}
                      className={`relative group flex flex-col items-center p-3 rounded-xl border-2 transition-all duration-200 ${
                        newPrize.ballColor === colorOption.color 
                          ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 scale-105' 
                          : 'border-gray-200 dark:border-gray-600 hover:border-indigo-300 dark:hover:border-indigo-500'
                      }`}
                      title={colorOption.name}
                    >
                      <div
                        className="w-8 h-8 rounded-full shadow-md border-2 border-white dark:border-gray-800 mb-2"
                        style={{ backgroundColor: colorOption.color }}
                      />
                      <span className="text-xs font-medium text-gray-700 dark:text-gray-300 text-center">
                        {colorOption.name}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Selector de color personalizado */}
                <div className="flex items-center space-x-3">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Color personalizado:
                  </label>
                  <input
                    type="color"
                    value={newPrize.ballColor}
                    onChange={(e) => setNewPrize(prev => ({ ...prev, ballColor: e.target.value }))}
                    className="w-12 h-12 rounded-lg border border-gray-300 dark:border-gray-600 cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Rareza
                </label>
                <select
                  value={newPrize.rarity}
                  onChange={(e) => setNewPrize(prev => ({ ...prev, rarity: e.target.value as any }))}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="common">Común ({formData.raritySettings.common}%)</option>
                  <option value="rare">Raro ({formData.raritySettings.rare}%)</option>
                  <option value="epic">Épico ({formData.raritySettings.epic}%)</option>
                  <option value="legendary">Legendario ({formData.raritySettings.legendary}%)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nivel de emoción visual (1-5 estrellas) ⭐
                </label>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map(level => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setNewPrize(prev => ({ ...prev, emotionLevel: level }))}
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                        newPrize.emotionLevel >= level
                          ? 'bg-yellow-400 text-white scale-110'
                          : 'bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-400'
                      }`}
                    >
                      ⭐
                    </button>
                  ))}
                  <span className="ml-4 text-sm text-gray-600 dark:text-gray-400">
                    {newPrize.emotionLevel === 1 && 'Meh'}
                    {newPrize.emotionLevel === 2 && 'Está bien'}
                    {newPrize.emotionLevel === 3 && 'Genial'}
                    {newPrize.emotionLevel === 4 && '¡Increíble!'}
                    {newPrize.emotionLevel === 5 && '¡ÉPICO! 🎉'}
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={addPrize}
              disabled={!newPrize.name.trim() || formData.prizes.length >= 30}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <img 
                src="/src/assets/iconogacga.png" 
                alt="Icono Gacha" 
                className="h-5 w-5 object-contain"
              />
              <span>Agregar Premio</span>
            </button>
          </div>

          {/* Enhanced Prizes List */}
          {formData.prizes.length > 0 && (
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg p-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Premios Agregados ({formData.prizes.length}/30)
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formData.prizes.map((prize) => (
                  <div key={prize.id} className="border border-gray-200 dark:border-gray-600 rounded-xl p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <GachaBallPreview prize={prize} size="medium" />
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">{prize.name}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{prize.description}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removePrize(prize.id)}
                        className="text-red-600 hover:text-red-700 text-sm font-medium"
                      >
                        Eliminar
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className={`px-2 py-1 rounded-full text-white bg-gradient-to-r ${rarityColors[prize.rarity]}`}>
                        {rarityLabels[prize.rarity]}
                      </span>
                      <span className="font-bold text-purple-600 dark:text-purple-400">
                        {prize.probability}% probabilidad
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-1">
                        {Array.from({ length: prize.emotionLevel }).map((_, i) => (
                          <span key={i} className="text-yellow-400">⭐</span>
                        ))}
                      </div>
                      {prize.image && (
                        <span className="text-green-600 dark:text-green-400 text-xs">✅ Con imagen</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Settings */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg p-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Configuración</h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <Sparkles className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Activar animación visual completa</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Efectos de máquina gacha con ticket, iluminación y confetti</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.showAnimation}
                    onChange={(e) => setFormData(prev => ({ ...prev, showAnimation: e.target.checked }))}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Mostrar lista de premios</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Los usuarios pueden ver todos los premios posibles</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.showPrizeList}
                    onChange={(e) => setFormData(prev => ({ ...prev, showPrizeList: e.target.checked }))}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <Star className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Registro público de resultados</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Mostrar qué premios han ganado otros usuarios</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.showPublicResults}
                    onChange={(e) => setFormData(prev => ({ ...prev, showPublicResults: e.target.checked }))}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={totalProbability !== 100 || formData.prizes.length === 0}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="h-5 w-5" />
              <span>Crear Gacha</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};