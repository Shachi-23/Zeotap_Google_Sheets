import { generateId } from './helpers';

export function createNewSheet(rows = 100, cols = 26) {
  return Array(rows).fill().map(() => 
    Array(cols).fill().map(() => ({ id: generateId(), value: '', formula: '', format: {} }))
  );
}

export function downloadSheet(sheet) {
  const csvContent = sheet.data.map(row => 
    row.map(cell => {
      // Escape quotes and wrap the cell content in quotes if it contains commas or newlines
      const escapedValue = cell.value.replace(/"/g, '""');
      return /[,\n"]/.test(escapedValue) ? `"${escapedValue}"` : escapedValue;
    }).join(',')
  ).join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${sheet.name}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

