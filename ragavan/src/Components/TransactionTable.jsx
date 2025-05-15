import React from 'react';

const TransactionTable = ({ transactions, onEdit, onDelete }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Type</th>
          <th>Category</th>
          <th>Amount</th>
          <th>Note</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map(t => (
          <tr key={t.id}>
            <td>{t.date}</td>
            <td>{t.type}</td>
            <td>{t.category}</td>
            <td>{t.amount}</td>
            <td>{t.note}</td>
            <td>
              <button onClick={() => onEdit(t)}>Edit</button>
              <button onClick={() => onDelete(t.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TransactionTable;