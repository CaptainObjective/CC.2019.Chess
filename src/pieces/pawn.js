import Piece from './piece';

class Pawn extends Piece {
  constructor(x, y, side) {
    super(x, y, side);
    this.name = 'pawn';
    this.display = `<i class="fas fa-chess-pawn ${side}"></i>`;
  }
  findLegalMoves() {
    const possibleMoves = [];
    if (this.name == 'pawn') {
      if (this.side == 'black') {
        if (this.x === 1) {
          possibleMoves.push(`${this.x + 2},${this.y}`);
        }
        (this.x + 1 <= 7) && possibleMoves.push(`${this.x + 1},${this.y}`);
      }
      if (this.side == 'white') {
        if (this.x === 6) {
          possibleMoves.push(`${this.x - 2},${this.y}`);
        }
        (this.x - 1 >= 0) && possibleMoves.push(`${this.x - 1},${this.y}`);
      }
    }
    return possibleMoves;
  }
  promote() {}
  enPassant() {}
}

export default Pawn;
