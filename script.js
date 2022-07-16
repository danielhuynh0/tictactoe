const PLAYER_X = 'X';
const PLAYER_O = 'O';

const WINNING_COMBOS = [ [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];

const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessageElement = document.getElementById('winningMessage');
const restartButton = document.getElementById('restartButton');
const winningMessageTextElement = document.getElementById('winningMessageText');
let X_turn = true;


const onCellClick = function(event) {
    let cell = event.target;
    let currentPlayer = X_turn ? PLAYER_X : PLAYER_O;

    if(!(cell.classList.contains(PLAYER_X) || cell.classList.contains(PLAYER_O)))
    {
        cell.classList.add(currentPlayer);
        cell.innerText = currentPlayer;
        if(checkWin(currentPlayer))
        {
            endGame(true, currentPlayer);
        }
        else if(draw())
        {
            endGame(false, currentPlayer);
        }
        else
        {
            X_turn = !(X_turn);
        }
    }
}

const checkWin = function(currentPlayer) {
    return WINNING_COMBOS.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentPlayer);
        })
    })
}

const endGame = function(hasWinner, winner) {
    if(hasWinner)
    {
        winningMessageTextElement.innerText = "PLAYER " + winner + " WINS!"; 
    }
    else
    {
        winningMessageTextElement.innerText = "IT WAS A DRAW!";
    }
}

function draw() {
	return [...cells].every(cell => {
		return cell.classList.contains(PLAYER_X) || cell.classList.contains(PLAYER_O);
	});
}

const start = function() {
    X_turn = true;
    cells.forEach(cell => {
        cell.classList.remove(PLAYER_X);
        cell.classList.remove(PLAYER_O);
        cell.innerText = "";
        cell.removeEventListener('click', onCellClick);
        cell.addEventListener('click', onCellClick);
    });
    winningMessageTextElement.innerText = "";
}

start();
restartButton.addEventListener('click', start);