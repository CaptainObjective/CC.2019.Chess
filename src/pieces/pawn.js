import Piece from './piece';
import board from '../board';

class Pawn extends Piece {
  
  constructor(x, y, side) {
    super(x, y, side);
    this.name = 'pawn';
    this.display = `<i class="fas fa-chess-pawn ${side}"></i>`;
  }

  findLegalMoves() {
    const possibleMoves = [];
    const isSideWhite = (this.side == 'white') ? -1 : 1;
    if (this.x === (-2.5 * isSideWhite + 3.5)) {
      possibleMoves.push(`${this.x + 2 * isSideWhite},${this.y}`);
    }
    (((this.x + 1 * isSideWhite) <= 7) && ((this.x + 1 * isSideWhite) >= 0)) && possibleMoves.push(`${this.x + 1 * isSideWhite},${this.y}`);
    return possibleMoves;
  }
  
  promote() {}
  
  enPassant() {}

}

export default Pawn;
