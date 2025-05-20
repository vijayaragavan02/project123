
import React, { useState } from 'react';
import { useCategoryContext } from '../contexts/CategoryContext';

const Category = () => {
  const { categories, addCategory, removeCategory } = useCategoryContext();
  const [input, setInput] = useState('');

  const handleAdd = () => {
    if (input.trim()) {
      addCategory(input.trim());
      setInput('');
    }
  };

  return (
    <div className="category-section">
      <h3>Manage Categories</h3>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="New Category"
      />
      <button onClick={handleAdd}>Add</button>
      <ul>
        {categories.map(cat => (
          <li key={cat}>
            {cat} <button onClick={() => removeCategory(cat)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Category;
