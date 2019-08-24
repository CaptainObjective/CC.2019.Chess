// Moduł dodający obsługę historii posunięć (game reporting)
// w oparciu o "Portable Game Notation" (https://en.wikipedia.org/wiki/Portable_Game_Notation)

import board from './board';

class gameReportItem {
    constructor(pbrd, cbrd, side, piece, from, to, capt = false, promo = '') {
      this.prevBrd = pbrd;      // stan szachownicy przed posunięciem
      this.currBrd = cbrd;      // stan szachownicy po posunięciu
      this.side = side;         // 'black' or 'white'
      this.piece = piece;       // poruszona bierka
      this.from = from;         // pole wyjściowe wykonanego ruchu (indeksy `board`, np. '6,4')
      this.to = to;             // pole docelowe wykonanego ruchu (indeksy `board`, j.w.)
      this.capture = capt;      // czy bicie?
      this.pawnPromoTo = promo  // pion promowany na..., w przeciwnym razie ''
    }
}

export let gameReport = [];    // tablica gromadząca obiekty o danych każdego posunięcia

let currBoardState = [];  // globalna zmienna przechowująca OBECNY stan szachownicy
let prevBoardState = [];  // globalna zmienna przechowująca POPRZEDNI (przed pozunięciem) stan szachownicy

export function reportSaveState(brd) {
    prevBoardState = JSON.parse(JSON.stringify(currBoardState, null, 3));
    currBoardState = JSON.parse(JSON.stringify(brd, null, 3));
};

export function reportSaveMove(side, piece, coorFrom, coorTo, isCapture) {
    reportSaveState(board);
    gameReport.push(new gameReportItem(prevBoardState, currBoardState, side, piece, coor2nota(coorFrom), coor2nota(coorTo), isCapture));
// console.log('Prev: ', prevBoardState, 'Curr: ', currBoardState);
// console.log(gameReport[gameReport.length - 1]);
    let el = document.getElementsByClassName('pre-scrollable')[0];
    if (el) { el.innerHTML += gameReport.length + '. ' + notation(gameReport.length - 1) + '<br />'; }
}

function coor2nota(coor) {                              // zmiana współrzędnych `board` na notację szachową i odwrotnie
    if (/([0-7],[0-7])|([a-g][1-8])/i.test(coor)) {
        const rprtRows = ['8','7','6','5','4','3','2','1'];
        const rprtCols = ['a','b','c','d','e','f','g','h'];
        if (coor[1] === ',') {
            return `${rprtCols[coor[2]]}${rprtRows[coor[0]]}`;
        } else {
            return `${rprtRows.indexOf(coor[1])},${rprtCols.indexOf(coor[0])}`;
        }
    } else {
        console.log('Coś nie tak z parametrem `coor`: ' + coor);
    }
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