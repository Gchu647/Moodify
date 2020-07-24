// This application using the client credentials flow  authorization of Spotify API
const client_id = 'Enter Your Spotify Client Id';
const client_secret = 'Enter Your Spotify Secret';

// headers and data for authorization
export const headers = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  auth: {
    username: client_id,
    password: client_secret,
  },
};

export const data = {
  grant_type: 'client_credentials',
};