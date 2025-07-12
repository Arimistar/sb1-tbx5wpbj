import React from 'react';
import { BarChart3, DollarSign, Users, Gift } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const stats = [
    { label: 'Rifas Activas', value: '12', icon: Gift, color: 'purple' },
    { label: 'Participantes', value: '1,247', icon: Users, color: 'blue' },
    { label: 'Ingresos', value: '$45,680', icon: DollarSign, color: 'green' },
    { label: 'Conversión', value: '23.4%', icon: BarChart3, color: 'orange' },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Resumen de tu actividad en Gachita</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-${stat.color}-100`}>
                  <Icon className={`h-6 w-6 text-${stat.color}-600`} />
                </div>
                <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
              </div>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Actividad Reciente</h2>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Gift className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Nueva compra en "iPhone 15 Pro"</p>
                  <p className="text-sm text-gray-600">Hace 2 horas</p>
                </div>
              </div>
              <span className="text-lg font-semibold text-green-600">+$15,000</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};