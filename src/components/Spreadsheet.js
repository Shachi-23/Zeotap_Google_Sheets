
// import React, { useState, useCallback, useMemo } from 'react';
// import Cell from './Cell';
// import Toolbar from './Toolbar';
// import FormulaBar from './FormulaBar';
// import { evaluateFormula } from '../utils/formulaEvaluator';
// import { generateId } from '../utils/helpers';
// import './Spreadsheet.css';

// const INITIAL_ROWS = 100;
// const INITIAL_COLS = 26;

// function Spreadsheet() {
//   const [cells, setCells] = useState(() => 
//     Array(INITIAL_ROWS).fill().map(() => 
//       Array(INITIAL_COLS).fill().map(() => ({ 
//         id: generateId(), 
//         value: '', 
//         formula: '', 
//         format: {} 
//       }))
//     )
//   );
//   const [selectedCell, setSelectedCell] = useState(null);
//   const [dragging, setDragging] = useState(false);
//   const [dragStart, setDragStart] = useState(null);
//   const [dragEnd, setDragEnd] = useState(null);

//   const handleCellChange = useCallback((row, col, value, formula) => {
//     setCells(prevCells => {
//       const newCells = prevCells.map(r => [...r]);
//       newCells[row][col] = { ...newCells[row][col], value, formula };
//       return newCells;
//     });
//   }, []);

//   const getCellValue = useCallback((row, col) => {
//     if (row < 0 || row >= cells.length || col < 0 || col >= cells[0].length) {
//       return '#REF!';
//     }
//     const cell = cells[row][col];
//     if (cell.formula.startsWith('=')) {
//       return evaluateFormula(cell.formula, getCellValue);
//     }
//     return cell.value;
//   }, [cells]);

//   const handleFormatChange = useCallback((format) => {
//     if (selectedCell) {
//       setCells(prevCells => {
//         const newCells = prevCells.map(r => [...r]);
//         const [row, col] = selectedCell;
//         newCells[row][col] = { 
//           ...newCells[row][col], 
//           format: { ...newCells[row][col].format, ...format } 
//         };
//         return newCells;
//       });
//     }
//   }, [selectedCell]);

//   const handleMouseDown = useCallback((row, col) => {
//     setSelectedCell([row, col]);
//     setDragging(true);
//     setDragStart([row, col]);
//     setDragEnd([row, col]);
//   }, []);

//   const handleMouseEnter = useCallback((row, col) => {
//     if (dragging) {
//       setDragEnd([row, col]);
//     }
//   }, [dragging]);

//   const handleMouseUp = useCallback(() => {
//     setDragging(false);
//   }, []);

//   const renderedCells = useMemo(() => {
//     return cells.map((row, rowIndex) =>
//       row.map((cell, colIndex) => ({
//         ...cell,
//         value: cell.formula.startsWith('=')
//           ? evaluateFormula(cell.formula, getCellValue)
//           : cell.value
//       }))
//     );
//   }, [cells, getCellValue]);

//   return (
//     <div className="spreadsheet" onMouseUp={handleMouseUp}>
//       <Toolbar onFormatChange={handleFormatChange} />
//       <FormulaBar 
//         value={selectedCell ? cells[selectedCell[0]][selectedCell[1]].formula : ''}
//         onChange={(value) => {
//           if (selectedCell) {
//             handleCellChange(selectedCell[0], selectedCell[1], value, value);
//           }
//         }}
//       />
//       <div className="grid">
//         <div className="header-row">
//           <div className="corner-cell"></div>
//           {Array(INITIAL_COLS).fill().map((_, index) => (
//             <div key={index} className="header-cell">
//               {String.fromCharCode(65 + index)}
//             </div>
//           ))}
//         </div>
//         {renderedCells.map((row, rowIndex) => (
//           <div key={rowIndex} className="row">
//             <div className="header-cell">{rowIndex + 1}</div>
//             {row.map((cell, colIndex) => (
//               <Cell
//                 key={cell.id}
//                 value={cell.value}
//                 formula={cell.formula}
//                 format={cell.format}
//                 onChange={(value, formula) => handleCellChange(rowIndex, colIndex, value, formula)}
//                 onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
//                 onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
//                 isSelected={selectedCell && selectedCell[0] === rowIndex && selectedCell[1] === colIndex}
//                 isDragging={dragging && 
//                   rowIndex >= Math.min(dragStart[0], dragEnd[0]) && 
//                   rowIndex <= Math.max(dragStart[0], dragEnd[0]) && 
//                   colIndex >= Math.min(dragStart[1], dragEnd[1]) && 
//                   colIndex <= Math.max(dragStart[1], dragEnd[1])}
//               />
//             ))}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Spreadsheet;






