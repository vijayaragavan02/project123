
import React, { useContext, useState, useEffect } from 'react';
import { TransactionContext } from '../Contexts/TransactionContext';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';
import Category from '../components/Category';
import Chart from '../components/Chart';
import Profile from '../Pages/Profile';

const Dashboard = () => {
  const { transactions, editTransaction } = useContext(TransactionContext);
  const [editingTransaction, setEditingTransaction] = useState(null);

  useEffect(() => {
    document.title = 'Dashboard - Financial App';
  }, []);

  return (
    <div className="dashboard-container">
      <Profile />
      <div className="dashboard-grid">
        <div>
          <h2>Transaction Manager</h2>
          <TransactionForm
            editingTransaction={editingTransaction}
            onUpdate={editTransaction}
            setEditingTransaction={setEditingTransaction}
          />
          <TransactionList onEdit={setEditingTransaction} />
        </div>
        <div>
          <h2>Category List</h2>
          <Category />
          <h2>Spending Overview</h2>
          <Chart transactions={transactions} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
