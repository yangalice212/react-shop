import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './stylesheets/all.scss';
import App from './App.tsx';
import axios from 'axios';
import { HashRouter } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Provider } from 'react-redux';
import { store } from './store.ts';
axios.defaults.baseURL = import.meta.env.VITE_API_URL;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </HashRouter>
  </StrictMode>
);
