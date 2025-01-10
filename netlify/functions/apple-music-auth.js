const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

exports.handler = async (event) => {
  const { code } = event.queryStringParameters;

  if (!code) {
    return {
      statusCode: 400,
      body: 'Missing authorization code',
    };
  }

  try {
    const response = await axios.post(
      'https://api.music.apple.com/v1/me/tokens',
      {
        grant_type: 'authorization_code',
        code,
        redirect_uri: process.env.APPLE_MUSIC_REDIRECT_URI,
        client_id: process.env.APPLE_MUSIC_CLIENT_ID,
        client_secret: process.env.APPLE_MUSIC_CLIENT_SECRET,
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
        appleMusic: {
          accessToken,
          refreshToken,
        },
      },
      { merge: true }
    );

    return {
      statusCode: 200,
      body: 'Apple Music account linked successfully',
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: `Error: ${error.message}`,
    };
  }
};
