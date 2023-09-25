import axios from 'axios';

export default class UserService {
  constructor() {
    this.axios = axios.create({
      baseURL: import.meta.env.VITE_API_URL_AUTH,
    });
  }

  async login(formData) {
    const { data } = await this.axios.post('/login', formData);

    if (data) {
      localStorage.setItem('access_token', data.access_token);
      return true;
    }

    return;
  }

  async validateToken(token) {
    const { data } = await this.axios.get('/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (data) {
      return data;
    }

    return;
  }
}
