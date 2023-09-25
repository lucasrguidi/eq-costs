import React from 'react';
import GlobalStyle from './Styles/global';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppRoutes from './Routes/routes';

function App() {
  return (
    <>
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
    </>
  );
}

export default App;
