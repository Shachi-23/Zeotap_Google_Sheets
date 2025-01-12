import React, { useState, useCallback, useMemo, useEffect } from 'react';
import Cell from './Cell';
import Toolbar from './Toolbar';
import FormulaBar from './FormulaBar';
import Chart from './Chart';
import { evaluateFormula } from '../utils/formulaEvaluator';
import { generateId, columnIndexToLetter, insertRow, deleteRow, insertColumn, deleteColumn, createCell } from '../utils/helpers';
import { applyConditionalFormatting } from '../utils/conditionalFormatting';
import { createChartData } from '../utils/chartUtils';
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
  const [conditionalFormattingRules, setConditionalFormattingRules] = useState([]);
  const [chart, setChart] = useState(null);
  const [showChart, setShowChart] = useState(false);

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
    if (selectedRange) {
      setCells(prevCells => {
        const newCells = prevCells.map(row => [...row]);
        const { start, end } = selectedRange;
        for (let row = start[0]; row <= end[0]; row++) {
          for (let col = start[1]; col <= end[1]; col++) {
            newCells[row][col] = {
              ...newCells[row][col],
              format: { ...newCells[row][col].format, ...format }
            };
          }
        }
        return newCells;
      });
    }
  }, [selectedRange]);

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
    setCells(prevCells => insertRow(prevCells, createCell));
  }, []);

  const handleDeleteRow = useCallback(() => {
    setCells(prevCells => deleteRow(prevCells, selectedCell, MIN_ROWS));
    setSelectedCell(null);
    setSelectedRange(null);
  }, [selectedCell]);

  const handleAddColumn = useCallback(() => {
    setCells(prevCells => insertColumn(prevCells, createCell));
  }, []);

  const handleDeleteColumn = useCallback(() => {
    setCells(prevCells => deleteColumn(prevCells, selectedCell, MIN_COLS));
    setSelectedCell(null);
    setSelectedRange(null);
  }, [selectedCell]);

  const handleColumnResize = useCallback((colIndex, width) => {
    setColumnWidths(prev => ({ ...prev, [colIndex]: width }));
  }, []);

  const handleRowResize = useCallback((rowIndex, height) => {
    setRowHeights(prev => ({ ...prev, [rowIndex]: height }));
  }, []);

  const handleMergeCells = useCallback(() => {
    if (selectedRange) {
      setCells(prevCells => {
        const newCells = prevCells.map(row => [...row]);
        const { start, end } = selectedRange;
        const mergedValue = newCells[start[0]][start[1]].value;
        for (let row = start[0]; row <= end[0]; row++) {
          for (let col = start[1]; col <= end[1]; col++) {
            if (row === start[0] && col === start[1]) {
              newCells[row][col].merged = { rowSpan: end[0] - start[0] + 1, colSpan: end[1] - start[1] + 1 };
            } else {
              newCells[row][col].merged = { hidden: true };
            }
            newCells[row][col].value = mergedValue;
          }
        }
        return newCells;
      });
    }
  }, [selectedRange]);

  const handleCreateChart = useCallback((type) => {
    if (selectedRange) {
      const chartData = createChartData(cells, selectedRange);
      setChart({ type, data: chartData });
      setShowChart(true);
    }
  }, [cells, selectedRange]);

  const handleCloseChart = useCallback(() => {
    setShowChart(false);
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
      row.map((cell, colIndex) => {
        const evaluatedCell = {
          ...cell,
          value: cell.formula.startsWith('=') 
            ? evaluateFormula(cell.formula, getCellValue) 
            : cell.value
        };
        const format = applyConditionalFormatting(evaluatedCell, conditionalFormattingRules);
        return { ...evaluatedCell, format };
      })
    );
  }, [cells, getCellValue, conditionalFormattingRules]);

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
        onMergeCells={handleMergeCells}
        onCreateChart={handleCreateChart}
      />
      <FormulaBar
        value={selectedCell ? cells[selectedCell[0]][selectedCell[1]].formula : ''}
        onChange={(value) => {
          if (selectedCell) {
            handleCellChange(selectedCell[0], selectedCell[1], value, value);
          }
        }}
      />
      {showChart ? (
        <div className="chartcontainer">
          <button className="close-chart-button" onClick={handleCloseChart}>
            Back to Sheet
          </button>
          {chart && (
            <Chart type={chart.type} data={chart.data} options={{}} />
          )}
        </div>
      ) : (
        <div className="grid">
          <div className="header-row">
            <div className="corner-cell"></div>
            {Array(cells[0].length).fill().map((_, index) => (
              <div
                key={index}
                className="header-cell"
                style={{ width: columnWidths[index] || 100}}
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
                  isSelected={isInSelectedRange(rowIndex, colIndex)}
                  onClick={() => setSelectedCell([rowIndex, colIndex])}
                  style={{
                    width: columnWidths[colIndex] || 100,
                    height: rowHeights[rowIndex] || 30,
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Spreadsheet;
