import axios from 'axios';

const api = axios.create({
  baseURL: '/', // URL do seu backend Rails
});

export default api;
