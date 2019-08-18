import board from './board';


let possibleMoves =[];
let currentColor = 'white';
// chosen piece coordinates
let x = '';
let y = '';

const resetCoordinates = () => {
  x = '';
  y = '';
};

const unmarkPossMoves = (arr) => {
  arr.forEach( id => {
    document.getElementById(id).className = document
      .getElementById(id)
      .className.replace(`possibleMove`, '');

    // TODO: rozwiązać tematykę event listenerów sprytniej, przenosząc każdy do osobnego pliku
    let old_element = document.getElementById(id);
    let new_element = old_element.cloneNode(true);
    old_element.parentNode.replaceChild(new_element, old_element);
  });
}


const touched = e => {
  // if not yet chosen - calculate x and y coordinates of a piece to move
  if (!x || !y)   {
    // get the field ID depending if square or icon is clicked
    const getSquareID = e.target.tagName === 'I' ? e.target.parentNode.id: e.target.id;
    x = getSquareID[0];
    y = getSquareID[2];
    
    // return if square is empty or if player tried to move wrong side
    if (!board[x][y] || board[x][y].side !== currentColor) {
      resetCoordinates();
      return;
    }
    // get possible moves and mark squares on board, if no moves: return
    possibleMoves = board[x][y].findLegalMoves();
    if (possibleMoves.length === 0) {
      resetCoordinates();
      return
    };
    for (let el of possibleMoves) {
      document.getElementById(el).className += ` possibleMove`;
    }
  } 
  // the piece already chosen, player to decide where to move
  else {
    const chosenMove = e.target.tagName === 'I'? e.target.parentNode.id: e.target.id;
    // proceed only if the move is legal, change the side
    if (possibleMoves.includes(chosenMove)) {
      board[x][y].move(chosenMove);
      currentColor === 'white' ? currentColor = 'black': currentColor = 'white';
    }; 
    unmarkPossMoves(possibleMoves);
    resetCoordinates();
  }  
};

export default touched;
