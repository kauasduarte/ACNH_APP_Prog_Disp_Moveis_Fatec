import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.nookipedia.com/',
  headers: {
    'X-API-KEY': '#', 
    'Content-Type': 'application/json',
  },
});

export default api;
