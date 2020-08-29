const Life = class {

    constructor() {
        this.grid = [];
    }

    runIteration(board) {
        const newBoard = [];
        const length = board.length;
        for (let i=0; i<length; i++) {
            newBoard.push([]);
            for (let j=0; j<length; j++) {
                const neighbors=this.getNeighbors(board,i,j);
                if (neighbors===3 && !board[i][j]) {
                    newBoard[i][j] = 1;
                } else if ((neighbors===2 || neighbors===3) && board[i][j]) {
                    newBoard[i][j] = 1;
                } else {
                    newBoard[i][j] = 0;
                }
            }
        }
        this.grid=newBoard;
    }

    getNeighbors=(board,i,j) => {
        const length = board.length;
        let count = 0;
        for (let x=-1; x<=1; x++) {
            for (let y=-1; y<=1; y++) {
                if (!x && !y) {
                    continue;
                }
                const ix = i + x;
                const jy = j + y;
                if (ix>=0 && ix<length && jy>0 && jy<length) {
                    if (board[ix][jy]) {
                        count++;
                    }
                }
            }
        }
        return count;
    }

    createBlankGrid() {
        this.grid= [];
        for (let i=0; i<25; i++) {
            this.grid[i]=[];
            for (let j=0; j<25; j++) {
                this.grid[i].push(0);
            }
        }
    }

    createRandomizedGrid() {
        this.grid=[];
        for (let i=0; i<25; i++) {
            this.grid[i] = [];
            for (let j=0; j<25; j++) {
                this.grid[i].push(Math.round(Math.random()));
            }
        }
    }

    createRPentomino() {
        this.createBlankGrid();
        this.grid[19][11] = 1;
        this.grid[19][12] = 1;
        this.grid[20][11] = 1;
        this.grid[18][12] = 1;
        this.grid[19][13] = 1;
    }

    createGlider() {
        this.createBlankGrid();
        this.grid[2][1] = 1;
        this.grid[3][2] = 1;
        this.grid[3][3] = 1;
        this.grid[2][3] = 1;
        this.grid[1][3] = 1; 
    }

    createSmallExplorer() {
        this.createBlankGrid();
        this.grid[11][10] = 1;
        this.grid[11][11] = 1;
        this.grid[10][11] = 1;
        this.grid[12][11] = 1;
        this.grid[10][12] = 1;
        this.grid[12][12] = 1;
        this.grid[11][13] = 1;
    }

    create10CellRow() {
        this.createBlankGrid();
        for (let i=8; i<18; i++) {
            this.grid[i][12] = 1;
        }
    }


}

export default Life;