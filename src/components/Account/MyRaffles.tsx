import React, { useState, useEffect } from 'react';
import { ArrowLeft, Eye, Users, DollarSign, Settings, Play, ToggleLeft, ToggleRight, Calendar, Share2 } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface MyRafflesProps {
  onNavigate: (view: string, raffleId?: string) => void;
}

interface RaffleData {
  id: string;
  title: string;
  description: string;
  image?: string;
  creatorId: string;
  maxNumbers: number;
  soldNumbers: { number: number; buyerName: string; isAnonymous: boolean }[];
  pricePerNumber: number;
  currency: string;
  drawDate: string;
  isActive: boolean;
  buffExtraEnabled: boolean;
  totalViews: number;
  createdAt: Date;
}

export const MyRaffles: React.FC<MyRafflesProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  const [myRaffles, setMyRaffles] = useState<RaffleData[]>([]);
  const [selectedRaffle, setSelectedRaffle] = useState<RaffleData | null>(null);

  useEffect(() => {
    // Mock data - en producción vendría de la API
    const mockRaffles: RaffleData[] = [
      {
        id: '1',
        title: 'iPhone 15 Pro Max Titanio',
        description: 'El último iPhone con 1TB de almacenamiento',
        image: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
        creatorId: user?.id || '1',
        maxNumbers: 500,
        soldNumbers: [
          { number: 1, buyerName: 'Juan Pérez', isAnonymous: false },
          { number: 15, buyerName: 'Anónimo', isAnonymous: true },
          { number: 23, buyerName: 'María González', isAnonymous: false },
          { number: 45, buyerName: 'Anónimo', isAnonymous: true },
          { number: 67, buyerName: 'Carlos Silva', isAnonymous: false },
        ],
        pricePerNumber: 15000,
        currency: 'CLP',
        drawDate: '2024-12-25T20:00:00',
        isActive: true,
        buffExtraEnabled: false,
        totalViews: 1247,
        createdAt: new Date('2024-01-15')
      },
      {
        id: '2',
        title: 'PlayStation 5 + Juegos',
        description: 'Consola PS5 con 5 juegos exclusivos',
        image: 'https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
        creatorId: user?.id || '1',
        maxNumbers: 300,
        soldNumbers: [
          { number: 5, buyerName: 'Ana López', isAnonymous: false },
          { number: 12, buyerName: 'Anónimo', isAnonymous: true },
          { number: 28, buyerName: 'Pedro Martín', isAnonymous: false },
        ],
        pricePerNumber: 8000,
        currency: 'CLP',
        drawDate: '2024-12-30T19:00:00',
        isActive: true,
        buffExtraEnabled: true,
        totalViews: 892,
        createdAt: new Date('2024-01-20')
      }
    ];
    setMyRaffles(mockRaffles);
  }, [user]);

  const toggleBuffExtra = (raffleId: string) => {
    setMyRaffles(prev => prev.map(raffle => 
      raffle.id === raffleId 
        ? { ...raffle, buffExtraEnabled: !raffle.buffExtraEnabled }
        : raffle
    ));
  };

  const getTotalRevenue = (raffle: RaffleData) => {
    return raffle.soldNumbers.length * raffle.pricePerNumber;
  };

  const startDraw = (raffleId: string) => {
    // Navegar a la vista de la rifa con modo de sorteo
    onNavigate('raffle', raffleId);
  };

  if (selectedRaffle) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-6xl mx-auto p-6">
          {/* Header */}
          <div className="flex items-center mb-8">
            <button
              onClick={() => setSelectedRaffle(null)}
              className="mr-4 p-2 rounded-xl hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors"
            >
              <ArrowLeft className="h-6 w-6 text-gray-600 dark:text-gray-400" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Administrar Rifa</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Panel de control del creador</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Vista previa de la rifa */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Vista Previa</h2>
                {selectedRaffle.image && (
                  <img
                    src={selectedRaffle.image}
                    alt={selectedRaffle.title}
                    className="w-full h-48 object-cover rounded-xl mb-4"
                  />
                )}
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{selectedRaffle.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{selectedRaffle.description}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                  <span>Sorteo: {new Date(selectedRaffle.drawDate).toLocaleString()}</span>
                  <span>•</span>
                  <span>{selectedRaffle.maxNumbers} números</span>
                </div>
              </div>

              {/* Números vendidos */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Números Vendidos ({selectedRaffle.soldNumbers.length}/{selectedRaffle.maxNumbers})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                  {selectedRaffle.soldNumbers.map((sale, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <span className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                          {sale.number}
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {sale.isAnonymous ? 'Anónimo' : sale.buyerName}
                        </span>
                      </div>
                      <span className="text-green-600 dark:text-green-400 font-semibold">
                        ${selectedRaffle.pricePerNumber.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Panel de control */}
            <div className="space-y-6">
              {/* Estadísticas */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Estadísticas</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-5 w-5 text-green-600" />
                      <span className="text-gray-600 dark:text-gray-400">Total recaudado</span>
                    </div>
                    <span className="font-bold text-green-600 text-lg">
                      ${getTotalRevenue(selectedRaffle).toLocaleString()} CLP
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Eye className="h-5 w-5 text-blue-600" />
                      <span className="text-gray-600 dark:text-gray-400">Visitas únicas</span>
                    </div>
                    <span className="font-bold text-blue-600 text-lg">
                      {selectedRaffle.totalViews.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Users className="h-5 w-5 text-purple-600" />
                      <span className="text-gray-600 dark:text-gray-400">Participantes</span>
                    </div>
                    <span className="font-bold text-purple-600 text-lg">
                      {selectedRaffle.soldNumbers.length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Controles */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Controles</h3>
                <div className="space-y-4">
                  {/* Toggle Buff Extra */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Buff Extra</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Permitir compras extra cuando se agoten números</p>
                    </div>
                    <button
                      onClick={() => toggleBuffExtra(selectedRaffle.id)}
                      className="flex items-center"
                    >
                      {selectedRaffle.buffExtraEnabled ? (
                        <ToggleRight className="h-8 w-8 text-green-600" />
                      ) : (
                        <ToggleLeft className="h-8 w-8 text-gray-400" />
                      )}
                    </button>
                  </div>

                  {/* Botón Iniciar Sorteo */}
                  <button
                    onClick={() => startDraw(selectedRaffle.id)}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                  >
                    <Play className="h-5 w-5" />
                    <span>Iniciar Sorteo</span>
                  </button>

                  {/* Compartir */}
                  <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                    <Share2 className="h-5 w-5" />
                    <span>Compartir Rifa</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Mis Rifas</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Administra tus rifas creadas</p>
          </div>
        </div>

        {myRaffles.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <Settings className="h-12 w-12 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">¡Aún no has creado rifas!</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
              Crea tu primera rifa y comienza a generar ingresos con tus premios.
            </p>
            <button
              onClick={() => onNavigate('create')}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105"
            >
              Crear primera rifa
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myRaffles.map((raffle) => (
              <div
                key={raffle.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                {raffle.image && (
                  <img
                    src={raffle.image}
                    alt={raffle.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">
                    {raffle.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 text-sm">
                    {raffle.description}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div className="text-center p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="font-bold text-green-600 dark:text-green-400">
                        ${getTotalRevenue(raffle).toLocaleString()}
                      </div>
                      <div className="text-gray-600 dark:text-gray-400">Recaudado</div>
                    </div>
                    <div className="text-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="font-bold text-blue-600 dark:text-blue-400">
                        {raffle.soldNumbers.length}/{raffle.maxNumbers}
                      </div>
                      <div className="text-gray-600 dark:text-gray-400">Vendidos</div>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      raffle.isActive 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400'
                    }`}>
                      {raffle.isActive ? 'Activa' : 'Finalizada'}
                    </span>
                    <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
                      <Eye className="h-4 w-4" />
                      <span>{raffle.totalViews}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2">
                    <button
                      onClick={() => setSelectedRaffle(raffle)}
                      className="w-full bg-purple-600 text-white py-2 rounded-xl font-medium hover:bg-purple-700 transition-colors"
                    >
                      Administrar
                    </button>
                    <button
                      onClick={() => onNavigate('raffle', raffle.id)}
                      className="w-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 rounded-xl font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                    >
                      Ver Rifa
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