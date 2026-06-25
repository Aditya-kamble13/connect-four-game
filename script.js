const ROWS = 6;
const COLS = 7;

let board = [];
let currentPlayer = "red";
let gameOver = false;

const boardDiv = document.getElementById("board");
const statusText = document.getElementById("status");

function createBoard() {
    board = Array.from({ length: ROWS }, () =>
        Array(COLS).fill("")
    );

    boardDiv.innerHTML = "";

    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {

            const cell = document.createElement("div");
            cell.classList.add("cell");

            cell.dataset.row = row;
            cell.dataset.col = col;

            cell.addEventListener("click", () => dropPiece(col));

            boardDiv.appendChild(cell);
        }
    }
}

function dropPiece(col) {

    if (gameOver) return;

    for (let row = ROWS - 1; row >= 0; row--) {

        if (board[row][col] === "") {

            board[row][col] = currentPlayer;

            updateBoard();

            if (checkWinner(row, col)) {
                statusText.innerText =
                    currentPlayer.toUpperCase() + " WINS!";
                gameOver = true;
                return;
            }

            currentPlayer =
                currentPlayer === "red" ? "yellow" : "red";

            statusText.innerText =
                currentPlayer.toUpperCase() + "'s Turn";

            return;
        }
    }
}

function updateBoard() {

    const cells = document.querySelectorAll(".cell");

    cells.forEach(cell => {

        let row = cell.dataset.row;
        let col = cell.dataset.col;

        cell.classList.remove("red", "yellow");

        if (board[row][col]) {
            cell.classList.add(board[row][col]);
        }
    });
}

function checkWinner(row, col) {

    const player = board[row][col];

    const directions = [
        [0,1],
        [1,0],
        [1,1],
        [1,-1]
    ];

    for (let [dr, dc] of directions) {

        let count = 1;

        count += countDirection(row,col,dr,dc,player);
        count += countDirection(row,col,-dr,-dc,player);

        if (count >= 4) return true;
    }

    return false;
}

function countDirection(row,col,dr,dc,player){

    let count = 0;

    let r = row + dr;
    let c = col + dc;

    while(
        r >= 0 &&
        r < ROWS &&
        c >= 0 &&
        c < COLS &&
        board[r][c] === player
    ){
        count++;
        r += dr;
        c += dc;
    }

    return count;
}

function resetGame(){
    currentPlayer = "red";
    gameOver = false;
    statusText.innerText = "Red's Turn";
    createBoard();
}

createBoard();