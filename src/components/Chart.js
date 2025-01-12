import React from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';

ChartJS.register(...registerables);

function Chart({ type, data, options }) {
  const ChartComponent = {
    bar: Bar,
    line: Line,
    pie: Pie
  }[type];

  const chartOptions = {
    ...options,
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="chart-js">
      <ChartComponent data={data} options={chartOptions} />
    </div>
  );
}

export default Chart;

