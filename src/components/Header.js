import React from 'react';
import { FaBars } from 'react-icons/fa'; // Impor ikon hamburger
import './Header.css';

// Header sekarang menerima prop toggleSidebar
function Header({ toggleSidebar }) {
  const handleVisitWebsite = () => {
    window.open('http://indo.skin/bola88', '_blank'); // Ganti URL ini
  };

  return (
    <header className="header-container">
      {/* Tombol Hamburger di kiri atas */}
      <div className="header-left-menu">
        <FaBars className="menu-toggle-icon" onClick={toggleSidebar} />
      </div>

      {/* Tengah: Teks Berjalan */}
      <div className="header-marquee-area">
        <marquee behavior="scroll" direction="left" scrollamount="5">
          Selamat datang di Bola88! Nikmati berbagai live stream olahraga, esports, slot, dan togel sekarang juga! Jangan lewatkan event spesial setiap hari!
        </marquee>
      </div>

      {/* Kanan: Tombol Kunjungi Situs Utama */}
      <div className="header-right-button-area">
        <button className="visit-website-button-highlight" onClick={handleVisitWebsite}>
          Kunjungi Situs
        </button>
      </div>
    </header>
  );
}

export default Header;