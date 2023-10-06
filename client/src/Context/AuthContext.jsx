import { createContext, useState } from 'react';
import UserService from '../Services/UserService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const userService = UserService;
  const [user, setUser] = useState(null);

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};
