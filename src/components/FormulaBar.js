import React from 'react';
import './FormulaBar.css';

function FormulaBar({ value, onChange }) {
  return (
    <div className="formula-bar">
      <span className="formula-label">fx</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="formula-input"
      />
    </div>
  );
}

export default FormulaBar;

