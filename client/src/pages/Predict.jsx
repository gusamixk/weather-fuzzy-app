import { useState } from 'react';
import axios from 'axios';
import { Cloud, ArrowLeft, Sun, CloudRain, Wind, Thermometer, Droplets, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Predict() {
  const [form, setForm] = useState({ suhu: '', kelembapan: '', kecepatan_angin: '' });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('http://localhost:5000/api/predict', form);
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Terjadi kesalahan saat memproses data.');
    } finally {
      setLoading(false);
    }
  };

  const renderIcon = (condition) => {
    switch (condition.toLowerCase()) {
      case 'cerah': return <Sun className="w-8 h-8 text-yellow-500" />;
      case 'mendung': return <Cloud className="w-8 h-8 text-gray-500" />;
      case 'hujan': return <CloudRain className="w-8 h-8 text-blue-500" />;
      default: return <Sparkles className="w-8 h-8 text-indigo-500" />;
    }
  };

  const getConditionColor = (condition) => {
    switch (condition.toLowerCase()) {
      case 'cerah': return 'from-yellow-400 to-orange-500';
      case 'mendung': return 'from-gray-400 to-gray-600';
      case 'hujan': return 'from-blue-400 to-blue-600';
      default: return 'from-indigo-400 to-purple-500';
    }
  };

  const MembershipChart = ({ title, data, colors, icon }) => {
    const maxValue = Math.max(...Object.values(data));
    
    return (
      <div className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm rounded-2xl p-6">
        <div className="flex items-center space-x-2 mb-6">
          <div className={`bg-gradient-to-r ${colors.bg} p-2 rounded-lg`}>
            {icon}
          </div>
          <h4 className="text-lg font-bold text-gray-800">{title}</h4>
        </div>
        
        <div className="space-y-4">
          {Object.entries(data).map(([key, value], index) => (
            <div key={key} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-medium capitalize">{key}</span>
                <span className="text-sm font-bold text-gray-800">{value.toFixed(2)}</span>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r ${colors.bars[index]} rounded-full transition-all duration-1000 ease-out`}
                  style={{ 
                    width: `${(value / maxValue) * 100}%`,
                    animation: `slideIn 1s ease-out ${index * 0.2}s both`
                  }}
                />
              </div>
              
              {/* Value indicator */}
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <div 
                      key={i}
                      className={`w-2 h-2 rounded-full transition-all duration-500 ${
                        i < Math.round(value * 5) 
                          ? `bg-gradient-to-r ${colors.bars[index]}` 
                          : 'bg-gray-300'
                      }`}
                      style={{ animationDelay: `${(index * 0.2) + (i * 0.1)}s` }}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-500">
                  {value > 0.7 ? 'Tinggi' : value > 0.4 ? 'Sedang' : 'Rendah'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="w-full bg-white/90 backdrop-blur-md shadow-lg py-4 px-8 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-2 rounded-xl">
            <Cloud className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            FuzzyWeather
          </h1>
        </div>
        <Link 
          to="/" 
          className="text-indigo-600 hover:text-purple-600 font-semibold transition-colors duration-300 flex items-center space-x-1"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Beranda</span>
        </Link>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium">
              🔮 Logika Fuzzy
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Prediksi Cuaca dengan{' '}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Logika Fuzzy
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Masukkan data cuaca saat ini untuk mendapatkan prediksi akurat menggunakan teknologi logika fuzzy terdepan.
          </p>
        </div>

        {/* Input Form - TANPA BORDER CONTAINER */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
            Masukkan Data Cuaca Saat Ini
          </h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Suhu Input */}
              <div className="group">
                <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-3">
                  <div className="bg-red-100 p-2 rounded-lg">
                    <Thermometer className="w-4 h-4 text-red-600" />
                  </div>
                  <span>Suhu (°C)</span>
                </label>
                <input 
                  type="number" 
                  name="suhu" 
                  value={form.suhu} 
                  onChange={handleChange} 
                  required 
                  placeholder="Contoh: 28"
                  className="w-full rounded-2xl border-2 border-gray-200 px-4 py-3 text-lg focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition-all duration-300 bg-white/90 backdrop-blur-sm shadow-lg"
                />
              </div>

              {/* Kelembapan Input */}
              <div className="group">
                <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Droplets className="w-4 h-4 text-blue-600" />
                  </div>
                  <span>Kelembapan (%)</span>
                </label>
                <input 
                  type="number" 
                  name="kelembapan" 
                  value={form.kelembapan} 
                  onChange={handleChange} 
                  required 
                  placeholder="Contoh: 65"
                  className="w-full rounded-2xl border-2 border-gray-200 px-4 py-3 text-lg focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition-all duration-300 bg-white/90 backdrop-blur-sm shadow-lg"
                />
              </div>

              {/* Kecepatan Angin Input */}
              <div className="group">
                <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Wind className="w-4 h-4 text-green-600" />
                  </div>
                  <span>Kecepatan Angin (m/s)</span>
                </label>
                <input 
                  type="number" 
                  name="kecepatan_angin" 
                  value={form.kecepatan_angin} 
                  onChange={handleChange} 
                  required 
                  placeholder="Contoh: 5"
                  className="w-full rounded-2xl border-2 border-gray-200 px-4 py-3 text-lg focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition-all duration-300 bg-white/90 backdrop-blur-sm shadow-lg"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <button 
                type="submit" 
                disabled={loading}
                className="group bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-12 rounded-2xl font-semibold text-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Memproses...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>Prediksi Cuaca</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Error Message */}
          {error && (
            <div className="mt-6 p-4 bg-red-50 rounded-2xl shadow-lg">
              <p className="text-red-700 text-center font-medium">{error}</p>
            </div>
          )}
        </div>

        {/* Results Section - TANPA BORDER CONTAINER */}
        {result && (
          <div className="mt-12">
            {/* Result Header */}
            <div className="text-center mb-12">
              <div className="flex justify-center items-center space-x-4 mb-6">
                <div className="animate-bounce">
                  {renderIcon(result.prediksi.kondisi)}
                </div>
                <h3 className="text-3xl font-bold text-gray-800">
                  Hasil Prediksi: {result.prediksi.kondisi}
                </h3>
              </div>
              
              <div className="flex justify-center space-x-8 text-sm mb-8">
                <div className="bg-gradient-to-r from-indigo-100 to-purple-100 px-6 py-3 rounded-2xl shadow-lg">
                  <span className="text-gray-600">Skor Kepastian: </span>
                  <span className="font-bold text-indigo-700 text-lg">{result.prediksi.skor}</span>
                </div>
                <div className="bg-gradient-to-r from-purple-100 to-pink-100 px-6 py-3 rounded-2xl shadow-lg">
                  <span className="text-gray-600">Tingkat Kepastian: </span>
                  <span className="font-bold text-purple-700 text-lg">{result.prediksi.tingkat_kepastian}%</span>
                </div>
              </div>
            </div>

            {/* Membership Values with Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              <MembershipChart 
                title="Analisis Suhu"
                data={result.nilai_keanggotaan.suhu}
                colors={{
                  bg: 'from-red-100 to-orange-100',
                  bars: ['from-blue-400 to-blue-600', 'from-green-400 to-green-600', 'from-red-400 to-red-600']
                }}
                icon={<Thermometer className="w-5 h-5 text-red-600" />}
              />
              
              <MembershipChart 
                title="Analisis Kelembapan"
                data={result.nilai_keanggotaan.kelembapan}
                colors={{
                  bg: 'from-blue-100 to-cyan-100',
                  bars: ['from-yellow-400 to-orange-500', 'from-green-400 to-green-600', 'from-blue-400 to-blue-600']
                }}
                icon={<Droplets className="w-5 h-5 text-blue-600" />}
              />
              
              <MembershipChart 
                title="Analisis Angin"
                data={result.nilai_keanggotaan.kecepatan_angin}
                colors={{
                  bg: 'from-green-100 to-teal-100',
                  bars: ['from-green-400 to-green-600', 'from-yellow-400 to-orange-500', 'from-red-400 to-red-600']
                }}
                icon={<Wind className="w-5 h-5 text-green-600" />}
              />
            </div>

            {/* Action Button */}
            <div className="flex justify-center">
              <button 
                onClick={() => {
                  setResult(null);
                  setForm({ suhu: '', kelembapan: '', kecepatan_angin: '' });
                }}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-8 rounded-2xl font-semibold hover:shadow-xl transition-all duration-300 shadow-lg"
              >
                Prediksi Lagi
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            width: 0%;
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}