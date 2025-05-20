
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Chart = ({ transactions }) => {
  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const chartData = {
    labels: ['Income', 'Expense'],
    datasets: [
      {
        label: 'Total Amount',
        data: [income, expense],
        backgroundColor: ['green', 'red'],
      },
    ],
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto' }}>
      <Bar data={chartData} />
    </div>
  );
};

export default Chart;
