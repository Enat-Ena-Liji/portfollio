import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/global.css';

// Set light theme by default
const setTheme = () => {
  const root = document.documentElement;
  root.setAttribute('data-theme', 'light');
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Set theme on initial load
setTheme();