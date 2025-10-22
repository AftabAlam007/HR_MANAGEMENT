import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // <-- Make sure this is imported
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* BrowserRouter must wrap your App component */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);