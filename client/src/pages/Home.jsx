// import { Link } from 'react-router-dom'; // Untuk penggunaan dengan React Router
import { Cloud, ArrowRight, Thermometer, Droplets, Wind, Brain, Zap, Target, Shield, Users, Award } from 'lucide-react';

export default function Home() {
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
        <div className="flex items-center space-x-6">
          <a 
            href="#features" 
            className="text-gray-600 hover:text-indigo-600 font-medium transition-colors duration-300"
          >
            Fitur
          </a>
          <a 
            href="#how-it-works" 
            className="text-gray-600 hover:text-indigo-600 font-medium transition-colors duration-300"
          >
            Cara Kerja
          </a>
          <a 
            href="/predict" 
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center space-x-1"
          >
            <span>Prediksi</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto px-6 py-4 lg:py-6 h-[calc(100vh-80px)]">
        {/* Left Content */}
        <div className="flex-1 lg:pr-12 mb-4 lg:mb-0 flex flex-col justify-center">
          <div className="mb-4">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium">
              🌤️ Logika Fuzzy
            </span>
          </div>
          
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Selamat Datang di{' '}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Prediksi Cuaca
            </span>{' '}
            Menggunakan Logika <span className='bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'>Fuzzy</span>
          </h2>
          
          <p className="text-base lg:text-lg text-gray-600 mb-6 leading-relaxed max-w-2xl">
            Menggunakan teknologi logika fuzzy untuk mengetahui prakiraan cuaca yang berdasarkan analisis mendalam suhu, kelembapan, dan kecepatan angin.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="/predict" 
              className="group bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-2xl font-semibold text-base hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>Mulai Prediksi</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            
            <a 
              href="#features"
              className="text-indigo-600 py-3 px-6 rounded-2xl font-semibold text-base hover:bg-indigo-50 transition-all duration-300 border-2 border-indigo-200 flex items-center justify-center space-x-2"
            >
              <span>Pelajari Lebih Lanjut</span>
            </a>
          </div>
        </div>

        {/* Right Content - Image */}
        <div className="flex-1 lg:pl-12 flex justify-center items-center">
          <div className="relative">
            {/* Decorative Elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-r from-indigo-200 to-purple-200 rounded-full opacity-60 animate-pulse"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full opacity-40 animate-pulse delay-1000"></div>
            
            {/* Main Image Container */}
            <div className="relative bg-white/70 backdrop-blur-sm p-4 lg:p-6 rounded-3xl shadow-2xl border border-white/50">
              <img 
                src="/image.jpg" 
                alt="Prediksi Cuaca dengan Teknologi AI" 
                className="rounded-2xl w-full max-w-sm lg:max-w-md xl:max-w-lg shadow-lg hover:scale-105 transition-transform duration-500" 
              />
              
              {/* Floating Weather Cards */}
              <div className="absolute -top-6 -right-6 bg-white rounded-2xl p-4 shadow-lg border border-gray-100 animate-bounce">
                <div className="flex items-center space-x-2">
                  <div className="bg-yellow-100 p-2 rounded-lg">
                    <Cloud className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">Cerah</p>
                    <p className="text-xs text-gray-600">28°C</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-lg border border-gray-100 animate-bounce delay-500">
                <div className="flex items-center space-x-2">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Droplets className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">Kelembapan</p>
                    <p className="text-xs text-gray-600">65%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Introduction Section */}
      <div id="features" className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Prediksi Cuaca dengan Logika Fuzzy
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              FuzzyWeather menggunakan logika fuzzy untuk memberikan prediksi cuaca yang akurat dan mudah dipahami.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-8 bg-blue-50 rounded-3xl hover:shadow-lg transition-shadow duration-300">
              <div className="bg-blue-100 p-6 rounded-full inline-block mb-6">
                <Thermometer className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Analisis Multi-Parameter</h3>
              <p className="text-gray-600">Menganalisis suhu, kelembapan, dan kecepatan angin secara bersamaan untuk hasil yang komprehensif.</p>
            </div>

            <div className="text-center p-8 bg-purple-50 rounded-3xl hover:shadow-lg transition-shadow duration-300">
              <div className="bg-purple-100 p-6 rounded-full inline-block mb-6">
                <Brain className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Logika Fuzzy Canggih</h3>
              <p className="text-gray-600">Menggunakan algoritma fuzzy untuk menangani ketidakpastian dalam prediksi cuaca.</p>
            </div>

            <div className="text-center p-8 bg-green-50 rounded-3xl hover:shadow-lg transition-shadow duration-300">
              <div className="bg-green-100 p-6 rounded-full inline-block mb-6">
                <Target className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Akurasi Tinggi</h3>
              <p className="text-gray-600">Memberikan prediksi dengan tingkat akurasi tinggi berdasarkan pengujian ekstensif.</p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div id="how-it-works" className="bg-gradient-to-r from-indigo-50 to-purple-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-3xl lg:text-4xl font-bold text-center mb-16">Cara Kerja Sistem</h3>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-white p-8 rounded-3xl shadow-lg mb-6 hover:shadow-xl transition-shadow duration-300">
                <Droplets className="w-12 h-12 text-blue-500 mx-auto" />
              </div>
              <h4 className="text-xl font-semibold mb-4">1. Input Data</h4>
              <p className="text-gray-600">Masukkan data suhu, kelembapan, dan kecepatan angin dengan mudah melalui interface yang intuitif.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white p-8 rounded-3xl shadow-lg mb-6 hover:shadow-xl transition-shadow duration-300">
                <Zap className="w-12 h-12 text-yellow-500 mx-auto" />
              </div>
              <h4 className="text-xl font-semibold mb-4">2. Fuzzifikasi</h4>
              <p className="text-gray-600">Sistem mengkonversi data crisp menjadi nilai fuzzy menggunakan fungsi keanggotaan yang optimal.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white p-8 rounded-3xl shadow-lg mb-6 hover:shadow-xl transition-shadow duration-300">
                <Brain className="w-12 h-12 text-purple-500 mx-auto" />
              </div>
              <h4 className="text-xl font-semibold mb-4">3. Inferensi</h4>
              <p className="text-gray-600">Menerapkan aturan fuzzy yang telah dirancang khusus untuk prediksi cuaca.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white p-8 rounded-3xl shadow-lg mb-6 hover:shadow-xl transition-shadow duration-300">
                <Cloud className="w-12 h-12 text-indigo-500 mx-auto" />
              </div>
              <h4 className="text-xl font-semibold mb-4">4. Hasil</h4>
              <p className="text-gray-600">Mendapatkan prediksi cuaca.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-3xl lg:text-4xl font-bold text-center mb-16">Keunggulan Sistem</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-6 p-8 bg-gradient-to-r from-green-50 to-green-100 rounded-3xl hover:shadow-lg transition-shadow duration-300">
              <div className="bg-green-200 p-4 rounded-2xl">
                <Shield className="w-8 h-8 text-green-700" />
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-3">Reliabilitas Tinggi</h4>
                <p className="text-gray-700">Sistem telah diuji dengan berbagai data cuaca dan menunjukkan konsistensi hasil yang excellent.</p>
              </div>
            </div>

            <div className="flex items-start space-x-6 p-8 bg-gradient-to-r from-blue-50 to-blue-100 rounded-3xl hover:shadow-lg transition-shadow duration-300">
              <div className="bg-blue-200 p-4 rounded-2xl">
                <Users className="w-8 h-8 text-blue-700" />
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-3">User-Friendly</h4>
                <p className="text-gray-700">Interface yang intuitif dan mudah digunakan, dirancang untuk semua kalangan pengguna.</p>
              </div>
            </div>

            <div className="flex items-start space-x-6 p-8 bg-gradient-to-r from-purple-50 to-purple-100 rounded-3xl hover:shadow-lg transition-shadow duration-300">
              <div className="bg-purple-200 p-4 rounded-2xl">
                <Zap className="w-8 h-8 text-purple-700" />
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-3">Respon Cepat</h4>
                <p className="text-gray-700">Mendapatkan hasil prediksi dalam hitungan detik dengan proses komputasi yang optimal.</p>
              </div>
            </div>

            <div className="flex items-start space-x-6 p-8 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-3xl hover:shadow-lg transition-shadow duration-300">
              <div className="bg-yellow-200 p-4 rounded-2xl">
                <Award className="w-8 h-8 text-yellow-700" />
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-3">Teknologi</h4>
                <p className="text-gray-700">Menggunakan metode fuzzy logic terbaru yang telah terbukti efektif dalam berbagai aplikasi.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <h3 className="text-3xl lg:text-4xl font-bold mb-6">Siap Mencoba Prediksi Cuaca?</h3>
          <p className="text-xl text-indigo-100 mb-10 leading-relaxed">
            Bergabunglah dengan pengguna yang telah merasakan akurasi prediksi cuaca menggunakan sistem logika fuzzy.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a 
              href="/predict"
              className="group bg-white text-indigo-600 py-4 px-10 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center space-x-3"
            >
              <span>Mulai Prediksi Sekarang</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="#features"
              className="border-2 border-white text-white py-4 px-10 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all duration-300"
            >
              Pelajari Lebih Lanjut
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-3 rounded-xl">
              <Cloud className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold">FuzzyWeather</h1>
          </div>
          <p className="text-gray-400 mb-4">
            Prediksi cuaca menggunakan logika fuzzy.
          </p>
          <p className="text-gray-500 text-sm">
            © 2025 FuzzyWeather. Semua hak dilindungi.
          </p>
        </div>
      </footer>
    </div>
  );
}