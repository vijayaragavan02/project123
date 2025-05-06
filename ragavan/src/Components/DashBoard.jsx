import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../Utils/Auth";
import "./DashBoard.css";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="n1">
      <h2>Welcome to the Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;