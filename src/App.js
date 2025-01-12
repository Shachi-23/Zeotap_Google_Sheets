import React, { useState, useCallback } from 'react';
import Spreadsheet from './components/Spreadsheet';
import UserManual from './components/UserManual';
import { createNewSheet, downloadSheet } from './utils/sheetUtils';
import './App.css';

function App() {
  const [sheets, setSheets] = useState([{ id: 1, name: 'Sheet 1', data: createNewSheet() }]);
  const [currentSheetId, setCurrentSheetId] = useState(1);
  const [showManual, setShowManual] = useState(true);

  const handleNewSheet = () => {
    const newSheet = {
      id: sheets.length + 1,
      name: `Sheet ${sheets.length + 1}`,
      data: createNewSheet()
    };
    setSheets([...sheets, newSheet]);
    setCurrentSheetId(newSheet.id);
  };

  const handleDownload = () => {
    const currentSheet = sheets.find(sheet => sheet.id === currentSheetId);
    if (currentSheet) {
      downloadSheet(currentSheet);
    }
  };

  const handleSheetChange = useCallback((sheetData) => {
    setSheets(prevSheets => 
      prevSheets.map(sheet => 
        sheet.id === currentSheetId ? { ...sheet, data: sheetData } : sheet
      )
    );
  }, [currentSheetId]);

  const handleContinue = () => {
    setShowManual(false);
  };

  const currentSheet = sheets.find(sheet => sheet.id === currentSheetId);

  if (showManual) {
    return <UserManual onContinue={handleContinue} />;
  }

  return (
    <div className="App">
      <header className="app-header">
        <div className="app-title">
          <svg viewBox="0 0 24 24" className="app-icon" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 3h18v18H3z"/>
            <path d="M3 9h18"/>
            <path d="M9 3v18"/>
          </svg>
          <h1>React Spreadsheet</h1>
        </div>
        <div className="app-actions">
          <button className="app-button" onClick={handleNewSheet}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12h14"/>
            </svg>
            New Sheet
          </button>
          <button className="app-button" onClick={handleDownload}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
            </svg>
            Download
          </button>
        </div>
      </header>
      <div className="sheet-tabs">
        {sheets.map(sheet => (
          <button
            key={sheet.id}
            className={`sheet-tab ${sheet.id === currentSheetId ? 'active' : ''}`}
            onClick={() => setCurrentSheetId(sheet.id)}
          >
            {sheet.name}
          </button>
        ))}
      </div>
      {currentSheet && (
        <Spreadsheet
          key={currentSheet.id}
          data={currentSheet.data}
          onChange={handleSheetChange}
        />
      )}
    </div>
  );
}

export default App;