// src/pages/LiveSlotsPage.js
import React, { useState, useEffect, useRef } from 'react'; 
import ChatBox from '../components/ChatBox';
import './PageStyles.css'; // Styling umum halaman
import { FaTelegramPlane, FaWhatsapp } from 'react-icons/fa'; 
import { FiLink, FiMessageCircle } from 'react-icons/fi'; 
import { promoArticles } from '../data/promoData'; 
import { io } from 'socket.io-client'; 

 
const SOCKET_SERVER_URL = 'https://chat.ahs.my.id'; // GANTI INI DENGAN port server.js Anda

const getRoomIdFromPath = (path) => {
    switch (path) {
        case '/live-sports': return 'sports';
        case '/live-esports': return 'esports';
        case '/live-slots': return 'slots'; // Room ID untuk Slots
        case '/live-togel': return 'togel';
        default: return 'general';
    }
}

function LiveSlotsPage() {
  const [messages, setMessages] = useState([]);
  const socket = useRef(null); 
  const [chatUsername, setChatUsername] = useState(''); 
  const [isSocketConnected, setIsSocketConnected] = useState(false); 

  const roomId = getRoomIdFromPath(window.location.pathname);

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
          roomId: roomId 
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
              { id: Date.Now(), user: 'System', text: `Gagal terhubung ke chat: ${error.message}. Coba lagi.` },
          ]);
      });

      socket.current.on('chat history', (history) => {
          setMessages(history.map(msg => ({ 
              id: msg.id, 
              user: msg.username, 
              text: msg.text 
          })));
      });
      
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
              { id: Date.Now(), user: 'System', text: text },
          ]);
      });

      socket.current.on('message deleted', (messageId) => {
          setMessages((prevMessages) => prevMessages.filter(msg => msg.id !== messageId));
          setMessages((prevMessages) => [
              ...prevMessages,
              { id: Date.Now(), user: 'System', text: `Pesan dengan ID ${messageId} telah dihapus.` },
          ]);
      });
      socket.current.on('user banned', (username) => {
          setMessages((prevMessages) => [
              ...prevMessages,
              { id: Date.Now(), user: 'System', text: `Pengguna ${username} telah diban.` },
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
  }, [chatUsername, roomId]); 

  const alternativeLinks = [
    { text: 'Link Alternatif', icon: <FiLink />, url: 'http://indo.skin/bola88', isPrimary: true, target: '_blank' }, 
    { text: 'Telegram Bola88', icon: <FaTelegramPlane />, url: 'https://indo.skin/telebola88', isPrimary: false, target: '_blank' }, 
    { text: 'Whatsapp Bola88', icon: <FaWhatsapp />, url: 'https://indo.skin/whatsappbola88', isPrimary: false, target: '_blank' }, 
    { text: 'Livechat Bola88', icon: <FiMessageCircle />, url: 'http://indo.skin/livechatbola88', isPrimary: false, target: '_blank' }, 
  ];

  // DATA DUMMY UNTUK TAGS SLOTS
  const streamTags = ['Slots', 'Jackpot', 'Daily Spin', 'Big Win', 'Free Games', 'Bonus', 'Lucky Spin', 'Progressive Jackpot', 'High Roller', 'Olympus Slots']; 

  const latestPromos = promoArticles.slice(3, 5);

  return (
    <div className="page-container">
      <div className="live-content-layout">
        <div className="video-player-and-info-frame">
          <div className="video-placeholder"> 
            <iframe
              src="https://live.faceona.com/?stream=slots" 
              title="Owncast Live Slots Stream"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              className="owncast-iframe-player"
            ></iframe>
          </div>
          <div className="stream-info">
              <div className="stream-info-header">
                  <img 
                      src="https://file.ahs.my.id/-jXka3asjq6" /* Avatar Slots */
                      alt="Profile Avatar"
                      className="streamer-avatar"
                  />
                  <div className="stream-title-group">
                      <h3 className="stream-title-display">
                          Livestreaming Slot Gacor Hari ini
                      </h3>
                      <p className="streamer-name">Bola88Stream Slots</p>
                  </div>
              </div>
              <p className="stream-description-display">
                  Rasakan sensasi putaran slot langsung! Ikuti Host kami mencari jackpot besar setiap hari.
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
      </div> 
      
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
                <a href="/promo-terbaru" className="promo-button-below-links">Klaim!</a>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
}

export default LiveSlotsPage;