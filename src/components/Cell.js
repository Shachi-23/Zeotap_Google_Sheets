// import React, { useState, useCallback, useEffect } from 'react';
// import './Cell.css';

// function Cell({ value, formula, format, onChange, onMouseDown, onMouseEnter, isSelected, isDragging }) {
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

//   const cellStyle = {
//     ...format,
//     backgroundColor: isDragging ? '#e6f3ff' : isSelected ? '#d3e3fd' : 'white',
//   };

//   if (editing) {
//     return (
//       <input
//         className="cell-input"
//         value={inputValue}
//         onChange={handleChange}
//         onBlur={handleBlur}
//         onKeyDown={handleKeyDown}
//         style={cellStyle}
//         autoFocus
//       />
//     );
//   }

//   return (
//     <div 
//       className="cell" 
//       onDoubleClick={handleDoubleClick}
//       onMouseDown={onMouseDown}
//       onMouseEnter={onMouseEnter}
//       style={cellStyle}
//     >
//       {value === '#ERROR!' ? <span className="error">{value}</span> : value}
//     </div>
//   );
// }

// export default Cell;



// import React, { useState, useCallback, useEffect } from 'react';
// import './Cell.css';

// function Cell({ value, formula, format, onChange, onMouseDown, onMouseEnter, isSelected, isDragging }) {
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

//   const cellStyle = {
//     ...format,
//     backgroundColor: isDragging ? '#e6f3ff' : isSelected ? '#d3e3fd' : 'white',
//   };

//   return (
//     <div 
//       className="cell" 
//       onDoubleClick={handleDoubleClick}
//       onMouseDown={onMouseDown}
//       onMouseEnter={onMouseEnter}
//       style={cellStyle}
//     >
//       {editing ? (
//         <input
//           className="cell-input"
//           value={inputValue}
//           onChange={handleChange}
//           onBlur={handleBlur}
//           onKeyDown={handleKeyDown}
//           style={cellStyle}
//           autoFocus
//         />
//       ) : (
//         value === '#ERROR!' ? <span className="error">{value}</span> : value
//       )}
//     </div>
//   );
// }

// export default Cell;




import React, { useState, useCallback, useEffect, useRef } from 'react';
import './Cell.css';

function Cell({ value, formula, format, onChange, onMouseDown, onMouseEnter, isSelected, isDragging, style }) {
  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState(formula);
  const inputRef = useRef(null);

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

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);

  const cellStyle = {
    ...style,
    ...format,
    backgroundColor: isDragging ? '#e6f3ff' : isSelected ? '#d3e3fd' : 'white',
  };

  return (
    <div 
      className="cell" 
      onDoubleClick={handleDoubleClick}
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
      style={cellStyle}
    >
      {editing ? (
        <input
          ref={inputRef}
          className="cell-input"
          value={inputValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          style={cellStyle}
        />
      ) : (
        <span className="cell-content">
          {value === '#ERROR!' ? <span className="error">{value}</span> : value}
        </span>
      )}
    </div>
  );
}

export default React.memo(Cell);

