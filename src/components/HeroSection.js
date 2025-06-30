import React, { useState, useEffect } from 'react';
import './HeroSection.css';

function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Data untuk setiap slide banner dengan URL yang Anda berikan
  const banners = [
    {
      imageUrl: 'https://file.ahs.my.id/-n52ramDV64',
      altText: 'Promosi FIFA Club 2025 Bola88',
      linkUrl: '/live-sports', // Arahkan ke halaman Live Sports
    },
    {
      imageUrl: 'https://file.ahs.my.id/-A8pDKAgrhh/1.jpg',
      altText: 'Event AFF U-23 Championship 2025 Bola88',
      linkUrl: '/live-esports', // Arahkan ke halaman Live Esports
    },
    {
      imageUrl: 'https://file.ahs.my.id/-gVh8MUwuLL',
      altText: 'Promosi Umum Bola88',
      linkUrl: '/', // Arahkan ke halaman utama atau halaman promosi umum
    },
    {
      imageUrl: 'https://file.ahs.my.id/-WF5RDhbBoF',
      altText: 'Promosi IDNLottery Bola88',
      linkUrl: '/live-togel', // Arahkan ke halaman Live Togel
    },
  ];

  // Fungsi untuk maju ke slide berikutnya
  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % banners.length);
  };

  // Fungsi untuk mundur ke slide sebelumnya
  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + banners.length) % banners.length);
  };

  // Efek samping untuk mengatur otomatisasi slider
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000); // Ganti 5000 (ms) untuk mengubah kecepatan slide otomatis
    
    // Cleanup function: Hentikan interval saat komponen di-unmount
    return () => clearInterval(interval);
  }, [currentSlide]); // Dependensi: currentSlide, agar interval reset saat slide berubah manual

  return (
    <section className="hero-section">
      <div className="slider-container">
        {/* Render setiap slide banner */}
        {banners.map((banner, index) => (
          <div
            key={index}
            className={`slide ${index === currentSlide ? 'active' : ''}`}
            // Gaya latar belakang untuk slide, ini akan menutupi seluruh div
            style={{ backgroundImage: `url(${banner.imageUrl})` }}
          >
            {/* Bungkus gambar dalam tautan jika seluruh area banner bisa diklik */}
            <a href={banner.linkUrl} className="slide-link">
                {/* Opsi: Tambahkan overlay teks atau elemen lain di sini */}
                <div className="slide-overlay">
                    {/* <h3>{banner.altText}</h3> */}
                    {/* <button>Lihat Sekarang</button> */}
                </div>
            </a>
          </div>
        ))}
        
        {/* Tombol Navigasi Slider */}
        <button className="prev-button" onClick={prevSlide}>&#10094;</button> {/* Karakter panah kiri */}
        <button className="next-button" onClick={nextSlide}>&#10095;</button> {/* Karakter panah kanan */}
      </div>

      {/* Indikator Dots */}
      <div className="dots-container">
        {banners.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
          ></span>
        ))}
      </div>
    </section>
  );
}

export default HeroSection;