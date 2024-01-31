import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import UserService from '../Services/UserService';
import { toast } from 'react-toastify';

export const RequireAuth = ({ children }) => {
  const navigate = useNavigate();
  const userService = UserService();
  const { setUser, setSigned } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  const validateToken = async () => {
    setLoading(true);
    try {
      const userData = await userService.validateToken(localStorage.getItem('access_token'));
      if (userData) {
        setUser((prev) => ({
          ...prev,
          username: userData.username,
          email: userData.email,
        }));
        setSigned(true);
      }
    } catch (error) {
      navigate('/login');
      toast.error('Sessão expirada');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem('access_token')) {
      setSigned(false);
      return navigate('/login');
    }

    validateToken();
  }, []);
  return loading ? <div>Carregando...</div> : children;
};
