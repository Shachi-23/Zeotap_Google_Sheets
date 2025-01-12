import React from 'react';
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, Type, Palette, Grid, Merge, BarChart, LineChart, PieChart } from 'lucide-react';
import './Toolbar.css';

function Toolbar({ 
  onFormatChange, 
  onAddRow, 
  onDeleteRow, 
  onAddColumn, 
  onDeleteColumn,
  canDeleteRow,
  canDeleteColumn,
  onMergeCells,
  onCreateChart
}) {
  return (
    <div className="toolbar">
      <div className="toolbar-group">
        <button className="toolbar-button" onClick={() => onFormatChange({ fontWeight: 'bold' })} title="Bold">
          <Bold size={18} />
        </button>
        <button className="toolbar-button" onClick={() => onFormatChange({ fontStyle: 'italic' })} title="Italic">
          <Italic size={18} />
        </button>
        <button className="toolbar-button" onClick={() => onFormatChange({ textDecoration: 'underline' })} title="Underline">
          <Underline size={18} />
        </button>
      </div>
      <div className="toolbar-group">
        <button className="toolbar-button" onClick={() => onFormatChange({ textAlign: 'left' })} title="Align Left">
          <AlignLeft size={18} />
        </button>
        <button className="toolbar-button" onClick={() => onFormatChange({ textAlign: 'center' })} title="Align Center">
          <AlignCenter size={18} />
        </button>
        <button className="toolbar-button" onClick={() => onFormatChange({ textAlign: 'right' })} title="Align Right">
          <AlignRight size={18} />
        </button>
      </div>
      <div className="toolbar-group">
        <select 
          className="toolbar-select" 
          onChange={(e) => onFormatChange({ fontFamily: e.target.value })}
        >
          <option value="Arial">Arial</option>
          <option value="Helvetica">Helvetica</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Courier">Courier</option>
        </select>
        <select 
          className="toolbar-select" 
          onChange={(e) => onFormatChange({ fontSize: e.target.value + 'px' })}
        >
          {[8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 36, 48, 72].map(size => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
        <input 
          type="color" 
          className="toolbar-color" 
          onChange={(e) => onFormatChange({ color: e.target.value })} 
        />
        <input 
          type="color" 
          className="toolbar-color" 
          onChange={(e) => onFormatChange({ backgroundColor: e.target.value })} 
        />
      </div>
      <div className="toolbar-group">
        <button className="toolbar-button" onClick={() => onFormatChange({ border: '1px solid black' })} title="Add Border">
          <Grid size={18} />
        </button>
        <button className="toolbar-button" onClick={onMergeCells} title="Merge Cells">
          <Merge size={18} />
        </button>
      </div>
      <div className="toolbar-group">
        <button 
          className="toolbar-button" 
          onClick={onAddRow} 
          title="Add Row"
        >
          Add Row
        </button>
        <button 
          className={`toolbar-button ${!canDeleteRow ? 'disabled' : ''}`}
          onClick={onDeleteRow}
          disabled={!canDeleteRow}
          title="Delete Row"
        >
          Delete Row
        </button>
      </div>
      <div className="toolbar-group">
        <button 
          className="toolbar-button" 
          onClick={onAddColumn} 
          title="Add Column"
        >
          Add Column
        </button>
        <button 
          className={`toolbar-button ${!canDeleteColumn ? 'disabled' : ''}`}
          onClick={onDeleteColumn}
          disabled={!canDeleteColumn}
          title="Delete Column"
        >
          Delete Column
        </button>
      </div>
      <div className="toolbar-group">
        <button className="toolbar-button" onClick={() => onCreateChart('bar')} title="Bar Chart">
          <BarChart size={18} />
        </button>
        <button className="toolbar-button" onClick={() => onCreateChart('line')} title="Line Chart">
          <LineChart size={18} />
        </button>
        <button className="toolbar-button" onClick={() => onCreateChart('pie')} title="Pie Chart">
          <PieChart size={18} />
        </button>
      </div>
    </div>
  );
}

export default Toolbar;