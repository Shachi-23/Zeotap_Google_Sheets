// import React, { useState, useCallback, useMemo } from 'react';
// import Cell from './Cell';
// import Toolbar from './Toolbar';
// import FormulaBar from './FormulaBar';
// import { evaluateFormula } from '../utils/formulaEvaluator';
// import { generateId, columnIndexToLetter, insertRow, deleteRow, insertColumn, deleteColumn, createCell } from '../utils/helpers';
// import './Spreadsheet.css';

// const INITIAL_ROWS = 100;
// const INITIAL_COLS = 26;

// function Spreadsheet() {
//   const [cells, setCells] = useState(() => 
//     Array(INITIAL_ROWS).fill().map(() => 
//       Array(INITIAL_COLS).fill().map(createCell)
//     )
//   );
//   const [selectedCell, setSelectedCell] = useState(null);
//   const [dragging, setDragging] = useState(false);
//   const [dragStart, setDragStart] = useState(null);
//   const [dragEnd, setDragEnd] = useState(null);
//   const [columnWidths, setColumnWidths] = useState({});
//   const [rowHeights, setRowHeights] = useState({});

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

//   const handleAddRow = useCallback(() => {
//     setCells(prevCells => insertRow(prevCells, prevCells.length));
//   }, []);

//   const handleDeleteRow = useCallback(() => {
//     if (selectedCell) {
//       setCells(prevCells => deleteRow(prevCells, selectedCell[0]));
//       setSelectedCell(null);
//     }
//   }, [selectedCell]);

//   const handleAddColumn = useCallback(() => {
//     setCells(prevCells => insertColumn(prevCells, prevCells[0].length));
//   }, []);

//   const handleDeleteColumn = useCallback(() => {
//     if (selectedCell) {
//       setCells(prevCells => deleteColumn(prevCells, selectedCell[1]));
//       setSelectedCell(null);
//     }
//   }, [selectedCell]);

//   const handleColumnResize = useCallback((colIndex, width) => {
//     setColumnWidths(prev => ({ ...prev, [colIndex]: width }));
//   }, []);

//   const handleRowResize = useCallback((rowIndex, height) => {
//     setRowHeights(prev => ({ ...prev, [rowIndex]: height }));
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
//       <Toolbar 
//         onFormatChange={handleFormatChange}
//         onAddRow={handleAddRow}
//         onDeleteRow={handleDeleteRow}
//         onAddColumn={handleAddColumn}
//         onDeleteColumn={handleDeleteColumn}
//       />
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
//           {Array(cells[0].length).fill().map((_, index) => (
//             <div 
//               key={index} 
//               className="header-cell"
//               style={{ width: columnWidths[index] || 80 }}
//             >
//               {columnIndexToLetter(index)}
//               <div 
//                 className="resize-handle"
//                 onMouseDown={(e) => {
//                   const startX = e.clientX;
//                   const startWidth = columnWidths[index] || 80;
//                   const handleMouseMove = (e) => {
//                     const newWidth = startWidth + e.clientX - startX;
//                     handleColumnResize(index, newWidth);
//                   };
//                   const handleMouseUp = () => {
//                     document.removeEventListener('mousemove', handleMouseMove);
//                     document.removeEventListener('mouseup', handleMouseUp);
//                   };
//                   document.addEventListener('mousemove', handleMouseMove);
//                   document.addEventListener('mouseup', handleMouseUp);
//                 }}
//               />
//             </div>
//           ))}
//         </div>
//         {renderedCells.map((row, rowIndex) => (
//           <div key={rowIndex} className="row">
//             <div 
//               className="header-cell"
//               style={{ height: rowHeights[rowIndex] || 25 }}
//             >
//               {rowIndex + 1}
//               <div 
//                 className="resize-handle"
//                 onMouseDown={(e) => {
//                   const startY = e.clientY;
//                   const startHeight = rowHeights[rowIndex] || 25;
//                   const handleMouseMove = (e) => {
//                     const newHeight = startHeight + e.clientY - startY;
//                     handleRowResize(rowIndex, newHeight);
//                   };
//                   const handleMouseUp = () => {
//                     document.removeEventListener('mousemove', handleMouseMove);
//                     document.removeEventListener('mouseup', handleMouseUp);
//                   };
//                   document.addEventListener('mousemove', handleMouseMove);
//                   document.addEventListener('mouseup', handleMouseUp);
//                 }}
//               />
//             </div>
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
//                 style={{
//                   width: columnWidths[colIndex] || 80,
//                   height: rowHeights[rowIndex] || 25,
//                 }}
//               />
//             ))}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Spreadsheet;




// import React, { useState, useCallback, useMemo } from 'react';
// import Cell from './Cell';
// import Toolbar from './Toolbar';
// import FormulaBar from './FormulaBar';
// import { evaluateFormula } from '../utils/formulaEvaluator';
// import { generateId, columnIndexToLetter, insertRow, deleteRow, insertColumn, deleteColumn, createCell } from '../utils/helpers';
// import './Spreadsheet.css';

