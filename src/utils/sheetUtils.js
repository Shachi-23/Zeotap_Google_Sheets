import { generateId, createCell } from './helpers';

// Create a new sheet with specified dimensions
export function createNewSheet(rows = 100, cols = 26) {
  return Array(rows).fill().map(() => 
    Array(cols).fill().map(() => createCell())
  );
}

// Download sheet as CSV
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

// Import CSV file
export function importCSV(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      const rows = content.split('\n');
      const data = rows.map(row => 
        row.split(',').map(cell => createCell(cell.replace(/^"(.*)"$/, '$1').replace(/""/g, '"')))
      );
      resolve(data);
    };
    reader.onerror = (e) => {
      reject(new Error('Error reading CSV file'));
    };
    reader.readAsText(file);
  });
}

// Copy a sheet
export function copySheet(sheet) {
  return {
    ...sheet,
    id: generateId(),
    name: `${sheet.name} (Copy)`,
    data: sheet.data.map(row => row.map(cell => ({ ...cell, id: generateId() }))),
  };
}

// Rename a sheet
export function renameSheet(sheet, newName) {
  return { ...sheet, name: newName };
}

// Delete a sheet
export function deleteSheet(sheets, sheetId) {
  return sheets.filter(sheet => sheet.id !== sheetId);
}

// Get cell at specified row and column
export function getCell(sheet, row, col) {
  return sheet.data[row][col];
}

// Set cell value at specified row and column
export function setCellValue(sheet, row, col, value) {
  const newSheet = { ...sheet };
  newSheet.data[row][col] = { ...newSheet.data[row][col], value };
  return newSheet;
}

// Get range of cells
export function getRange(sheet, startRow, startCol, endRow, endCol) {
  return sheet.data.slice(startRow, endRow + 1).map(row => row.slice(startCol, endCol + 1));
}

// Set range of cells
export function setRange(sheet, startRow, startCol, data) {
  const newSheet = { ...sheet };
  data.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      newSheet.data[startRow + rowIndex][startCol + colIndex] = { ...cell };
    });
  });
  return newSheet;
}

// Clear range of cells
export function clearRange(sheet, startRow, startCol, endRow, endCol) {
  const newSheet = { ...sheet };
  for (let row = startRow; row <= endRow; row++) {
    for (let col = startCol; col <= endCol; col++) {
      newSheet.data[row][col] = createCell();
    }
  }
  return newSheet;
}

