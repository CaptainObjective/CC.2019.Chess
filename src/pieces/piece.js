import board from '../board';
import {reportSaveState, reportSaveMove} from '../reporting';
// import gameReport from '../reporting';

class Piece {
  constructor(x, y, side) {
    this.x = x;
    this.y = y;
    this.side = side; //'black' or 'white'
  }
  move(id) {
    const newX = Number(id[0]);
    const newY = Number(id[2]);

    // zapisuje do raportu (tablica `gameRaport` z `reporting.js`) parametry posunięcia
    reportSaveMove(this.side, board[this.x][this.y].name, `${this.x},${this.y}`, `${newX},${newY}`, !!board[newX][newY]);

    //clearing previous place
    board[this.x][this.y] = null;
    document.getElementById(`${this.x},${this.y}`).innerHTML = '';

    //setting new
    this.x = newX;
    this.y = newY;
    board[this.x][this.y] = this;
    document.getElementById(id).innerHTML = this.display;

    reportSaveState(board); // dodatkow zapisuje stan szachownicy po wykonaniu ruchu (`reporting.js`)
  }

  findLegalMoves() {}
}

export default Piece;
