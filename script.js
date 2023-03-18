let board = new Array(15).fill(0).map(() => new Array(15).fill(" "));
let machine; 
let human;

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
    let difficulty =  document.getElementById("difficulty").value;
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
    let currentgame = document.querySelector('.game');
    currentgame.classList.remove("hidden");
}
function machineMove(){

}
function makeMove(){
    let parent = this.parentNode;
    let index = Array.prototype.indexOf.call(parent.children, this);
    console.log(index);
    for(let i = 0; i < board.length; i++) {
        for(let j = 0; j < board[i].length; j++) {
            if(i*15+j === index){
                board[i][j] = human.tagname;
            }
        }
    }
    machineMove();
    const gameBoard = document.querySelector('.gameBoard');
    removeAllChildNodes(gameBoard);
    appendAllChildNodes();
}
function RetryGame(){
    let currentgame = document.querySelector('.game');
    currentgame.classList.add("hidden");
    let mainmenu = document.querySelector('.mainMenu');
    mainmenu.classList.remove("hidden");
}

