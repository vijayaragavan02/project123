import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const ChartDisplay = ({ transactions }) => {
  const dates = transactions.map(t => t.date);
  const incomeData = transactions.map(t => t.type === 'income' ? Number(t.amount) : 0);
  const expenseData = transactions.map(t => t.type === 'expense' ? Number(t.amount) : 0);

  const data = {
    labels: dates,
    datasets: [
      {
        label: 'Income',
        data: incomeData,
        borderColor: 'green',
        fill: false,
      },
      {
        label: 'Expenses',
        data: expenseData,
        borderColor: 'red',
        fill: false,
      },
    ],
  };

  return <Line data={data} />;
};

export default ChartDisplay;