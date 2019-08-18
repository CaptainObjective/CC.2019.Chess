import Piece from './piece';
import { isMoveOutOfBoard, isMoveOnOwnPiece, filterToPosition, isKingMoveCheckmate } from './utils';

class King extends Piece {
  constructor(x, y, side) {
    super(x, y, side);
    this.name = 'king';
    this.display = `<i class="fas fa-chess-king ${side}"></i>`; //fontawesome king
  }

  generateMoves() {
    return [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]].map(([x, y]) => [
      this.x + x,
      this.y + y,
    ]);
  }

  findLegalMoves() {
    const possibleMoves = this.generateMoves();
    const filterFn = (x, y) =>
      isMoveOutOfBoard(x, y) || isMoveOnOwnPiece(this.side, x, y) || isKingMoveCheckmate(this, x, y);
    return filterToPosition(possibleMoves, filterFn);
  }

  findAttackMoves() {
    const possibleMoves = this.generateMoves();
    const filterFn = (x, y) => isMoveOutOfBoard(x, y);
    return filterToPosition(possibleMoves, filterFn);
  }
}

export default King;
