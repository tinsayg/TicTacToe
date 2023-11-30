document.addEventListener("DOMContentLoaded", () => {
  const gameScreen = document.querySelector(".game-screen");
  const endScreen = document.querySelector(".end-screen");
  const board = document.querySelector(".board");
  const cells = document.querySelectorAll(".cell");
  const status = document.querySelector(".status");
  const restartButton = document.querySelector(".restart-button");
  const newGameButton = document.querySelector(".new-game-button");
  const result = document.querySelector(".result");

  let currentPlayer = "X";
  let gameActive = true;
  let gameState = ["", "", "", "", "", "", "", "", ""];

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

  const handleCellClick = (e) => {
    const clickedCell = e.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute("data-cell-index"));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
      return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    checkWin();
    checkDraw();
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  };

  const checkWin = () => {
    for (let i = 0; i < winningConditions.length; i++) {
      const [a, b, c] = winningConditions[i];
      if (
        gameState[a] !== "" &&
        gameState[a] === gameState[b] &&
        gameState[a] === gameState[c]
      ) {
        gameActive = false;
        showEndScreen(`Player ${gameState[a]} wins!`);
      }
    }
  };

  const checkDraw = () => {
    if (!gameState.includes("") && gameActive) {
      gameActive = false;
      showEndScreen("It's a draw!");
    }
  };

  const showEndScreen = (message) => {
    endScreen.classList.remove("hidden");
    gameScreen.classList.add("hidden");
    result.textContent = message;
  };

  const restartGame = () => {
    currentPlayer = "X";
    gameActive = true;
    gameState = ["", "", "", "", "", "", "", "", ""];
    status.textContent = "";
    cells.forEach((cell) => {
      cell.textContent = "";
    });
    endScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");
  };

  const startNewGame = () => {
    restartGame();
    endScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");
  };

  cells.forEach((cell) => {
    cell.addEventListener("click", handleCellClick);
  });

  restartButton.addEventListener("click", restartGame);
  newGameButton.addEventListener("click", startNewGame);
});
