import Piece from './piece';
import board from '../board';
import { isPieceMoveCheckmate } from './utils';

class Knight extends Piece {
  constructor(x, y, side) {
    super(x, y, side);
    this.name = 'knight';
    this.display = `<i class="fas fa-chess-knight ${side}"></i>`; //fontawesome knight
    this.knightJumpes = [[2, -1], [2, 1], [1, -2], [1, 2], [-2, -1], [-2, 1], [-1, -2], [-1, 2]];
  }

  findLegalMoves() {
    let newX, newY;
    const possibleMoves = [];
    const checkLegal = item => {
      newX = this.x + item[0];
      newY = this.y + item[1];
      if (newX >= 0 && newX < 8 && newY >= 0 && newY < 8) {
        (!board[newX][newY] || board[newX][newY].side !== this.side) && !isPieceMoveCheckmate(this, newX, newY)
          ? possibleMoves.push(`${newX},${newY}`)
          : '';
      }
    };
    this.knightJumpes.forEach(checkLegal);

    return possibleMoves;
  }

  findAttackMoves() {
    let newX, newY;
    const attackMoves = [];
    const checkAttack = item => {
      newX = this.x + item[0];
      newY = this.y + item[1];
      newX >= 0 && newX < 8 && newY >= 0 && newY < 8 ? attackMoves.push(`${newX},${newY}`) : '';
    };
    this.knightJumpes.forEach(checkAttack);

    return attackMoves;
  }
}

export default Knight;
