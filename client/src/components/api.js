import axios from 'axios';

// Set the base URL for Axios using environment variable
const instance = axios.create({
  baseURL: 'http://localhost:8000',
});



export default instance;