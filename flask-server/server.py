from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import skfuzzy as fuzz
from skfuzzy import control as ctrl

app = Flask(__name__)
CORS(app)

class WeatherFuzzySystem:
    def __init__(self):
        # 1. VARIABEL INPUT
        self.temperature = ctrl.Antecedent(np.arange(20, 41, 0.1), 'suhu')       
        self.humidity = ctrl.Antecedent(np.arange(55, 101, 0.1), 'kelembapan')   
        self.wind_speed = ctrl.Antecedent(np.arange(0, 8.1, 0.1), 'kecepatan_angin')  

        # 2. VARIABEL OUTPUT
        self.weather = ctrl.Consequent(np.arange(0, 101, 1), 'cuaca')

        # 3. FUNGSI KEANGGOTAAN 
        # Suhu (°C) 
        self.temperature['dingin'] = fuzz.trimf(self.temperature.universe, [20, 20, 25])
        self.temperature['normal'] = fuzz.trimf(self.temperature.universe, [23, 27, 31])
        self.temperature['panas'] = fuzz.trimf(self.temperature.universe, [29 , 35, 40])

        # Kelembapan (%) 
        self.humidity['kering'] = fuzz.trimf(self.humidity.universe, [55, 55, 70])
        self.humidity['sedang'] = fuzz.trimf(self.humidity.universe, [65, 77, 85])
        self.humidity['lembab'] = fuzz.trimf(self.humidity.universe, [80, 90, 100])

        # Kecepatan Angin (m/s) 
        self.wind_speed['pelan'] = fuzz.trimf(self.wind_speed.universe, [0, 0, 2.5])
        self.wind_speed['sedang'] = fuzz.trimf(self.wind_speed.universe, [2, 4, 6])
        self.wind_speed['kencang'] = fuzz.trimf(self.wind_speed.universe, [5.5, 6.5, 8])

        # Output Cuaca 
        self.weather['cerah'] = fuzz.trimf(self.weather.universe, [0, 20, 40])
        self.weather['mendung'] = fuzz.trimf(self.weather.universe, [30, 50, 70])
        self.weather['hujan'] = fuzz.trimf(self.weather.universe, [60, 80, 100])

        # 4. ATURAN FUZZY 27 Rules 
        self.rules = [
            # CERAH (9 rules)
            ctrl.Rule(self.temperature['panas'] & self.humidity['kering'] & self.wind_speed['pelan'], self.weather['cerah']),
            ctrl.Rule(self.temperature['panas'] & self.humidity['kering'] & self.wind_speed['sedang'], self.weather['cerah']),
            ctrl.Rule(self.temperature['panas'] & self.humidity['kering'] & self.wind_speed['kencang'], self.weather['cerah']),
            ctrl.Rule(self.temperature['normal'] & self.humidity['kering'] & self.wind_speed['pelan'], self.weather['cerah']),
            ctrl.Rule(self.temperature['normal'] & self.humidity['kering'] & self.wind_speed['sedang'], self.weather['cerah']),
            ctrl.Rule(self.temperature['normal'] & self.humidity['kering'] & self.wind_speed['kencang'], self.weather['cerah']),
            ctrl.Rule(self.temperature['dingin'] & self.humidity['kering'] & self.wind_speed['pelan'], self.weather['cerah']),
            ctrl.Rule(self.temperature['dingin'] & self.humidity['kering'] & self.wind_speed['sedang'], self.weather['cerah']),
            ctrl.Rule(self.temperature['dingin'] & self.humidity['kering'] & self.wind_speed['kencang'], self.weather['cerah']),

            # MENDUNG (9 rules)
            ctrl.Rule(self.temperature['panas'] & self.humidity['sedang'] & self.wind_speed['pelan'], self.weather['mendung']),
            ctrl.Rule(self.temperature['panas'] & self.humidity['sedang'] & self.wind_speed['sedang'], self.weather['mendung']),
            ctrl.Rule(self.temperature['panas'] & self.humidity['sedang'] & self.wind_speed['kencang'], self.weather['mendung']),
            ctrl.Rule(self.temperature['normal'] & self.humidity['sedang'] & self.wind_speed['pelan'], self.weather['mendung']),
            ctrl.Rule(self.temperature['normal'] & self.humidity['sedang'] & self.wind_speed['sedang'], self.weather['mendung']),
            ctrl.Rule(self.temperature['normal'] & self.humidity['sedang'] & self.wind_speed['kencang'], self.weather['mendung']),
            ctrl.Rule(self.temperature['dingin'] & self.humidity['sedang'] & self.wind_speed['pelan'], self.weather['mendung']),
            ctrl.Rule(self.temperature['dingin'] & self.humidity['sedang'] & self.wind_speed['sedang'], self.weather['mendung']),
            ctrl.Rule(self.temperature['dingin'] & self.humidity['sedang'] & self.wind_speed['kencang'], self.weather['mendung']),

            # HUJAN (9 rules)
            ctrl.Rule(self.temperature['panas'] & self.humidity['lembab'] & self.wind_speed['pelan'], self.weather['hujan']),
            ctrl.Rule(self.temperature['panas'] & self.humidity['lembab'] & self.wind_speed['sedang'], self.weather['hujan']),
            ctrl.Rule(self.temperature['panas'] & self.humidity['lembab'] & self.wind_speed['kencang'], self.weather['hujan']),
            ctrl.Rule(self.temperature['normal'] & self.humidity['lembab'] & self.wind_speed['pelan'], self.weather['hujan']),
            ctrl.Rule(self.temperature['normal'] & self.humidity['lembab'] & self.wind_speed['sedang'], self.weather['hujan']),
            ctrl.Rule(self.temperature['normal'] & self.humidity['lembab'] & self.wind_speed['kencang'], self.weather['hujan']),
            ctrl.Rule(self.temperature['dingin'] & self.humidity['lembab'] & self.wind_speed['pelan'], self.weather['hujan']),
            ctrl.Rule(self.temperature['dingin'] & self.humidity['lembab'] & self.wind_speed['sedang'], self.weather['hujan']),
            ctrl.Rule(self.temperature['dingin'] & self.humidity['lembab'] & self.wind_speed['kencang'], self.weather['hujan'])
        ]

        # 5. SISTEM KONTROL
        self.weather_ctrl = ctrl.ControlSystem(self.rules)
        self.weather_simulation = ctrl.ControlSystemSimulation(self.weather_ctrl)
    
    def predict_weather(self, temp, humid, wind):
        """
        PREDIKSI CUACA BERDASARKAN INPUT
        """
        try:
            # Validasi input dalam range
            temp = max(20, min(40, temp))
            humid = max(55, min(100, humid))
            wind = max(0, min(8, wind))
            
            # Set input
            self.weather_simulation.input['suhu'] = temp
            self.weather_simulation.input['kelembapan'] = humid
            self.weather_simulation.input['kecepatan_angin'] = wind
            
            # Proses fuzzy
            self.weather_simulation.compute()
            
            # Hasil output (skor 0-100)
            weather_score = self.weather_simulation.output['cuaca']
            
            # Konversi skor ke kondisi cuaca (diperbaiki)
            if weather_score <= 35:
                condition = "Cerah"
                confidence = max(0, min(100, (35 - weather_score) / 35 * 100))
            elif weather_score <= 65:
                condition = "Mendung"
                confidence = max(0, min(100, 100 - abs(weather_score - 50) / 15 * 100))
            else:
                condition = "Hujan"
                confidence = max(0, min(100, (weather_score - 65) / 35 * 100))
            
            return {
                'kondisi': condition,
                'skor': round(weather_score, 2),
                'tingkat_kepastian': round(confidence, 2)
            }
        except Exception as e:
            print(f"Error in predict_weather: {e}")  # Debug log
            return {'error': str(e)}
    
    def get_membership_values(self, temp, humid, wind):
        """
        NILAI KEANGGOTAAN TIAP VARIABEL
        """
        try:
            # Validasi input dalam range yang benar
            temp = max(20, min(40, temp))
            humid = max(55, min(100, humid))
            wind = max(0, min(8, wind))
            
            return {
                'suhu': {
                    'dingin': float(fuzz.interp_membership(self.temperature.universe, self.temperature['dingin'].mf, temp)),
                    'normal': float(fuzz.interp_membership(self.temperature.universe, self.temperature['normal'].mf, temp)),
                    'panas': float(fuzz.interp_membership(self.temperature.universe, self.temperature['panas'].mf, temp))
                },
                'kelembapan': {
                    'kering': float(fuzz.interp_membership(self.humidity.universe, self.humidity['kering'].mf, humid)),
                    'sedang': float(fuzz.interp_membership(self.humidity.universe, self.humidity['sedang'].mf, humid)),
                    'lembab': float(fuzz.interp_membership(self.humidity.universe, self.humidity['lembab'].mf, humid))
                },
                'kecepatan_angin': {
                    'pelan': float(fuzz.interp_membership(self.wind_speed.universe, self.wind_speed['pelan'].mf, wind)),
                    'sedang': float(fuzz.interp_membership(self.wind_speed.universe, self.wind_speed['sedang'].mf, wind)),
                    'kencang': float(fuzz.interp_membership(self.wind_speed.universe, self.wind_speed['kencang'].mf, wind))
                }
            }
        except Exception as e:
            print(f"Error in get_membership_values: {e}")  # Debug log
            return {'error': str(e)}

