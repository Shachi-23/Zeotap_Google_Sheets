// Check if a value is numeric
export function isNumeric(value) {
    return !isNaN(value) && value !== '';
  }
  
  // Check if a value is a valid date (using Date object)
  export function isDate(value) {
    const date = new Date(value);
    return !isNaN(date.getTime());  // Valid date should not be NaN
  }
  
  // Check if a value is text (non-numeric)
  export function isText(value) {
    return typeof value === 'string' && !isNumeric(value);
  }
  
  // Validate input based on cell type
  export function validateCellInput(cell, value, cellTypes) {
    const cellType = cellTypes[cell];
    
    switch (cellType) {
      case 'number':
        if (!isNumeric(value)) {
          return 'Invalid number';
        }
        break;
      case 'text':
        if (!isText(value)) {
          return 'Invalid text';
        }
        break;
      case 'date':
        if (!isDate(value)) {
          return 'Invalid date';
        }
        break;
      default:
        return 'Invalid input type';
    }
    
    return '';  // Return empty string if no validation error
  }
  