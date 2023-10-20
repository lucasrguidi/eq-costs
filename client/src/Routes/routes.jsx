import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from '../Screens/Home';
import Login from '../Screens/Login';
import SignUp from '../Screens/SignUp';
import Event from '../Screens/Event';

import { RequireAuth } from '../Context/RequireAuth';
import { useContext, useEffect } from 'react';
import { AuthContext, AuthProvider } from '../Context/AuthContext';

const AppRoutes = () => {
  const { signed } = useContext(AuthContext);

  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path='/login' element={<Login />} />
          <Route path='/cadastro' element={<SignUp />} />
          {/* Protected routes */}
          <Route
            path='/home'
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route
            path='/event/:id'
            element={
              <RequireAuth>
                <Event />
              </RequireAuth>
            }
          />
          {/* Non-existing routes */}
          <Route
            path='*'
            element={
              <RequireAuth>
                <Navigate to='/home' />
              </RequireAuth>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default AppRoutes;
