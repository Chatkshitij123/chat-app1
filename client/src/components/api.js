import axios from 'axios';

// Set the base URL for Axios using environment variable
const instance = axios.create({
  baseURL: 'https://chat-app1-6y2q.onrender.com',
});



export default instance;