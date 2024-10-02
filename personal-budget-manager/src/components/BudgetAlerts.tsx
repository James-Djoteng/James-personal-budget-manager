import React from 'react';
import { Expense } from '../types';

type Category = 'food' | 'entertainment' | 'others';

interface Props {
  expenses: Expense[];
  budgetLimits: { [key in Category]: number };
}

const BudgetAlerts: React.FC<Props> = ({ expenses, budgetLimits }) => {
  const categoryTotals: { [key in Category]: number } = expenses.reduce(
    (totals, expense) => {
      const category = expense.category as Category;
      totals[category] = (totals[category] || 0) + expense.amount;
      return totals;
    },
    { food: 0, entertainment: 0, others: 0 }
  );

  return (
    <div>
      {Object.keys(budgetLimits).map((category) => (
        <div key={category}>
          <p>{category}: Spent ${categoryTotals[category as Category].toFixed(2)} of ${budgetLimits[category as Category]}</p>
          {categoryTotals[category as Category] >= budgetLimits[category as Category] && (
            <p className="alert alert-warning">Warning: Over Budget!</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default BudgetAlerts;
