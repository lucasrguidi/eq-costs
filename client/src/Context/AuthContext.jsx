import { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [signed, setSigned] = useState(false);

  return (
    <AuthContext.Provider value={{ user, setUser, signed, setSigned }}>
      {children}
    </AuthContext.Provider>
  );
};
