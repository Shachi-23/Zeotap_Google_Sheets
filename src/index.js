// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import { DndProvider } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';

// ReactDOM.render(
//   <DndProvider backend={HTML5Backend}>
//       <App />
//   </DndProvider>,
//   document.getElementById('root')
// );



// App.js or index.js
// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import App from './App';  // Import App from App.js if it's in a separate file

ReactDOM.render(
  <DndProvider backend={HTML5Backend}>
    <App />
  </DndProvider>,
  document.getElementById('root')
);
