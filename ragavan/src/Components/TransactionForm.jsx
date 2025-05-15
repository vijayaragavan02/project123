import React, { useState } from 'react';
import { useCategory } from '../Contexts/CategoryContext';  
import { useTransactions } from '../Contexts/TransactionContext';

const TransactionForm = ({ onSubmit, editingTransaction }) => {
  const { categories } = useCategory();
  const { addTransaction, editTransaction } = useTransactions();

  const [type, setType] = useState(editingTransaction?.type || 'income');
  const [category, setCategory] = useState(editingTransaction?.category || '');
  const [amount, setAmount] = useState(editingTransaction?.amount || '');
  const [note, setNote] = useState(editingTransaction?.note || '');
  const [date, setDate] = useState(editingTransaction?.date || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!category) {
      alert('Please select a category');
      return;
    }
    const transaction = { type, category, amount: parseFloat(amount), note, date };
    onSubmit(transaction);
    setCategory('');
    setAmount('');
    setNote('');
    setDate('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />

      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <select value={category} onChange={(e) => setCategory(e.target.value)} required>
        <option value="">Select Category</option>
        {categories.map((cat, idx) => (
          <option key={idx} value={cat}>{cat}</option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Note"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <button type="submit">{editingTransaction ? 'Update' : 'Add'} Transaction</button>
    </form>
  );
};

export default TransactionForm;