# Inisialisasi sistem
try:
    fuzzy_system = WeatherFuzzySystem()
    print("Fuzzy system initialized successfully")
except Exception as e:
    print(f"Error initializing fuzzy system: {e}")
    fuzzy_system = None

# API ENDPOINT
@app.route('/api/predict', methods=['POST'])
def prediksi_cuaca():
    """
    ENDPOINT UNTUK PREDIKSI CUACA
    """
    try:
        if fuzzy_system is None:
            return jsonify({'error': 'Sistem fuzzy belum terinisialisasi'}), 500
            
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'Data JSON tidak valid'}), 400
        
        # Validasi input
        try:
            suhu = float(data.get('suhu', 0))
            kelembapan = float(data.get('kelembapan', 0))
            kecepatan_angin = float(data.get('kecepatan_angin', 0))
        except (ValueError, TypeError):
            return jsonify({'error': 'Input harus berupa angka'}), 400
        
        if not (20 <= suhu <= 40):
            return jsonify({'error': 'Suhu harus antara 20–40°C'}), 400
        if not (55 <= kelembapan <= 100):
            return jsonify({'error': 'Kelembapan harus antara 55–100%'}), 400
        if not (0 <= kecepatan_angin <= 8):
            return jsonify({'error': 'Kecepatan angin harus antara 0–8 m/s'}), 400
        
        # Prediksi cuaca
        prediksi = fuzzy_system.predict_weather(suhu, kelembapan, kecepatan_angin)
        
        if 'error' in prediksi:
            return jsonify({'error': prediksi['error']}), 500
        
        # Nilai keanggotaan
        nilai_keanggotaan = fuzzy_system.get_membership_values(suhu, kelembapan, kecepatan_angin)
        
        if 'error' in nilai_keanggotaan:
            return jsonify({'error': nilai_keanggotaan['error']}), 500
        
        return jsonify({
            'prediksi': prediksi,
            'nilai_keanggotaan': nilai_keanggotaan,
            'input': {
                'suhu': suhu,
                'kelembapan': kelembapan,
                'kecepatan_angin': kecepatan_angin
            }
        })
    except Exception as e:
        print(f"Error in prediksi_cuaca: {e}")  
        return jsonify({'error': str(e)}), 500

