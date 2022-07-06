
const body = document.querySelector('body');
body.addEventListener('click', function(e) {
    if (e.target.id == 'restart') {
        location.reload();
    };
})


class Game {
    constructor(p1, p2) {
      this.players = [p1, p2]   
      this.HEIGHT = 6;
      this.WIDTH = 7;
      this.currPlayer = this.players[0];
      this.board = [];
      this.makeBoard();
      this.makeHtmlBoard();
      
    }

    makeBoard() {
        for (let y = 0; y < this.HEIGHT; y++) {
          this.board.push([]);
          for (let x = 0; x < this.WIDTH; x++) {
            this.board[y].push(null);
          }
        }
        console.log(this.board)
        return this.board;
    };

    makeHtmlBoard() {
        const board = document.getElementById('board');
        // make column tops (clickable area for adding a piece to that column)
        const top = document.createElement('tr');
        top.setAttribute('id', 'column-top');
        top.addEventListener('click', this.handleClick.bind(this));
      
        for (let x = 0; x < this.WIDTH; x++) {
          const headCell = document.createElement('td');
          headCell.setAttribute('id', x);
          top.append(headCell);
        }
      
        board.append(top);
      
        // make main part of board
        for (let y = 0; y < this.HEIGHT; y++) {
          const row = document.createElement('tr');
      
          for (let x = 0; x < this.WIDTH; x++) {
            const cell = document.createElement('td');
            cell.setAttribute('id', `${y}-${x}`);
            row.append(cell);
          }
      
          board.append(row);
        }
    }

    placeInTable(y, x) {
        const piece = document.createElement('div');
        piece.classList.add('piece');
        // console.log(this.players[0], this.players[1]);
        if (this.currPlayer == this.players[0]) {
            piece.classList.add(`p1`)
        }
        if (this.currPlayer == this.players[1]) {
            piece.classList.add(`p2`)
        }
        piece.style.top = -50 * (y + 2);
        piece.style.backgroundColor = this.currPlayer.color;
        console.log('placeInTable y/x coordinates: ', [y, x]);
        console.log('');
      
        const spot = document.getElementById(`${y}-${x}`);
        spot.append(piece);
    }

    endGame(msg) {
        alert(msg);
        document.querySelector('#game').style.pointerEvents = 'none';
    }

    findSpotForCol(x) {
        // console.log(x);
        // console.log(this.board[x].indexOf(this.currPlayer))
        let y = 0;
        if (this.board[0][x] !== null) {
            y = null
        }
        for (let i = this.board.length - 1; i >= 0; i--) {
            if (this.board[i][x] == null) {
                this.board[i][x] = this.players.indexOf(this.currPlayer);
                y = i;
                break;
            }
        }
        // console.log(y)
        console.log('findSpotForCol Y value: ', y, 'current player: ', this.currPlayer, this.board);
        console.log('');
        return y;
    }

    handleClick(evt) {
        // get x from ID of clicked cell
        const x = +evt.target.id;
      
        // get next spot in column (if none, ignore click)
        const y = this.findSpotForCol(x);
        if (y === null) {
          return null;
        }
      
        // place piece in board and add to HTML table
        this.board[y][x] = this.players.indexOf(this.currPlayer);
        this.placeInTable(y, x);
        
        // check for win
        if (this.checkForWin()) {
          return this.endGame(`Player ${this.currPlayer.color} won!`);
        }
        
        // check for tie
        if (this.board.every(row => row.every(cell => cell))) {
          return this.endGame('Tie!');
        }
        // console.log(this.board);
          
        // switch players
        this.currPlayer == this.players[0] ? this.currPlayer = this.players[1] : this.currPlayer = this.players[0];
    }

    checkForWin() {
        const _win = (cells) => {
          // Check four cells to see if they're all color of current player
          //  - cells: list of four (y, x) cells
          //  - returns true if all are legal coordinates & all match currPlayer
      
          return cells.every(
            ([y, x]) =>
              y >= 0 &&
              y < this.HEIGHT &&
              x >= 0 &&
              x < this.WIDTH &&
              this.board[y][x] === this.players.indexOf(this.currPlayer)
          );
        }
      
        for (let y = 0; y < this.HEIGHT; y++) {
          for (let x = 0; x < this.WIDTH; x++) {
            // get "check list" of 4 cells (starting here) for each of the different
            // ways to win
            const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
            const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
            const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
            const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
      
             // find winner (only checking each win-possibility as needed)
            if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
              return true;
            }
          }
        }
    }
}
    
     
   

class Player { 
    constructor(color) {
        this.color = color;
    }
}

// document.getElementById('start').addEventListener('click', (e) => {
//     e.preventDefault();
//     let p1 = new Player(document.getElementById('p1').value);
//     let p2 = new Player(document.getElementById('p2').value);
//     new Game(p1, p2);
//   });

const button = document.getElementById('start');
button.addEventListener('click', function() {
    button.remove();
    const restart = document.createElement('button')
    restart.id = 'restart';
    restart.innerText = 'Restart the game';
    document.querySelector('body').append(restart);
    let p1 = new Player(document.getElementById('p1').value)
    let p2 = new Player(document.getElementById('p2').value)
    const game = new Game(p1, p2);
    // console.log(game);
    // console.log(game.currPlayer);
    // console.log(game.players[0], game.players[1]);
    // console.log(game.board);
    
    // body.addEventListener('click', function() {
    //     console.log(game);
        // console.log(game.currPlayer);
    //     console.log(game.board);
    // })
})

// let p1 = new Player('green')
// let p2 = new Player('orange')
// let game = new Game(p1, p2);


