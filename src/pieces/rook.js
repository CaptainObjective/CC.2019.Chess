import Piece from './piece';
import board from '../board';

class Rook extends Piece {
  constructor(x, y, side) {
    super(x, y, side);
    this.name = 'rook';
    this.display = `<i class="fas fa-chess-rook ${side}"></i>`; //fontawesome rook
  }

  cordToPosition(x, y) {
    return `${x},${y}`;
  }

  generateMoves() {
    const generateLine = (x = 0, y = 0) => {
      let xa = 0;
      let ya = 0;
      return [...Array(7)].map(() => [this.x + (xa += x), this.y + (ya += y)]);
    };
    return [generateLine(0, -1), generateLine(1, 0), generateLine(0, 1), generateLine(-1, 0)];
  }

  isMoveOutOfBoard(x, y) {
    const isOutOfBoardRange = v => v < 0 || v > 7;
    return isOutOfBoardRange(x) || isOutOfBoardRange(y);
  }

  findLegalMoves() {
    const possibleMoves = this.generateMoves();
    return [].concat(
      ...possibleMoves.map(arr => {
        let stop = true;
        const isMoveOnPiece = ((stop = false) => (x, y) =>
          stop || (board[x][y] && (board[x][y].side === this.side ? true : ((stop = true), false))))();
        return arr
          .filter(([x, y]) => stop && (stop = !(this.isMoveOutOfBoard(x, y) || isMoveOnPiece(x, y))))
          .map(([x, y]) => this.cordToPosition(x, y));
      }),
    );
  }
}

export default Rook;
