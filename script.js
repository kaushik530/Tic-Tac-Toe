const gameBoard = (function () {

    function updateBoard(event, playerMarker) {
        let cell = document.querySelector(".cell");
        event.textContent = playerMarker;

        // update DOM

    }

    function getcellStatus(index) {
        return board[index];
    }

    function resetBoard() { //ui reset
    const display=document.querySelector(".display");
    const marks = document.querySelectorAll(".mark");
    const lines = document.querySelectorAll(".line");
    
    display.textContent="";
    marks.forEach(mark => {
        mark.textContent = "";
    });

    lines.forEach(line => {
        line.classList.remove("show");
    });
}

    return {
        updateBoard,
        getcellStatus,
        resetBoard
    };
})(); // IIFE to initiate a single game board


function createUser(name, marker) // factory for creating users
{
    return { name, marker };
}


let gameControl = (
    function () {

        let winCombination = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        const lineNames = [
            "row-0",
            "row-1",
            "row-2",
            "col-0",
            "col-1",
            "col-2",
            "diag-0",
            "diag-1"
        ];

        let gameOver = false;

        function resetGame() { // game logic reset
            gameOver = false;
            gameBoard.resetBoard();
        }

        function playGame(player1, player2) {

            let currentPlayer = player2;
            let board = document.querySelector(".board");
            let choice = "";

            board.addEventListener("click", (event) => {

                const cell = event.target.closest(".cell");

                if (!cell) {
                    return;
                }

                const choice = cell.querySelector(".mark");

                if (choice.textContent !== "" || gameOver) {
                    return;
                }

                gameBoard.updateBoard(choice, currentPlayer.marker);

                const winIndex = checkWin();

                if (winIndex !== -1) {
                    const line = document.querySelector(
                        `.${lineNames[winIndex]}`
                    );

                    line.classList.add("show");
                    gameOver = true;

                    document.querySelector(".display").textContent =
                        `${currentPlayer.name} is the winner.`;
                }
                else if (checkDraw()) {
                    gameOver = true;

                    document.querySelector(".display").textContent =
                        `It's a draw.`;
                }
                else {
                    currentPlayer =
                        currentPlayer === player1 ? player2 : player1;
                }
            });
        }
      

function checkWin() {
    const cells = document.querySelectorAll(".cell");

    return winCombination.findIndex(combination => {
        const [a, b, c] = combination;

        const markA = cells[a].querySelector(".mark").textContent;
        const markB = cells[b].querySelector(".mark").textContent;
        const markC = cells[c].querySelector(".mark").textContent;

        return (
            markA !== "" &&
            markA === markB &&
            markA === markC
        );
    });
}
        function checkDraw() {
            const cells = document.querySelectorAll(".cell");

            return [...cells].every(cell => cell.textContent !== "");
        }

        
return { playGame , resetGame};
    }
)();

(function() {
const playButton = document.querySelector(".play");
const resetButton = document.querySelector(".reset");



resetButton.addEventListener("click", () =>{
    gameControl.resetGame();
})

playButton.addEventListener("click", () => {

    let main = document.querySelector(".main");
    main.style.display = "flex";

    const player1 = createUser("bob", "o");
    const player2 = createUser("rob", "x");

    gameControl.playGame(player1, player2);

});
})();