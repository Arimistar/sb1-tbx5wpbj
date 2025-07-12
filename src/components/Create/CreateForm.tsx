import React, { useState } from 'react';
import { Plus, Upload, Calendar, DollarSign, Users, Sparkles, Gamepad2 } from 'lucide-react';
import { Prize } from '../../types';

export const CreateForm: React.FC = () => {
  const [mode, setMode] = useState<'raffle' | 'gacha'>('raffle');
  const [visualStyle, setVisualStyle] = useState<'pixel' | 'minimal'>('minimal');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [maxNumbers, setMaxNumbers] = useState(100);
  const [pricePerNumber, setPricePerNumber] = useState(5000);
  const [currency, setCurrency] = useState('CLP');
  const [prizes, setPrizes] = useState<Prize[]>([]);
  const [drawDate, setDrawDate] = useState('');
  const [isAutomatic, setIsAutomatic] = useState(true);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [theme, setTheme] = useState('summer');

  const addPrize = () => {
    const newPrize: Prize = {
      id: Date.now().toString(),
      name: '',
      description: '',
      ...(mode === 'gacha' && {
        rarity: 'common',
        probability: 10,
      }),
      ...(mode === 'raffle' && {
        position: prizes.length + 1,
      }),
    };
    setPrizes([...prizes, newPrize]);
  };

  const updatePrize = (id: string, field: keyof Prize, value: any) => {
    setPrizes(prizes.map(prize => 
      prize.id === id ? { ...prize, [field]: value } : prize
    ));
  };

  const removePrize = (id: string) => {
    setPrizes(prizes.filter(prize => prize.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log({
      mode,
      visualStyle,
      title,
      description,
      maxNumbers,
      pricePerNumber,
      currency,
      prizes,
      drawDate,
      isAutomatic,
      isAnonymous,
      theme,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Crear Nueva Experiencia
          </h1>
          <p className="text-gray-600">
            Configura tu rifa tradicional o experiencia gacha personalizada
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Mode Selection */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tipo de Experiencia</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setMode('raffle')}
                className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                  mode === 'raffle'
                    ? 'border-purple-500 bg-purple-50 text-purple-700'
                    : 'border-gray-200 hover:border-purple-300'
                }`}
              >
                <Sparkles className="h-8 w-8 mx-auto mb-3" />
                <h4 className="font-semibold mb-2">Rifa Tradicional</h4>
                <p className="text-sm text-gray-600">
                  Sorteo clásico con números y premios fijos
                </p>
              </button>
              <button
                type="button"
                onClick={() => setMode('gacha')}
                className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                  mode === 'gacha'
                    ? 'border-purple-500 bg-purple-50 text-purple-700'
                    : 'border-gray-200 hover:border-purple-300'
                }`}
              >
                <Gamepad2 className="h-8 w-8 mx-auto mb-3" />
                <h4 className="font-semibold mb-2">Experiencia Gacha</h4>
                <p className="text-sm text-gray-600">
                  Mecánica de premios con rarezas y probabilidades
                </p>
              </button>
            </div>
          </div>

          {/* Visual Style */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Estilo Visual</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setVisualStyle('minimal')}
                className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                  visualStyle === 'minimal'
                    ? 'border-pink-500 bg-pink-50 text-pink-700'
                    : 'border-gray-200 hover:border-pink-300'
                }`}
              >
                <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-purple-400 rounded-lg mx-auto mb-3"></div>
                <h4 className="font-semibold mb-2">Aesthetic Minimalista</h4>
                <p className="text-sm text-gray-600">
                  Diseño elegante con paleta pastel
                </p>
              </button>
              <button
                type="button"
                onClick={() => setVisualStyle('pixel')}
                className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                  visualStyle === 'pixel'
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                    : 'border-gray-200 hover:border-indigo-300'
                }`}
              >
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-lg mx-auto mb-3 pixelated"></div>
                <h4 className="font-semibold mb-2">Gamer Cozy Pixel Art</h4>
                <p className="text-sm text-gray-600">
                  Estilo retro con elementos pixelados
                </p>
              </button>
            </div>
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Nombre de tu rifa o gacha"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tema Estacional
              </label>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="summer">🌞 Verano</option>
                <option value="autumn">🍂 Otoño</option>
                <option value="winter">❄️ Invierno</option>
                <option value="spring">🌸 Primavera</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Describe tu experiencia..."
              required
            />
          </div>

          {/* Configuration */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Users className="inline h-4 w-4 mr-1" />
                {mode === 'raffle' ? 'Números Máximos' : 'Intentos Máximos'}
              </label>
              <input
                type="number"
                value={maxNumbers}
                onChange={(e) => setMaxNumbers(Number(e.target.value))}
                min="1"
                max="1000"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <DollarSign className="inline h-4 w-4 mr-1" />
                Precio por {mode === 'raffle' ? 'Número' : 'Intento'}
              </label>
              <input
                type="number"
                value={pricePerNumber}
                onChange={(e) => setPricePerNumber(Number(e.target.value))}
                min="1"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Moneda
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="CLP">CLP</option>
                <option value="USD">USD</option>
                <option value="BTC">BTC</option>
                <option value="USDT">USDT</option>
                <option value="ETH">ETH</option>
                <option value="BNB">BNB</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="inline h-4 w-4 mr-1" />
              Fecha del Sorteo
            </label>
            <input
              type="datetime-local"
              value={drawDate}
              onChange={(e) => setDrawDate(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>

          {/* Prizes */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Premios</h3>
              <button
                type="button"
                onClick={addPrize}
                className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-700 transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Agregar Premio</span>
              </button>
            </div>
            
            <div className="space-y-4">
              {prizes.map((prize) => (
                <div key={prize.id} className="border border-gray-200 rounded-xl p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre del Premio
                      </label>
                      <input
                        type="text"
                        value={prize.name}
                        onChange={(e) => updatePrize(prize.id, 'name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Ej: iPhone 15 Pro"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Descripción
                      </label>
                      <input
                        type="text"
                        value={prize.description}
                        onChange={(e) => updatePrize(prize.id, 'description', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Ej: 256GB Titanio Natural"
                        required
                      />
                    </div>
                  </div>
                  
                  {mode === 'gacha' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Rareza
                        </label>
                        <select
                          value={prize.rarity}
                          onChange={(e) => updatePrize(prize.id, 'rarity', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                          <option value="common">Común</option>
                          <option value="rare">Raro</option>
                          <option value="epic">Épico</option>
                          <option value="legendary">Legendario</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Probabilidad (%)
                        </label>
                        <input
                          type="number"
                          value={prize.probability}
                          onChange={(e) => updatePrize(prize.id, 'probability', Number(e.target.value))}
                          min="0"
                          max="100"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          required
                        />
                      </div>
                    </div>
                  )}
                  
                  <div className="flex justify-end mt-4">
                    <button
                      type="button"
                      onClick={() => removePrize(prize.id)}
                      className="text-red-600 hover:text-red-700 text-sm font-medium"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Configuración</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={isAutomatic}
                  onChange={(e) => setIsAutomatic(e.target.checked)}
                  className="rounded text-purple-600 focus:ring-purple-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  Sorteo Automático
                </span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="rounded text-purple-600 focus:ring-purple-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  Compradores Anónimos
                </span>
              </label>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
            >
              Crear {mode === 'raffle' ? 'Rifa' : 'Gacha'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};