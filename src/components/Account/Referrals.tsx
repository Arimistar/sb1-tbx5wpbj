import React, { useState, useEffect } from 'react';
import { ArrowLeft, Copy, Users, Gift, Gamepad2, Star, CheckCircle } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface ReferralsProps {
  onNavigate: (view: string) => void;
}

interface Referral {
  id: string;
  username: string;
  joinDate: Date;
  pointsGenerated: number;
  isActive: boolean;
}

interface RewardItem {
  id: string;
  type: 'gacha' | 'raffle';
  title: string;
  cost: number;
  description: string;
  available: boolean;
}

export const Referrals: React.FC<ReferralsProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  const [referralCode, setReferralCode] = useState('');
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [rewards, setRewards] = useState<RewardItem[]>([]);
  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => {
    // Generar código de referido basado en el usuario
    if (user) {
      setReferralCode(`GACHITA${user.id.toUpperCase().slice(0, 6)}`);
    }

    // Mock data
    const mockReferrals: Referral[] = [
      {
        id: '1',
        username: 'juan_gamer',
        joinDate: new Date('2024-01-15'),
        pointsGenerated: 150,
        isActive: true
      },
      {
        id: '2',
        username: 'maria_kawaii',
        joinDate: new Date('2024-01-20'),
        pointsGenerated: 200,
        isActive: true
      },
      {
        id: '3',
        username: 'carlos_tech',
        joinDate: new Date('2024-01-25'),
        pointsGenerated: 100,
        isActive: true
      }
    ];

    const mockRewards: RewardItem[] = [
      {
        id: '1',
        type: 'gacha',
        title: '3 Tickets Gacha Kawaii',
        cost: 100,
        description: '3 intentos gratis en la máquina gacha de peluches',
        available: true
      },
      {
        id: '2',
        type: 'raffle',
        title: '2 Números Rifa Premium',
        cost: 150,
        description: '2 números gratis en cualquier rifa activa',
        available: true
      },
      {
        id: '3',
        type: 'gacha',
        title: '5 Tickets Gacha RGB',
        cost: 200,
        description: '5 intentos gratis en máquinas gacha de accesorios',
        available: true
      },
      {
        id: '4',
        type: 'raffle',
        title: '5 Números Rifa Especial',
        cost: 300,
        description: '5 números gratis + buff extra automático',
        available: true
      }
    ];

    setReferrals(mockReferrals);
    setRewards(mockRewards);
    setTotalPoints(mockReferrals.reduce((sum, ref) => sum + ref.pointsGenerated, 0));
  }, [user]);

  const copyReferralCode = () => {
    navigator.clipboard.writeText(`https://gachita.uno/register?ref=${referralCode}`);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const redeemReward = (rewardId: string) => {
    const reward = rewards.find(r => r.id === rewardId);
    if (reward && totalPoints >= reward.cost) {
      setTotalPoints(prev => prev - reward.cost);
      // Aquí se procesaría el canje del premio
      alert(`¡Has canjeado: ${reward.title}!`);
    }
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
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Programa de Referidos</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Invita amigos y gana puntos canjeables</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Panel Principal */}
          <div className="lg:col-span-2 space-y-8">
            {/* Tu Código de Referido */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white">
              <h2 className="text-2xl font-bold mb-4">Tu Código de Referido</h2>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-mono font-bold">{referralCode}</span>
                  <button
                    onClick={copyReferralCode}
                    className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors"
                  >
                    {copiedCode ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <Copy className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
              <p className="text-purple-100 mb-4">
                Comparte este enlace con tus amigos:
              </p>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
                <code className="text-sm break-all">
                  https://gachita.uno/register?ref={referralCode}
                </code>
              </div>
            </div>

            {/* Cómo Funciona */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">¿Cómo Funciona?</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-600 dark:text-purple-400 font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Comparte tu código</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Invita a tus amigos usando tu enlace de referido</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-600 dark:text-purple-400 font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Ellos se registran</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Cuando se registren con tu código, ambos reciben puntos</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-600 dark:text-purple-400 font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Ganas puntos</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Acumulas puntos por cada actividad de tus referidos</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-600 dark:text-purple-400 font-bold">4</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Canjea premios</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Usa tus puntos para obtener tickets y números gratis</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tus Referidos */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Tus Referidos ({referrals.length})
              </h3>
              {referrals.length === 0 ? (
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">Aún no has referido a nadie</p>
                  <p className="text-gray-500 dark:text-gray-500 text-sm">¡Comparte tu código y comienza a ganar puntos!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {referrals.map((referral) => (
                    <div key={referral.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">
                            {referral.username.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">{referral.username}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Se unió el {referral.joinDate.toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-purple-600 dark:text-purple-400">
                          +{referral.pointsGenerated} pts
                        </div>
                        <div className={`text-xs px-2 py-1 rounded-full ${
                          referral.isActive 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400'
                        }`}>
                          {referral.isActive ? 'Activo' : 'Inactivo'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Puntos Totales */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center">
              <Star className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Puntos Totales</h3>
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                {totalPoints.toLocaleString()}
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Puntos disponibles para canjear</p>
            </div>

            {/* Tienda de Recompensas */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Tienda de Recompensas</h3>
              <div className="space-y-4">
                {rewards.map((reward) => (
                  <div key={reward.id} className="border border-gray-200 dark:border-gray-600 rounded-xl p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {reward.type === 'gacha' ? (
                          <Gamepad2 className="h-5 w-5 text-indigo-600" />
                        ) : (
                          <Gift className="h-5 w-5 text-purple-600" />
                        )}
                        <h4 className="font-medium text-gray-900 dark:text-white text-sm">{reward.title}</h4>
                      </div>
                      <span className="text-sm font-bold text-purple-600 dark:text-purple-400">
                        {reward.cost} pts
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">{reward.description}</p>
                    <button
                      onClick={() => redeemReward(reward.id)}
                      disabled={totalPoints < reward.cost || !reward.available}
                      className={`w-full py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                        totalPoints >= reward.cost && reward.available
                          ? 'bg-purple-600 text-white hover:bg-purple-700'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {totalPoints >= reward.cost ? 'Canjear' : 'Puntos insuficientes'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};