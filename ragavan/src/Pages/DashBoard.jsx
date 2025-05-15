import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TransactionsContext } from '../Contexts/TransactionContext';
import { useCategory } from '../Contexts/CategoryContext';
import { logout } from '../Services/AuthService';
import ChartDisplay from '../Components/ChartDisplay';
import TransactionForm from '../Components/TransactionForm';
import TransactionTable from '../Components/TransactionTable';
import CategoryManager from '../Components/CategoryManager';
import { downloadCSV } from '../Utils/DownloadCsv';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const {
    transactions,
    addTransaction,
    deleteTransaction,
    editTransaction,
  } = useContext(TransactionsContext);

  const { categories, addCategory, deleteCategory } = useCategory();

  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [editingTransaction, setEditingTransaction] = useState(null);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleEdit = transaction => {
    setEditingTransaction(transaction);
  };

  const handleSubmit = transaction => {
    if (editingTransaction) {
      editTransaction({ ...transaction, id: editingTransaction.id });
      setEditingTransaction(null);
    } else {
      addTransaction(transaction);
    }
  };

  const isInDateRange = date => {
    const d = new Date(date);
    const from = dateFrom ? new Date(dateFrom) : null;
    const to = dateTo ? new Date(dateTo) : null;
    return (!from || d >= from) && (!to || d <= to);
  };

  const filtered = transactions.filter(t => {
    return (
      (filterType === 'all' || t.type === filterType) &&
      isInDateRange(t.date) &&
      (t.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.note.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  return (
    <div className="dashboard-container">
      <header>
        <h1>Financial Dashboard</h1>
        <button onClick={handleLogout}>Logout</button>
      </header>

      <section className="filters">
        <label>Type:</label>
        <select value={filterType} onChange={e => setFilterType(e.target.value)}>
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <label>Search:</label>
        <input
          type="text"
          placeholder="Search by category or note"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />

        <label>From:</label>
        <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} />
        <label>To:</label>
        <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} />
        <button onClick={() => downloadCSV(filtered)}>Download CSV</button>
      </section>

      <TransactionForm
        onSubmit={handleSubmit}
        editingTransaction={editingTransaction}
      />

      <TransactionTable
        transactions={filtered}
        onEdit={handleEdit}
        onDelete={deleteTransaction}
      />

      <ChartDisplay transactions={filtered} />

      <CategoryManager categories={categories} onAdd={addCategory} onDelete={deleteCategory} />
    </div>
  );
};

export default Dashboard;