import React, { useState, useEffect } from 'react';
import { ArrowLeft, TrendingUp, DollarSign, Users, Gift, Gamepad2, Eye, Calendar } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface AnalyticsProps {
  onNavigate: (view: string) => void;
}

interface AnalyticsData {
  totalPurchases: number;
  totalSpent: number;
  totalSales: number;
  totalEarned: number;
  raffleParticipations: number;
  gachaPlays: number;
  rafflesCreated: number;
  gachasCreated: number;
  averageParticipation: number;
  successRate: number;
}

export const Analytics: React.FC<AnalyticsProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  const [filter, setFilter] = useState<'all' | 'raffles' | 'gachas'>('all');
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    // Mock analytics data
    const mockAnalytics: AnalyticsData = {
      totalPurchases: 23,
      totalSpent: 76000,
      totalSales: 156,
      totalEarned: 2494000,
      raffleParticipations: 15,
      gachaPlays: 8,
      rafflesCreated: 2,
      gachasCreated: 2,
      averageParticipation: 78.5,
      successRate: 12.3
    };
    setAnalytics(mockAnalytics);
  }, [user]);

  if (!analytics) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  const getFilteredStats = () => {
    switch (filter) {
      case 'raffles':
        return {
          participations: analytics.raffleParticipations,
          created: analytics.rafflesCreated,
          type: 'Rifas'
        };
      case 'gachas':
        return {
          participations: analytics.gachaPlays,
          created: analytics.gachasCreated,
          type: 'Gachas'
        };
      default:
        return {
          participations: analytics.raffleParticipations + analytics.gachaPlays,
          created: analytics.rafflesCreated + analytics.gachasCreated,
          type: 'Total'
        };
    }
  };

  const filteredStats = getFilteredStats();

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
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Análisis</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Estadísticas de tu actividad en la plataforma</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex space-x-1 bg-gray-200 dark:bg-gray-700 rounded-xl p-1 mb-8">
          <button
            onClick={() => setFilter('all')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all ${
              filter === 'all'
                ? 'bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
            }`}
          >
            <TrendingUp className="h-5 w-5" />
            <span>Todo</span>
          </button>
          <button
            onClick={() => setFilter('raffles')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all ${
              filter === 'raffles'
                ? 'bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
            }`}
          >
            <Gift className="h-5 w-5" />
            <span>Solo Rifas</span>
          </button>
          <button
            onClick={() => setFilter('gachas')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all ${
              filter === 'gachas'
                ? 'bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
            }`}
          >
            <Gamepad2 className="h-5 w-5" />
            <span>Solo Gachas</span>
          </button>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Como Comprador */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {analytics.totalPurchases}
              </span>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Total Compras</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Como comprador</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-xl">
                <DollarSign className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <span className="text-2xl font-bold text-red-600 dark:text-red-400">
                ${analytics.totalSpent.toLocaleString()}
              </span>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Total Gastado</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">En participaciones</p>
          </div>

          {/* Como Creador */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
                <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                {analytics.totalSales}
              </span>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Total Ventas</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Como creador</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                <DollarSign className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                ${analytics.totalEarned.toLocaleString()}
              </span>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Total Ganado</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Ingresos generados</p>
          </div>
        </div>

        {/* Detailed Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Participación */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Estadísticas de Participación - {filteredStats.type}
            </h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Participaciones</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Total de participaciones</p>
                  </div>
                </div>
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {filteredStats.participations}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Promedio de Participación</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Porcentaje de éxito</p>
                  </div>
                </div>
                <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {analytics.averageParticipation}%
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                    <Gift className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Tasa de Éxito</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Premios ganados</p>
                  </div>
                </div>
                <span className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                  {analytics.successRate}%
                </span>
              </div>
            </div>
          </div>

          {/* Creación de Contenido */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Como Creador - {filteredStats.type}
            </h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    <Gift className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Contenido Creado</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Total de {filteredStats.type.toLowerCase()}</p>
                  </div>
                </div>
                <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {filteredStats.created}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                    <Eye className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Promedio de Vistas</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Por contenido creado</p>
                  </div>
                </div>
                <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                  1,569
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Ingreso Promedio</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Por contenido</p>
                  </div>
                </div>
                <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                  ${Math.round(analytics.totalEarned / filteredStats.created).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Timeline */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Actividad Reciente</h3>
          <div className="space-y-4">
            {[
              { type: 'purchase', title: 'Compraste 3 números en "iPhone 15 Pro"', date: '2024-01-25', amount: '+45,000' },
              { type: 'sale', title: 'Vendiste 5 tickets en "Gacha Kawaii"', date: '2024-01-24', amount: '+10,000' },
              { type: 'win', title: 'Ganaste en "PlayStation 5 + Juegos"', date: '2024-01-23', amount: 'Premio' },
              { type: 'create', title: 'Creaste "Accesorios Gamer RGB"', date: '2024-01-22', amount: 'Nuevo' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    activity.type === 'purchase' ? 'bg-blue-100 dark:bg-blue-900/30' :
                    activity.type === 'sale' ? 'bg-green-100 dark:bg-green-900/30' :
                    activity.type === 'win' ? 'bg-yellow-100 dark:bg-yellow-900/30' :
                    'bg-purple-100 dark:bg-purple-900/30'
                  }`}>
                    {activity.type === 'purchase' && <DollarSign className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
                    {activity.type === 'sale' && <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />}
                    {activity.type === 'win' && <Gift className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />}
                    {activity.type === 'create' && <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{activity.title}</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {activity.date}
                    </p>
                  </div>
                </div>
                <span className={`font-bold ${
                  activity.type === 'purchase' ? 'text-red-600 dark:text-red-400' :
                  activity.type === 'sale' ? 'text-green-600 dark:text-green-400' :
                  activity.type === 'win' ? 'text-yellow-600 dark:text-yellow-400' :
                  'text-purple-600 dark:text-purple-400'
                }`}>
                  {activity.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};