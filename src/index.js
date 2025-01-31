import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { CustomersContextProvider } from './context/customersContext';
import { AuthContextProvider } from './context/AuthContext';
import { PCustomersContextProvider } from './context/pcustomersContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <CustomersContextProvider>
        <PCustomersContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
        </PCustomersContextProvider>
      </CustomersContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);