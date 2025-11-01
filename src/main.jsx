import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';

import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  // TIP: Re-enable StrictMode later if you want, but turning it off
  // in dev stops double-mount effects that can feel like reloads.
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
