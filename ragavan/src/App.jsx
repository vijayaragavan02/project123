import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Dashboard from "./Components/DashBoard";
import ProtectedRoute from "./Components/ProtectedRoute";
import { TransactionsProvider } from "./Utils/TransactionsContext";

const App = () => {
  return (
    <TransactionsProvider>
      <BrowserRouter>
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
      </BrowserRouter>
    </TransactionsProvider>
  );
};

export default App;

