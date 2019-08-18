import Piece from './piece';
import board from '../board';

class Knight extends Piece {
  constructor(x, y, side) {
    super(x, y, side);
    this.name = 'knight';
    this.display = `<i class="fas fa-chess-knight ${side}"></i>`; //fontawesome knight
  }

  findLegalMoves() {
    const oldX = this.x;
    const oldY = this.y;
    const thisSide = this.side;
    let newX, newY;
    const possibleMoves = [];
    const jumpes = [[2, -1], [2, 1], [1, -2], [1, 2], [-2, -1], [-2, 1], [-1, -2], [-1, 2]];
    function checkLegal(item) {
      newX = oldX + item[0];
      newY = oldY + item[1];
      if (newX >= 0 && newX < 8 && newY >= 0 && newY < 8) {
        !board[newX][newY] || board[newX][newY].side !== thisSide ? possibleMoves.push(`${newX},${newY}`) : '';
      }
    }
    jumpes.forEach(checkLegal);

    return possibleMoves;
  }

  findAttackMoves() {
    /* TODO */
    return [];
  }
}

export default Knight;
