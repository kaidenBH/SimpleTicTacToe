let board = new Array(15).fill(0).map(() => new Array(15).fill(" "));
let machine; 
let human;
let turn = true;
let difficulty;
const player = (player,tagname) =>{
    return {player,tagname};
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
function appendAllChildNodes() {
    let brd = document.querySelector(".gameBoard");
    for(let i = 0; i < board.length; i++) {
        for(let j = 0; j < board[i].length; j++) {
            let cell = document.createElement("div");
            cell.textContent = board[i][j];
            cell.classList.add('cell');
            if (board[i][j]===human.tagname) {
                cell.classList.add('player');
            }
            else if (board[i][j]===machine.tagname) {
                cell.classList.add('enemy');
            }
            else{
                cell.addEventListener("click", makeMove);
            }
            brd.appendChild(cell);
        }
    }
}
function StartGame(){
    board = new Array(15).fill(0).map(() => new Array(15).fill(" "));
    const gameBoard = document.querySelector('.gameBoard');
    removeAllChildNodes(gameBoard);
    let playertag = document.querySelector('input[name="player"]:checked').value;
    let diff =  document.getElementById("difficulty").value;
    difficulty = diff;
    human = player('human', playertag);
    if (playertag==='X'){
        machine = player('machine', 'O');
    }
    else{
        machine = player('machine', 'X');
    }
    appendAllChildNodes();
    let mainmenu = document.querySelector('.mainMenu');
    mainmenu.classList.add("hidden");
    let result = document.querySelector('.result');
    result.classList.add("hidden");
    let currentgame = document.querySelector('.game');
    currentgame.classList.remove("hidden");
}
function machineMove(){
    let randrow = Math.floor(Math.random() * 14);
    let randcol = Math.floor(Math.random() * 14);
    while(board[randrow][randcol]!==" "){
        randrow = Math.floor(Math.random() * 14);
        randcol = Math.floor(Math.random() * 14);
    }
    board[randrow][randcol] = machine.tagname;
       
    TestWinner(machine);
    turn = true;
}
function makeMove(){
    if(turn){
        let parent = this.parentNode;
        let index = Array.prototype.indexOf.call(parent.children, this);
        for(let i = 0; i < board.length; i++) {
            for(let j = 0; j < board[i].length; j++) {
                if(i*15+j === index){
                    board[i][j] = human.tagname;
                }
            }
        }
    }
    TestWinner(human);
    turn = false;
    machineMove();
    const gameBoard = document.querySelector('.gameBoard');
    removeAllChildNodes(gameBoard);
    appendAllChildNodes();
}
function TestWinner(winer){
    if(hasFiveInARow(winer.tagname)){
        RetryGame();
        let result = document.querySelector('.result');
        if (winer.player==='human'){
            result.textContent = "You have Won!";
            result.classList.add("player");
        }
        else{
            result.textContent = "Computer has Won!";
            result.classList.add("enemy");
        }
        result.classList.remove("hidden");
    }
}

function hasFiveInARow(char) {
    // Check rows
    for (let i = 0; i < board.length; i++) {
      let count = 0;
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === char) {
          count++;
          if (count === 5) {
            return true;
          }
        } else {
          count = 0;
        }
      }
    }
    
    // Check columns
    for (let i = 0; i < board[0].length; i++) {
      let count = 0;
      for (let j = 0; j < board.length; j++) {
        if (board[j][i] === char) {
          count++;
          if (count === 5) {
            return true;
          }
        } else {
          count = 0;
        }
      }
    }
    
    // Check diagonals
    for (let i = 0; i < board.length - 4; i++) {
      for (let j = 0; j < board[i].length - 4; j++) {
        if (
          board[i][j] === char &&
          board[i+1][j+1] === char &&
          board[i+2][j+2] === char &&
          board[i+3][j+3] === char &&
          board[i+4][j+4] === char
        ) {
          return true;
        }
        if (
          board[i][j+4] === char &&
          board[i+1][j+3] === char &&
          board[i+2][j+2] === char &&
          board[i+3][j+1] === char &&
          board[i+4][j] === char
        ) {
          return true;
        }
      }
    }
    
    // If no 5 in a row found, return false
    return false;
}

function RetryGame(){
    let currentgame = document.querySelector('.game');
    currentgame.classList.add("hidden");
    let mainmenu = document.querySelector('.mainMenu');
    mainmenu.classList.remove("hidden");
}

