import React from 'react';
import { Gift, Dice6, User, Sparkles, Heart, Snowflake, Sun, Leaf, Star, Calendar, Users, Gamepad2 } from 'lucide-react';
import { FeaturedRaffles } from './FeaturedRaffles';
import { FeaturedGachas } from './FeaturedGachas';

interface HomePageProps {
  onNavigate: (view: string) => void;
  onShowLogin: () => void;
  onShowRegister: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onShowLogin, onShowRegister }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Subtle decorative background */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-100/30 via-white/50 to-gray-100/30 dark:from-gray-800/30 dark:via-gray-700/50 dark:to-gray-800/30"></div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 text-center">
          {/* Logo Principal - Mucho más grande ocupando 2/3 del espacio */}
          <div className="flex items-center justify-center mb-12">
            <img 
              src="/src/assets/logo gachita.uno.png" 
              alt="Gachita.uno Logo" 
              className="h-64 md:h-80 lg:h-96 w-auto object-contain max-w-full"
            />
          </div>

          {/* Texto de Bienvenida */}
          <div className="max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              ¡Bienvenid@ a Gachita.uno!
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              <strong>Crea tus rifas y gachas de forma organizada y transparente!</strong>
            </p>
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Comparte tus premios y gana más apoyo.
            </p>
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed">
              <strong>¡Todo desde un solo lugar, fácil y bonito!</strong>
            </p>
          </div>

          {/* Botones Principales */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-12">
            {/* Crear Rifa */}
            <button
              onClick={() => onNavigate('create')}
              className="group bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-6 rounded-2xl font-semibold text-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-3"
            >
              <img 
                src="/src/assets/iconorifa.png" 
                alt="Icono Rifa" 
                className="h-8 w-8 object-contain"
              />
              <span>Crear Rifa</span>
            </button>

            {/* Crear Gacha */}
            <button
              onClick={() => onNavigate('create-gacha')}
              className="group bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-8 py-6 rounded-2xl font-semibold text-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-3"
            >
              <img 
                src="/src/assets/iconogacga.png" 
                alt="Icono Gacha" 
                className="h-8 w-8 object-contain"
              />
              <span>Crear Gacha</span>
            </button>
          </div>

          {/* Botones de Galería */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-12">
            <button
              onClick={() => onNavigate('gallery')}
              className="group bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 border-2 border-purple-200 dark:border-purple-600 px-6 py-4 rounded-xl font-medium hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-300 dark:hover:border-purple-500 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center space-x-2"
            >
              <Dice6 className="h-5 w-5 group-hover:animate-spin" />
              <span>Galería de Rifas</span>
            </button>
            
            <button
              onClick={() => onNavigate('gachas')}
              className="group bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 border-2 border-indigo-200 dark:border-indigo-600 px-6 py-4 rounded-xl font-medium hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:border-indigo-300 dark:hover:border-indigo-500 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center space-x-2"
            >
              <Gamepad2 className="h-5 w-5 group-hover:animate-spin" />
              <span>Galería de Gachas</span>
            </button>
          </div>

          {/* Auth Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <button
              onClick={onShowRegister}
              className="group bg-gradient-to-r from-gray-600 to-gray-700 text-white px-6 py-3 rounded-xl font-medium hover:from-gray-700 hover:to-gray-800 transition-all duration-300 flex items-center space-x-2"
            >
              <User className="h-5 w-5" />
              <span>Registrarse</span>
            </button>
            
            <span className="text-gray-400 dark:text-gray-500">o</span>
            
            <button
              onClick={onShowLogin}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 font-medium underline decoration-2 underline-offset-4 hover:decoration-gray-400 dark:hover:decoration-gray-300 transition-all duration-300"
            >
              Iniciar sesión
            </button>
          </div>
        </div>
      </div>

      {/* Featured Raffles Preview */}
      <FeaturedRaffles onNavigate={onNavigate} />

      {/* Featured Gachas Preview */}
      <FeaturedGachas onNavigate={onNavigate} />

      {/* Features Section */}
      <div className="py-16 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Temas Estacionales</h3>
              <p className="text-gray-600 dark:text-gray-300">Personaliza tu rifa con hermosos temas de primavera, verano, otoño, invierno, gatitos y mágico</p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Gift className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Premios Personalizados</h3>
              <p className="text-gray-600 dark:text-gray-300">Sube imágenes de tus premios y crea rifas únicas que atraigan a más participantes</p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Gamepad2 className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Experiencia Gacha</h3>
              <p className="text-gray-600 dark:text-gray-300">Crea máquinas gacha con efectos visuales, rarezas y emociones para una experiencia única</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};