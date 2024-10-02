import React, { useReducer, useState, useEffect } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import ExpenseSummary from './components/ExpenseSummary';
import BudgetAlerts from './components/BudgetAlerts';
import './App.css';
import { Expense } from './types';

const expenseReducer = (state: Expense[], action: any): Expense[] => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [...state, action.payload];
    case 'DELETE_EXPENSE':
      return state.filter((_, index) => index !== action.payload);
    case 'EDIT_EXPENSE':
      const updatedExpenses = [...state];
      updatedExpenses[action.payload.index] = action.payload.newExpense;
      return updatedExpenses;
    default:
      return state;
  }
};

const App: React.FC = () => {
  const [expenses, dispatch] = useReducer(expenseReducer, [], () => {
    const localData = localStorage.getItem('expenses');
    return localData ? JSON.parse(localData) : [];
  });

  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [budgetLimits] = useState({ food: 200, entertainment: 150, others: 300 });

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  return (
    <div className="container">
      <h1>Personal Budget Manager</h1>
      <ExpenseForm
        dispatch={dispatch}
        editingExpense={editingExpense}
        setEditingExpense={setEditingExpense}
        expenses={expenses}
      />
      <ExpenseList
        expenses={expenses}
        dispatch={dispatch}
        setEditingExpense={setEditingExpense}
      />
      <ExpenseSummary expenses={expenses} />
      <BudgetAlerts expenses={expenses} budgetLimits={budgetLimits} />
    </div>
  );
};

export default App;
