import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootContainer = document.createElement('div');
document.body.appendChild(rootContainer);

ReactDOM.createRoot(rootContainer).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
