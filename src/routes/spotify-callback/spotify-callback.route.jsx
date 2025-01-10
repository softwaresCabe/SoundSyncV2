// src/routes/spotify-callback/spotify-callback.route.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SpotifyCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get('code');

    if (code) {
      fetch(`/api/spotifyAuth?code=${code}&uid=YOUR_USER_UID`)
        .then((response) => response.json())
        .then((data) => {
          console.log('Spotify linked successfully:', data);
          navigate('/accounts');
        })
        .catch((error) => {
          console.error('Error linking Spotify:', error);
        });
    }
  }, [navigate]);

  return <h2>Processing Spotify Authentication...</h2>;
};

export default SpotifyCallback;
