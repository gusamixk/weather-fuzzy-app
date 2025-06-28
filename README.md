# 🌤️ Weather Fuzzy App

Aplikasi prediksi cuaca menggunakan **Logika Fuzzy Mamdani**. Sistem ini memprediksi kondisi cuaca (cerah, mendung, atau hujan) berdasarkan input:

- 🌡️ Suhu (°C)
- 💧 Kelembapan (%)
- 🌬️ Kecepatan Angin (m/s)

---

## 🧠 Metode

Menggunakan **logika fuzzy Mamdani** dengan 3 variabel input:
- **Suhu**: dingin, sedang, panas
- **Kelembapan**: rendah, sedang, tinggi
- **Kecepatan angin**: pelan, sedang, kencang

Dan 1 variabel output:
- **Kondisi cuaca**: cerah, mendung, hujan

---

## 🚀 Teknologi

- Backend: **Python Flask** (`skfuzzy`, `flask`, `flask-cors`)
- Frontend: **React + TailwindCSS**
- API lokal: `http://localhost:5000/api/predict`

---

## 📦 Cara Menjalankan

### 1. Clone Repositori
```bash
git clone https://github.com/gusamixk/weather-fuzzy-app.git
cd weather-fuzzy-app
