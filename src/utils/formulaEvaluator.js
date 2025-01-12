// export function evaluateFormula(formula, getCellValue) {
//     if (!formula || typeof formula !== 'string') {
//       return '';
//     }
  
//     if (!formula.startsWith('=')) {
//       return formula;
//     }
  
//     const expression = formula.slice(1).toUpperCase();
//     const functionRegex = /(SUM|AVERAGE|MAX|MIN|COUNT|TRIM|UPPER|LOWER|REMOVE_DUPLICATES|FIND_AND_REPLACE)\((.*?)\)/;
//     const functionMatch = expression.match(functionRegex);
  
//     if (functionMatch) {
//       const [, functionName, args] = functionMatch;
//       const cellRanges = args.split(',').map(range => range.trim());
//       const values = getCellValuesFromRanges(cellRanges, getCellValue);
  
//       switch (functionName) {
//         case 'SUM':
//           return values.reduce((sum, value) => sum + (parseFloat(value) || 0), 0);
//         case 'AVERAGE':
//           const numericValues = values.filter(value => value !== '' && !isNaN(parseFloat(value)));
//           return numericValues.length > 0
//             ? numericValues.reduce((sum, value) => sum + parseFloat(value), 0) / numericValues.length
//             : 0;
//         case 'MAX':
//           return Math.max(...values.map(value => parseFloat(value) || -Infinity));
//         case 'MIN':
//           return Math.min(...values.map(value => parseFloat(value) || Infinity));
//         case 'COUNT':
//           return values.filter(value => value !== '').length;
//         case 'TRIM':
//           return values[0] ? values[0].trim() : '';
//         case 'UPPER':
//           return values[0] ? values[0].toUpperCase() : '';
//         case 'LOWER':
//           return values[0] ? values[0].toLowerCase() : '';
//         case 'REMOVE_DUPLICATES':
//           return removeDuplicates(values);
//         case 'FIND_AND_REPLACE':
//           return values[0] ? findAndReplace(values[0], values[1], values[2]) : '';
//         default:
//           return '#ERROR!';
//       }
//     }
  
//     const cellRegex = /[A-Z]+[0-9]+/g;
//     const cellReferences = expression.match(cellRegex) || [];
  
//     let evaluatedExpression = expression;
//     for (const cellRef of cellReferences) {
//       const col = cellRef.match(/[A-Z]+/);
//       const row = parseInt(cellRef.match(/[0-9]+/)[0]) - 1;
      
//       if (col && col[0]) {
//         const colIndex = col[0].charCodeAt(0) - 65;
//         const cellValue = getCellValue(row, colIndex);
//         evaluatedExpression = evaluatedExpression.replace(cellRef, cellValue === '' ? '0' : cellValue);
//       }
//     }
  
//     try {
//       // eslint-disable-next-line no-eval
//       const result = eval(evaluatedExpression);
//       return isNaN(result) ? '#ERROR!' : result;
//     } catch (error) {
//       console.error('Error evaluating formula:', error);
//       return '#ERROR!';
//     }
//   }
  
//   function removeDuplicates(values) {
//     return [...new Set(values)];
//   }
  
//   function findAndReplace(value, find, replace) {
//     if (!value || !find || replace === undefined) {
//       return '#ERROR!';
//     }
//     return value.replace(new RegExp(find, 'g'), replace);
//   }
  
//   function getCellValuesFromRanges(ranges, getCellValue) {
//     const values = [];
  
//     ranges.forEach(range => {
//       if (range.includes(':')) {
//         const [start, end] = range.split(':');
//         const startCol = start.match(/[A-Z]+/);
//         const startRow = parseInt(start.match(/[0-9]+/)[0]) - 1;
//         const endCol = end.match(/[A-Z]+/);
//         const endRow = parseInt(end.match(/[0-9]+/)[0]) - 1;
  
//         if (startCol && startCol[0] && endCol && endCol[0]) {
//           const startColIndex = startCol[0].charCodeAt(0) - 65;
//           const endColIndex = endCol[0].charCodeAt(0) - 65;
  
//           for (let row = startRow; row <= endRow; row++) {
//             for (let col = startColIndex; col <= endColIndex; col++) {
//               values.push(getCellValue(row, col));
//             }
//           }
//         }
//       } else {
//         const col = range.match(/[A-Z]+/);
//         const row = parseInt(range.match(/[0-9]+/)[0]) - 1;
//         if (col && col[0]) {
//           const colIndex = col[0].charCodeAt(0) - 65;
//           values.push(getCellValue(row, colIndex));
//         }
//       }
//     });
  
//     return values;
//   }
  





// Helper function to get cell values from ranges
// function getCellValuesFromRanges(ranges, getCellValue) {
//     const values = [];
  
