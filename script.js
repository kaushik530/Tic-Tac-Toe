const gameBoard = (function () {

    function updateBoard(mark, playerMarker) {
        mark.textContent = playerMarker;
    }

    function resetBoard() {
        const display = document.querySelector(".display");
        const marks = document.querySelectorAll(".mark");
        const lines = document.querySelectorAll(".line");

        display.textContent = "";

        marks.forEach(mark => {
            mark.textContent = "";
        });

        lines.forEach(line => {
            line.classList.remove("show");
        });
    }

    return {
        updateBoard,
        resetBoard
    };

})();


function createUser(name, marker) {
    return {
        name,
        marker
    };
}


const gameControl = (function () {

    const winCombination = [
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

    const board = document.querySelector(".board");

    let player1;
    let player2;
    let currentPlayer;

    let gameStarted = false;
    let gameOver = false;
    let vsBot = false;


    function playGame(p1, p2, botMode = false) {

        if (gameStarted) {
            return;
        }

        player1 = p1;
        player2 = p2;

        vsBot = botMode;
        currentPlayer = player1;

        gameStarted = true;
        gameOver = false;
    }


    function handleMove(event) {

        const cell = event.target.closest(".cell");

        if (
            !cell ||
            !gameStarted ||
            gameOver ||
            (vsBot && currentPlayer === player2)
        ) {
            return;
        }

        const mark = cell.querySelector(".mark");

        if (mark.textContent !== "") {
            return;
        }

        gameBoard.updateBoard(
            mark,
            currentPlayer.marker
        );

        const winIndex = checkWin();

        if (winIndex !== -1) {
            showWinner(winIndex);
            return;
        }

        if (checkDraw()) {
            showDraw();
            return;
        }

        switchPlayer();

        if (vsBot) {
            botMove();
        }
    }


    function botMove() {

        const cells = document.querySelectorAll(".cell");

        const emptyCells = [...cells].filter(cell => {
            return cell.querySelector(".mark").textContent === "";
        });

        const randomIndex = Math.floor(
            Math.random() * emptyCells.length
        );

        const cell = emptyCells[randomIndex];
        const mark = cell.querySelector(".mark");

        gameBoard.updateBoard(
            mark,
            currentPlayer.marker
        );

        const winIndex = checkWin();

        if (winIndex !== -1) {
            showWinner(winIndex);
            return;
        }

        if (checkDraw()) {
            showDraw();
            return;
        }

        switchPlayer();
    }


    function switchPlayer() {

        currentPlayer =
            currentPlayer === player1
                ? player2
                : player1;
    }


    function checkWin() {

        const cells = document.querySelectorAll(".cell");

        return winCombination.findIndex(combination => {

            const [a, b, c] = combination;

            const markA =
                cells[a].querySelector(".mark").textContent;

            const markB =
                cells[b].querySelector(".mark").textContent;

            const markC =
                cells[c].querySelector(".mark").textContent;

            return (
                markA !== "" &&
                markA === markB &&
                markA === markC
            );
        });
    }


    function checkDraw() {

        const marks = document.querySelectorAll(".mark");

        return [...marks].every(mark => {
            return mark.textContent !== "";
        });
    }


    function showWinner(winIndex) {

        const line = document.querySelector(
            `.${lineNames[winIndex]}`
        );

        line.classList.add("show");

        document.querySelector(".display").textContent =
            `${currentPlayer.name} is the winner.`;

        gameOver = true;
    }


    function showDraw() {

        document.querySelector(".display").textContent =
            "It's a draw.";

        gameOver = true;
    }


    function resetGame() {

        gameBoard.resetBoard();

        player1 = null;
        player2 = null;
        currentPlayer = null;

        gameStarted = false;
        gameOver = false;
        vsBot = false;
    }


    board.addEventListener("click", handleMove);


    return {
        playGame,
        resetGame
    };

})();


(function () {

    const playButton = document.querySelector(".play");
    const resetButton = document.querySelector(".reset");

    const nameSection = document.querySelector(".name-section");
    const namesSubmit = document.querySelector(".names-submit");

    const gameMode = document.querySelector(".game-mode");

    const playerModeButton = document.querySelector(".player-mode");
    const botModeButton = document.querySelector(".bot-mode");

    const player1Name = document.querySelector(".player1-name");
    const player2Name = document.querySelector(".player2-name");

    let selectedMode = false;
    let player1;
    let player2;


    playButton.addEventListener("click", () => {

        playButton.classList.add("hidden");

        document.querySelector(".display").textContent =
            "Enter player names";

        nameSection.classList.add("active");
    });


    namesSubmit.addEventListener("click", () => {

        if (
            player1Name.value.trim() === "" ||
            player2Name.value.trim() === ""
        ) {
            document.querySelector(".display").textContent =
                "Please enter both names.";

            return;
        }

        player1 = createUser(
            player1Name.value.trim(),
            "o"
        );

        player2 = createUser(
            player2Name.value.trim(),
            "x"
        );

        nameSection.classList.remove("active");

        document.querySelector(".display").textContent =
            "Choose game mode";

        gameMode.classList.add("active");
    });


    playerModeButton.addEventListener("click", () => {

        selectedMode = false;

        playerModeButton.classList.add("selected");
        botModeButton.classList.remove("selected");

        gameMode.classList.remove("active");

        document.querySelector(".display").textContent =
            "Game started";

        gameControl.playGame(
            player1,
            player2,
            selectedMode
        );
    });


    botModeButton.addEventListener("click", () => {

        selectedMode = true;

        playerModeButton.classList.remove("selected");
        botModeButton.classList.add("selected");

        player2 = createUser("Computer", "x");

        gameMode.classList.remove("active");

        document.querySelector(".display").textContent =
            "Game started";

        gameControl.playGame(
            player1,
            player2,
            selectedMode
        );
    });


    resetButton.addEventListener("click", () => {

        gameControl.resetGame();

        nameSection.classList.remove("active");
        gameMode.classList.remove("active");

        playButton.classList.remove("hidden");

        playerModeButton.classList.remove("selected");
        botModeButton.classList.remove("selected");

        player1Name.value = "";
        player2Name.value = "";
    });

})();