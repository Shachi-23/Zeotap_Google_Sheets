export function createChartData(cells, range) {
    const { start, end } = range;
    const labels = [];
    const datasets = [];
  
    for (let col = start[1]; col <= end[1]; col++) {
      const data = [];
      for (let row = start[0]; row <= end[0]; row++) {
        if (col === start[1]) {
          labels.push(cells[row][start[1]].value);
        }
        if (row > start[0]) {
          data.push(parseFloat(cells[row][col].value) || 0);
        }
      }
      if (col > start[1]) {
        datasets.push({
          label: cells[start[0]][col].value,
          data: data,
          backgroundColor: generateRandomColor(0.6),
          borderColor: generateRandomColor(1),
          borderWidth: 1,
        });
      }
    }
  
    return { labels, datasets };
  }
  
  // Generate chart options based on chart type and title
  export function getChartOptions(type, title) {
    const baseOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: title,
        },
      },
    };
  
    switch (type) {
      case 'bar':
        return {
          ...baseOptions,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        };
      case 'line':
        return {
          ...baseOptions,
          elements: {
            line: {
              tension: 0.1,
            },
          },
        };
      case 'pie':
        return {
          ...baseOptions,
          plugins: {
            ...baseOptions.plugins,
            legend: {
              position: 'right',
            },
          },
        };
      default:
        return baseOptions;
    }
  }
  
  // Generate a random color
  function generateRandomColor(alpha = 1) {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  
  // Update existing chart data
  export function updateChartData(chartData, cells, range) {
    const { labels, datasets } = createChartData(cells, range);
    chartData.labels = labels;
    chartData.datasets = datasets;
    return chartData;
  }
  
  // Create a scatter plot data from two columns
  export function createScatterPlotData(cells, xRange, yRange) {
    const data = [];
    const xValues = cells.slice(xRange.start[0], xRange.end[0] + 1).map(row => parseFloat(row[xRange.start[1]].value) || 0);
    const yValues = cells.slice(yRange.start[0], yRange.end[0] + 1).map(row => parseFloat(row[yRange.start[1]].value) || 0);
  
    for (let i = 0; i < xValues.length; i++) {
      data.push({ x: xValues[i], y: yValues[i] });
    }
  
    return [{
      label: 'Scatter Plot',
      data: data,
      backgroundColor: generateRandomColor(0.6),
      borderColor: generateRandomColor(1),
      borderWidth: 1,
    }];
  }
  
  // Calculate trend line for scatter plot
  export function calculateTrendLine(data) {
    const n = data.length;
    let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;
  
    for (let i = 0; i < n; i++) {
      sumX += data[i].x;
      sumY += data[i].y;
      sumXY += data[i].x * data[i].y;
      sumX2 += data[i].x * data[i].x;
    }
  
    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;
  
    return { slope, intercept };
  }
  