import React from 'react';
// Impor ikon yang sesuai dari react-icons/fa
import { FaGlobe, FaChartLine, FaFootballBall, FaTicketAlt } from 'react-icons/fa';
import './QuickAccessMenu.css';

function QuickAccessMenu() {
  const menuItems = [
    { 
      name: 'Website Bola88', 
      link: 'http://indo.skin/bola88', 
      isExternal: true, 
      icon: <FaGlobe className="menu-icon" /> // Ikon Globe untuk website
    }, 
    { 
      name: 'Live RTP', 
      link: 'http://indo.skin/rtpbola88', // Ganti dengan URL/path Live RTP
      isExternal: false, 
      icon: <FaChartLine className="menu-icon" /> // Ikon Chart Line untuk RTP
    }, 
    { 
      name: 'Live Score', 
      link: 'http://indo.skin/livescorebola88', // Ganti dengan URL Live Score
      isExternal: true, 
      icon: <FaFootballBall className="menu-icon" /> // Ikon Bola Sepak untuk Live Score
    }, 
    { 
      name: 'Result Togel', 
      link: 'http://indo.skin/resulttogelbola88', // Ganti dengan URL/path Result Togel
      isExternal: false, 
      icon: <FaTicketAlt className="menu-icon" /> // Ikon Tiket untuk Result Togel
    }, 
  ];

  return (
    <section className="quick-access-section">
      <div className="quick-access-menu-container">
        {menuItems.map((item, index) => (
          <a
            key={index}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="quick-access-button"
          >
            <span>{item.name}</span>
            {item.icon}
          </a>
        ))}
      </div>
    </section>
  );
}

export default QuickAccessMenu;