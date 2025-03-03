const GameBoard = (function() {
  let board = ["", "", "", "", "", "", "", "", ""]

  const getBoard = () => board;
  const placeMarker = (index, marker) => {
    if (board[index] === "") {
      board[index] = marker;
      return true;
    }
    return false;
  }
  const resetBoard = () => {
    board = ["", "", "", "", "", "", "", "", ""];
  }
  return { getBoard, placeMarker, resetBoard }
})();

const Player = (name, marker) => {
  return { name, marker };
}

const displayController = (function() {
  const player1 = Player("Player 1", "X")
  const player2 = Player("Player 2", "O")
  let currentPlayer = player1;

  const swtichTrurn = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };

  const getCurrentPlayer = () => currentPlayer;

  const playRound = (index) => {
    if (GameBoard.placeMarker(index, currentPlayer.marker)) {
      swtichTrurn();
    }
  };
  return { getCurrentPlayer, playRound };
})();

console.log(GameBoard.getBoard());
displayController.playRound(0);
console.log(GameBoard.getBoard());
