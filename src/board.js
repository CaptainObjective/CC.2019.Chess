import Pawn from './pieces/pawn';
import Rook from './pieces/rook';
import Bishop from './pieces/bishop';
import Knight from './pieces/knight';
import King from './pieces/king';
import Queen from './pieces/queen';
import {rprtSaveState, toggleReport} from './reporting';


const board = new Array(8);
for (let i = 0; i < 8; i++) {
  board[i] = new Array(8);
}

//mamy pustą tablice tu trzeba zaimportować figury wedle przykładu dla pionka
let pawn;
for (let i = 0; i < 8; i++) {
  pawn = new Pawn(6, i, 'white');
  board[pawn.x][pawn.y] = pawn;
  pawn = new Pawn(1, i, 'black');
  board[pawn.x][pawn.y] = pawn;
}
// MareK: pionki ustawione
let knight = new Knight(0, 1, 'black');
board[knight.x][knight.y] = knight;
knight = new Knight(0, 6, 'black');
board[knight.x][knight.y] = knight;
knight = new Knight(7, 1, 'white');
board[knight.x][knight.y] = knight;
knight = new Knight(7, 6, 'white');
board[knight.x][knight.y] = knight;

const blackKing = new King(0, 4, 'black');
board[blackKing.x][blackKing.y] = blackKing;
const whiteKing = new King(7, 4, 'white');
board[whiteKing.x][whiteKing.y] = whiteKing;

let queen = new Queen(0, 3, 'black');
board[queen.x][queen.y] = queen;
queen = new Queen(7, 3, 'white');
board[queen.x][queen.y] = queen;

let rook = new Rook(0, 0, 'black');
board[rook.x][rook.y] = rook;
rook = new Rook(0, 7, 'black');
board[rook.x][rook.y] = rook;

rook = new Rook(7, 0, 'white');
board[rook.x][rook.y] = rook;
rook = new Rook(7, 7, 'white');
board[rook.x][rook.y] = rook;

let bishop = new Bishop(0, 2, 'black');
board[bishop.x][bishop.y] = bishop;
bishop = new Bishop(0, 5, 'black');
board[bishop.x][bishop.y] = bishop;

bishop = new Bishop(7, 2, 'white');
board[bishop.x][bishop.y] = bishop;
bishop = new Bishop(7, 5, 'white');
board[bishop.x][bishop.y] = bishop;

rprtSaveState(board);             //zapisuje stan szachownicy - na potrzeby `gameReport`
document.onkeyup = toggleReport;  // dodaje do aplikacji obsługę Alt+L: okno raportu

export default board;
export { blackKing, whiteKing };
