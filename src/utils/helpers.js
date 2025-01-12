// export function generateId() {
//     return Math.random().toString(36).substr(2, 9);
//   }
  
//   export function columnIndexToLetter(index) {
//     let temp, letter = '';
//     while (index >= 0) {
//       temp = (index % 26) + 65;
//       letter = String.fromCharCode(temp) + letter;
//       index = (index / 26) - 1;
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
  
  

export function generateId() {
    return Math.random().toString(36).substr(2, 9);
  }
  
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
  
  export function letterToColumnIndex(letter) {
    let column = 0;
    for (let i = 0; i < letter.length; i++) {
      column += (letter.charCodeAt(i) - 64) * Math.pow(26, letter.length - i - 1);
    }
    return column - 1;
  }
  
  export function createCell() {
    return { id: generateId(), value: '', formula: '', format: {} };
  }
  
  export function insertRow(cells, rowIndex) {
    const newRow = Array(cells[0].length).fill().map(createCell);
    return [...cells.slice(0, rowIndex), newRow, ...cells.slice(rowIndex)];
  }
  
  export function deleteRow(cells, rowIndex) {
    return cells.filter((_, index) => index !== rowIndex);
  }
  
  export function insertColumn(cells, colIndex) {
    return cells.map(row => [
      ...row.slice(0, colIndex),
      createCell(),
      ...row.slice(colIndex)
    ]);
  }
  
  export function deleteColumn(cells, colIndex) {
    return cells.map(row => row.filter((_, index) => index !== colIndex));
  }
  
  