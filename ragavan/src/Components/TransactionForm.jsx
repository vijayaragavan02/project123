
import React, { useState, useEffect } from 'react';
import { useTransactionContext } from '../Contexts/TransactionContext';
import { useCategoryContext } from '../contexts/CategoryContext';

const TransactionForm = ({ editingTransaction, onUpdate, setEditingTransaction }) => {
  const { addTransaction } = useTransactionContext();
  const { categories } = useCategoryContext();

  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: '',
    type: 'income',
  });

  useEffect(() => {
    if (editingTransaction) {
      setFormData(editingTransaction);
    }
  }, [editingTransaction]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.amount || !formData.category) return;

    if (editingTransaction) {
      onUpdate({ ...formData, amount: parseFloat(formData.amount) });
      setEditingTransaction(null);
    } else {
      addTransaction({ ...formData, amount: parseFloat(formData.amount) });
    }
    setFormData({ title: '', amount: '', category: '', type: 'income' });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        name="title"
        value={formData.title}
        placeholder="Title"
        onChange={handleChange}
      />
      <input
        name="amount"
        value={formData.amount}
        placeholder="Amount"
        type="number"
        onChange={handleChange}
      />
      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
      >
        <option value="">Select Category</option>
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      <select
        name="type"
        value={formData.type}
        onChange={handleChange}
      >
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <button type="submit">{editingTransaction ? 'Update' : 'Add'} Transaction</button>
      {editingTransaction && (
        <button type="button" onClick={() => setEditingTransaction(null)}>Cancel</button>
      )}
    </form>
  );
};

export default TransactionForm;
