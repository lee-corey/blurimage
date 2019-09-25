import React from 'react';
import './App.css';
import Main from './Main'

function App() {
  // initial page
  return (
    <div className="App">
      <header className="App-header">
        <Main /> {/** use the Main.js */}
      </header>
    </div>
  );
}

export default App;
