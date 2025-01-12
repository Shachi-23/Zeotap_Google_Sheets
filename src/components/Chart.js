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

  return (
    <div className="chart-container">
      <ChartComponent data={data} options={options} />
    </div>
  );
}

export default Chart;