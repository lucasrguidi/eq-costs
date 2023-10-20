import React from 'react';
import GlobalStyle from './Styles/global';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppRoutes from './Routes/routes';
import { AuthProvider } from './Context/AuthContext';

function App() {
  return (
    <>
      <AuthProvider>
        <GlobalStyle />
        <ToastContainer
          position='top-right'
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          transition={Slide}
        />
        <AppRoutes />
      </AuthProvider>
    </>
  );
}

export default App;
