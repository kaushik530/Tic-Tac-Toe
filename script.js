const gameBoard = (function(){    

    
    function updateBoard(event,playerMarker ) {
        let cell=document.querySelector(".cell");
        event.textContent=playerMarker;
        // update DOM
    }
    function getcellStatus(index){
        return board[index];
    }

    function resetBoard() {
    const cells = document.querySelectorAll(".cell");

    cells.forEach(cell => {
        cell.textContent = "";
    });
    }
    
    return {
    updateBoard,
    getcellStatus,
    resetBoard

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
        let choice="";

            board.addEventListener("click",(event) => {
            
                choice=event.target;
            
            if (choice.textContent===""){
            
            console.log(`${currentPlayer.name} marked ${currentPlayer.marker} at ${choice.dataset.index} `);
            gameBoard.updateBoard(choice,currentPlayer.marker);
            
            }
            if(checkWin()){
                gameBoard.resetBoard();
                console.log(`${currentPlayer.name} is the winner.`)
            }
            else if(checkDraw()){
                gameBoard.resetBoard();
                console.log(`It's draw!`);
                
            }
            else{
                currentPlayer=currentPlayer===player1?player2:player1;
            }
                });
    }

    function checkWin() {
    const cells = document.querySelectorAll(".cell");

    return winCombination.some(combination => {
        const [a, b, c] = combination;

        return (
            cells[a].textContent !== "" &&
            cells[a].textContent === cells[b].textContent &&
            cells[a].textContent === cells[c].textContent
        );
    });
    }
    
    function checkDraw() {
        const cells = document.querySelectorAll(".cell");
    
        return [...cells].every(cell => cell.textContent !== "");
    
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