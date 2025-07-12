import React from 'react';
import { Home, BarChart3, Settings, Gift, Gamepad2, X, ShoppingBag, Users, TrendingUp, Dice6, User, CreditCard, Shield, Camera } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentView: string;
  onViewChange: (view: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, currentView, onViewChange }) => {
  const { user } = useAuth();

  const menuSections = [
    {
      title: 'Principal',
      items: [
        { id: 'home', label: 'Home', icon: Home },
      ]
    },
    {
      title: 'Galerías',
      items: [
        { id: 'gachas', label: 'Galería de Gachas', icon: Gamepad2 },
        { id: 'gallery', label: 'Galería de Rifas', icon: Dice6 },
      ]
    },
    {
      title: 'Mi Cuenta',
      items: [
        { id: 'my-raffles', label: 'Mis Rifas', icon: Gift },
        { id: 'my-gachas', label: 'Mis Gachas', icon: Gamepad2 },
        { id: 'my-purchases', label: 'Mis Compras', icon: ShoppingBag },
        { id: 'referrals', label: 'Referidos', icon: Users },
        { id: 'analytics', label: 'Análisis', icon: BarChart3 },
      ]
    },
    {
      title: 'Configuración de la cuenta',
      items: [
        { id: 'account-settings', label: 'Administrar Cuenta', icon: User },
        { id: 'profile-photo', label: 'Foto de Perfil', icon: Camera },
        { id: 'privacy', label: 'Privacidad', icon: Shield },
        { id: 'payment-methods', label: 'Medios de Pago', icon: CreditCard },
        { id: 'verification', label: 'Verificación', icon: Camera },
        { id: 'settings', label: 'Configuración General', icon: Settings },
      ]
    }
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed left-0 top-0 h-full w-64 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-r border-gray-200 dark:border-gray-700 z-50 transform transition-all duration-300 overflow-y-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
      `}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700 lg:hidden">
          <div className="flex items-center space-x-2">
            <img 
              src="/src/assets/logo gachita.uno.png" 
              alt="Gachita.uno" 
              className="h-8 w-auto object-contain"
            />
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X className="h-6 w-6 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        <nav className="mt-4 lg:mt-8 pb-8">
          {menuSections.map((section, sectionIndex) => (
            <div key={section.title} className={sectionIndex > 0 ? 'mt-8' : ''}>
              <h3 className="px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                {section.title}
              </h3>
              {section.items.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onViewChange(item.id);
                      onClose();
                    }}
                    className={`
                      w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors
                      ${currentView === item.id
                        ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border-r-2 border-gray-600 dark:border-gray-300'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                      }
                    `}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </nav>
      </div>
    </>
  );
};