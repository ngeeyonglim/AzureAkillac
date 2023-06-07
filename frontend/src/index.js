import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { PypListProvider } from './components/PypListContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <PypListProvider>
      <App />
      </PypListProvider>
    </BrowserRouter>
  </React.StrictMode>
);
