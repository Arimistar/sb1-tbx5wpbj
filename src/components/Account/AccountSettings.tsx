import React, { useState } from 'react';
import { ArrowLeft, User, Camera, Shield, CreditCard, Banknote, Eye, EyeOff, Upload, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface AccountSettingsProps {
  onNavigate: (view: string) => void;
}

export const AccountSettings: React.FC<AccountSettingsProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState<'profile' | 'account' | 'verification' | 'payment' | 'withdrawal' | 'privacy'>('profile');
  
  // Profile states
  const [profileImage, setProfileImage] = useState(user?.avatar || '');
  const [username, setUsername] = useState(user?.username || '');
  
  // Account states
  const [fullName, setFullName] = useState('');
  const [rut, setRut] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [email, setEmail] = useState(user?.email || '');
  const [dataConsent, setDataConsent] = useState(false);
  
  // Verification states
  const [frontId, setFrontId] = useState<string | null>(null);
  const [backId, setBackId] = useState<string | null>(null);
  const [verificationType, setVerificationType] = useState<'gray' | 'gold' | 'blue'>('gray');
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'approved' | 'rejected' | null>(null);
  
  // Payment states
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState('');
  
  // Withdrawal states
  const [bankAccount, setBankAccount] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountType, setAccountType] = useState<'checking' | 'savings'>('checking');
  const [availableBalance] = useState(125000); // Mock balance
  const [withdrawalAmount, setWithdrawalAmount] = useState('');
  
  // Privacy states
  const [displayPreference, setDisplayPreference] = useState<'username' | 'anonymous'>('username');

  const handleImageUpload = (file: File, type: 'profile' | 'front' | 'back') => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        const result = e.target.result as string;
        if (type === 'profile') {
          setProfileImage(result);
        } else if (type === 'front') {
          setFrontId(result);
        } else if (type === 'back') {
          setBackId(result);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleWithdrawal = () => {
    const amount = parseFloat(withdrawalAmount);
    if (amount >= 25000 && amount <= availableBalance) {
      alert(`Solicitud de retiro por $${amount.toLocaleString()} CLP enviada correctamente.`);
      setWithdrawalAmount('');
    }
  };

  const getVerificationBadge = () => {
    if (verificationStatus === 'approved') {
      switch (verificationType) {
        case 'gray': return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">✓ Verificado</span>;
        case 'gold': return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">👑 Colaborador</span>;
        case 'blue': return <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">⭐ Influencer</span>;
      }
    }
    return null;
  };

  const sections = [
    { id: 'profile', label: 'Foto de perfil', icon: Camera },
    { id: 'account', label: 'Administrar cuenta', icon: User },
    { id: 'verification', label: 'Verificación', icon: CheckCircle },
    { id: 'payment', label: 'Medios de pago', icon: CreditCard },
    { id: 'withdrawal', label: 'Retiros', icon: Banknote },
    { id: 'privacy', label: 'Privacidad', icon: Shield },
  ];

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
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Configuración de la Cuenta</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Administra tu perfil y configuraciones</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <nav className="space-y-2">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id as any)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-colors ${
                        activeSection === section.id
                          ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{section.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
              {/* Profile Photo Section */}
              {activeSection === 'profile' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Foto de Perfil</h2>
                  <div className="flex items-center space-x-6 mb-6">
                    <div className="relative">
                      <img
                        src={profileImage || 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover"
                      />
                      <label className="absolute bottom-0 right-0 bg-purple-600 text-white p-2 rounded-full cursor-pointer hover:bg-purple-700 transition-colors">
                        <Camera className="h-4 w-4" />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], 'profile')}
                          className="hidden"
                        />
                      </label>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Cambiar foto de perfil</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">JPG, PNG o GIF. Máximo 5MB.</p>
                    </div>
                  </div>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Nombre de usuario público
                    </label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Tu nombre de usuario"
                    />
                  </div>
                  <button className="bg-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-purple-700 transition-colors">
                    Guardar Cambios
                  </button>
                </div>
              )}

              {/* Account Management Section */}
              {activeSection === 'account' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Administrar Cuenta</h2>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Nombre completo *
                        </label>
                        <input
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          placeholder="Juan Pérez"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          RUT *
                        </label>
                        <input
                          type="text"
                          value={rut}
                          onChange={(e) => setRut(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          placeholder="12.345.678-9"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Dirección de envío *
                      </label>
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Av. Providencia 1234, Providencia"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Teléfono *
                        </label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          placeholder="+56 9 1234 5678"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Código postal *
                        </label>
                        <input
                          type="text"
                          value={postalCode}
                          onChange={(e) => setPostalCode(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          placeholder="7500000"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Correo electrónico *
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="tu@email.com"
                      />
                    </div>
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-xl p-4">
                      <div className="flex items-start space-x-3">
                        <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-yellow-800 dark:text-yellow-300">Importante</h4>
                          <p className="text-yellow-700 dark:text-yellow-400 text-sm">
                            Quienes no completen estos datos no pueden recibir premios físicos.
                          </p>
                        </div>
                      </div>
                    </div>
                    <label className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        checked={dataConsent}
                        onChange={(e) => setDataConsent(e.target.checked)}
                        className="mt-1 w-5 h-5 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Acepto compartir mis datos personales para efectos de entrega de premios *
                      </span>
                    </label>
                    <button className="bg-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-purple-700 transition-colors">
                      Guardar Información
                    </button>
                  </div>
                </div>
              )}

              {/* Verification Section */}
              {activeSection === 'verification' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Verificación de Identidad</h2>
                  <div className="space-y-6">
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl p-4">
                      <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-2">Verificación requerida</h4>
                      <p className="text-blue-700 dark:text-blue-400 text-sm">
                        Para crear rifas o gachas necesitas verificar tu identidad subiendo ambos lados de tu carnet.
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Carnet - Lado frontal
                        </label>
                        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 text-center">
                          {frontId ? (
                            <img src={frontId} alt="Front ID" className="w-full h-32 object-cover rounded-lg" />
                          ) : (
                            <div>
                              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                              <p className="text-gray-600 dark:text-gray-400 text-sm">Subir imagen frontal</p>
                            </div>
                          )}
                          <label className="mt-2 bg-purple-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-purple-700 transition-colors inline-block">
                            Seleccionar archivo
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], 'front')}
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Carnet - Lado posterior
                        </label>
                        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 text-center">
                          {backId ? (
                            <img src={backId} alt="Back ID" className="w-full h-32 object-cover rounded-lg" />
                          ) : (
                            <div>
                              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                              <p className="text-gray-600 dark:text-gray-400 text-sm">Subir imagen posterior</p>
                            </div>
                          )}
                          <label className="mt-2 bg-purple-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-purple-700 transition-colors inline-block">
                            Seleccionar archivo
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], 'back')}
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Tipo de verificación deseado
                      </label>
                      <div className="space-y-3">
                        <label className="flex items-center space-x-3">
                          <input
                            type="radio"
                            name="verification"
                            value="gray"
                            checked={verificationType === 'gray'}
                            onChange={(e) => setVerificationType(e.target.value as any)}
                            className="w-4 h-4 text-purple-600"
                          />
                          <span className="text-gray-700 dark:text-gray-300">
                            <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs mr-2">✓ Gris</span>
                            Verificado simple
                          </span>
                        </label>
                        <label className="flex items-center space-x-3">
                          <input
                            type="radio"
                            name="verification"
                            value="gold"
                            checked={verificationType === 'gold'}
                            onChange={(e) => setVerificationType(e.target.value as any)}
                            className="w-4 h-4 text-purple-600"
                          />
                          <span className="text-gray-700 dark:text-gray-300">
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs mr-2">👑 Dorado</span>
                            Creador colaborador
                          </span>
                        </label>
                        <label className="flex items-center space-x-3">
                          <input
                            type="radio"
                            name="verification"
                            value="blue"
                            checked={verificationType === 'blue'}
                            onChange={(e) => setVerificationType(e.target.value as any)}
                            className="w-4 h-4 text-purple-600"
                          />
                          <span className="text-gray-700 dark:text-gray-300">
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs mr-2">⭐ Azul</span>
                            Creador influencer
                          </span>
                        </label>
                      </div>
                    </div>

                    {getVerificationBadge() && (
                      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-xl p-4">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                          <span className="text-green-800 dark:text-green-300">Estado actual: {getVerificationBadge()}</span>
                        </div>
                      </div>
                    )}

                    <button className="bg-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-purple-700 transition-colors">
                      Enviar para Verificación
                    </button>
                  </div>
                </div>
              )}

              {/* Payment Methods Section */}
              {activeSection === 'payment' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Medios de Pago</h2>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Número de tarjeta
                        </label>
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          placeholder="1234 5678 9012 3456"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Nombre en la tarjeta
                        </label>
                        <input
                          type="text"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          placeholder="Juan Pérez"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Fecha de vencimiento
                        </label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          placeholder="MM/AA"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          CVV
                        </label>
                        <input
                          type="text"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          placeholder="123"
                        />
                      </div>
                    </div>
                    <button className="bg-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-purple-700 transition-colors">
                      Guardar Tarjeta
                    </button>
                  </div>
                </div>
              )}

              {/* Withdrawal Section */}
              {activeSection === 'withdrawal' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Retiros</h2>
                  <div className="space-y-6">
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-2">Saldo Disponible</h3>
                      <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                        ${availableBalance.toLocaleString()} CLP
                      </div>
                      <p className="text-green-700 dark:text-green-400 text-sm mt-1">
                        Mínimo para retiro: $25.000 CLP
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Número de cuenta bancaria
                        </label>
                        <input
                          type="text"
                          value={bankAccount}
                          onChange={(e) => setBankAccount(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          placeholder="12345678"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Banco
                        </label>
                        <select
                          value={bankName}
                          onChange={(e) => setBankName(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        >
                          <option value="">Seleccionar banco</option>
                          <option value="banco-chile">Banco de Chile</option>
                          <option value="banco-estado">BancoEstado</option>
                          <option value="santander">Santander</option>
                          <option value="bci">BCI</option>
                          <option value="scotiabank">Scotiabank</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Tipo de cuenta
                      </label>
                      <div className="flex space-x-4">
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name="accountType"
                            value="checking"
                            checked={accountType === 'checking'}
                            onChange={(e) => setAccountType(e.target.value as any)}
                            className="w-4 h-4 text-purple-600"
                          />
                          <span className="text-gray-700 dark:text-gray-300">Cuenta Corriente</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name="accountType"
                            value="savings"
                            checked={accountType === 'savings'}
                            onChange={(e) => setAccountType(e.target.value as any)}
                            className="w-4 h-4 text-purple-600"
                          />
                          <span className="text-gray-700 dark:text-gray-300">Cuenta de Ahorros</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Monto a retirar
                      </label>
                      <input
                        type="number"
                        value={withdrawalAmount}
                        onChange={(e) => setWithdrawalAmount(e.target.value)}
                        min="25000"
                        max={availableBalance}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="25000"
                      />
                    </div>

                    <button
                      onClick={handleWithdrawal}
                      disabled={!withdrawalAmount || parseFloat(withdrawalAmount) < 25000 || parseFloat(withdrawalAmount) > availableBalance}
                      className="bg-green-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Solicitar Retiro
                    </button>
                  </div>
                </div>
              )}

              {/* Privacy Section */}
              {activeSection === 'privacy' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Configuración de Privacidad</h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        ¿Cómo deseas aparecer en rifas y gachas?
                      </h3>
                      <div className="space-y-3">
                        <label className="flex items-center space-x-3 p-4 border border-gray-200 dark:border-gray-600 rounded-xl">
                          <input
                            type="radio"
                            name="display"
                            value="username"
                            checked={displayPreference === 'username'}
                            onChange={(e) => setDisplayPreference(e.target.value as any)}
                            className="w-4 h-4 text-purple-600"
                          />
                          <div className="flex items-center space-x-2">
                            <Eye className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                            <div>
                              <span className="font-medium text-gray-900 dark:text-white">Mostrar nombre de usuario</span>
                              <p className="text-gray-600 dark:text-gray-400 text-sm">Tu nombre será visible para otros usuarios</p>
                            </div>
                          </div>
                        </label>
                        <label className="flex items-center space-x-3 p-4 border border-gray-200 dark:border-gray-600 rounded-xl">
                          <input
                            type="radio"
                            name="display"
                            value="anonymous"
                            checked={displayPreference === 'anonymous'}
                            onChange={(e) => setDisplayPreference(e.target.value as any)}
                            className="w-4 h-4 text-purple-600"
                          />
                          <div className="flex items-center space-x-2">
                            <EyeOff className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                            <div>
                              <span className="font-medium text-gray-900 dark:text-white">Mostrar como anónimo</span>
                              <p className="text-gray-600 dark:text-gray-400 text-sm">Aparecerás como "Anónimo" en todas las participaciones</p>
                            </div>
                          </div>
                        </label>
                      </div>
                    </div>
                    <button className="bg-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-purple-700 transition-colors">
                      Guardar Preferencias
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};