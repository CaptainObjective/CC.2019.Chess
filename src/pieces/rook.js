import Piece from './piece';
import { fMap, findLegalMovesLine, createGenerateLine, findAttackMovesLine } from './utils';

class Rook extends Piece {
  constructor(x, y, side) {
    super(x, y, side);
    this.name = 'rook';
    this.display = `<i class="fas fa-chess-rook ${side}"></i>`; //fontawesome rook
  }

  generateMoves() {
    const generateLine = createGenerateLine(this.x, this.y);
    return [generateLine(0, -1), generateLine(1, 0), generateLine(0, 1), generateLine(-1, 0)];
  }

  findLegalMoves() {
    const possibleMoves = this.generateMoves();
    return fMap(possibleMoves, line => findLegalMovesLine(line, this));
  }

  findAttackMoves() {
    const possibleMoves = this.generateMoves();
    return fMap(possibleMoves, line => findAttackMovesLine(line));
  }
}

export default Rook;
