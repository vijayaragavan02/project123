
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TransactionsContext } from "../Utils/TransactionsContext";
import { logout } from "../Utils/Auth";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { downloadCSV } from "../Utils/DownloadCsv";
import "./DashBoard.css";

Chart.register(...registerables);

const Dashboard = () => {
  const navigate = useNavigate();
  const {
    transactions,
    categories,
    addTransaction,
    deleteTransaction,
    editTransaction,
    addCategory,
    deleteCategory,
  } = useContext(TransactionsContext);

  const [filterType, setFilterType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [form, setForm] = useState({
    date: "",
    type: "income",
    category: "",
    amount: "",
    note: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [newCategory, setNewCategory] = useState("");

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      editTransaction({ ...form, id: editingId });
      setEditingId(null);
    } else {
      addTransaction(form);
    }
    setForm({ date: "", type: "income", category: "", amount: "", note: "" });
  };

  const handleEdit = (t) => {
    setForm(t);
    setEditingId(t.id);
  };

  const isInDateRange = (date) => {
    const d = new Date(date);
    const from = dateFrom ? new Date(dateFrom) : null;
    const to = dateTo ? new Date(dateTo) : null;
    return (!from || d >= from) && (!to || d <= to);
  };

  const filtered = transactions.filter((t) => {
    return (
      (filterType === "all" || t.type === filterType) &&
      isInDateRange(t.date) &&
      (t.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.note.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.amount.toString().includes(searchTerm))
    );
  });

  const sorted = [...filtered].sort((a, b) => new Date(b.date) - new Date(a.date));

  const income = filtered
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const expenses = filtered
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const balance = income - expenses;

  const chartData = {
    labels: filtered.map((t) => t.date),
    datasets: [
      {
        label: "Income",
        data: filtered.map((t) =>
          t.type === "income" ? Number(t.amount) : 0
        ),
        borderColor: "green",
        fill: false,
      },
      {
        label: "Expenses",
        data: filtered.map((t) =>
          t.type === "expense" ? Number(t.amount) : 0
        ),
        borderColor: "red",
        fill: false,
      },
    ],
  };

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>

      <div className="top-controls">
        <button onClick={() => navigate("/profile")}>View Profile</button>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <div className="summary">
        <p><strong>Monthly Income:</strong> ₹{income}</p>
        <p><strong>Monthly Expenses:</strong> ₹{expenses}</p>
        <p><strong>Balance:</strong> ₹{balance}</p>
      </div>

      <div style={{ maxWidth: "600px", margin: "20px auto" }}>
        <Line data={chartData} />
      </div>

      <form onSubmit={handleSubmit}>
        <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
        <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <input type="number" placeholder="Amount" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} required />
        <input type="text" placeholder="Note" value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} />
        <button type="submit">{editingId ? "Update" : "Add"} Transaction</button>
      </form>

      <div className="filters">
        <input type="text" placeholder="Search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
        <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <button onClick={() => downloadCSV(filtered)}>Download CSV</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Date</th><th>Type</th><th>Category</th><th>Amount</th><th>Note</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((t) => (
            <tr key={t.id}>
              <td>{t.date}</td><td>{t.type}</td><td>{t.category}</td><td>{t.amount}</td><td>{t.note}</td>
              <td>
                <button onClick={() => handleEdit(t)}>Edit</button>
                <button onClick={() => deleteTransaction(t.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Manage Categories</h3>
      <input type="text" placeholder="New Category" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
      <button onClick={() => { addCategory(newCategory); setNewCategory(""); }}>Add</button>
      <ul>
        {categories.map((c) => (
          <li key={c}>{c} <button onClick={() => deleteCategory(c)}>Delete</button></li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
