// src/components/ContinueWatchingSection.js
import React, { useState, useEffect } from 'react';
import VideoCard from './VideoCard';
import './ContinueWatchingSection.css';
import { Link } from 'react-router-dom';

const MAIN_OWNCAST_BASE_URL = 'https://stream.ahs.my.id/'; 

function ContinueWatchingSection() {
  const [channelsData, setChannelsData] = useState([]);
  const [mainStreamIsLive, setMainStreamIsLive] = useState(false);
  const [mainLiveThumbnailUrl, setMainLiveThumbnailUrl] = useState('');

  const initialChannels = [
    {
      title: 'Live Sports',
      streamer: 'Football Match',
      staticThumbnail: 'https://file.ahs.my.id/-funGBWh4JG', 
      path: '/live-sports',
    },
    {
      title: 'Live Esports',
      streamer: 'Dota 2 Tournament',
      staticThumbnail: 'https://file.ahs.my.id/-qwfYNmkR3n',
      path: '/live-esports',
    },
    {
      title: 'Live Slots',
      streamer: 'Big Win Mania',
      staticThumbnail: 'https://file.ahs.my.id/-prtNWyQVhZ',
      path: '/live-slots',
    },
    {
      title: 'Live Togel',
      streamer: 'HK Pool Draw',
      staticThumbnail: 'https://file.ahs.my.id/-2RovViNBUm',
      path: '/live-togel',
    },
  ];

  useEffect(() => {
    const fetchMainStreamStatusAndThumbnail = async () => {
      let currentLiveThumbnail = '';
      let isMainStreamOnline = false;
      let mainStreamTitle = ''; 

      try {
        const statusResponse = await fetch(`${MAIN_OWNCAST_BASE_URL}/api/status`);
        const data = await statusResponse.json();

        if (data.online) {
          isMainStreamOnline = true;
          currentLiveThumbnail = `${MAIN_OWNCAST_BASE_URL}/thumbnail.webp`;
          mainStreamTitle = data.streamTitle || 'Stream Sedang Aktif';
        }
      } catch (error) {
        console.error('Error fetching main Owncast status or thumbnail:', error);
      }

      setMainStreamIsLive(isMainStreamOnline);
      setMainLiveThumbnailUrl(currentLiveThumbnail);

      const updatedChannels = initialChannels.map(channel => ({
        ...channel,
        currentThumbnail: isMainStreamOnline ? currentLiveThumbnail : channel.staticThumbnail,
        isLive: isMainStreamOnline,
        streamer: isMainStreamOnline ? (mainStreamTitle.includes(channel.title) ? mainStreamTitle : `${mainStreamTitle}`) : channel.streamer,
      }));
      setChannelsData(updatedChannels);
    };

    fetchMainStreamStatusAndThumbnail();
    const interval = setInterval(fetchMainStreamStatusAndThumbnail, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="live-now-section">
      <div className="section-header">
        <h2 className="section-title">Live Now</h2>
      </div>
      <div className="video-cards-grid">
        {channelsData.map((channel, index) => ( 
          <VideoCard
            key={index}
            title={channel.title}
            streamer={channel.streamer}
            thumbnail={channel.currentThumbnail}
            to={channel.path}
            isLive={channel.isLive}
          />
        ))}
      </div>
    </section>
  );
}

export default ContinueWatchingSection;