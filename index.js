const GameBoard = (function () {
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

const GameController = (function () {
  let player1 = Player("Player X", "X")
  let player2 = Player("Player O", "O")
  let currentPlayer = player1;

  const swtichTrun = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };

  const getCurrentPlayer = () => currentPlayer;

  const playRound = (index) => {
    if (GameBoard.placeMarker(index, currentPlayer.marker)) {
      const winner = checkWinner();
      if (winner) {
        RenderDisplay.showMessage(
          winner === "draw" ? "It's a draw!" : `${currentPlayer.name} wins!`
        );
        return
      }
      swtichTrun();
      RenderDisplay.updateScreen();
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
    return board.includes("") ? null : "draw";
  }
  const resetGame = () => {
    GameBoard.resetBoard();
    currentPlayer = player1;
    RenderDisplay.updateScreen();
  }

  const setPlayersName = (nameone, nametwo) => {
    player1 = Player(nameone || "Player X", "X")
    player2 = Player(nametwo || "Player O", "O")
    currentPlayer = player1;
    RenderDisplay.updateScreen();
  }

  return { getCurrentPlayer, playRound, checkWinner, resetGame, setPlayersName };
})();

const RenderDisplay = (function () {
  const game = GameController;
  const playerTurn = document.querySelector('.turn');
  const boardDiv = document.querySelector('.board');

  const updateScreen = () => {
    boardDiv.textContent = "";

    const board = GameBoard.getBoard();
    const currentPlayer = game.getCurrentPlayer();

    playerTurn.textContent = `${currentPlayer.name}'s turn...`
    board.forEach((cell, index) => {
      const cellElement = document.createElement("button");
      cellElement.classList.add("cell");
      cellElement.textContent = cell;

      if (cell !== "") {
        cellElement.classList.add("disabled")
      }
      cellElement.addEventListener("click", () => game.playRound(index));
      boardDiv.appendChild(cellElement)
    });
  };

  const showMessage = (message) => {
    playerTurn.textContent = message;
    document.querySelectorAll(".cell").forEach((cell) => cell.classList.add('disabled'));
  }

  updateScreen();

  return { updateScreen, showMessage }
})();



document.querySelector('.reset').addEventListener("click", GameController.resetGame);

document.getElementById('name').addEventListener("submit", (event) => {
  event.preventDefault();
  const player1Name = document.getElementById('playerone').value;
  const player2Name = document.getElementById('playertwo').value;
  GameBoard.resetBoard();
  GameController.setPlayersName(player1Name, player2Name);
});



RenderDisplay.updateScreen();

