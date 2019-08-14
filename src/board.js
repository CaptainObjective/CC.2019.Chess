import Pawn from './pieces/pawn';
import Knight from './pieces/knight';
import King from './pieces/king';

const board = new Array(8);
for (let i = 0; i < 8; i++) {
  board[i] = new Array(8);
}
//mamy pustą tablice tu trzeba zaimportować figury wedle przykładu dla pionka
let pawn = new Pawn(6, 0, 'white');
board[pawn.x][pawn.y] = pawn;
pawn = new Pawn(6, 1, 'white');
board[pawn.x][pawn.y] = pawn;
let knight = new Knight(0 , 1 , 'black');
board[knight.x][knight.y] = knight;
knight = new Knight(0 , 6 , 'black');
board[knight.x][knight.y] = knight;
knight = new Knight(7 , 1 , 'white');
board[knight.x][knight.y] = knight;
knight = new Knight(7 , 6 , 'white');
board[knight.x][knight.y] = knight;

let king = new King(0, 4, 'black');
board[king.x][king.y] = king;
king = new King(7, 4, 'white');
board[king.x][king.y] = king;

export default board;
