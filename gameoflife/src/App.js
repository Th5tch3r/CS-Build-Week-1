import React from 'react';
import logo from './logo.svg';
import './App.css';

import LifeCanvas from "./gameComponents/LifeCanvas.js"

function App() {
  return (
    <div className="App">
      <h1>Conway's Game of Life</h1>
      <LifeCanvas/>
    </div>
  );
}

export default App;
