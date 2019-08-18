// Moduł dodający obsługę posunięć (game reporting)
// w oparciu o "Portable Game Notation" (https://en.wikipedia.org/wiki/Portable_Game_Notation)

// import board from './board'

class gameRprtItem {
    constructor(pbrd, cbrd, side, piece, from, to, capt = false, promo = '') {
      this.prevBrd = pbrd;   // stan szachownicy przed posunięciem
      this.currBrd = cbrd;   // stan szachownicy po posunięciu
      this.side = side; // 'black' or 'white'
      this.piece = piece;   // poruszona bierka
      this.from = from;     // pole wyjściowe wykonanego ruchu (indeksy `board`, np. '6,4')
      this.to = to;         // pole docelowe wykonanego ruchu (indeksy `board`, j.w.)
      this.capture = capt;  // czy bicie?
      this.pawnPromoTo = promo // pion promowany na..., w przeciwnym razie ''
    }
}

export let gameReport = [];    // tablica gromadząca obiekty o danych każdego posunięcia

let currBrdState = [];  // globalna zmienna przechowująca OBECNY stan szachownicy
let prevBrdState = [];  // globalna zmienna przechowująca POPRZEDNI (przed pozunięciem) stan szachownicy

export function rprtSaveState(brd) {
    prevBrdState = currBrdState.slice();
    currBrdState = brd.slice().map( el => el.slice() );
    for (let i = 0; i < currBrdState.length; i++) {
        currBrdState[i] = currBrdState[i].map( el => Object.assign({}, el) ).slice();
    }
};

export function rprtSaveMvmnt(side, piece, coorFrom, coorTo, isCapture) {
    gameReport.push(new gameRprtItem(prevBrdState, currBrdState, side, piece, coor2nota(coorFrom), coor2nota(coorTo), isCapture));
    // gameReport.forEach( (value, index) => console.log((index + 1) + '. ' + notation(index)) ); // wyświetlenie całego znotyfikowanego raportu gry
    // console.log(gameReport.length + '. ' + notation(gameReport.length - 1)); // wyświetlenie ostatniego wpisu znotyfikowanego raportu gry
    let el = document.getElementsByClassName('pre-scrollable')[0];
    if (el) { el.innerHTML += gameReport.length + '. ' + notation(gameReport.length - 1) + '<br />'; }
}

function coor2nota(coor) {                              // zmiana współrzędnych `board` na notację szachową
    const rprtRows = [8,7,6,5,4,3,2,1];
    const rprtCols = ['a','b','c','d','e','f','g', 'h'];
    return `${rprtCols[coor[2]]}${rprtRows[coor[0]]}`;
};

export function notation(id) {
    let piece = gameReport[id].piece;
    let to = gameReport[id].to;
    let capture = gameReport[id].capture;
    let promo = gameReport[id].pawnPromoTo;
    let abbr = '';
    if (piece !== 'pawn') {
        abbr = (piece === 'knight') ? 'N' : piece.replace('pawn', '')[0].toUpperCase();
    }
    return abbr + ( (capture) ? 'x' : '' )  + to + ( (promo) ? `=${promo}` : '' );
}

export function toggleReport(e) {
    if (e.altKey && ('l' || 'L')) { // Alt+L: przełącza okienko raportu
        const id = 'gameRprt';
        let parent;
        let child;
        let el;
        parent = document.getElementById('wrapper');
        let childId = parent.firstElementChild.id;
        if (childId !== id) {
            child = document.createElement('div');
            child.id = id;
            child.className = 'rprt';
            child.innerHTML = '<h3>Raport</h3><pre class="pre-scrollable"></pre>';
            parent.className = parent.className.replace('container', '') + ' container';
            parent.className = parent.className.trim();
            parent.insertBefore(child, parent.childNodes[0]);
            reloadReport(); // po pokazaniu okna raportu zawsze wypełnia wszystkimi zapisami
        } else {
            parent = document.getElementById(id).parentElement;
            parent.className = parent.className.replace('container', '');
            parent.className = parent.className.trim();
            parent.removeChild(parent.firstChild);
        }
    }
    
}

export function reloadReport() { // odświeżenie raportu (usunięcie wszystkich i wyświetlenie wszystkich zapisów od nowa)
    let el = document.getElementsByClassName('pre-scrollable')[0];
    if (el) {
      el.innerHTML = '';
      for (let i = 0; i < gameReport.length; i++) {
        el.innerHTML += (i + 1) + '. ' + notation(i) + '<br />';
      } 
    }
}