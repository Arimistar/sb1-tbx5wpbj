import React, { useState } from 'react';
import { Header } from './components/Layout/Header';
import { Sidebar } from './components/Layout/Sidebar';
import { HomePage } from './components/Home/HomePage';
import { CreateRaffle } from './components/Create/CreateRaffle';
import { CreateGacha } from './components/Create/CreateGacha';
import { RaffleGallery } from './components/Gallery/RaffleGallery';
import { GachaGallery } from './components/Gacha/GachaGallery';
import { LoginForm } from './components/Auth/LoginForm';
import { RegisterForm } from './components/Auth/RegisterForm';
import { RaffleView } from './components/Raffle/RaffleView';
import { GachaView } from './components/Gacha/GachaView';
import { MyRaffles } from './components/Account/MyRaffles';
import { MyGachas } from './components/Account/MyGachas';
import { MyPurchases } from './components/Account/MyPurchases';
import { Referrals } from './components/Account/Referrals';
import { Analytics } from './components/Account/Analytics';
import { AccountSettings } from './components/Account/AccountSettings';
import { useAuth } from './hooks/useAuth';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState('home');
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [selectedRaffleId, setSelectedRaffleId] = useState<string | null>(null);
  const [selectedGachaId, setSelectedGachaId] = useState<string | null>(null);
  const { user, loading } = useAuth();

  const handleViewChange = (view: string, itemId?: string) => {
    setCurrentView(view);
    if (view === 'raffle' && itemId) {
      setSelectedRaffleId(itemId);
    } else if (view === 'gacha' && itemId) {
      setSelectedGachaId(itemId);
    }
  };

  const handleShowLogin = () => {
    setShowLogin(true);
  };

  const handleShowRegister = () => {
    setShowRegister(true);
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      );
    }

    switch (currentView) {
      case 'home':
        return (
          <HomePage 
            onNavigate={handleViewChange}
            onShowLogin={handleShowLogin}
            onShowRegister={handleShowRegister}
          />
        );
      case 'create':
        return <CreateRaffle onNavigate={handleViewChange} />;
      case 'create-gacha':
        return <CreateGacha onNavigate={handleViewChange} />;
      case 'gallery':
        return <RaffleGallery onNavigate={handleViewChange} />;
      case 'gachas':
        return <GachaGallery onNavigate={handleViewChange} />;
      case 'raffle':
        return selectedRaffleId ? (
          <RaffleView raffleId={selectedRaffleId} onNavigate={handleViewChange} />
        ) : (
          <HomePage 
            onNavigate={handleViewChange}
            onShowLogin={handleShowLogin}
            onShowRegister={handleShowRegister}
          />
        );
      case 'gacha':
        return selectedGachaId ? (
          <GachaView gachaId={selectedGachaId} onNavigate={handleViewChange} />
        ) : (
          <HomePage 
            onNavigate={handleViewChange}
            onShowLogin={handleShowLogin}
            onShowRegister={handleShowRegister}
          />
        );
      case 'my-raffles':
        return user ? <MyRaffles onNavigate={handleViewChange} /> : <div className="p-6 text-center">Inicia sesión para ver tus rifas</div>;
      case 'my-gachas':
        return user ? <MyGachas onNavigate={handleViewChange} /> : <div className="p-6 text-center">Inicia sesión para ver tus gachas</div>;
      case 'my-purchases':
        return user ? <MyPurchases onNavigate={handleViewChange} /> : <div className="p-6 text-center">Inicia sesión para ver tus compras</div>;
      case 'referrals':
        return user ? <Referrals onNavigate={handleViewChange} /> : <div className="p-6 text-center">Inicia sesión para ver referidos</div>;
      case 'analytics':
        return user ? <Analytics onNavigate={handleViewChange} /> : <div className="p-6 text-center">Inicia sesión para ver análisis</div>;
      case 'account-settings':
      case 'profile-photo':
      case 'privacy':
      case 'payment-methods':
      case 'verification':
      case 'settings':
        return user ? <AccountSettings onNavigate={handleViewChange} /> : <div className="p-6 text-center">Inicia sesión para acceder a configuración</div>;
      default:
        return (
          <HomePage 
            onNavigate={handleViewChange}
            onShowLogin={handleShowLogin}
            onShowRegister={handleShowRegister}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        onShowLogin={handleShowLogin}
        onShowRegister={handleShowRegister}
      />
      
      <div className="flex">
        {user && (
          <Sidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            currentView={currentView}
            onViewChange={handleViewChange}
          />
        )}
        
        <main className={`flex-1 ${user ? 'lg:ml-64' : ''}`}>
          {renderContent()}
        </main>
      </div>

      {showLogin && (
        <LoginForm
          onClose={() => setShowLogin(false)}
          onSwitchToRegister={() => {
            setShowLogin(false);
            setShowRegister(true);
          }}
        />
      )}

      {showRegister && (
        <RegisterForm
          onClose={() => setShowRegister(false)}
          onSwitchToLogin={() => {
            setShowRegister(false);
            setShowLogin(true);
          }}
        />
      )}
    </div>
  );
}

export default App;