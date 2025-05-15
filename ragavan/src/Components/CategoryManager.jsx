import React, { useState } from 'react';

const CategoryManager = ({ categories, onAdd, onDelete }) => {
  const [newCategory, setNewCategory] = useState('');

  const handleAdd = () => {
    if (newCategory.trim()) {
      onAdd(newCategory.trim());
      setNewCategory('');
    }
  };

  return (
    <div>
      <h3>Manage Categories</h3>
      <input type="text" placeholder="New Category" value={newCategory} onChange={e => setNewCategory(e.target.value)} />
      <button onClick={handleAdd}>Add</button>
      <ul>
        {categories.map(c => (
          <li key={c}>
            {c} <button onClick={() => onDelete(c)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryManager;