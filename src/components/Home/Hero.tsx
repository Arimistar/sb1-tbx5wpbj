import React from 'react';
import { Sparkles, Gift, Gamepad2, Star } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-purple-800 to-pink-800 text-white">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.1%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Sparkles className="h-8 w-8 text-yellow-400" />
            <span className="text-xl font-semibold text-yellow-400">Nueva Experiencia</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Rifas y Gacha
            <br />
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Revolucionarios
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Crea rifas tradicionales o experiencias gacha únicas con temas personalizables y pagos seguros
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button className="bg-white text-purple-800 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-purple-50 transition-all duration-300 transform hover:scale-105 shadow-lg">
              Crear Rifa
            </button>
            <button className="bg-purple-600/20 backdrop-blur-sm border border-purple-300 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-purple-600/30 transition-all duration-300">
              Explorar Gachas
            </button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="bg-purple-600/20 backdrop-blur-sm rounded-2xl p-6 mb-4">
                <Gift className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Rifas Tradicionales</h3>
                <p className="text-purple-200">Crea rifas clásicas con temas estacionales y personalización completa</p>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-600/20 backdrop-blur-sm rounded-2xl p-6 mb-4">
                <Gamepad2 className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Experiencia Gacha</h3>
                <p className="text-purple-200">Innovadora mecánica de premios con rarezas y probabilidades visuales</p>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-600/20 backdrop-blur-sm rounded-2xl p-6 mb-4">
                <Star className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Pagos Seguros</h3>
                <p className="text-purple-200">WebPay, Stripe, MercadoPago y criptomonedas soportadas</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};