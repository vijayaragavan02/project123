
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Dashboard from './Pages/DashBoard';
import ProtectedRoute from './Routes/ProtectedRoute';
import { TransactionProvider } from './Contexts/TransactionContext';
import { CategoryProvider } from './contexts/CategoryContext';
import './Styles/DashboardPage.css';
import './Styles/LoginPage.css';

function App() {
  return (
    <BrowserRouter>
      <TransactionProvider>
        <CategoryProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </CategoryProvider>
      </TransactionProvider>
    </BrowserRouter>
  );
}

export default App;



