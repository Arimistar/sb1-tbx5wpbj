import React, { useState, useEffect } from 'react';
import { ArrowLeft, Eye, Users, DollarSign, Settings, Gamepad2 } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface MyGachasProps {
  onNavigate: (view: string, gachaId?: string) => void;
}

interface GachaData {
  id: string;
  title: string;
  description: string;
  pricePerPlay: number;
  currency: string;
  maxAttemptsPerPerson: number;
  totalPlays: number;
  totalRevenue: number;
  totalViews: number;
  creatorId: string;
  isActive: boolean;
  createdAt: Date;
}

export const MyGachas: React.FC<MyGachasProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  const [myGachas, setMyGachas] = useState<GachaData[]>([]);

  useEffect(() => {
    // Mock data - en producción vendría de la API
    const mockGachas: GachaData[] = [
      {
        id: '1',
        title: 'Gacha Kawaii Peluches',
        description: 'Adorables peluches de animales con diferentes rarezas',
        pricePerPlay: 2000,
        currency: 'CLP',
        maxAttemptsPerPerson: 15,
        totalPlays: 1247,
        totalRevenue: 2494000,
        totalViews: 3456,
        creatorId: user?.id || '1',
        isActive: true,
        createdAt: new Date('2024-01-10')
      },
      {
        id: '2',
        title: 'Accesorios Gamer RGB',
        description: 'Mousepads, keycaps y stickers con efectos RGB',
        pricePerPlay: 1500,
        currency: 'CLP',
        maxAttemptsPerPerson: 10,
        totalPlays: 892,
        totalRevenue: 1338000,
        totalViews: 2134,
        creatorId: user?.id || '1',
        isActive: true,
        createdAt: new Date('2024-01-18')
      }
    ];
    setMyGachas(mockGachas);
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={() => onNavigate('home')}
            className="mr-4 p-2 rounded-xl hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors"
          >
            <ArrowLeft className="h-6 w-6 text-gray-600 dark:text-gray-400" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Mis Gachas</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Administra tus máquinas gacha creadas</p>
          </div>
        </div>

        {myGachas.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <Gamepad2 className="h-12 w-12 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">¡Aún no has creado gachas!</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
              Crea tu primera máquina gacha y comienza a generar ingresos con tus premios únicos.
            </p>
            <button
              onClick={() => onNavigate('create-gacha')}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
            >
              Crear primera gacha
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myGachas.map((gacha) => (
              <div
                key={gacha.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                {/* Gacha Machine Preview */}
                <div className="relative h-48 bg-gradient-to-b from-red-400 to-red-600 p-4">
                  <div className="w-full h-full bg-gradient-to-b from-red-300 to-red-500 rounded-xl relative">
                    {/* Glass Window */}
                    <div className="absolute top-2 left-2 right-2 h-24 bg-gradient-to-b from-blue-100 to-blue-200 dark:from-blue-900/50 dark:to-blue-800/50 rounded-lg border-2 border-gray-300 dark:border-gray-600 overflow-hidden">
                      {/* Preview Balls */}
                      <div className="grid grid-cols-8 gap-0.5 p-1">
                        {Array.from({ length: 24 }).map((_, index) => (
                          <div
                            key={index}
                            className="w-3 h-3 rounded-full bg-gradient-to-br from-pink-400 to-purple-400"
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
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">
                    {gacha.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 text-sm">
                    {gacha.description}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div className="text-center p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="font-bold text-green-600 dark:text-green-400">
                        ${gacha.totalRevenue.toLocaleString()}
                      </div>
                      <div className="text-gray-600 dark:text-gray-400">Recaudado</div>
                    </div>
                    <div className="text-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="font-bold text-blue-600 dark:text-blue-400">
                        {gacha.totalPlays}
                      </div>
                      <div className="text-gray-600 dark:text-gray-400">Jugadas</div>
                    </div>
                  </div>

                  {/* Additional Stats */}
                  <div className="flex items-center justify-between mb-4 text-sm">
                    <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
                      <DollarSign className="h-4 w-4" />
                      <span>${gacha.pricePerPlay.toLocaleString()}/jugada</span>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
                      <Eye className="h-4 w-4" />
                      <span>{gacha.totalViews}</span>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      gacha.isActive 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400'
                    }`}>
                      {gacha.isActive ? 'Activa' : 'Pausada'}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Max {gacha.maxAttemptsPerPerson} intentos
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2">
                    <button
                      onClick={() => onNavigate('gacha', gacha.id)}
                      className="w-full bg-indigo-600 text-white py-2 rounded-xl font-medium hover:bg-indigo-700 transition-colors"
                    >
                      Ver Gacha
                    </button>
                    <button className="w-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 rounded-xl font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                      Editar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};