import React, { useState } from 'react';
import { Upload, Calendar, Users, Eye, EyeOff, Sparkles, Sun, Leaf, Snowflake, Heart, ArrowLeft, Save, Wand2, CheckCircle } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

interface CreateRaffleProps {
  onNavigate: (view: string, raffleId?: string) => void;
}

interface RaffleData {
  id: string;
  title: string;
  description: string;
  prizeImages: string[];
  maxParticipants: number;
  theme: 'primavera' | 'verano' | 'otoño' | 'invierno' | 'gatitos' | 'magico';
  drawDate: string;
  showNames: boolean;
  autoRaffle: boolean;
  buffExtra: boolean;
  termsAccepted: boolean;
  createdAt: Date;
}

export const CreateRaffle: React.FC<CreateRaffleProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState<Omit<RaffleData, 'id' | 'createdAt'>>({
    title: '',
    description: '',
    prizeImages: [],
    maxParticipants: 100,
    theme: 'primavera',
    drawDate: '',
    showNames: true,
    autoRaffle: true,
    buffExtra: false,
    termsAccepted: false,
  });

  const [dragActive, setDragActive] = useState(false);

  const themes = [
    { 
      id: 'primavera', 
      name: 'Primavera', 
      icon: Heart, 
      color: 'from-pink-400 to-rose-400', 
      bgColor: 'bg-pink-50 dark:bg-pink-900/20',
      description: 'Flores de cerezo flotantes con movimiento suave'
    },
    { 
      id: 'verano', 
      name: 'Verano', 
      icon: Sun, 
      color: 'from-yellow-400 to-orange-400', 
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
      description: 'Sol brillante con ondas de calor y colores cálidos'
    },
    { 
      id: 'otoño', 
      name: 'Otoño', 
      icon: Leaf, 
      color: 'from-orange-400 to-red-400', 
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      description: 'Hojas cayendo con movimiento natural del viento'
    },
    { 
      id: 'invierno', 
      name: 'Invierno', 
      icon: Snowflake, 
      color: 'from-blue-400 to-indigo-400', 
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      description: 'Copos de nieve con brillo y movimiento descendente'
    },
    { 
      id: 'gatitos', 
      name: 'Gatitos', 
      icon: Heart, 
      color: 'from-pink-400 to-purple-400', 
      bgColor: 'bg-pink-50 dark:bg-pink-900/20',
      description: 'Patitas de gato y corazones flotantes adorables'
    },
    { 
      id: 'magico', 
      name: 'Mágico', 
      icon: Wand2, 
      color: 'from-purple-400 via-indigo-400 to-cyan-400', 
      bgColor: 'bg-gradient-to-br from-purple-50 via-indigo-50 to-cyan-50 dark:from-purple-900/20 dark:via-indigo-900/20 dark:to-cyan-900/20',
      description: 'Brillos mágicos y estrellas con movimiento real'
    },
  ];

  const handleImageUpload = (files: FileList | null) => {
    if (!files) return;
    
    const newImages: string[] = [];
    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            newImages.push(e.target.result as string);
            if (newImages.length === files.length) {
              setFormData(prev => ({
                ...prev,
                prizeImages: [...prev.prizeImages, ...newImages]
              }));
            }
          }
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleImageUpload(e.dataTransfer.files);
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      prizeImages: prev.prizeImages.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.termsAccepted) {
      alert('Debes aceptar los términos y condiciones');
      return;
    }
    
    const raffleData: RaffleData = {
      ...formData,
      id: uuidv4(),
      createdAt: new Date(),
    };

    // Save to localStorage for demo purposes
    const existingRaffles = JSON.parse(localStorage.getItem('raffles') || '[]');
    localStorage.setItem('raffles', JSON.stringify([...existingRaffles, raffleData]));

    // Navigate to the created raffle
    onNavigate('raffle', raffleData.id);
  };

  const selectedTheme = themes.find(t => t.id === formData.theme);

  // Seasonal decorations component
  const SeasonalDecorations = () => {
    switch (formData.theme) {
      case 'primavera':
        return (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Cherry blossoms with enhanced floating animation */}
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute animate-cherryfloat text-pink-300 dark:text-pink-400"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 4}s`,
                  animationDuration: `${4 + Math.random() * 3}s`,
                  fontSize: `${12 + Math.random() * 8}px`
                }}
              >
                🌸
              </div>
            ))}
          </div>
        );
      case 'magico':
        return (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Enhanced magical sparkles with real movement */}
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={`sparkle-${i}`}
                className="absolute fantasy-sparkle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 4}s`,
                  animationDuration: `${3 + Math.random() * 3}s`,
                  fontSize: `${8 + Math.random() * 6}px`
                }}
              >
                ✨
              </div>
            ))}
            {/* Floating magical orbs */}
            {Array.from({ length: 15 }).map((_, i) => (
              <div
                key={`orb-${i}`}
                className="absolute w-2 h-2 bg-gradient-to-r from-cyan-300 to-purple-300 rounded-full opacity-70 animate-firefly"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${4 + Math.random() * 2}s`,
                  filter: 'drop-shadow(0 0 6px currentColor)'
                }}
              />
            ))}
          </div>
        );
      case 'invierno':
        return (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Enhanced snowflakes with shimmer effect */}
            {Array.from({ length: 25 }).map((_, i) => (
              <div
                key={i}
                className="absolute text-blue-200 dark:text-blue-400 opacity-80 animate-snowfall animate-shimmer"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${6 + Math.random() * 4}s`,
                  fontSize: `${10 + Math.random() * 6}px`
                }}
              >
                ❄️
              </div>
            ))}
          </div>
        );
      case 'otoño':
        return (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Falling autumn leaves */}
            {Array.from({ length: 18 }).map((_, i) => (
              <div
                key={i}
                className="absolute animate-leaffall text-orange-600 dark:text-orange-500 opacity-70"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 4}s`,
                  animationDuration: `${5 + Math.random() * 3}s`,
                  fontSize: `${12 + Math.random() * 6}px`,
                  transform: `rotate(${Math.random() * 360}deg)`
                }}
              >
                🍂
              </div>
            ))}
          </div>
        );
      case 'verano':
        return (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Summer sun rays and heat waves */}
            <div className="absolute top-10 right-10 w-16 h-16 bg-gradient-to-br from-yellow-300 to-orange-400 dark:from-yellow-400 dark:to-orange-500 rounded-full opacity-40 animate-pulse"></div>
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="absolute animate-float text-yellow-500 dark:text-yellow-400 opacity-60"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${3 + Math.random() * 2}s`,
                  fontSize: `${8 + Math.random() * 4}px`
                }}
              >
                ☀️
              </div>
            ))}
          </div>
        );
      case 'gatitos':
        return (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Cat paws and hearts */}
            {Array.from({ length: 16 }).map((_, i) => (
              <div
                key={i}
                className="absolute animate-float text-pink-400 dark:text-pink-300 opacity-70"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 4}s`,
                  animationDuration: `${4 + Math.random() * 2}s`,
                  fontSize: `${10 + Math.random() * 6}px`
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

  return (
    <div className={`min-h-screen ${selectedTheme?.bgColor || 'bg-gray-50 dark:bg-gray-900'} transition-all duration-500 relative`}>
      <SeasonalDecorations />
      
      <div className="relative z-10 max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={() => onNavigate('home')}
            className="mr-4 p-2 rounded-xl hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors"
          >
            <ArrowLeft className="h-6 w-6 text-gray-600 dark:text-gray-400" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Crear tu rifa</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Configura todos los detalles de tu rifa personalizada</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg p-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <img 
                src="/src/assets/iconorifa.png" 
                alt="Icono Rifa" 
                className="h-6 w-6 mr-2 object-contain"
              />
              Información Básica
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Título de la rifa *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Ej: iPhone 15 Pro - Rifa Navideña"
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
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Describe tu rifa, los premios y cualquier información importante..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Users className="inline h-4 w-4 mr-1" />
                  Cantidad de números (1-1000) *
                </label>
                <input
                  type="number"
                  min="1"
                  max="1000"
                  value={formData.maxParticipants}
                  onChange={(e) => setFormData(prev => ({ ...prev, maxParticipants: Number(e.target.value) }))}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Calendar className="inline h-4 w-4 mr-1" />
                  Fecha límite del sorteo *
                </label>
                <input
                  type="datetime-local"
                  value={formData.drawDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, drawDate: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>
            </div>
          </div>

          {/* Prize Images */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg p-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <Upload className="h-6 w-6 mr-2 text-purple-600 dark:text-purple-400" />
              Imágenes de premios
            </h2>

            <div
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                dragActive 
                  ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' 
                  : 'border-gray-300 dark:border-gray-600 hover:border-purple-400 hover:bg-purple-50/50 dark:hover:bg-purple-900/10'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                Arrastra y suelta tus imágenes aquí
              </p>
              <p className="text-gray-500 dark:text-gray-400 mb-4">o</p>
              <label className="bg-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-purple-700 transition-colors cursor-pointer">
                Seleccionar archivos
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e.target.files)}
                  className="hidden"
                />
              </label>
            </div>

            {formData.prizeImages.length > 0 && (
              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                {formData.prizeImages.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image}
                      alt={`Premio ${index + 1}`}
                      className="w-full h-32 object-cover rounded-xl shadow-md"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Theme Selection */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg p-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Tema visual (6 opciones)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {themes.map((theme) => {
                const Icon = theme.icon;
                return (
                  <button
                    key={theme.id}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, theme: theme.id as any }))}
                    className={`p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                      formData.theme === theme.id
                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/30 scale-105'
                        : 'border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-500 hover:scale-102'
                    }`}
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div className={`p-3 rounded-lg bg-gradient-to-r ${theme.color}`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <h4 className="font-bold text-gray-900 dark:text-white text-lg">{theme.name}</h4>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{theme.description}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Settings */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg p-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Configuración</h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <div className="flex items-center space-x-3">
                  {formData.showNames ? <Eye className="h-5 w-5 text-green-600" /> : <EyeOff className="h-5 w-5 text-gray-400" />}
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Mostrar nombre o "Anónimo"</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Los participantes aparecerán con su nombre visible o anónimo</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.showNames}
                    onChange={(e) => setFormData(prev => ({ ...prev, showNames: e.target.checked }))}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <Sparkles className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Activar sorteo automático</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Rueda visual tipo spin wheel + confetti</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.autoRaffle}
                    onChange={(e) => setFormData(prev => ({ ...prev, autoRaffle: e.target.checked }))}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl border border-yellow-200 dark:border-yellow-700">
                <div className="flex items-center space-x-3">
                  <Sparkles className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Activar "Buff Extra" ✨</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Cuando se agoten números, se puede pagar extra para mayor chance</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.buffExtra}
                    onChange={(e) => setFormData(prev => ({ ...prev, buffExtra: e.target.checked }))}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 dark:peer-focus:ring-yellow-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg p-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Términos y Condiciones</h2>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 mb-6">
              <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Si no es verificada su identidad, el dinero podrá ser retirado una vez sean confirmados los envíos de los premios.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>La comisión de 5% es cobrada a los compradores en cada número.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Usuarios destacados tendrán una considerable reducción de tarifas.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Mientras más alto el valor a colectar en la rifa, más baja será la tarifa de servicio.</span>
                </li>
              </ul>
            </div>
            
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.termsAccepted}
                onChange={(e) => setFormData(prev => ({ ...prev, termsAccepted: e.target.checked }))}
                className="w-5 h-5 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                required
              />
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                Acepto los términos y condiciones *
              </span>
            </label>
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
              disabled={!formData.termsAccepted}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="h-5 w-5" />
              <span>Crear Rifa</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};