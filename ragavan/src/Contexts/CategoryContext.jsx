
import React, { createContext, useState, useEffect, useContext } from 'react';

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('categories');
    if (saved) {
      setCategories(JSON.parse(saved));
    } else {
      const defaultList = ['Salary', 'Food', 'Bills'];
      setCategories(defaultList);
      localStorage.setItem('categories', JSON.stringify(defaultList));
    }
  }, []);

  const addCategory = (name) => {
    if (name && !categories.includes(name)) {
      const updated = [...categories, name];
      setCategories(updated);
      localStorage.setItem('categories', JSON.stringify(updated));
    }
  };

  const removeCategory = (name) => {
    const updated = categories.filter(c => c !== name);
    setCategories(updated);
    localStorage.setItem('categories', JSON.stringify(updated));
  };

  return (
    <CategoryContext.Provider value={{ categories, addCategory, removeCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategoryContext = () => useContext(CategoryContext);
