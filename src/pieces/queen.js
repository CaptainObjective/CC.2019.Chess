import Piece from './piece';
import { cordToPosition, isMoveOutOfBoard, isMoveOnPiece, fMap, createGenerateLine } from './utils';

class Queen extends Piece {
  constructor(x, y, side) {
    super(x, y, side);
    this.name = 'queen';
    this.display = `<i class="fas fa-chess-queen ${side}"></i>`; //fontawesome queen
  }
  generateMoves() {
    const generateLine = createGenerateLine(this.x, this.y);
    return [generateLine(0, -1), generateLine(1, 0), generateLine(0, 1), generateLine(-1, 0), generateLine(-1, -1), generateLine(-1, 1), generateLine(1, -1), generateLine(1, 1)];
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

export default Queen;
