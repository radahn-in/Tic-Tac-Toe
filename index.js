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

  const checkWinner = () => {
    let board = GameBoard.getBoard();
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let i = 0; i < winPatterns.length; i++) {
      const [a, b, c] = winPatterns[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return board.includes("") ? null : "draw"; //returns 'draw' if board is full
  }
  return { getCurrentPlayer, playRound, checkWinner };
})();

console.log(GameBoard.getBoard());
displayController.playRound(0);
console.log(GameBoard.getBoard());
console.log(displayController.checkWinner())
