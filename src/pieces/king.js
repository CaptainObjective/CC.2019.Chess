import Piece from './piece';
import { cordToPosition, isMoveOutOfBoard, isMoveOnOwnPiece, filterToPosition, generateOpponentMoves } from './utils';

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

  isMoveCheckmate(x, y, opponentMoves) {
    return opponentMoves.has(cordToPosition(x, y));
  }

  findLegalMoves(opponentSide = false) {
    return opponentSide ? this.findLegalMovesOpponentSide() : this.findLegalMovesThisSide();
  }

  findLegalMovesOpponentSide() {
    const possibleMoves = this.generateMoves();
    const filterFn = (x, y) => isMoveOutOfBoard(x, y);
    return filterToPosition(possibleMoves, filterFn);
  }

  findLegalMovesThisSide() {
    const possibleMoves = this.generateMoves();
    const opponentMoves = generateOpponentMoves(this.side);
    const filterFn = (x, y) =>
      isMoveOutOfBoard(x, y) || isMoveOnOwnPiece(this.side, x, y) || this.isMoveCheckmate(x, y, opponentMoves);
    return filterToPosition(possibleMoves, filterFn);
  }
}

export default King;
