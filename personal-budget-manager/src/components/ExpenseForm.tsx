import React, { useState, useEffect } from 'react';
import { Expense } from '../types';

interface Props {
  dispatch: React.Dispatch<any>;
  editingExpense: Expense | null;
  setEditingExpense: React.Dispatch<React.SetStateAction<Expense | null>>;
  expenses: Expense[];
}

const ExpenseForm: React.FC<Props> = ({ dispatch, editingExpense, setEditingExpense, expenses }) => {
  const [amount, setAmount] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [category, setCategory] = useState<string>('');

  useEffect(() => {
    if (editingExpense) {
      setAmount(editingExpense.amount.toString());
      setDate(editingExpense.date);
      setCategory(editingExpense.category);
    }
  }, [editingExpense]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || !date || !category) {
      alert('Please fill all fields.');
      return;
    }

    const expense: Expense = { amount: parseFloat(amount), date, category };

    if (editingExpense) {
      const index = expenses.findIndex(exp => exp === editingExpense);
      dispatch({ type: 'EDIT_EXPENSE', payload: { index, newExpense: expense } });
      setEditingExpense(null);
    } else {
      dispatch({ type: 'ADD_EXPENSE', payload: expense });
    }

    setAmount('');
    setDate('');
    setCategory('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Amount:</label>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
        required
      />

      <label>Date:</label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />

      <label>Category:</label>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      >
        <option value="">Select Category</option>
        <option value="food">Food</option>
        <option value="entertainment">Entertainment</option>
        <option value="others">Others</option>
      </select>

      <button type="submit" className="btn btn-success">
        {editingExpense ? 'Update Expense' : 'Add Expense'}
      </button>
    </form>
  );
};

export default ExpenseForm;
