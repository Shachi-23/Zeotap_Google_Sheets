// export function generateId() {
//     return Math.random().toString(36).substr(2, 9);
//   }
  
//   export function columnIndexToLetter(index) {
//     let temp, letter = '';
//     while (index >= 0) {
//       temp = (index % 26) + 65;
//       letter = String.fromCharCode(temp) + letter;
//       index = (index / 26) >> 0;
//       index--;
//     }
//     return letter;
//   }
  
//   export function letterToColumnIndex(letter) {
//     let column = 0;
//     for (let i = 0; i < letter.length; i++) {
//       column += (letter.charCodeAt(i) - 64) * Math.pow(26, letter.length - i - 1);
//     }
//     return column - 1;
//   }
  
//   export function createCell() {
//     return { id: generateId(), value: '', formula: '', format: {} };
//   }
  
//   export function insertRow(cells, rowIndex) {
//     const newRow = Array(cells[0].length).fill().map(createCell);
//     return [...cells.slice(0, rowIndex), newRow, ...cells.slice(rowIndex)];
//   }
  
//   export function deleteRow(cells, rowIndex) {
//     return cells.filter((_, index) => index !== rowIndex);
//   }
  
//   export function insertColumn(cells, colIndex) {
//     return cells.map(row => [
//       ...row.slice(0, colIndex),
//       createCell(),
//       ...row.slice(colIndex)
//     ]);
//   }
  
//   export function deleteColumn(cells, colIndex) {
//     return cells.map(row => row.filter((_, index) => index !== colIndex));
//   }
  
  


// Generate a unique ID
export function generateId() {
    return Math.random().toString(36).substr(2, 9);
  }
  
  // Convert column index to letter (e.g., 0 -> A, 25 -> Z, 26 -> AA)
  export function columnIndexToLetter(index) {
    let temp, letter = '';
    while (index >= 0) {
      temp = (index % 26) + 65;
      letter = String.fromCharCode(temp) + letter;
      index = (index / 26) >> 0;
      index--;
    }
    return letter;
  }
  
  // Convert letter to column index (e.g., A -> 0, Z -> 25, AA -> 26)
  export function letterToColumnIndex(letter) {
    let column = 0;
    for (let i = 0; i < letter.length; i++) {
      column += (letter.charCodeAt(i) - 64) * Math.pow(26, letter.length - i - 1);
    }
    return column - 1;
  }
  
  // Create a new cell object
  export function createCell(value = '', formula = '', format = {}) {
    return { id: generateId(), value, formula, format };
  }
  
  // Insert a new row at the specified index
//   export function insertRow(cells, rowIndex) {
//     const newRow = Array(cells[0].length).fill().map(() => createCell());
//     return [...cells.slice(0, rowIndex), newRow, ...cells.slice(rowIndex)];
//   }
  
//   // Delete a row at the specified index
//   export function deleteRow(cells, rowIndex) {
//     return cells.filter((_, index) => index !== rowIndex);
//   }
  
//   // Insert a new column at the specified index
//   export function insertColumn(cells, colIndex) {
//     return cells.map(row => [
//       ...row.slice(0, colIndex),
//       createCell(),
//       ...row.slice(colIndex)
//     ]);
//   }
  
//   // Delete a column at the specified index
//   export function deleteColumn(cells, colIndex) {
//     return cells.map(row => row.filter((_, index) => index !== colIndex));
//   }


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
  