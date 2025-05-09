import React, { createContext, useState, useEffect } from "react";

export const TransactionsContext = createContext();

export const TransactionsProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const storedTransactions = JSON.parse(localStorage.getItem("transactions")) || [];
    const storedCategories = JSON.parse(localStorage.getItem("categories")) || [];
    setTransactions(storedTransactions);
    setCategories(storedCategories);
  }, []);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [transactions, categories]);

  const addTransaction = (transaction) => {
    setTransactions([...transactions, { ...transaction, id: Date.now() }]);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const editTransaction = (updated) => {
    setTransactions(transactions.map((t) => (t.id === updated.id ? updated : t)));
  };

  const addCategory = (category) => {
    setCategories([...categories, category]);
  };

  const deleteCategory = (name) => {
    setCategories(categories.filter((c) => c !== name));
  };

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        categories,
        addTransaction,
        deleteTransaction,
        editTransaction,
        addCategory,
        deleteCategory,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};