import Piece from './piece';

class Knight extends Piece {
  constructor(x, y, side) {
    super(x, y, side);
    this.name = 'knight';
    this.display = `<i class="fas fa-chess-knight ${side}"></i>`; //fontawesome knight
  }
  findLegalMoves() {
    const oldX = this.x;
    const oldY = this.y;
    let newX, newY;
    const possibleMoves = [];
    const jumpes = [[2,-1],[2,1],[1,-2],[1,2],[-2,-1],[-2,1],[-1,-2],[-1,2]];
    function checkLegal(item) {
      newX = oldX + item[0];
      newY = oldY + item[1];
      
      if (newX >= 0 && newX < 8 && newY >= 0 && newY < 8) {
        possibleMoves.push(`${newX},${newY}`);
      }
    }
    jumpes.forEach(checkLegal) 
    

    return possibleMoves;
  }
}

export default Knight;
