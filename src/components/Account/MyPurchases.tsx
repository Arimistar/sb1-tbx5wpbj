import React, { useState, useEffect } from 'react';
import { ArrowLeft, Gift, Gamepad2, Calendar, Users, DollarSign } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface MyPurchasesProps {
  onNavigate: (view: string, itemId?: string) => void;
}

interface RafflePurchase {
  id: string;
  raffleId: string;
  raffleTitle: string;
  raffleImage?: string;
  numbers: number[];
  totalAmount: number;
  currency: string;
  drawDate: string;
  isActive: boolean;
  purchaseDate: Date;
}

interface GachaPurchase {
  id: string;
  gachaId: string;
  gachaTitle: string;
  capsulesOpened: number;
  totalSpent: number;
  currency: string;
  lastPlayDate: Date;
  isActive: boolean;
}

export const MyPurchases: React.FC<MyPurchasesProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'rifas' | 'gachas'>('rifas');
  const [rafflePurchases, setRafflePurchases] = useState<RafflePurchase[]>([]);
  const [gachaPurchases, setGachaPurchases] = useState<GachaPurchase[]>([]);

  useEffect(() => {
    // Mock data - en producción vendría de la API
    const mockRafflePurchases: RafflePurchase[] = [
      {
        id: '1',
        raffleId: '1',
        raffleTitle: 'iPhone 15 Pro Max Titanio',
        raffleImage: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        numbers: [15, 23, 45, 67],
        totalAmount: 60000,
        currency: 'CLP',
        drawDate: '2024-12-25T20:00:00',
        isActive: true,
        purchaseDate: new Date('2024-01-20')
      },
      {
        id: '2',
        raffleId: '2',
        raffleTitle: 'PlayStation 5 + Juegos',
        raffleImage: 'https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        numbers: [12, 28],
        totalAmount: 16000,
        currency: 'CLP',
        drawDate: '2024-12-30T19:00:00',
        isActive: true,
        purchaseDate: new Date('2024-01-22')
      }
    ];

    const mockGachaPurchases: GachaPurchase[] = [
      {
        id: '1',
        gachaId: '1',
        gachaTitle: 'Gacha Kawaii Peluches',
        capsulesOpened: 8,
        totalSpent: 16000,
        currency: 'CLP',
        lastPlayDate: new Date('2024-01-25'),
        isActive: true
      },
      {
        id: '2',
        gachaId: '2',
        gachaTitle: 'Accesorios Gamer RGB',
        capsulesOpened: 5,
        totalSpent: 7500,
        currency: 'CLP',
        lastPlayDate: new Date('2024-01-23'),
        isActive: true
      }
    ];

    setRafflePurchases(mockRafflePurchases);
    setGachaPurchases(mockGachaPurchases);
  }, [user]);

  const getTotalSpent = () => {
    const raffleTotal = rafflePurchases.reduce((sum, purchase) => sum + purchase.totalAmount, 0);
    const gachaTotal = gachaPurchases.reduce((sum, purchase) => sum + purchase.totalSpent, 0);
    return raffleTotal + gachaTotal;
  };

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
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Mis Compras</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Historial de participaciones en rifas y gachas</p>
          </div>
        </div>

        {/* Summary Card */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Resumen de Compras</h2>
              <p className="text-purple-100">Total gastado en la plataforma</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">${getTotalSpent().toLocaleString()}</div>
              <div className="text-purple-100">CLP</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-200 dark:bg-gray-700 rounded-xl p-1 mb-8">
          <button
            onClick={() => setActiveTab('rifas')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all ${
              activeTab === 'rifas'
                ? 'bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
            }`}
          >
            <Gift className="h-5 w-5" />
            <span>Rifas ({rafflePurchases.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('gachas')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all ${
              activeTab === 'gachas'
                ? 'bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
            }`}
          >
            <Gamepad2 className="h-5 w-5" />
            <span>Gachas ({gachaPurchases.length})</span>
          </button>
        </div>

        {/* Content */}
        {activeTab === 'rifas' ? (
          <div className="space-y-6">
            {rafflePurchases.length === 0 ? (
              <div className="text-center py-16">
                <Gift className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No has comprado números en rifas</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">Explora las rifas disponibles y participa por increíbles premios</p>
                <button
                  onClick={() => onNavigate('gallery')}
                  className="bg-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-purple-700 transition-colors"
                >
                  Ver Rifas
                </button>
              </div>
            ) : (
              rafflePurchases.map((purchase) => (
                <div key={purchase.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                  <div className="flex items-start space-x-4">
                    {purchase.raffleImage && (
                      <img
                        src={purchase.raffleImage}
                        alt={purchase.raffleTitle}
                        className="w-24 h-24 object-cover rounded-xl"
                      />
                    )}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                            {purchase.raffleTitle}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>Sorteo: {new Date(purchase.drawDate).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <DollarSign className="h-4 w-4" />
                              <span>${purchase.totalAmount.toLocaleString()} {purchase.currency}</span>
                            </div>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          purchase.isActive
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400'
                        }`}>
                          {purchase.isActive ? 'Activa' : 'Finalizada'}
                        </span>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                          Números comprados ({purchase.numbers.length}):
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {purchase.numbers.map((number) => (
                            <span
                              key={number}
                              className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-lg font-medium"
                            >
                              {number}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Comprado el {purchase.purchaseDate.toLocaleDateString()}
                        </span>
                        <button
                          onClick={() => onNavigate('raffle', purchase.raffleId)}
                          className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors"
                        >
                          Ver Rifa
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {gachaPurchases.length === 0 ? (
              <div className="text-center py-16">
                <Gamepad2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No has jugado en máquinas gacha</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">Descubre las máquinas gacha disponibles y gana premios únicos</p>
                <button
                  onClick={() => onNavigate('gachas')}
                  className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-indigo-700 transition-colors"
                >
                  Ver Gachas
                </button>
              </div>
            ) : (
              gachaPurchases.map((purchase) => (
                <div key={purchase.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {purchase.gachaTitle}
                      </h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
                          <Gamepad2 className="h-4 w-4" />
                          <span>{purchase.capsulesOpened} cápsulas abiertas</span>
                        </div>
                        <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
                          <DollarSign className="h-4 w-4" />
                          <span>${purchase.totalSpent.toLocaleString()} {purchase.currency}</span>
                        </div>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      purchase.isActive
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400'
                    }`}>
                      {purchase.isActive ? 'Disponible' : 'No disponible'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Última jugada: {purchase.lastPlayDate.toLocaleDateString()}
                    </span>
                    <button
                      onClick={() => onNavigate('gacha', purchase.gachaId)}
                      className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                    >
                      Ver Gacha
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};