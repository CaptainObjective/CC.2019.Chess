import board from '../board';

function cordToPosition(x, y) {
  return `${x},${y}`;
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

function findLegalMovesLine(line, side) {
  const isMoveOnPieceDeferred = liftStopOnFirstDeferred(isMoveOnPiece);
  const filterFn = (x, y) => isMoveOutOfBoard(x, y) || isMoveOnOwnPiece(side, x, y) || isMoveOnPieceDeferred(x, y);
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
      for (let move of el.findLegalMoves(true)) {
        opponentMoves.add(move);
      }
    }
  }
  return opponentMoves;
}

export {
  cordToPosition,
  liftStopOnFirst,
  liftStopOnFirstDeferred,
  fMap,
  filterToPosition,
  isMoveOutOfBoard,
  isMoveOnPiece,
  isMoveOnOwnPiece,
  findLegalMovesLine,
  createGenerateLine,
  iterateBoard,
  generateOpponentMoves,
};