// const INITIAL_ROWS = 100;
// const INITIAL_COLS = 26;
// const MIN_ROWS = 10; // Prevent deleting all rows
// const MIN_COLS = 5;  // Prevent deleting all columns

// function Spreadsheet() {
//   const [cells, setCells] = useState(() => 
//     Array(INITIAL_ROWS).fill().map(() => 
//       Array(INITIAL_COLS).fill().map(createCell)
//     )
//   );
//   const [selectedCell, setSelectedCell] = useState(null);
//   const [selectedRange, setSelectedRange] = useState(null);
//   const [dragging, setDragging] = useState(false);
//   const [dragStart, setDragStart] = useState(null);
//   const [dragEnd, setDragEnd] = useState(null);
//   const [columnWidths, setColumnWidths] = useState({});
//   const [rowHeights, setRowHeights] = useState({});

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
//     setSelectedRange({ start: [row, col], end: [row, col] });
//   }, []);

//   const handleMouseEnter = useCallback((row, col) => {
//     if (dragging) {
//       setDragEnd([row, col]);
//       setSelectedRange({
//         start: dragStart,
//         end: [row, col]
//       });
//     }
//   }, [dragging, dragStart]);

//   const handleMouseUp = useCallback(() => {
//     setDragging(false);
//   }, []);

//   const handleAddRow = useCallback(() => {
//     setCells(prevCells => {
//       const newRow = Array(prevCells[0].length).fill().map(createCell);
//       return [...prevCells, newRow];
//     });
//   }, []);

//   const handleDeleteRow = useCallback(() => {
//     if (!selectedCell) return;
    
//     const [rowIndex] = selectedCell;
    
//     // Prevent deleting if we're at minimum rows
//     if (cells.length <= MIN_ROWS) {
//       alert('Cannot delete row: Minimum number of rows reached');
//       return;
//     }

//     setCells(prevCells => {
//       const newCells = [...prevCells];
//       newCells.splice(rowIndex, 1);
//       newCells.push(Array(prevCells[0].length).fill().map(createCell));
//       return newCells;
//     });

//     // Clear selection after delete
//     setSelectedCell(null);
//     setSelectedRange(null);
//   }, [selectedCell, cells.length]);

//   const handleAddColumn = useCallback(() => {
//     setCells(prevCells => {
//       return prevCells.map(row => [...row, createCell()]);
//     });
//   }, []);

//   const handleDeleteColumn = useCallback(() => {
//     if (!selectedCell) return;
    
//     const [, colIndex] = selectedCell;
    
//     // Prevent deleting if we're at minimum columns
//     if (cells[0].length <= MIN_COLS) {
//       alert('Cannot delete column: Minimum number of columns reached');
//       return;
//     }

//     setCells(prevCells => {
//       return prevCells.map(row => {
//         const newRow = [...row];
//         newRow.splice(colIndex, 1);
//         newRow.push(createCell());
//         return newRow;
//       });
//     });

//     // Clear selection after delete
//     setSelectedCell(null);
//     setSelectedRange(null);
//   }, [selectedCell, cells]);

//   const handleColumnResize = useCallback((colIndex, width) => {
//     setColumnWidths(prev => ({ ...prev, [colIndex]: width }));
//   }, []);

//   const handleRowResize = useCallback((rowIndex, height) => {
//     setRowHeights(prev => ({ ...prev, [rowIndex]: height }));
//   }, []);

//   const isInSelectedRange = useCallback((row, col) => {
//     if (!selectedRange) return false;
//     const { start, end } = selectedRange;
//     const minRow = Math.min(start[0], end[0]);
//     const maxRow = Math.max(start[0], end[0]);
//     const minCol = Math.min(start[1], end[1]);
//     const maxCol = Math.max(start[1], end[1]);
//     return row >= minRow && row <= maxRow && col >= minCol && col <= maxCol;
//   }, [selectedRange]);

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
//       <Toolbar 
//         onFormatChange={handleFormatChange}
//         onAddRow={handleAddRow}
//         onDeleteRow={handleDeleteRow}
//         onAddColumn={handleAddColumn}
//         onDeleteColumn={handleDeleteColumn}
//         canDeleteRow={selectedCell !== null && cells.length > MIN_ROWS}
//         canDeleteColumn={selectedCell !== null && cells[0].length > MIN_COLS}
//       />
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
//           {Array(cells[0].length).fill().map((_, index) => (
//             <div 
//               key={index} 
//               className="header-cell"
//               style={{ width: columnWidths[index] || 80 }}
//             >
//               {columnIndexToLetter(index)}
//             </div>
//           ))}
//         </div>
//         {renderedCells.map((row, rowIndex) => (
//           <div key={rowIndex} className="row">
//             <div className="header-cell">
//               {rowIndex + 1}
//             </div>
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
//                 isDragging={isInSelectedRange(rowIndex, colIndex)}
//                 style={{
//                   width: columnWidths[colIndex] || 80,
//                   height: rowHeights[rowIndex] || 28,
//                 }}
//               />
//             ))}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Spreadsheet;




