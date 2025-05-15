import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CategoryProvider } from './Contexts/CategoryContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CategoryProvider>
      <App />
    </CategoryProvider>
  </React.StrictMode>
);