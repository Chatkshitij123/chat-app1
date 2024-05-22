import axios from 'axios';

// Set the base URL for Axios using environment variable
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});



export default api;