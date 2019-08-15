import Piece from './piece';
import { cordToPosition, isMoveOutOfBoard, isMoveOnPiece, fMap, createGenerateLine } from './utils';

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
    return fMap(possibleMoves, arr => {
      let stop = true;
      const isMoveOnPieceWithStop = isMoveOnPiece(this.side);
      return arr
        .filter(([x, y]) => stop && (stop = !(isMoveOutOfBoard(x, y) || isMoveOnPieceWithStop(x, y))))
        .map(([x, y]) => cordToPosition(x, y));
    });
  }
}

export default Bishop;