//     ranges.forEach(range => {
//       if (range.includes(':')) {
//         const [start, end] = range.split(':');
//         const [startCol, startRow] = splitCellReference(start);
//         const [endCol, endRow] = splitCellReference(end);
  
//         for (let row = startRow; row <= endRow; row++) {
//           for (let col = startCol; col <= endCol; col++) {
//             values.push(getCellValue(row, col));
//           }
//         }
//       } else {
//         const [col, row] = splitCellReference(range);
//         values.push(getCellValue(row, col));
//       }
//     });
  
//     return values;
//   }
  
//   // Helper function to split cell references
//   function splitCellReference(cellRef) {
//     const colMatch = cellRef.match(/[A-Z]+/);
//     const rowMatch = cellRef.match(/[0-9]+/);
    
//     if (!colMatch || !rowMatch) {
//       throw new Error(`Invalid cell reference: ${cellRef}`);
//     }
  
//     const col = colMatch[0].split('').reduce((acc, char) => acc * 26 + (char.charCodeAt(0) - 64), 0) - 1;
//     const row = parseInt(rowMatch[0], 10) - 1;
  
//     return [col, row];
//   }
  
//   // Main formula evaluation function
//   export function evaluateFormula(formula, getCellValue) {
//     if (!formula || typeof formula !== 'string') {
//       return '';
//     }
  
//     if (!formula.startsWith('=')) {
//       return formula;
//     }
  
//     const expression = formula.slice(1).toUpperCase();
//     const functionRegex = /(SUM|AVERAGE|MAX|MIN|COUNT|TRIM|UPPER|LOWER|CONCATENATE)$$(.*?)$$/;
//     const functionMatch = expression.match(functionRegex);
  
//     if (functionMatch) {
//       const [, functionName, args] = functionMatch;
//       const cellRanges = args.split(',').map(range => range.trim());
//       const values = getCellValuesFromRanges(cellRanges, getCellValue);
  
//       switch (functionName) {
//         case 'SUM':
//           return values.reduce((sum, value) => sum + (parseFloat(value) || 0), 0);
//         case 'AVERAGE':
//           const numericValues = values.filter(value => value !== '' && !isNaN(parseFloat(value)));
//           return numericValues.length > 0
//             ? numericValues.reduce((sum, value) => sum + parseFloat(value), 0) / numericValues.length
//             : 0;
//         case 'MAX':
//           return Math.max(...values.map(value => parseFloat(value) || -Infinity));
//         case 'MIN':
//           return Math.min(...values.map(value => parseFloat(value) || Infinity));
//         case 'COUNT':
//           return values.filter(value => value !== '').length;
//         case 'TRIM':
//           return values.map(value => value.trim()).join(', ');
//         case 'UPPER':
//           return values.map(value => value.toUpperCase()).join(', ');
//         case 'LOWER':
//           return values.map(value => value.toLowerCase()).join(', ');
//         case 'REMOVE_DUPLICATES':
//           return removeDuplicates(values);
//         case 'FIND_AND_REPLACE':
//           return values[0] ? findAndReplace(values[0], values[1], values[2]) : '';
//         case 'CONCATENATE':
//           return values.join('');
//         default:
//           return '#ERROR!';
//       }
//     }
  
//     // Handle cell references and basic arithmetic
//     const cellRegex = /[A-Z]+[0-9]+/g;
//     const cellReferences = expression.match(cellRegex) || [];
  
//     let evaluatedExpression = expression;
//     for (const cellRef of cellReferences) {
//       const [col, row] = splitCellReference(cellRef);
//       const cellValue = getCellValue(row, col);
//       evaluatedExpression = evaluatedExpression.replace(cellRef, cellValue === '' ? '0' : cellValue);
//     }
  
//     try {
//       // Use a safer alternative to eval
//       const result = Function(`"use strict";return (${evaluatedExpression})`)();
//       return isNaN(result) ? '#ERROR!' : result;
//     } catch (error) {
//       console.error('Error evaluating formula:', error);
//       return '#ERROR!';
//     }
//   }
  
//   // Additional helper functions for more complex formulas
  
//   export function evaluateIF(condition, trueValue, falseValue) {
//     return condition ? trueValue : falseValue;
//   }
  
//   export function evaluateVLOOKUP(lookupValue, tableArray, colIndex, approximateMatch = false) {
//     for (let i = 0; i < tableArray.length; i++) {
//       if (approximateMatch) {
//         if (tableArray[i][0] >= lookupValue) {
//           return tableArray[i][colIndex];
//         }
//       } else {
//         if (tableArray[i][0] === lookupValue) {
//           return tableArray[i][colIndex];
//         }
//       }
//     }
//     return '#N/A';
//   }
  
