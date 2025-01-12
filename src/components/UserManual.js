import React from 'react';
import './UserManual.css';

const UserManual = ({ onContinue }) => {
  return (
    <div className="user-manual">
      <h1>Welcome to React Spreadsheet</h1>
      <div className="manual-content">
        <section>
          <h2>Basic Navigation</h2>
          <ul>
            <li>Click on any cell to select it and start editing.</li>
            <li>Click on New Sheet to get an additional sheet <br/> to work with.</li>
          </ul>
        </section>
        <section>
          <h2>Editing Cells</h2>
          <ul>
            <li>Single-click a cell to edit its contents.</li>
            <li>To enter formulas, start with an equals sign (=).</li>
            <li>Use cell references (e.g., A1, B2) in formulas.</li>
          </ul>
        </section>
        <section>
          <h2>Formatting</h2>
          <ul>
            <li>Use the toolbar to change font styles, colors, and alignments.</li>
            <li>Select multiple cells to apply formatting to a range.</li>
          </ul>
        </section>
        <section>
          <h2>Rows and Columns</h2>
          <ul>
            <li>Click "Add Row" or "Add Column" in the toolbar to insert new rows or columns.</li>
            <li>Select a row or column and click "Delete Row" or "Delete Column" to remove them.</li>
          </ul>
        </section>
        <section>
          <h2>Charts</h2>
          <ul>
            <li>Select a range of cells with data.</li>
            <li>Click on the chart type you want to create in the toolbar.</li>
            <li>Use the "Back to Sheet" button to return to the spreadsheet view.</li>
          </ul>
        </section>
        <section>
          <h2>Additional Features</h2>
          <ul>
            <li>Merge cells by selecting a range and clicking "Merge Cells" in the toolbar.</li>
            <li>Use conditional formatting to highlight cells based on their values.</li>
            <li>Download your spreadsheet as a CSV file using the "Download" button.</li>
          </ul>
        </section>
      </div>
      <button onClick={onContinue} className="continue-button">Continue to Spreadsheet</button>
    </div>
  );
};

export default UserManual;

