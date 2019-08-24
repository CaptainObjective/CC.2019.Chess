import Piece from './piece';
import board from '../board';
import Queen from './queen';
import Bishop from './bishop';
import Knight from './knight';
import Rook from './rook';
import {gameReport, reloadReport} from '../reporting';

export function addPromoChoice() {
  let el;
  let pi = ['queen', 'bishop', 'knight', 'rook']

  el = document.createElement('div');
  el.className = 'promoChoice';
  el.id = "proCho";
  document.getElementById("wrapper").appendChild(el);
  
  el = document.createElement('ul');
  el.className = 'promoChoiceList';
  el.id = 'proChoList';
  document.getElementById("proCho").appendChild(el);
  
  for (let i = 0; i < pi.length; i++) {
    el = document.createElement('li');
    el.className = 'square';
    el.id = `proCho-${pi[i]}`;
    document.getElementById("proChoList").appendChild(el);
    
    el = document.createElement('i');
    el.className = `fas fa-chess-${pi[i]} black promoChoiceItem`;
    document.getElementById(`proCho-${pi[i]}`).appendChild(el);  
  }
  document.querySelector('.promoChoiceList').style.display = 'none';
}

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
  
  move(id) {
    super.move(id);
    //does pawn promotion occur?
    if (this.x === 0 || this.x === 7) {
      this.promote(id);
    }
  }
  
  promote(id) {
    document.querySelector('.promoChoiceList').style.display = '';
    let list = document.querySelectorAll('.promoChoiceList i');
    list.forEach( (val, ind, obj) => {
      let pi = /(queen|knight|bishop|rook)/.exec(obj[ind].className)[0];  // niby ma zwrócić string, a zwraca dwuelementowy array...
      list[ind].addEventListener('click', e => { this.promoTouched(pi); });
    })
  }

  promoTouched(piece) {
    let el;
    //clearing previous place
    board[this.x][this.y] = null;
    document.getElementById(`${this.x},${this.y}`).innerHTML = '';

    //setting new
    switch (piece) {
      case 'queen':
        board[this.x][this.y] = new Queen(this.x, this.y, this.side);
        break;
      case 'bishop':
        board[this.x][this.y] = new Bishop(this.x, this.y, this.side);
        break;
      case 'knight':
        board[this.x][this.y] = new Knight(this.x, this.y, this.side);
        break;
      case 'rook':
        board[this.x][this.y] = new Rook(this.x, this.y, this.side);
        break;
    }
    document.getElementById(`${this.x},${this.y}`).innerHTML = board[this.x][this.y].display;

    gameReport[gameReport.length - 1].pawnPromoTo = piece[0].toUpperCase(); // dodanie do ostatniej pozycji w `gameReport` informacji o wyboranej figurze (promocja)
    reloadReport();

    document.querySelector('.promoChoiceList').style.display = 'none';  
  }
  
  enPassant() {}

}

export default Pawn;
