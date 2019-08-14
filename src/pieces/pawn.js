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
    const row = -2.5 * isSideWhite + 3.5;
    // Wyjście "z domu"
      if (this.x === row) {                                                   // Jeśli startuje "z domu"...
        if (!(board[this.x + 1 * isSideWhite][this.y])                        // i jedno pole do przodu jest puste...
              && !(board[this.x + 2 * isSideWhite][this.y])) {                // i kolejne też jest puste,
          possibleMoves.push(`${this.x + 2 * isSideWhite},${this.y}`);        // to może pójść dwa pola do przodu.
        }
      }
    // Ruch z dowolnego miejsca
      (((this.x + 1 * isSideWhite) <= 7)                                      // Jeśli nie wychodzi poza dół szachownicy...
          && ((this.x + 1 * isSideWhite) >= 0))                               // ani ponad górę...
          && !(board[this.x + 1 * isSideWhite][this.y])                       // i pole przed nim jest wolne,
          && possibleMoves.push(`${this.x + 1 * isSideWhite},${this.y}`);     // to może pójść o jedno pole do przodu.

    // Pola do bicia
      if ((this.x + 1 * isSideWhite <=7) && (this.x + 1 * isSideWhite >=0)) {                                     // czy "rażone" pole nie jest poza szachownicą (w pionie)
        if ((this.y + 1) <= 7) {                                                                                  // żeby nie szukać poza szachownicą (w poziomie)
          if (board[this.x + 1 * isSideWhite][this.y + 1]) {                                                      // jeśli coś stoi...
            if (board[this.x + 1 * isSideWhite][this.y + 1].side == ((isSideWhite === 1) ? 'white' : 'black')) {  // to czy jest odmiennego koloru
              possibleMoves.push(`${this.x + 1 * isSideWhite},${this.y + 1}`);
            }
          }
        }
        if ((this.y - 1) >= 0) {                                                                                  // żeby nie szukać poza szachownicą (w poziomie)
          if (board[this.x + 1 * isSideWhite][this.y - 1]) {                                                      // jeśli coś stoi...
            if (board[this.x + 1 * isSideWhite][this.y - 1].side == ((isSideWhite === 1) ? 'white' : 'black')) {  // to czy jest odmiennego koloru
              possibleMoves.push(`${this.x + 1 * isSideWhite},${this.y - 1}`);                                    
            }
          }
        }
      }
        
    return possibleMoves;
  }
  
  promote() {}
  
  enPassant() {}

}

export default Pawn;
