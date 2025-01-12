import React from 'react';
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, Type, Palette } from 'lucide-react';
import './Toolbar.css';

function Toolbar({ onFormatChange }) {
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
        <div className="toolbar-select-wrapper">
          <Type size={18} />
          <select 
            className="toolbar-select" 
            onChange={(e) => onFormatChange({ fontSize: `${e.target.value}px` })}
            defaultValue="14"
          >
            {[8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 36, 48, 72].map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="toolbar-group">
        <div className="toolbar-color-wrapper">
          <Palette size={18} />
          <input 
            type="color" 
            className="toolbar-color"
            onChange={(e) => onFormatChange({ color: e.target.value })} 
            defaultValue="#000000"
          />
        </div>
      </div>
    </div>
  );
}

export default Toolbar;

