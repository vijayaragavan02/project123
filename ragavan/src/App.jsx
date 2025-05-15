import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Dashboard from './Pages/DashBoard';
import Profile from './Pages/Profile';
import ProtectedRoute from './Routes/ProtectedRoute';
import { TransactionsProvider } from './Contexts/TransactionContext';

const App = () => {
  return (
    <TransactionsProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        </Routes>
      </Router>
    </TransactionsProvider>
  );
};

export default App;