import React, { useState, useCallback, useMemo, useEffect } from 'react';
import Cell from './Cell';
import Toolbar from './Toolbar';
import FormulaBar from './FormulaBar';
import { evaluateFormula } from '../utils/formulaEvaluator';
import { generateId, columnIndexToLetter, insertRow, deleteRow, insertColumn, deleteColumn, createCell } from '../utils/helpers';
import './Spreadsheet.css';

const MIN_ROWS = 10;
const MIN_COLS = 5;

function Spreadsheet({ data, onChange }) {
  const [cells, setCells] = useState(data);
  const [selectedCell, setSelectedCell] = useState(null);
  const [selectedRange, setSelectedRange] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const [dragEnd, setDragEnd] = useState(null);
  const [columnWidths, setColumnWidths] = useState({});
  const [rowHeights, setRowHeights] = useState({});

  useEffect(() => {
    setCells(data);
  }, [data]);

  const handleCellChange = useCallback((row, col, value, formula) => {
    setCells(prevCells => {
      const newCells = prevCells.map(r => [...r]);
      newCells[row][col] = { ...newCells[row][col], value, formula };
      return newCells;
    });
  }, []);

  useEffect(() => {
    onChange(cells);
  }, [cells, onChange]);

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
    setSelectedRange({ start: [row, col], end: [row, col] });
  }, []);

  const handleMouseEnter = useCallback((row, col) => {
    if (dragging) {
      setDragEnd([row, col]);
      setSelectedRange({
        start: dragStart,
        end: [row, col]
      });
    }
  }, [dragging, dragStart]);

  const handleMouseUp = useCallback(() => {
    setDragging(false);
  }, []);

  const handleAddRow = useCallback(() => {
    setCells(prevCells => {
      const newRow = Array(prevCells[0].length).fill().map(createCell);
      return [...prevCells, newRow];
    });
  }, []);

  const handleDeleteRow = useCallback(() => {
    if (!selectedCell) return;
    
    const [rowIndex] = selectedCell;
    
    if (cells.length <= MIN_ROWS) {
      alert('Cannot delete row: Minimum number of rows reached');
      return;
    }

    setCells(prevCells => {
      const newCells = [...prevCells];
      newCells.splice(rowIndex, 1);
      newCells.push(Array(prevCells[0].length).fill().map(createCell));
      return newCells;
    });

    setSelectedCell(null);
    setSelectedRange(null);
  }, [selectedCell, cells.length]);

  const handleAddColumn = useCallback(() => {
    setCells(prevCells => {
      return prevCells.map(row => [...row, createCell()]);
    });
  }, []);

  const handleDeleteColumn = useCallback(() => {
    if (!selectedCell) return;
    
    const [, colIndex] = selectedCell;
    
    if (cells[0].length <= MIN_COLS) {
      alert('Cannot delete column: Minimum number of columns reached');
      return;
    }

    setCells(prevCells => {
      return prevCells.map(row => {
        const newRow = [...row];
        newRow.splice(colIndex, 1);
        newRow.push(createCell());
        return newRow;
      });
    });

    setSelectedCell(null);
    setSelectedRange(null);
  }, [selectedCell, cells]);

  const handleColumnResize = useCallback((colIndex, width) => {
    setColumnWidths(prev => ({ ...prev, [colIndex]: width }));
  }, []);

  const handleRowResize = useCallback((rowIndex, height) => {
    setRowHeights(prev => ({ ...prev, [rowIndex]: height }));
  }, []);

  const isInSelectedRange = useCallback((row, col) => {
    if (!selectedRange) return false;
    const { start, end } = selectedRange;
    const minRow = Math.min(start[0], end[0]);
    const maxRow = Math.max(start[0], end[0]);
    const minCol = Math.min(start[1], end[1]);
    const maxCol = Math.max(start[1], end[1]);
    return row >= minRow && row <= maxRow && col >= minCol && col <= maxCol;
  }, [selectedRange]);

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
      <Toolbar 
        onFormatChange={handleFormatChange}
        onAddRow={handleAddRow}
        onDeleteRow={handleDeleteRow}
        onAddColumn={handleAddColumn}
        onDeleteColumn={handleDeleteColumn}
        canDeleteRow={selectedCell !== null && cells.length > MIN_ROWS}
        canDeleteColumn={selectedCell !== null && cells[0].length > MIN_COLS}
      />
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
          {Array(cells[0].length).fill().map((_, index) => (
            <div 
              key={index} 
              className="header-cell"
              style={{ width: columnWidths[index] || 80 }}
            >
              {columnIndexToLetter(index)}
            </div>
          ))}
        </div>
        {renderedCells.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            <div className="header-cell">
              {rowIndex + 1}
            </div>
            {row.map((cell, colIndex) => (
              <Cell
                key={`${rowIndex}-${colIndex}`}
                value={cell.value}
                formula={cell.formula}
                format={cell.format}
                onChange={(value, formula) => handleCellChange(rowIndex, colIndex, value, formula)}
                onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                isSelected={selectedCell && selectedCell[0] === rowIndex && selectedCell[1] === colIndex}
                isDragging={isInSelectedRange(rowIndex, colIndex)}
                style={{
                  width: columnWidths[colIndex] || 80,
                  height: rowHeights[rowIndex] || 28,
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Spreadsheet;

