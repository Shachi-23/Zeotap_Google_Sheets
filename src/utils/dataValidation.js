// Validate cell data based on validation rules
export function validateCellData(value, validationRules) {
    if (!validationRules || !Array.isArray(validationRules)) {
      return { isValid: true };
    }
    
    for (const rule of validationRules) {
      const result = applyValidationRule(value, rule);
      if (!result.isValid) {
        return result;
      }
    }
    return { isValid: true };
  }
  
  // Apply a single validation rule
  function applyValidationRule(value, rule) {
    switch (rule.type) {
      case 'number':
        return validateNumber(value, rule);
      case 'text':
        return validateText(value, rule);
      case 'date':
        return validateDate(value, rule);
      case 'list':
        return validateList(value, rule);
      case 'custom':
        return validateCustom(value, rule);
      default:
        return { isValid: true };
    }
  }
  
  // Validate number type
  function validateNumber(value, rule) {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) {
      return { isValid: false, message: 'Value must be a number' };
    }
    if (rule.min !== undefined && numValue < rule.min) {
      return { isValid: false, message: `Value must be greater than or equal to ${rule.min}` };
    }
    if (rule.max !== undefined && numValue > rule.max) {
      return { isValid: false, message: `Value must be less than or equal to ${rule.max}` };
    }
    return { isValid: true };
  }
  
  // Validate text type
  function validateText(value, rule) {
    if (typeof value !== 'string') {
      return { isValid: false, message: 'Value must be text' };
    }
    if (rule.minLength !== undefined && value.length < rule.minLength) {
      return { isValid: false, message: `Text must be at least ${rule.minLength} characters long` };
    }
    if (rule.maxLength !== undefined && value.length > rule.maxLength) {
      return { isValid: false, message: `Text must be no more than ${rule.maxLength} characters long` };
    }
    if (rule.pattern && !new RegExp(rule.pattern).test(value)) {
      return { isValid: false, message: rule.patternMessage || 'Text does not match the required pattern' };
    }
    return { isValid: true };
  }
  
  // Validate date type
  function validateDate(value, rule) {
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      return { isValid: false, message: 'Value must be a valid date' };
    }
    if (rule.min && date < new Date(rule.min)) {
      return { isValid: false, message: `Date must be on or after ${rule.min}` };
    }
    if (rule.max && date > new Date(rule.max)) {
      return { isValid: false, message: `Date must be on or before ${rule.max}` };
    }
    return { isValid: true };
  }
  
  // Validate list type
  function validateList(value, rule) {
    if (!rule.options.includes(value)) {
      return { isValid: false, message: 'Value must be from the provided list' };
    }
    return { isValid: true };
  }
  
  // Validate custom type
  function validateCustom(value, rule) {
    try {
      const isValid = new Function('value', `return ${rule.formula}`)(value);
      return { isValid, message: isValid ? '' : rule.message || 'Custom validation failed' };
    } catch (error) {
      console.error('Error in custom validation:', error);
      return { isValid: false, message: 'Error in custom validation' };
    }
  }
  
  // Add a validation rule to a cell
  export function addValidationRule(cell, rule) {
    return {
      ...cell,
      validationRules: [...(cell.validationRules || []), rule],
    };
  }
  
  // Remove a validation rule from a cell
  export function removeValidationRule(cell, ruleIndex) {
    return {
      ...cell,
      validationRules: cell.validationRules.filter((_, index) => index !== ruleIndex),
    };
  }
  
  // Update a validation rule in a cell
  export function updateValidationRule(cell, ruleIndex, updatedRule) {
    return {
      ...cell,
      validationRules: cell.validationRules.map((rule, index) =>
        index === ruleIndex ? { ...rule, ...updatedRule } : rule
      ),
    };
  }
  
  // Create a new validation rule
  export function createValidationRule(type, options) {
    return { type, ...options };
  }
  
  