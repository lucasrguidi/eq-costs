import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from '../Screens/Home';
import Login from '../Screens/Login';
import SignUp from '../Screens/SignUp';

import { RequireAuth } from '../Context/RequireAuth';
import { AuthProvider } from '../Context/AuthContext';
import Navbar from '../Components/Navbar';

const AppRoutes = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route
            path='*'
            element={
              <RequireAuth>
                <Navigate to='/home' />
              </RequireAuth>
            }
          />
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
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default AppRoutes;