@app.route('/api/ranges', methods=['GET'])
def get_range():
    return jsonify({
        'suhu': {
            'min': 20,
            'max': 40,
            'kategori': {
                'dingin': '20–25°C',
                'normal': '23–31°C',
                'panas': '29–40°C'
            }
        },
        'kelembapan': {
            'min': 55,
            'max': 100,
            'kategori': {
                'kering': '55–70%',
                'sedang': '65–85%',
                'lembab': '80–100%'
            }
        }, 
        'kecepatan_angin': {
            'min': 0,
            'max': 8,
            'kategori': {
                'pelan': '0–2.5 m/s',
                'sedang': '2–6 m/s',
                'kencang': '5.5–8 m/s'
            }
        }
    })

@app.route('/api/test', methods=['GET'])
def test_endpoint():
    """
    Endpoint untuk testing sistem
    """
    try:
        if fuzzy_system is None:
            return jsonify({'error': 'Sistem fuzzy belum terinisialisasi'}), 500
            
        # Test dengan input yang bermasalah
        test_result = fuzzy_system.predict_weather(20, 55, 8)
        return jsonify({
            'status': 'success',
            'test_result': test_result
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/status', methods=['GET'])
def status():
    return jsonify({
        'status': 'aktif' if fuzzy_system is not None else 'error',
        'pesan': 'Sistem Fuzzy Prediksi Cuaca berjalan dengan baik' if fuzzy_system is not None else 'Sistem belum terinisialisasi'
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)