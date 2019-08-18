import Piece from './piece';
import { fMap, findLegalMovesLine, createGenerateLine, findAttackMovesLine } from './utils';

class Bishop extends Piece {
  constructor(x, y, side) {
    super(x, y, side);
    this.name = 'bishop';
    this.display = `<i class="fas fa-chess-bishop ${side}"></i>`; //fontawesome bishop
  }
  generateMoves() {
    const generateLine = createGenerateLine(this.x, this.y);
    return [generateLine(-1, -1), generateLine(-1, 1), generateLine(1, -1), generateLine(1, 1)];
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

export default Bishop;
