
import React from 'react';
import { useTransactionContext } from '../Contexts/TransactionContext';

const TransactionList = ({ onEdit }) => {
  const { transactions, deleteTransaction } = useTransactionContext();

  return (
    <div className="transaction-list">
      <h3>Transaction History</h3>
      {transactions.map(transaction => (
        <div
          key={transaction.id}
          className={`transaction-item ${transaction.type}`}
        >
          <span>{transaction.title}</span>
          <span>₹{transaction.amount}</span>
          <span>{transaction.category}</span>
          <span className="type">{transaction.type}</span>
          <button onClick={() => onEdit(transaction)}>Edit</button>
          <button onClick={() => deleteTransaction(transaction.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default TransactionList;


