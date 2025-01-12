export const createCell = () => ({
    value: '',
    formula: '',
    format: {},
    merged: undefined,
  });
  

  export function columnIndexToLetter(index) {
    let letter = '';
    while (index >= 0) {
      letter = String.fromCharCode((index % 26) + 65) + letter;
      index = Math.floor(index / 26) - 1;
    }
    return letter;
  }
  
  // Function to generate a unique ID (example: using current timestamp and a random number)
  export function generateId() {
    return 'ID-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
  }
  

export const insertRow = (cells, createCell) => {
    const newRow = Array(cells[0].length).fill().map(() => createCell());
    return [...cells, newRow];
  };
  
  export const deleteRow = (cells, selectedCell, MIN_ROWS) => {
    if (!selectedCell) return cells;
    const [rowIndex] = selectedCell;
  
    if (cells.length <= MIN_ROWS) {
      alert('Cannot delete row: Minimum number of rows reached');
      return cells;
    }
  
    return cells.filter((_, index) => index !== rowIndex);
  };
  
  export const insertColumn = (cells, createCell) => {
    return cells.map(row => [...row, createCell()]);
  };
  
  export const deleteColumn = (cells, selectedCell, MIN_COLS) => {
    if (!selectedCell) return cells;
    const [, colIndex] = selectedCell;
  
    if (cells[0].length <= MIN_COLS) {
      alert('Cannot delete column: Minimum number of columns reached');
      return cells;
    }
  
    return cells.map(row => row.filter((_, index) => index !== colIndex));
  };
  
  // Merge cells in the specified range
  export function mergeCells(cells, startRow, startCol, endRow, endCol) {
    const newCells = cells.map(row => [...row]);
    const mergedValue = newCells[startRow][startCol].value;
  
    for (let row = startRow; row <= endRow; row++) {
      for (let col = startCol; col <= endCol; col++) {
        if (row === startRow && col === startCol) {
          newCells[row][col] = {
            ...newCells[row][col],
            merged: { rowSpan: endRow - startRow + 1, colSpan: endCol - startCol + 1 },
            value: mergedValue
          };
        } else {
          newCells[row][col] = { ...newCells[row][col], merged: { hidden: true } };
        }
      }
    }
  
    return newCells;
  }
  
  // Unmerge cells in the specified range
  export function unmergeCells(cells, startRow, startCol, endRow, endCol) {
    return cells.map((row, rowIndex) =>
      row.map((cell, colIndex) => {
        if (rowIndex >= startRow && rowIndex <= endRow && colIndex >= startCol && colIndex <= endCol) {
          return { ...cell, merged: undefined };
        }
        return cell;
      })
    );
  }
  
  // Deep clone an object or array
  export function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }
  
  // Format a number as currency
  export function formatCurrency(value, currency = 'USD', locale = 'en-US') {
    return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value);
  }
  
  // Format a number as a percentage
  export function formatPercentage(value, decimalPlaces = 2, locale = 'en-US') {
    return new Intl.NumberFormat(locale, { style: 'percent', minimumFractionDigits: decimalPlaces, maximumFractionDigits: decimalPlaces }).format(value / 100);
  }
  
  // Format a date
  export function formatDate(date, format = 'short', locale = 'en-US') {
    return new Intl.DateTimeFormat(locale, { dateStyle: format }).format(date);
  }
  