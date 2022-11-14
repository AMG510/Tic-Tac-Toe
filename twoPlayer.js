let playerOneName = prompt('Enter Player 1 name:');
let playerTwoName = prompt('Enter Player 2 name:');
let name1 = document.querySelector('#p1Name');
name1.textContent = playerOneName;
let name2 = document.querySelector('#p2Name');
name2.textContent = playerTwoName;
let goesFirst = document.querySelector('#first');

let whoGoesFirst = [
    playerOneName,
    playerTwoName,
    ];
let randomName = whoGoesFirst[Math. floor(Math. random()*whoGoesFirst. length)];
goesFirst.textContent = randomName + ' goes first & is X.';

let statusDisplay = document.querySelector('.displayMessage');

let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winningMessage = () => 'Player '+ currentPlayer + ' has won!';
const tieMessage = () => 'Game is a tie!';
const currentPlayerTurn = () => currentPlayer +' turn';

statusDisplay.innerHTML = currentPlayerTurn();

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
/* function that checks if cell has been clicked */
function checkCell(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    ChosenCell(clickedCell, clickedCellIndex);
    checkGame(); 
}
/* function that picks the current player cell */
function ChosenCell(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}
/* write a function that switches to nect player */
function nextPlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}
/* write a function that checks winning conditions*/ 
function checkGame() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        let winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }

    let roundDraw = !gameState.includes(""); 
    if (roundDraw) {
        statusDisplay.innerHTML = tieMessage();
        gameActive = false;
        return;
    }

    nextPlayer();
}
/* write a function that restarts game */
function RestartGame() {
    /*location.reload();*/
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = ""); /* empty cell */
}


document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', checkCell));
document.querySelector('.restart').addEventListener('click', RestartGame);