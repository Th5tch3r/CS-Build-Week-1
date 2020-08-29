import React from 'react';
import logo from './logo.svg';
import './App.css';

import LifeCanvas from "./gameComponents/LifeCanvas.js"

function App() {
  return (
    <div className="App">
      <h1>Conway's Game of Life (Thatcher Phan)</h1>
      <LifeCanvas/>
      <h3>Click <a href="https://www.conwaylife.com/wiki/Conway%27s_Game_of_Life">here</a> to learn more about the rules of this game. </h3>
    </div>
  );
}

export default App;
