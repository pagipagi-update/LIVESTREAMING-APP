// src/pages/LiveSportsPage.js
import React, { useState, useEffect, useRef } from 'react'; 
import ChatBox from '../components/ChatBox';
import './PageStyles.css'; 
import { FaTelegramPlane, FaWhatsapp } from 'react-icons/fa'; 
import { FiLink, FiMessageCircle } from 'react-icons/fi'; 
import { promoArticles } from '../data/promoData'; 
import { io } from 'socket.io-client'; 
import { useParams } from 'react-router-dom'; // Untuk mendapatkan room ID dari URL jika diperlukan

const OWNCAST_BASE_URL = 'https://stream.tivi.ahs.my.id/'; 
const SOCKET_SERVER_URL = 'http://159.223.37.64:3001'; // GANTI INI DENGAN port server.js Anda

// Fungsi pembantu untuk menentukan room ID berdasarkan path
const getRoomIdFromPath = (path) => {
    // Contoh untuk LiveSportsPage, room ID-nya 'sports'
    return 'sports'; 
}

function LiveSportsPage() {
  const [messages, setMessages] = useState([]);
  const socket = useRef(null); 
  const [chatUsername, setChatUsername] = useState(''); 
  const [isSocketConnected, setIsSocketConnected] = useState(false); 

  // Ambil room ID untuk halaman ini
  const roomId = getRoomIdFromPath(window.location.pathname); // Gunakan window.location.pathname

  const handleConnectChat = (username) => {
    setChatUsername(username);
  };

  const handleSendMessage = (user, messageText) => { 
    if (socket.current && socket.current.connected) { 
      socket.current.emit('chat message', { user: user, text: messageText, roomId: roomId }); // Emit dengan roomId
    } else {
      console.warn("Socket.IO tidak terhubung. Pesan Anda hanya akan terlihat secara lokal.");
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Date.now(), user: `${user} (Anda - Offline)`, text: messageText }, 
      ]);
    }
  };

  useEffect(() => {
    if (chatUsername) { 
      socket.current = io(SOCKET_SERVER_URL, {
        auth: { 
          username: chatUsername,
          roomId: roomId // Kirim roomId melalui handshake auth
        }
      });

      socket.current.on('connect', () => {
        console.log(`Socket.IO connected to room ${roomId}:`, socket.current.id);
        setIsSocketConnected(true); 
        setMessages((prevMessages) => [
          ...prevMessages,
          { id: Date.now(), user: 'System', text: `Anda terhubung sebagai ${chatUsername} di room ${roomId}.` },
        ]);
      });

      socket.current.on('disconnect', () => {
        console.log('Socket.IO disconnected.');
        setIsSocketConnected(false); 
        setMessages((prevMessages) => [
          ...prevMessages,
          { id: Date.now(), user: 'System', text: 'Koneksi chat terputus. Mencoba menghubungkan kembali...' },
        ]);
      });

      socket.current.on('connect_error', (error) => {
          console.error('Socket.IO connection error:', error);
          setIsSocketConnected(false); 
          setMessages((prevMessages) => [
              ...prevMessages,
              { id: Date.now(), user: 'System', text: `Gagal terhubung ke chat: ${error.message}. Coba lagi.` },
          ]);
      });

      // Menerima histori chat dari server (berisi pesan sambutan room)
      socket.current.on('chat history', (history) => {
          setMessages(history.map(msg => ({ 
              id: msg.id, 
              user: msg.username, 
              text: msg.text 
          })));
      });
      
      // Menerima pesan chat
      socket.current.on('chat message', (msg) => { 
        setMessages((prevMessages) => [
          ...prevMessages,
          { 
            id: msg.id || Date.now(), 
            user: msg.username, 
            text: msg.text 
          }, 
        ]);
      });
      
      socket.current.on('system message', (text) => {
          setMessages((prevMessages) => [
              ...prevMessages,
              { id: Date.now(), user: 'System', text: text },
          ]);
      });

      socket.current.on('message deleted', (messageId) => {
          setMessages((prevMessages) => prevMessages.filter(msg => msg.id !== messageId));
          setMessages((prevMessages) => [
              ...prevMessages,
              { id: Date.now(), user: 'System', text: `Pesan dengan ID ${messageId} telah dihapus.` },
          ]);
      });
      socket.current.on('user banned', (username) => {
          setMessages((prevMessages) => [
              ...prevMessages,
              { id: Date.now(), user: 'System', text: `Pengguna ${username} telah diban.` },
          ]);
      });

      return () => {
        if (socket.current) {
          socket.current.disconnect(); 
          setIsSocketConnected(false);
          console.log('Socket.IO cleaned up.');
        }
      };
    }
  }, [chatUsername, roomId]); // Dependensi roomId ditambahkan


  // ... (Bagian data dan return JSX lainnya tetap sama) ...
  const alternativeLinks = [
    { text: 'Link Alternatif', icon: <FiLink />, url: 'https://linkalternatif.com', isPrimary: true }, 
    { text: 'Telegram Bola88', icon: <FaTelegramPlane />, url: 'https://t.me/bola88resmi', isPrimary: false }, 
    { text: 'Whatsapp Bola88', icon: <FaWhatsapp />, url: 'https://wa.me/628123456789', isPrimary: false }, 
    { text: 'Livechat Bola88', icon: <FiMessageCircle />, url: 'https://livechat.bola88.com', isPrimary: false }, 
  ];

  const streamTags = ['Football', 'Sports', 'Liga Indonesia', 'Live Match', 'English']; 
  const latestPromos = promoArticles.slice(0, 2);

  return (
    <div className="page-container">
      <div className="live-content-layout">
        <div className="video-player-and-info-frame">
          <div className="video-placeholder"> 
            <iframe
              src={`${OWNCAST_BASE_URL}/embed/video`} 
              title="Owncast Live Sports Stream"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              className="owncast-iframe-player"
            ></iframe>
          </div>
          <div className="stream-info">
              <div className="stream-info-header">
                  <img 
                      src="https://via.placeholder.com/50/1698CE/FFFFFF?text=P" 
                      alt="Profile Avatar"
                      className="streamer-avatar"
                  />
                  <div className="stream-title-group">
                      <h3 className="stream-title-display">
                          Livestreaming Pertandingan Sepak Bola Hari ini
                      </h3>
                      <p className="streamer-name">Bola88 Official</p>
                  </div>
              </div>
              <p className="stream-description-display">
                  Saksikan pertandingan sepak bola eksklusif hari ini! Jangan lewatkan setiap momen seru dari liga favorit Anda.
              </p>
              <div className="stream-tags-container">
                  {streamTags.map((tag, index) => (
                      <span key={index} className="stream-tag-item">
                          {tag}
                      </span>
                  ))}
              </div>
          </div>
        </div> 
        <ChatBox 
            messages={messages} 
            onSendMessage={handleSendMessage} 
            onConnectChat={handleConnectChat} 
            isSocketConnected={isSocketConnected} 
        />
          
        <div className="alternative-links-section">
          {alternativeLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`alt-link-button ${link.isPrimary ? 'primary' : ''}`}
            >
              {link.icon}
              <span>{link.text}</span>
            </a>
          ))}
        </div>

        <div className="promos-below-links-section">
          <h4 className="section-title-promos">Promo Terbaru</h4>
          <div className="promos-grid-below-links">
            {latestPromos.map((promo) => (
              <div key={promo.id} className="promo-card-below-links">
                <img src={promo.imageUrl} alt={promo.title} className="promo-image-below-links" />
                <div className="promo-content-below-links">
                  <h5 className="promo-title-below-links">{promo.title}</h5>
                  <p className="promo-excerpt-below-links">{promo.excerpt}</p>
                  <a href={promo.link} className="promo-button-below-links">Klaim!</a>
                </div>
              </div>
            ))}
          </div>
        </div>

        
      </div> 
    </div>
  );
}

export default LiveSportsPage;