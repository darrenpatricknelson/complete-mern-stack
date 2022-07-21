import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CarContextProvider } from './context/Cars.Context.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CarContextProvider>
      <App />
    </CarContextProvider>
  </React.StrictMode>
);
