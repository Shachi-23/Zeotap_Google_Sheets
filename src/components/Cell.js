
// import React, { useState, useCallback, useEffect } from 'react';
// import './Cell.css';

// function Cell({ value, formula, onChange }) {
//   const [editing, setEditing] = useState(false);
//   const [inputValue, setInputValue] = useState(formula);

//   useEffect(() => {
//     setInputValue(formula);
//   }, [formula]);

//   const handleDoubleClick = useCallback(() => {
//     setEditing(true);
//   }, []);

//   const handleChange = useCallback((e) => {
//     setInputValue(e.target.value);
//   }, []);

//   const handleBlur = useCallback(() => {
//     setEditing(false);
//     onChange(inputValue, inputValue);
//   }, [onChange, inputValue]);

//   const handleKeyDown = useCallback((e) => {
//     if (e.key === 'Enter') {
//       setEditing(false);
//       onChange(inputValue, inputValue);
//     }
//   }, [onChange, inputValue]);

//   if (editing) {
//     return (
//       <input
//         className="cell-input"
//         value={inputValue}
//         onChange={handleChange}
//         onBlur={handleBlur}
//         onKeyDown={handleKeyDown}
//         autoFocus
//       />
//     );
//   }

//   return (
//     <div className="cell" onDoubleClick={handleDoubleClick}>
//       {value === '#ERROR!' ? <span className="error">{value}</span> : value}
//     </div>
//   );
// }

// export default Cell;




import React, { useState, useCallback, useEffect } from 'react';
import './Cell.css';

function Cell({ value, formula, format, onChange, onMouseDown, onMouseEnter, isSelected, isDragging }) {
  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState(formula);

  useEffect(() => {
    setInputValue(formula);
  }, [formula]);

  const handleDoubleClick = useCallback(() => {
    setEditing(true);
  }, []);

  const handleChange = useCallback((e) => {
    setInputValue(e.target.value);
  }, []);

  const handleBlur = useCallback(() => {
    setEditing(false);
    onChange(inputValue, inputValue);
  }, [onChange, inputValue]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter') {
      setEditing(false);
      onChange(inputValue, inputValue);
    }
  }, [onChange, inputValue]);

  const cellStyle = {
    ...format,
    backgroundColor: isDragging ? '#e6f3ff' : isSelected ? '#d3e3fd' : 'white',
  };

  if (editing) {
    return (
      <input
        className="cell-input"
        value={inputValue}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        style={cellStyle}
        autoFocus
      />
    );
  }

  return (
    <div 
      className="cell" 
      onDoubleClick={handleDoubleClick}
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
      style={cellStyle}
    >
      {value === '#ERROR!' ? <span className="error">{value}</span> : value}
    </div>
  );
}

export default Cell;