import React, { useState, useCallback, useMemo } from 'react';
import Cell from './Cell';
import Toolbar from './Toolbar';
import FormulaBar from './FormulaBar';
import { evaluateFormula } from '../utils/formulaEvaluator';
import { generateId, columnIndexToLetter } from '../utils/helpers';
import './Spreadsheet.css';

const INITIAL_ROWS = 100;
const INITIAL_COLS = 26;

function Spreadsheet() {
  const [cells, setCells] = useState(() => 
    Array(INITIAL_ROWS).fill().map(() => 
      Array(INITIAL_COLS).fill().map(() => ({ 
        id: generateId(), 
        value: '', 
        formula: '', 
        format: {} 
      }))
    )
  );
  const [selectedCell, setSelectedCell] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const [dragEnd, setDragEnd] = useState(null);

  const handleCellChange = useCallback((row, col, value, formula) => {
    setCells(prevCells => {
      const newCells = prevCells.map(r => [...r]);
      newCells[row][col] = { ...newCells[row][col], value, formula };
      return newCells;
    });
  }, []);

  const getCellValue = useCallback((row, col) => {
    if (row < 0 || row >= cells.length || col < 0 || col >= cells[0].length) {
      return '#REF!';
    }
    const cell = cells[row][col];
    if (cell.formula.startsWith('=')) {
      return evaluateFormula(cell.formula, getCellValue);
    }
    return cell.value;
  }, [cells]);

  const handleFormatChange = useCallback((format) => {
    if (selectedCell) {
      setCells(prevCells => {
        const newCells = prevCells.map(r => [...r]);
        const [row, col] = selectedCell;
        newCells[row][col] = { 
          ...newCells[row][col], 
          format: { ...newCells[row][col].format, ...format } 
        };
        return newCells;
      });
    }
  }, [selectedCell]);

  const handleMouseDown = useCallback((row, col) => {
    setSelectedCell([row, col]);
    setDragging(true);
    setDragStart([row, col]);
    setDragEnd([row, col]);
  }, []);

  const handleMouseEnter = useCallback((row, col) => {
    if (dragging) {
      setDragEnd([row, col]);
    }
  }, [dragging]);

  const handleMouseUp = useCallback(() => {
    setDragging(false);
  }, []);

  const renderedCells = useMemo(() => {
    return cells.map((row, rowIndex) =>
      row.map((cell, colIndex) => ({
        ...cell,
        value: cell.formula.startsWith('=')
          ? evaluateFormula(cell.formula, getCellValue)
          : cell.value
      }))
    );
  }, [cells, getCellValue]);

  return (
    <div className="spreadsheet" onMouseUp={handleMouseUp}>
      <Toolbar onFormatChange={handleFormatChange} />
      <FormulaBar 
        value={selectedCell ? cells[selectedCell[0]][selectedCell[1]].formula : ''}
        onChange={(value) => {
          if (selectedCell) {
            handleCellChange(selectedCell[0], selectedCell[1], value, value);
          }
        }}
      />
      <div className="grid">
        <div className="header-row">
          <div className="corner-cell"></div>
          {Array(INITIAL_COLS).fill().map((_, index) => (
            <div key={index} className="header-cell">
              {columnIndexToLetter(index)}
            </div>
          ))}
        </div>
        {renderedCells.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            <div className="header-cell">{rowIndex + 1}</div>
            {row.map((cell, colIndex) => (
              <Cell
                key={cell.id}
                value={cell.value}
                formula={cell.formula}
                format={cell.format}
                onChange={(value, formula) => handleCellChange(rowIndex, colIndex, value, formula)}
                onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                isSelected={selectedCell && selectedCell[0] === rowIndex && selectedCell[1] === colIndex}
                isDragging={dragging && 
                  rowIndex >= Math.min(dragStart[0], dragEnd[0]) && 
                  rowIndex <= Math.max(dragStart[0], dragEnd[0]) && 
                  colIndex >= Math.min(dragStart[1], dragEnd[1]) && 
                  colIndex <= Math.max(dragStart[1], dragEnd[1])}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Spreadsheet;

