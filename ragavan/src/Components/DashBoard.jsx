import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../Utils/Auth";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import "./DashBoard.css";


Chart.register(...registerables);

const Dashboard = () => {
  const navigate = useNavigate();

  
  const transactions = [
    { type: "income", amount: 5000, date: "2025-05-01" },
    { type: "expense", amount: 2000, date: "2025-05-02" },
    { type: "income", amount: 3000, date: "2025-05-03" },
    { type: "expense", amount: 1500, date: "2025-05-04" },
  ];

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = income - expenses;

  const chartData = {
    labels: transactions.map((t) => t.date),
    datasets: [
      {
        label: "Income",
        data: transactions.map((t) => (t.type === "income" ? t.amount : 0)),
        borderColor: "green",
        fill: false,
      },
      {
        label: "Expenses",
        data: transactions.map((t) => (t.type === "expense" ? t.amount : 0)),
        borderColor: "red",
        fill: false,
      },
    ],
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <p>Total Income: ₹{income}</p>
      <p>Total Expenses: ₹{expenses}</p>
      <p>Balance: ₹{balance}</p>
      <div style={{ maxWidth: "600px", margin: "20px auto" }}>
        <Line data={chartData} />
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;