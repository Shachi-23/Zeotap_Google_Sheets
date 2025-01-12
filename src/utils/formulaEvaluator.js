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
  