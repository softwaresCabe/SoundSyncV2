const axios = require('axios');
const querystring = require('querystring');

exports.handler = async (event) => {
  const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
  const redirectUri = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;

  const { code, uid, action } = event.queryStringParameters;

  if (action === 'logout') {
    try {
      const { firebaseAdmin } = require('../firebase-admin');
      const db = firebaseAdmin.firestore();
      const userRef = db.collection('linkedAccounts').doc(uid);

      await userRef.update({
        spotify: firebaseAdmin.firestore.FieldValue.delete(),
      });

      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Spotify account disconnected successfully.' }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: error.message }),
      };
    }
  }

  if (!code || !uid) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Authorization code or user ID is missing.' }),
    };
  }

  try {
    // Exchange authorization code for access token
    const tokenResponse = await axios.post(
      'https://accounts.spotify.com/api/token',
      querystring.stringify({
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
        client_id: clientId,
        client_secret: clientSecret,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const { access_token, refresh_token } = tokenResponse.data;

    // Fetch Spotify user profile
    const profileResponse = await axios.get('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const spotifyUser = profileResponse.data;
    console.log('Spotify User Data:', spotifyUser);

    // Store tokens and user data in Firestore
    const { firebaseAdmin } = require('../firebase-admin');
    const db = firebaseAdmin.firestore();
    const userRef = db.collection('linkedAccounts').doc(uid);

    await userRef.set(
      {
        spotify: {
          accessToken: access_token,
          refreshToken: refresh_token,
          id: spotifyUser.id,
          displayName: spotifyUser.display_name,
          email: spotifyUser.email,
          profileImage: spotifyUser.images?.[0]?.url || null,
        },
      },
      { merge: true }
    );

    console.log('Data written to Firestore for user:', uid);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Spotify account linked successfully.' }),
    };
  } catch (error) {
    console.error('Error linking Spotify:', error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
