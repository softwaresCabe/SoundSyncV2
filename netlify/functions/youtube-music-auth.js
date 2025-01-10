// Backend function to handle YouTube Music OAuth
// File: netlify/functions/youtube-music-auth.js

const axios = require('axios');

exports.handler = async (event) => {
  const { code } = event.queryStringParameters;

  if (!code) {
    return {
      statusCode: 400,
      body: 'Missing authorization code',
    };
  }

  try {
    // Exchange authorization code for access token
    const response = await axios.post(
      'https://oauth2.googleapis.com/token',
      {
        code,
        client_id: process.env.YOUTUBE_MUSIC_CLIENT_ID,
        client_secret: process.env.YOUTUBE_MUSIC_CLIENT_SECRET,
        redirect_uri: process.env.YOUTUBE_MUSIC_REDIRECT_URI,
        grant_type: 'authorization_code',
      }
    );

    const accessToken = response.data.access_token;
    const refreshToken = response.data.refresh_token;

    // Store tokens in Firestore
    const { firebaseAdmin } = require('../firebase-admin');
    const db = firebaseAdmin.firestore();
    const userRef = db.collection('linkedAccounts').doc(event.queryStringParameters.uid);

    await userRef.set(
      {
        youtubeMusic: {
          accessToken,
          refreshToken,
        },
      },
      { merge: true }
    );

    return {
      statusCode: 200,
      body: 'YouTube Music account linked successfully',
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: `Error: ${error.message}`,
    };
  }
};