//   export function evaluateHLOOKUP(lookupValue, tableArray, rowIndex, approximateMatch = false) {
//     for (let i = 0; i < tableArray[0].length; i++) {
//       if (approximateMatch) {
//         if (tableArray[0][i] >= lookupValue) {
//           return tableArray[rowIndex][i];
//         }
//       } else {
//         if (tableArray[0][i] === lookupValue) {
//           return tableArray[rowIndex][i];
//         }
//       }
//     }
//     return '#N/A';
//   }
  
//   export function evaluateINDEX(array, rowNum, colNum) {
//     rowNum = rowNum || 1;
//     colNum = colNum || 1;
//     return array[rowNum - 1][colNum - 1];
//   }
  
//   export function evaluateMATCH(lookupValue, lookupArray, matchType = 1) {
//     for (let i = 0; i < lookupArray.length; i++) {
//       if (matchType === 0) {
//         if (lookupArray[i] === lookupValue) return i + 1;
//       } else if (matchType === 1) {
//         if (lookupArray[i] === lookupValue) return i + 1;
//         if (lookupArray[i] > lookupValue) return i;
//       } else if (matchType === -1) {
//         if (lookupArray[i] === lookupValue) return i + 1;
//         if (lookupArray[i] < lookupValue) return i;
//       }
//     }
//     return '#N/A';
//   }
  
  





function getCellValuesFromRanges(ranges, getCellValue) {
    const values = [];
  
    ranges.forEach((range) => {
      if (range.includes(':')) {
        const [start, end] = range.split(':');
        const [startCol, startRow] = splitCellReference(start);
        const [endCol, endRow] = splitCellReference(end);
  
        for (let row = startRow; row <= endRow; row++) {
          for (let col = startCol; col <= endCol; col++) {
            values.push(getCellValue(row, col) || 0); // Default to 0 if cell is empty
          }
        }
      } else {
        const [col, row] = splitCellReference(range);
        values.push(getCellValue(row, col) || 0);
      }
    });
  
    return values;
  }
  
  // Helper function to split cell references
  function splitCellReference(cellRef) {
    const colMatch = cellRef.match(/[A-Z]+/);
    const rowMatch = cellRef.match(/[0-9]+/);
  
    if (!colMatch || !rowMatch) {
      throw new Error(`Invalid cell reference: ${cellRef}`);
    }
  
    const col = colMatch[0]
      .split('')
      .reduce((acc, char) => acc * 26 + (char.charCodeAt(0) - 64), 0) - 1;
    const row = parseInt(rowMatch[0], 10) - 1;
  
    return [col, row];
  }
  
  // Main formula evaluation function
  export function evaluateFormula(formula, getCellValue) {
    if (!formula || typeof formula !== 'string') {
      return '';
    }
  
    if (!formula.startsWith('=')) {
      return formula; // Return as-is if not a formula
    }
  
    const expression = formula.slice(1).toUpperCase();
    const functionRegex = /^(SUM|AVERAGE|MAX|MIN|COUNT|TRIM|UPPER|LOWER|CONCATENATE)\((.*)\)$/;
    const functionMatch = expression.match(functionRegex);
  
    if (functionMatch) {
      const [, functionName, args] = functionMatch;
      const cellRanges = args.split(',').map((range) => range.trim());
      const values = getCellValuesFromRanges(cellRanges, getCellValue);
  
      switch (functionName) {
        case 'SUM':
          return values.reduce((sum, value) => sum + parseFloat(value), 0);
        case 'AVERAGE':
          const numericValues = values.filter((value) => !isNaN(parseFloat(value)));
          return numericValues.length
            ? numericValues.reduce((sum, value) => sum + parseFloat(value), 0) / numericValues.length
            : 0;
        case 'MAX':
          return Math.max(...values.map((value) => parseFloat(value) || -Infinity));
        case 'MIN':
          return Math.min(...values.map((value) => parseFloat(value) || Infinity));
        case 'COUNT':
          return values.filter((value) => value !== '').length;
        case 'TRIM':
          return values.map((value) => value.trim()).join(', ');
        case 'UPPER':
          return values.map((value) => value.toUpperCase()).join(', ');
        case 'LOWER':
          return values.map((value) => value.toLowerCase()).join(', ');
        case 'CONCATENATE':
          return values.join('');
        default:
          return '#ERROR!';
      }
    }
  
    // Handle cell references and basic arithmetic
    const cellRegex = /[A-Z]+[0-9]+/g;
    const cellReferences = expression.match(cellRegex) || [];
  
    let evaluatedExpression = expression;
    for (const cellRef of cellReferences) {
      const [col, row] = splitCellReference(cellRef);
      const cellValue = getCellValue(row, col) || 0;
      evaluatedExpression = evaluatedExpression.replace(cellRef, cellValue);
    }
  
    try {
      // Use a safer alternative to eval
      const result = Function(`"use strict"; return (${evaluatedExpression})`)();
      return isNaN(result) ? '#ERROR!' : result;
    } catch (error) {
      console.error('Error evaluating formula:', error);
      return '#ERROR!';
    }
  }
  