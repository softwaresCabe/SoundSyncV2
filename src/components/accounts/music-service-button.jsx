// src/components/Accounts/music-service-button.jsx
import React from 'react';
import { Button } from './music-service-button.styles';

const MusicServiceButton = ({ service }) => {
  const handleConnect = () => {
    if (service === 'Spotify') {
      const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
      const redirectUri = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;

      if (!clientId || !redirectUri) {
        console.error('Environment variables are missing!');
        return;
      }

      const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=user-read-private user-read-email`;
      window.location.href = authUrl;
    }
  };

  return (
    <Button onClick={handleConnect}>
      Connect {service}
    </Button>
  );
};

export default MusicServiceButton;
