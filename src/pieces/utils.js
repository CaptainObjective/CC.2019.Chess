import board, { whiteKing, blackKing } from '../board';

function cordToPosition(x, y) {
  return `${x},${y}`;
}

function positionToCord(pos) {
  return pos.split(',').map(x => Number(x));
}

function liftStopOnFirst(fn, stop = false) {
  return (...args) => stop || (stop = fn(...args));
}

function liftStopOnFirstDeferred(fn, stop = false) {
  return (...args) => stop || ((stop = fn(...args)), false);
}

function fMap(array, cb) {
  return [].concat(...array.map(cb));
}

function filterToPosition(array, cb) {
  return array.filter(([x, y]) => !cb(x, y)).map(([x, y]) => cordToPosition(x, y));
}

function isMoveOutOfBoard(x, y) {
  const isOutOfBoardRange = v => v < 0 || v > 7;
  return isOutOfBoardRange(x) || isOutOfBoardRange(y);
}

function isMoveOnPiece(x, y) {
  return !!board[x][y];
}

function isMoveOnOwnPiece(side, x, y) {
  return board[x][y] && board[x][y].side === side;
}

function isMoveOnOpponentPiece(side, x, y) {
  return board[x][y] && board[x][y].side !== side;
}

function findLegalMovesLine(line, piece) {
  const isMoveOnOpponentPieceDeferred = liftStopOnFirstDeferred(isMoveOnOpponentPiece);
  let filterFn = (x, y) =>
    isMoveOutOfBoard(x, y) || isMoveOnOwnPiece(piece.side, x, y) || isMoveOnOpponentPieceDeferred(x, y);
  const filterFnWithStop = liftStopOnFirst(filterFn);
  filterFn = (x, y) => filterFnWithStop(x, y) || isPieceMoveCheckmate(piece, x, y);
  return filterToPosition(line, filterFn);
}

function findAttackMovesLine(line) {
  const isMoveOnPieceDeferred = liftStopOnFirstDeferred(isMoveOnPiece);
  const filterFn = (x, y) => isMoveOutOfBoard(x, y) || isMoveOnPieceDeferred(x, y);
  return filterToPosition(line, liftStopOnFirst(filterFn));
}

function generateLine(x, y, thisX, thisY) {
  let xa = 0;
  let ya = 0;
  return [...Array(7)].map(() => [thisX + (xa += x), thisY + (ya += y)]);
}

function createGenerateLine(thisX, thisY) {
  return (x, y) => generateLine(x, y, thisX, thisY);
}

function* enumerate(array) {
  let i = 0;
  for (let el of array) {
    yield [el, i++];
  }
}

function* iterateBoard() {
  for (let [row, x] of enumerate(board)) {
    for (let [el, y] of enumerate(row)) {
      yield [el, x, y];
    }
  }
}

function generateOpponentMoves(side) {
  const opponentMoves = new Set();
  for (let [el] of iterateBoard()) {
    if (el && el.side !== side) {
      for (let move of el.findAttackMoves()) {
        opponentMoves.add(move);
      }
    }
  }
  return opponentMoves;
}

function generateLegalMoves(side) {
  const legalMoves = new Set();
  for (let [el] of iterateBoard()) {
    if (el && el.side === side) {
      for (let move of el.findLegalMoves()) {
        legalMoves.add(move);
      }
    }
  }
  return legalMoves;
}

function getKing(side) {
  return side === 'white' ? whiteKing : blackKing;
}

function swapPiece(piece, x, y) {
  const tmp = board[x][y];
  board[x][y] = piece;
  board[piece.x][piece.y] = null;
  return tmp;
}

function rollbackSwapPiece(piece, tmp, x, y) {
  board[piece.x][piece.y] = piece;
  board[x][y] = tmp;
}

function isPieceMoveCheckmate(piece, x, y) {
  const tmp = swapPiece(piece, x, y);
  const opponentMoves = generateOpponentMoves(piece.side);
  const king = getKing(piece.side);
  rollbackSwapPiece(piece, tmp, x, y);
  return opponentMoves.has(cordToPosition(king.x, king.y));
}

function isKingMoveCheckmate(king, x, y) {
  const tmp = swapPiece(king, x, y);
  const opponentMoves = generateOpponentMoves(king.side);
  rollbackSwapPiece(king, tmp, x, y);
  return opponentMoves.has(cordToPosition(x, y));
}

function isCheckmate(king) {
  return generateLegalMoves(king.side).size === 0;
}

export {
  cordToPosition,
  positionToCord,
  liftStopOnFirst,
  liftStopOnFirstDeferred,
  fMap,
  filterToPosition,
  isMoveOutOfBoard,
  isMoveOnPiece,
  isMoveOnOwnPiece,
  findLegalMovesLine,
  findAttackMovesLine,
  isPieceMoveCheckmate,
  isKingMoveCheckmate,
  isCheckmate,
  createGenerateLine,
  iterateBoard,
  generateOpponentMoves,
  generateLegalMoves,
};
