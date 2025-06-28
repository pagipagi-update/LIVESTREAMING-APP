// src/components/ChatBox.js
import React, { useState, useEffect, useRef } from 'react';
import './ChatBox.css';

// ChatBox menerima props: messages, onSendMessage, onConnectChat, dan isSocketConnected
function ChatBox({ messages, onSendMessage, onConnectChat, isSocketConnected }) {
  const [newMessage, setNewMessage] = useState('');
  // BARU: Inisialisasi username dari localStorage saat state dibuat
  const [username, setUsername] = useState(() => {
    const savedUsername = localStorage.getItem('chatUsername');
    return savedUsername || ''; // Jika ada, gunakan yang tersimpan; jika tidak, string kosong
  });
  // BARU: showUsernameInput akan ditentukan oleh ada tidaknya username di localStorage
  const [showUsernameInput, setShowUsernameInput] = useState(() => {
    const savedUsername = localStorage.getItem('chatUsername');
    return !savedUsername; // Jika tidak ada username tersimpan, tampilkan input username
  });

  const messagesEndRef = useRef(null); 

  // Scroll ke bawah setiap kali pesan berubah dan chatbox terlihat
  // Ini tetap ada seperti sebelumnya
  // useEffect(() => {
  //   if (!showUsernameInput && messagesEndRef.current) {
  //     const timer = setTimeout(() => {
  //       messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  //     }, 0); 
  //     return () => clearTimeout(timer); 
  //   }
  // }, [messages, showUsernameInput]); 

  // BARU: useEffect untuk otomatis menghubungkan chat jika username sudah ada
  // Ini akan berjalan sekali saat komponen dimuat jika username sudah ada di localStorage
  useEffect(() => {
    if (username && !showUsernameInput) { // Jika username sudah ada dan input username tidak ditampilkan
      onConnectChat(username); // Panggil fungsi di parent untuk memulai koneksi Socket.IO
    }
    // Dependency onConnectChat agar tidak ada warning, tapi panggilannya hanya di mount
  }, [username, showUsernameInput, onConnectChat]); 


  // Fungsi untuk menangani submit username
  const handleUsernameSubmit = (e) => {
    e.preventDefault(); 
    if (username.trim()) {
      localStorage.setItem('chatUsername', username.trim()); // BARU: Simpan username ke localStorage
      setShowUsernameInput(false); // Sembunyikan input username
      onConnectChat(username.trim()); // Panggil fungsi di parent untuk memulai koneksi Socket.IO
    } else {
      alert('Username tidak boleh kosong!'); 
    }
  };

  // Fungsi untuk menangani pengiriman pesan chat
  const handleSendMessage = (e) => {
    e.preventDefault(); 
    if (newMessage.trim() && username.trim() && isSocketConnected) { 
      onSendMessage(username, newMessage.trim()); 
      setNewMessage(''); 
    } else if (!username.trim()) {
        alert('Mohon masukkan username terlebih dahulu!');
    } else if (!isSocketConnected) { 
        alert('Chat belum terhubung ke server. Mohon tunggu atau coba lagi.');
    }
  };

  // Fungsi opsional: untuk menghapus username yang tersimpan dan menampilkan kembali input
  const handleLogoutChat = () => {
    localStorage.removeItem('chatUsername'); // Hapus username dari localStorage
    setUsername(''); // Reset username di state
    setShowUsernameInput(true); // Tampilkan kembali form input username
    // TODO: Di sini, Anda mungkin juga ingin memicu putus koneksi Socket.IO di parent.
    // Ini membutuhkan prop lain seperti 'onDisconnectChat' yang dipanggil dari sini.
    alert('Anda telah keluar dari chat. Masukkan username baru untuk gabung.');
  };


  return (
    <div className="chatbox-container">
      {/* Header chatbox. Teks akan berubah jika terhubung/tidak */}
      <div className="chatbox-header">
          Live Chat {isSocketConnected ? '(Online)' : '(Menghubungkan...)'}
          {username && !showUsernameInput && ( /* Tampilkan tombol Logout jika user sudah login chat */
            <button onClick={handleLogoutChat} className="chat-logout-button">Logout</button>
          )}
      </div> 
      
      {showUsernameInput ? (
        // Form input username (ditampilkan saat showUsernameInput true)
        <form className="username-input-form" onSubmit={handleUsernameSubmit}>
          <p>Masukkan Username Anda:</p>
          <input
            type="text"
            placeholder="Username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            maxLength="15" 
          />
          <button type="submit">Gabung Chat</button>
        </form>
      ) : (
        // Konten chatbox setelah username dimasukkan (ditampilkan saat showUsernameInput false)
        <> 
          <div className="chatbox-messages">
            {messages.length === 0 ? (
              <div className="chat-info">Belum ada pesan. Ketik sesuatu!</div> 
            ) : (
              messages.map((msg) => (
                <div key={msg.id || msg.text} className="chat-message"> 
                  <span className="chat-username">{msg.user}:</span> {msg.text}
                </div>
              ))
            )}
            <div ref={messagesEndRef} /> 
          </div>
          <form className="chatbox-input-form" onSubmit={handleSendMessage}>
            <input
              type="text"
              placeholder={isSocketConnected ? "Ketik pesan Anda..." : "Menghubungkan ke chat..."}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              disabled={!isSocketConnected} 
            />
            <button type="submit" disabled={!isSocketConnected}>Kirim</button> 
          </form>
        </>
      )}
    </div>
  );
}

export default ChatBox;