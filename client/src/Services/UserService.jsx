import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const UserService = () => {
  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL_AUTH,
  });

  const navigate = useNavigate();

  const login = async (formData) => {
    try {
      const response = await axiosInstance.post('/login', formData);
      localStorage.setItem('access_token', response.data.access_token);
      toast.success(response.data.message);
      navigate('/home');
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const signup = async (formData) => {
    try {
      const response = await axiosInstance.post('/signup', formData);
      toast.success(response.data.message);
      navigate('/login');
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const validateToken = async (token) => {
    try {
      const response = await axiosInstance.get('/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200) return false;
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error(error.response.data.error);
        localStorage.removeItem('access_token');
        navigate('./login');
        return false;
      }
      toast.error('Erro ao validar o token');
      return false;
    }
  };

  return {
    login,
    validateToken,
    signup,
  };
};

export default UserService;
