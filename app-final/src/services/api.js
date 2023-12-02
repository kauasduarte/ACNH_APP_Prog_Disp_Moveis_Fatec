import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.nookipedia.com/',
  headers: {
    'X-API-KEY': '1f22b6af-4f60-44b8-89b0-d9b6a87bc862', 
    'Content-Type': 'application/json',
  },
});

export default api;
