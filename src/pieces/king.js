import Piece from './piece';
import board from '../board';

class King extends Piece {
  constructor(x, y, side) {
    super(x, y, side);
    this.name = 'king';
    this.display = `<i class="fas fa-chess-king ${side}"></i>`; //fontawesome king
  }

  cordToPosition(x, y) {
    return `${x},${y}`;
  }

  generateMoves() {
    return [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]].map(([x, y]) => [
      this.x + x,
      this.y + y,
    ]);
  }

  generateOpponentMoves() {
    const opponentMoves = new Set();
    for (let row of board) {
      for (let el of row) {
        if (el && el.side !== this.side) {
          for (let move of el.findLegalMoves(true)) {
            opponentMoves.add(move);
          }
        }
      }
    }
    return opponentMoves;
  }

  isMoveCheckmate(x, y, opponentMoves) {
    return opponentMoves.has(this.cordToPosition(x, y));
  }

  isMoveOnOwnPiece(x, y) {
    return board[x][y] && board[x][y].side === this.side;
  }

  isMoveOutOfBoard(x, y) {
    const isOutOfBoardRange = v => v < 0 || v > 7;
    return isOutOfBoardRange(x) || isOutOfBoardRange(y);
  }

  findLegalMoves(opponentSide = false) {
    return opponentSide ? this.findLegalMovesOpponentSide() : this.findLegalMovesThisSide();
  }

  findLegalMovesOpponentSide() {
    const possibleMoves = this.generateMoves();
    return possibleMoves.filter(([x, y]) => !this.isMoveOutOfBoard(x, y)).map(([x, y]) => this.cordToPosition(x, y));
  }

  findLegalMovesThisSide() {
    const possibleMoves = this.generateMoves();
    const opponentMoves = this.generateOpponentMoves();
    return possibleMoves
      .filter(
        ([x, y]) =>
          !(this.isMoveOutOfBoard(x, y) || this.isMoveOnOwnPiece(x, y) || this.isMoveCheckmate(x, y, opponentMoves)),
      )
      .map(([x, y]) => this.cordToPosition(x, y));
  }
}

export default King;
