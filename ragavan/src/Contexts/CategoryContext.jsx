import React, { createContext, useState, useEffect, useContext } from 'react';

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('categories');
    if (stored) {
      setCategories(JSON.parse(stored));
    } else {
      const defaultCategories = ['Salary', 'Food', 'Fees'];
      setCategories(defaultCategories);
      localStorage.setItem('categories', JSON.stringify(defaultCategories));
    }
  }, []);

  const addCategory = (category) => {
    const trimmed = category.trim();
    if (!trimmed || categories.includes(trimmed)) return;
    const updated = [...categories, trimmed];
    setCategories(updated);
    localStorage.setItem('categories', JSON.stringify(updated));
  };

  const deleteCategory = (name) => {
    const updated = categories.filter(c => c !== name);
    setCategories(updated);
    localStorage.setItem('categories', JSON.stringify(updated));
  };

  return (
    <CategoryContext.Provider value={{ categories, addCategory, deleteCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => useContext(CategoryContext);