// import React from 'react';
// import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, Type, Palette, PlusSquare, MinusSquare } from 'lucide-react';
// import './Toolbar.css';

// function Toolbar({ onFormatChange, onAddRow, onDeleteRow, onAddColumn, onDeleteColumn }) {
//   return (
//     <div className="toolbar">
//       <div className="toolbar-group">
//         <button className="toolbar-button" onClick={() => onFormatChange({ fontWeight: 'bold' })} title="Bold">
//           <Bold size={18} />
//         </button>
//         <button className="toolbar-button" onClick={() => onFormatChange({ fontStyle: 'italic' })} title="Italic">
//           <Italic size={18} />
//         </button>
//         <button className="toolbar-button" onClick={() => onFormatChange({ textDecoration: 'underline' })} title="Underline">
//           <Underline size={18} />
//         </button>
//       </div>
//       <div className="toolbar-group">
//         <button className="toolbar-button" onClick={() => onFormatChange({ textAlign: 'left' })} title="Align Left">
//           <AlignLeft size={18} />
//         </button>
//         <button className="toolbar-button" onClick={() => onFormatChange({ textAlign: 'center' })} title="Align Center">
//           <AlignCenter size={18} />
//         </button>
//         <button className="toolbar-button" onClick={() => onFormatChange({ textAlign: 'right' })} title="Align Right">
//           <AlignRight size={18} />
//         </button>
//       </div>
//       <div className="toolbar-group">
//         <div className="toolbar-select-wrapper">
//           <Type size={18} />
//           <select 
//             className="toolbar-select" 
//             onChange={(e) => onFormatChange({ fontSize: `${e.target.value}px` })}
//             defaultValue="14"
//           >
//             {[8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 36, 48, 72].map(size => (
//               <option key={size} value={size}>{size}</option>
//             ))}
//           </select>
//         </div>
//       </div>
//       <div className="toolbar-group">
//         <div className="toolbar-color-wrapper">
//           <Palette size={18} />
//           <input 
//             type="color" 
//             className="toolbar-color"
//             onChange={(e) => onFormatChange({ color: e.target.value })} 
//             defaultValue="#000000"
//           />
//         </div>
//       </div>
//       <div className="toolbar-group">
//         <button className="toolbar-button" onClick={onAddRow} title="Add Row">
//           <PlusSquare size={18} />
//         </button>
//         <button className="toolbar-button" onClick={onDeleteRow} title="Delete Row">
//           <MinusSquare size={18} />
//         </button>
//       </div>
//       <div className="toolbar-group">
//         <button className="toolbar-button" onClick={onAddColumn} title="Add Column">
//           <PlusSquare size={18} />
//         </button>
//         <button className="toolbar-button" onClick={onDeleteColumn} title="Delete Column">
//           <MinusSquare size={18} />
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Toolbar;





import React from 'react';
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, Type, Palette, PlusSquare, MinusSquare, Plus, Minus } from 'lucide-react';
import './Toolbar.css';

function Toolbar({ 
  onFormatChange, 
  onAddRow, 
  onDeleteRow, 
  onAddColumn, 
  onDeleteColumn,
  canDeleteRow,
  canDeleteColumn 
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
      <div className="divider"></div>
      <div className="toolbar-group">
        <button 
          className="toolbar-button" 
          onClick={onAddRow} 
          title="Add Row"
        >
          <Plus size={18} />
          <span>Row</span>
        </button>
        <button 
          className={`toolbar-button ${!canDeleteRow ? 'disabled' : ''}`}
          onClick={onDeleteRow}
          disabled={!canDeleteRow}
          title="Delete Row"
        >
          <Minus size={18} />
          <span>Row</span>
        </button>
      </div>
      <div className="toolbar-group">
        <button 
          className="toolbar-button" 
          onClick={onAddColumn} 
          title="Add Column"
        >
          <Plus size={18} />
          <span>Column</span>
        </button>
        <button 
          className={`toolbar-button ${!canDeleteColumn ? 'disabled' : ''}`}
          onClick={onDeleteColumn}
          disabled={!canDeleteColumn}
          title="Delete Column"
        >
          <Minus size={18} />
          <span>Column</span>
        </button>
      </div>
    </div>
  );
}

export default Toolbar;

