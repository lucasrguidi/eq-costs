import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import UserService from '../Services/UserService';
import { toast } from 'react-toastify';

const userService = new UserService();

export const RequireAuth = ({ children }) => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  const validateToken = async () => {
    setLoading(true);
    try {
      const userData = await userService.validateToken(localStorage.getItem('access_token'));
      if (userData) {
        setUser({
          id: userData.id,
          name: userData.name,
          email: userData.email,
          avatar: userData.avatar,
        });
      }
    } catch (error) {
      navigate('/login');
      toast.error('Sessão expirada');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem('access_token')) return navigate('/login');

    validateToken();
  }, []);

  return loading ? <div>Carregando...</div> : children;
};
