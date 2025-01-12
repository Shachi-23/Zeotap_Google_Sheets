export function evaluateFormula(formula, getCellValue) {
    if (!formula || typeof formula !== 'string') {
      return '';
    }
  
    if (!formula.startsWith('=')) {
      return formula;
    }
  
    const expression = formula.slice(1).toUpperCase();
    const functionRegex = /(SUM|AVERAGE|MAX|MIN|COUNT|TRIM|UPPER|LOWER|REMOVE_DUPLICATES|FIND_AND_REPLACE)\((.*?)\)/;
    const functionMatch = expression.match(functionRegex);
  
    if (functionMatch) {
      const [, functionName, args] = functionMatch;
      const cellRanges = args.split(',').map(range => range.trim());
      const values = getCellValuesFromRanges(cellRanges, getCellValue);
  
      switch (functionName) {
        case 'SUM':
          return values.reduce((sum, value) => sum + (parseFloat(value) || 0), 0);
        case 'AVERAGE':
          const numericValues = values.filter(value => value !== '' && !isNaN(parseFloat(value)));
          return numericValues.length > 0
            ? numericValues.reduce((sum, value) => sum + parseFloat(value), 0) / numericValues.length
            : 0;
        case 'MAX':
          return Math.max(...values.map(value => parseFloat(value) || -Infinity));
        case 'MIN':
          return Math.min(...values.map(value => parseFloat(value) || Infinity));
        case 'COUNT':
          return values.filter(value => value !== '').length;
        case 'TRIM':
          return values[0] ? values[0].trim() : '';
        case 'UPPER':
          return values[0] ? values[0].toUpperCase() : '';
        case 'LOWER':
          return values[0] ? values[0].toLowerCase() : '';
        case 'REMOVE_DUPLICATES':
          return removeDuplicates(values);
        case 'FIND_AND_REPLACE':
          return values[0] ? findAndReplace(values[0], values[1], values[2]) : '';
        default:
          return '#ERROR!';
      }
    }
  
    const cellRegex = /[A-Z]+[0-9]+/g;
    const cellReferences = expression.match(cellRegex) || [];
  
    let evaluatedExpression = expression;
    for (const cellRef of cellReferences) {
      const col = cellRef.match(/[A-Z]+/);
      const row = parseInt(cellRef.match(/[0-9]+/)[0]) - 1;
      
      if (col && col[0]) {
        const colIndex = col[0].charCodeAt(0) - 65;
        const cellValue = getCellValue(row, colIndex);
        evaluatedExpression = evaluatedExpression.replace(cellRef, cellValue === '' ? '0' : cellValue);
      }
    }
  
    try {
      // eslint-disable-next-line no-eval
      const result = eval(evaluatedExpression);
      return isNaN(result) ? '#ERROR!' : result;
    } catch (error) {
      console.error('Error evaluating formula:', error);
      return '#ERROR!';
    }
  }
  
  function removeDuplicates(values) {
    return [...new Set(values)];
  }
  
  function findAndReplace(value, find, replace) {
    if (!value || !find || replace === undefined) {
      return '#ERROR!';
    }
    return value.replace(new RegExp(find, 'g'), replace);
  }
  
  function getCellValuesFromRanges(ranges, getCellValue) {
    const values = [];
  
    ranges.forEach(range => {
      if (range.includes(':')) {
        const [start, end] = range.split(':');
        const startCol = start.match(/[A-Z]+/);
        const startRow = parseInt(start.match(/[0-9]+/)[0]) - 1;
        const endCol = end.match(/[A-Z]+/);
        const endRow = parseInt(end.match(/[0-9]+/)[0]) - 1;
  
        if (startCol && startCol[0] && endCol && endCol[0]) {
          const startColIndex = startCol[0].charCodeAt(0) - 65;
          const endColIndex = endCol[0].charCodeAt(0) - 65;
  
          for (let row = startRow; row <= endRow; row++) {
            for (let col = startColIndex; col <= endColIndex; col++) {
              values.push(getCellValue(row, col));
            }
          }
        }
      } else {
        const col = range.match(/[A-Z]+/);
        const row = parseInt(range.match(/[0-9]+/)[0]) - 1;
        if (col && col[0]) {
          const colIndex = col[0].charCodeAt(0) - 65;
          values.push(getCellValue(row, colIndex));
        }
      }
    });
  
    return values;
  }
  