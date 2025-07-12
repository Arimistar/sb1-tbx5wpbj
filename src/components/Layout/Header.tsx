import React from 'react';
import { Menu, User, LogOut, Settings, Moon, Sun } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useDarkMode } from '../../hooks/useDarkMode';

interface HeaderProps {
  onMenuToggle: () => void;
  onShowLogin: () => void;
  onShowRegister: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuToggle, onShowLogin, onShowRegister }) => {
  const { user, logout } = useAuth();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [showDropdown, setShowDropdown] = React.useState(false);

  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-purple-100 dark:border-gray-700 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={onMenuToggle}
              className="lg:hidden p-2 rounded-md hover:bg-purple-50 dark:hover:bg-gray-800 transition-colors"
            >
              <Menu className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </button>
            <div className="flex items-center space-x-2 ml-2 lg:ml-0">
              <img 
                src="/src/assets/logo gachita.uno.png" 
                alt="Gachita.uno" 
                className="h-10 w-auto object-contain"
              />
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-purple-50 dark:hover:bg-gray-800 transition-colors"
              title={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5 text-yellow-500" />
              ) : (
                <Moon className="h-5 w-5 text-purple-600" />
              )}
            </button>

            {/* User Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-purple-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <img
                    src={user.avatar || 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'}
                    alt={user.username}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{user.username}</span>
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-purple-100 dark:border-gray-700 py-1 z-50">
                    <button className="w-full px-4 py-2 text-left text-sm hover:bg-purple-50 dark:hover:bg-gray-700 flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                      <User className="h-4 w-4" />
                      <span>Perfil</span>
                    </button>
                    <button className="w-full px-4 py-2 text-left text-sm hover:bg-purple-50 dark:hover:bg-gray-700 flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                      <Settings className="h-4 w-4" />
                      <span>Configuración</span>
                    </button>
                    <hr className="my-1 border-gray-200 dark:border-gray-600" />
                    <button
                      onClick={logout}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 flex items-center space-x-2"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Cerrar Sesión</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex space-x-4">
                <button
                  onClick={onShowLogin}
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
                >
                  Iniciar Sesión
                </button>
                <button
                  onClick={onShowRegister}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
                >
                  Registrarse
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};