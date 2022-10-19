import axios from 'axios';
import authApi from '../api/auth.api.js';

export default class UserService {
  static async register(name, email, password) {
    return await axios.post('api/user/register', { name, email, password });
  }

  static async login(email, password) {
    return await axios.post('api/user/login', { email, password });
  }

  static async auth() {
    return await axios.get('api/user/refresh', { withCredentials: true });
  }

  static async getUsersByName(name) {
    const response = await authApi.post('/user/users-by-name', { name });
    return response.data;
  }
}