// Apply conditional formatting rules to a cell
export function applyConditionalFormatting(cell, rules) {
    for (const rule of rules) {
      if (evaluateCondition(cell.value, rule.condition)) {
        return { ...cell.format, ...rule.format };
      }
    }
    return cell.format;
  }
  
  // Evaluate a condition for conditional formatting
  function evaluateCondition(value, condition) {
    const numValue = parseFloat(value);
    switch (condition.type) {
      case 'greaterThan':
        return numValue > condition.value;
      case 'lessThan':
        return numValue < condition.value;
      case 'equalTo':
        return value === condition.value;
      case 'contains':
        return typeof value === 'string' && value.includes(condition.value);
      case 'between':
        return numValue >= condition.min && numValue <= condition.max;
      case 'custom':
        try {
          return new Function('value', `return ${condition.formula}`)(value);
        } catch (error) {
          console.error('Error in custom condition:', error);
          return false;
        }
      default:
        return false;
    }
  }
  
  // Create a new conditional formatting rule
  export function createConditionalFormattingRule(condition, format) {
    return { condition, format };
  }
  
  // Add a new conditional formatting rule to the list of rules
  export function addConditionalFormattingRule(rules, newRule) {
    return [...rules, newRule];
  }
  
  // Remove a conditional formatting rule from the list of rules
  export function removeConditionalFormattingRule(rules, ruleIndex) {
    return rules.filter((_, index) => index !== ruleIndex);
  }
  
  // Update an existing conditional formatting rule
  export function updateConditionalFormattingRule(rules, ruleIndex, updatedRule) {
    return rules.map((rule, index) => 
      index === ruleIndex ? { ...rule, ...updatedRule } : rule
    );
  }
  
  // Apply conditional formatting to a range of cells
  export function applyConditionalFormattingToRange(cells, range, rules) {
    const { startRow, startCol, endRow, endCol } = range;
    return cells.map((row, rowIndex) =>
      row.map((cell, colIndex) => {
        if (rowIndex >= startRow && rowIndex <= endRow && colIndex >= startCol && colIndex <= endCol) {
          return {
            ...cell,
            format: applyConditionalFormatting(cell, rules)
          };
        }
        return cell;
      })
    );
  }
  
  // Generate a color scale for conditional formatting
  export function generateColorScale(startColor, endColor, steps) {
    const scale = [];
    for (let i = 0; i < steps; i++) {
      const r = Math.round(startColor[0] + (endColor[0] - startColor[0]) * (i / (steps - 1)));
      const g = Math.round(startColor[1] + (endColor[1] - startColor[1]) * (i / (steps - 1)));
      const b = Math.round(startColor[2] + (endColor[2] - startColor[2]) * (i / (steps - 1)));
      scale.push(`rgb(${r},${g},${b})`);
    }
    return scale;
  }
  