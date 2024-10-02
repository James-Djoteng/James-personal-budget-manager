import React, { useState } from 'react';
import { Expense } from '../types';

interface Props {
  expenses: Expense[];
  dispatch: React.Dispatch<any>;
  setEditingExpense: React.Dispatch<React.SetStateAction<Expense | null>>;
}

const ExpenseList: React.FC<Props> = ({ expenses, dispatch, setEditingExpense }) => {
  const [filterCategory, setFilterCategory] = useState<string>('');
  const [filterDate, setFilterDate] = useState<string>('');

  const filteredExpenses = expenses.filter(expense => {
    return (!filterCategory || expense.category === filterCategory) &&
           (!filterDate || expense.date === filterDate);
  });

  const totalExpenses = filteredExpenses.reduce((total, expense) => total + expense.amount, 0);

  return (
    <div>
      {/* Filter Options */}
      <div className="filter-container">
        <label>Filter by Category: </label>
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="">All</option>
          <option value="food">Food</option>
          <option value="entertainment">Entertainment</option>
          <option value="others">Others</option>
        </select>
        
        <label>Filter by Date: </label>
        <input type="date" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} />
      </div>

      {/* Expense List */}
      <ul className="list-group">
        {filteredExpenses.map((expense, index) => (
          <li key={index} className="list-group-item">
            <span>{expense.date} - {expense.category} - ${expense.amount.toFixed(2)}</span>
            <div>
              <button className="btn btn-primary" onClick={() => setEditingExpense(expense)}>Edit</button>
              <button className="btn btn-danger" onClick={() => dispatch({ type: 'DELETE_EXPENSE', payload: index })}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {/* Total Expenses */}
      <div className="expense-total">
        Total Expenses: ${totalExpenses.toFixed(2)}
      </div>
    </div>
  );
};

export default ExpenseList;
