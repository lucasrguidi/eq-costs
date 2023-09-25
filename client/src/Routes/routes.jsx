import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../Screens/Login';
import SignUp from '../Screens/SignUp';
import Home from '../Screens/Home';

import { AuthProvider } from '../Context/AuthContext';
import { RequireAuth } from '../Context/RequireAuth';

const AppRoutes = () => (
  <AuthProvider>
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path='*' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
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

export default AppRoutes;
