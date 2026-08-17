const gameBoard = (function(){
    let board=["","","","","","","","",""];
    
    function updateState(index,choice){
        board[index]=choice;
    }

    function getBoard(){
        
        return board;
    }
    function getcellStatus(index){
        return board[index];
    }
    return {
    updateState,
    getBoard,
    getcellStatus
}
})(); //IIFE to intiate a single game board


function createUser(name,marker) //factory for creating users
{
    return {name,marker};
}











let gameControl= (
function(){
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
  
    let gameOver=false;
    
    function playGame(player1,player2){
        let currentPlayer=player2;
        let board=document.querySelector(".board");
        while(!gameOver){  
            board.addEventListener("click",(event) => displayController.renderBoard(event,currentPlayer.marker));
            
            if (gameBoard.getcellStatus(choice) !== ""){
                console.log("cell already occupied");
                continue;
            }

            console.log(`${currentPlayer.name} marked ${currentPlayer.marker} at ${choice} `);
            gameBoard.updateState(choice,currentPlayer.marker);
            
            if(checkWin(gameBoard.getBoard())){
                gameOver=true;
                console.log(`${currentPlayer.name} is the winner.`)
            }
            else if(checkDraw()){
                gameOver=true;
                console.log(`It's draw!`);
                
            }
            else{
                currentPlayer=currentPlayer===player1?player2:player1;
            }
        }
    }

    function checkWin() {
    const board = gameBoard.getBoard();

    return winCombination.some(combination => {
        const [a, b, c] = combination;

        return (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[a] === board[c]
        );
    });
    }
    
    function checkDraw() {
    
        return gameBoard.getBoard().every(cell => cell !== "");
    
    }


    return {playGame};
}

)();

const playButton = document.querySelector(".play");

playButton.addEventListener("click", () => {
    let main=document.querySelector(".main");
    main.style.display="flex";
    const player1 = createUser("bob", "o");
    const player2 = createUser("rob", "x");

    gameControl.playGame(player1, player2);
});



const displayController = (() => {
    
    function renderBoard(event,playerMarker ) {
        let cell=document.querySelector(".cell");
        event.target.textContent=playerMarker;
        // update DOM
    }


    return {
        renderBoard,    };
})();