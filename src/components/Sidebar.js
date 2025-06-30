// src/components/Sidebar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
// Hapus FaTimes dari import
import { FaFutbol, FaGamepad, FaDice, FaCoins, FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaTags, FaHouseUser } from 'react-icons/fa'; 
import './Sidebar.css';

// Sidebar menerima prop isSidebarOpen dan toggleSidebar
function Sidebar({ isSidebarOpen, toggleSidebar }) { 
  const location = useLocation();

  const navigationItems = [
    { name: 'Home', icon: <FaHouseUser/>, path: '/' },
    { name: 'Live Sports', icon: <FaFutbol />, path: '/live-sports' },
    { name: 'Live Esports', icon: <FaGamepad />, path: '/live-esports' },
    { name: 'Live Slots', icon: <FaDice />, path: '/live-slots' },
    { name: 'Live Togel', icon: <FaCoins />, path: '/live-togel' },
    { name: 'Promo Terbaru', icon: <FaTags />, path: '/promo-terbaru' }, 
  ];

  const socialMediaItems = [
    { name: 'Facebook', icon: <FaFacebook />, link: 'https://facebook.com', color: '#1877F2' },
    { name: 'Twitter', icon: <FaTwitter />, link: 'https://twitter.com', color: '#1DA1F2' },
    { name: 'Instagram', icon: <FaInstagram />, link: 'https://instagram.com', color: '#E4405F' },
    { name: 'YouTube', icon: <FaYoutube />, link: 'https://youtube.com', color: '#FF0000' },
  ];

  return (
    <aside className={`sidebar-container ${isSidebarOpen ? 'open' : 'closed'}`}>
    <div className="sidebar-header">
      {/* Menggunakan tag <img> untuk logo */}
      <img
        src="/logo.png" // Path relatif dari folder 'public' (untuk Next.js/CRA)
        // src={Bola88Logo} // Gunakan ini jika Anda mengimport gambar dari src/assets
        alt="Logo" // Atribut alt penting untuk SEO dan aksesibilitas
        className="logo-image" // Tambahkan kelas CSS untuk styling
      />
      {/* Tombol close sudah Anda hapus, jadi tidak perlu di sini */}
    </div>

      <nav className="sidebar-nav">
        <ul>
          {navigationItems.map((item) => (
            <li
              key={item.name}
              className={location.pathname === item.path ? 'nav-item active' : 'nav-item'}
              // Tetap tambahkan onClick untuk menutup sidebar saat item navigasi diklik di mobile
              onClick={window.innerWidth <= 992 ? toggleSidebar : undefined}
            >
              <Link to={item.path}>
                {item.icon}
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-banner-area">
        <img
          src="https://file.ahs.my.id/-86SHWiensv"
          alt="Promotion Banner"
          className="promo-banner"
        />
      </div>

      <div className="social-media-section">
        <h4 className="social-media-title">Ikuti Kami</h4>
        <div className="social-icons-container">
          {socialMediaItems.map((item) => (
            <a 
              key={item.name} 
              href={item.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon-link"
              style={{ '--social-color': item.color }}
            >
              {item.icon}
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;