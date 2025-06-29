// src/pages/PromoPage.js
import React from 'react';
import './PageStyles.css'; 
import './PromoPage.css'; // Styling spesifik untuk halaman promo (akan mengimpor LatestPromosHomepage.css)
import { promoArticles } from '../data/promoData'; 

function PromoPage() {
  return (
    <div className="page-container">
      <h1 className="page-title">Promo Terbaru</h1>
      <p className="page-description">Jangan lewatkan berbagai penawaran menarik dan bonus spesial dari Bola88!</p>

      <div className="promos-grid-homepage">
        {promoArticles.map((promo) => (
          <div key={promo.id} className="promo-card-homepage">
            <img src={promo.imageUrl} alt={promo.title} className="promo-image-below-links" />
            <div className="promo-content-below-links">
              <h5 className="promo-title-below-links">{promo.title}</h5>
              <p className="promo-excerpt-below-links">{promo.excerpt}</p>
              <a
                href="http://indo.skin/bola88"
                className="promo-button-below-links"
                target="_blank"
                rel="noopener noreferrer"
              >
                Klaim Sekarang!
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PromoPage;