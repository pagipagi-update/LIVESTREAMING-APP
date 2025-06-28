// src/components/Footer.js
import React from 'react';
// Hapus import ikon sosial media jika tidak lagi digunakan di bagian ini dari footer.
// import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa'; // Ini mungkin tidak lagi diperlukan jika sosial media dihilangkan
import './Footer.css'; // File CSS baru untuk Footer

function Footer() {
  return (
    <footer className="footer-container">
      {/* BAGIAN ATAS FOOTER: Sesuai dengan gambar yang Anda berikan (Logo, Lisensi, Sertifikasi) */}
      <div className="footer-top-section">
        {/* Bagian Kiri: Logo Utama + Lisensi */}
        <div className="footer-logo-licenses">
          <img
            src="/logo.png" // PASTIKAN PATH INI BENAR (relative to public folder)
            alt="Bola88 Logo"
            className="footer-main-logo"
          />

        </div>

        {/* Bagian Kanan: Ikon Sertifikasi */}
        <div className="footer-cert-icons">
          <img src="/responsible.png" alt="18+ Only" className="cert-icon" />
        </div>
      </div>
    <div class="footer-middle-section">
        <h2>BOLA88 Live – PLATFORM LIVESTREAM OLAHRAGA 24 JAM</h2>
          <p>Bola88 Live adalah platform live streaming online 24 jam yang menayangkan berbagai pertandingan olahraga dunia dengan kualitas HD jernih tanpa buffering. Nikmati siaran langsung sepak bola, basket, MotoGP, dan olahraga lainnya kapan saja dan di mana saja melalui server cepat dan stabil. Bola88 Live menghadirkan pengalaman menonton terbaik dengan akses mudah serta jadwal pertandingan yang selalu update setiap hari. Saksikan semua keseruannya hanya di Bola88 Live, platform livestream andalan para penggemar olahraga di Indonesia.</p>
          <p>Bergabung sekarang dan rasakan serunya menonton pertandingan favoritmu secara live tanpa hambatan. Bola88 Live siap menjadi teman setia kamu untuk menikmati setiap momen olahraga dengan nyaman dan praktis di mana pun kamu berada.</p>
        </div>
      {/* FOOTER BOTTOM: Bagian Hak Cipta, tetap dipertahankan dari kode Anda */}
      <div className="footer-bottom">
        <p>© 2025 Bola88 Live. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;