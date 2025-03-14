import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './stylesheets/all.scss';
import App from './App.tsx';
import axios from 'axios';
import { HashRouter } from 'react-router-dom';
axios.defaults.baseURL = import.meta.env.VITE_API_URL;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>
);
