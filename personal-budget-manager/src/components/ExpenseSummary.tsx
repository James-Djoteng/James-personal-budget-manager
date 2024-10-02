import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';
import { Expense } from '../types';

Chart.register(ArcElement);

type Category = 'food' | 'entertainment' | 'others';

interface Props {
  expenses: Expense[];
}

const ExpenseSummary: React.FC<Props> = ({ expenses }) => {
  const categoryTotals: { [key in Category]: number } = expenses.reduce(
    (totals, expense) => {
      const category = expense.category as Category;
      totals[category] = (totals[category] || 0) + expense.amount;
      return totals;
    },
    { food: 0, entertainment: 0, others: 0 }
  );

  const totalExpenses = Object.values(categoryTotals).reduce((total, value) => total + value, 0);

  const data = {
    labels: ['Food', 'Entertainment', 'Others'],
    datasets: [
      {
        data: [categoryTotals.food, categoryTotals.entertainment, categoryTotals.others],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384CC', '#36A2EBCC', '#FFCE56CC'], // Hover effect
      },
    ],
  };

  const options = {
    animation: {
      animateScale: true,
      animateRotate: true,
    },
  };

  return (
    <div className="chart-container">
      <h2>Expense Summary</h2>
      <Pie data={data} options={options} />

      {/* Expense Breakdown */}
      <div className="expense-breakdown">
        <p><strong>Food:</strong> {((categoryTotals.food / totalExpenses) * 100).toFixed(2)}%</p>
        <p><strong>Entertainment:</strong> {((categoryTotals.entertainment / totalExpenses) * 100).toFixed(2)}%</p>
        <p><strong>Others:</strong> {((categoryTotals.others / totalExpenses) * 100).toFixed(2)}%</p>
      </div>
    </div>
  );
};

export default ExpenseSummary;
