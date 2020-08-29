import React, { Component } from 'react';
import Life from "./Life.js";

class LifeCanvas extends Component {
    constructor () {
        super()
        this.state = {
            generation: 0,
        }
    }

    componentDidMount () {
        this.draw();
        this.life = new Life();
        this.life.createBlankGrid();
        this.start = null;
        this.myreq = null;
        this.isClickable = true;
    }

    draw() {
        const ctx = this.refs.canvas.getContext('2d');
        ctx.strokeStyle = '#1e2476';
        for (let i=0; i<=375; i+=15) {
            for (let j=0; j<=375; j+=15) {
                ctx.moveTo (i, 0);
                ctx.lineTo (i, j);
                ctx.moveTo (0, j);
                ctx.lineTo (i, j);
            }
        } 
        ctx.stroke();  
    }

    getPosition = e => {
        if (this.isClickable) {
            const canvas = this.refs.canvas;
            const grid = canvas.getBoundingClientRect();
            const x = e.clientX - grid.left;
            const y = e.clientY - grid.top;
            this.toggleState(x, y);
        }
    };

    toggleState(x, y) {
        const x_index = Math.floor (x / 15);
        const y_index = Math.floor (y / 15);
        this.life.grid[x_index][y_index] === 0
            ? (this.life.grid[x_index][y_index] = 1)
            : (this.life.grid[x_index][y_index] = 0);
        this.fillSquares();
    }

    fillSquares = () => {
        const ctx = this.refs.canvas.getContext ('2d');
        ctx.fillStyle = '#060707';
        for (let i=0; i<this.life.grid.length; i++) {
            for (let j=0; j<this.life.grid.length; j++) {
                if (this.life.grid[i][j]) {
                    ctx.fillRect (i * 15, j * 15, 15, 15);
                } else {
                    ctx.clearRect (i * 15, j * 15, 15, 15);
                }
            }
        }
        this.draw();
    }

    oneStep = () => {
        if (!this.myreq && !this.start) {
            this.life.runIteration (this.life.grid);
            this.setState({generation: this.state.generation + 1}, () => {
                this.isClickable = false;
                this.fillSquares();
            })
        }
    }

    animate = timestamp => {
        this.myreq = requestAnimationFrame(this.animate);
        if (!this.start) {
            this.start = timestamp;
        }
        const elapsed = timestamp - this.start;
        if (elapsed > 100) {
            this.life.runIteration(this.life.grid);
            this.setState({generation: this.state.generation + 1}, () => {
                this.start = timestamp;
                this.isClickable = false;
                this.fillSquares();
            })
        }
    }

    stopAnimation = () => {
        cancelAnimationFrame (this.myreq);
        this.myreq = null;
        this.start = null;
    }

    clear = () => {
        this.stopAnimation();
        this.setState({generation: 0}, () => {
            this.isClickable = true;
            this.life.createBlankGrid();
            this.fillSquares();
        })
    }

    selectHandler = e => {
        if (!this.start && !this.myreq) {
            switch (e.target.value) {
                case 'random':
                    this.life.createRandomizedGrid();
                    break;
                case 'rPentomino':
                    this.life.createRPentomino();
                    break;
                case 'Glider':
                    this.life.createGlider();
                    break;
                case 'Explorer':
                    this.life.createSmallExplorer();
                    break;
                case "10CellRow":
                    this.life.create10CellRow();
                    break;
                default:
                    this.life.createBlankGrid();
            }
        this.setState({generation: 0}, () => this.fillSquares());
        }
    }

    render() {
        return (
            <div>
                <canvas
                    ref="canvas"
                    width={375}
                    height={375}
                    onClick={e => this.getPosition(e)}
                />
                <p className="generationHeader">
                    Current generation: {this.state.generation}
                </p>
                <div className="button-container">

                    <button onClick={() => this.oneStep()}>
                        Step
                    </button>

                    <button
                        onClick={() => {
                            if (!this.myreq && !this.start) {
                                this.myreq = requestAnimationFrame(this.animate)
                            }
                        }}>
                        Start
                    </button>

                    <button onClick={() => this.stopAnimation()}>
                        Stop
                    </button>

                    <button onClick={() => this.clear()}>
                        Clear
                    </button>
                </div>
                <h4> Pick A Template: 
                <select onChange={this.selectHandler} defaultValue="None">
                        <option value="none">None</option>
                        <option value="random">Random</option>
                        <option value="rPentomino">R-pentomino</option>
                        <option value="Glider">Glider</option>
                        <option value="Explorer">Explorer</option>
                        <option value="10CellRow">10 Cells Row</option>
                </select>
                </h4>


            </div>
        )
    }

}

export default LifeCanvas;