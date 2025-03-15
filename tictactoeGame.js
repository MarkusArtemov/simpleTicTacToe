const boxes = Array.from(document.getElementsByClassName('box'));
const gameBoard = document.querySelector('.game-board');
const gameStatus = document.querySelector('.game-status');
const popupContainer = document.querySelector('.popup-container');
const endgameMessage = document.querySelector('.endgame-message');
const restartButton = document.querySelector('.restart-button');

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], 
  [0, 3, 6], [1, 4, 7], [2, 5, 8],  
  [0, 4, 8], [2, 4, 6]
];

let xTurn = true;

gameBoard.addEventListener("click", function(event) {
  const box = event.target;
  if (box.classList.contains('box') && !box.classList.contains("circle") && !box.classList.contains("cross")) {
    box.classList.add(xTurn ? "cross" : "circle");
    if (checkWin()) {
      showPopup(xTurn ? "X hat gewonnen" : "O hat gewonnen");
    } else if (checkDraw()) {
      showPopup("Unentschieden");
    } else {
      changeTurn();
    }
  }
});

restartButton.addEventListener("click", resetGame);

function showPopup(message) {
  popupContainer.style.display = "flex";
  endgameMessage.textContent = message;
}

function changeTurn() {
  xTurn = !xTurn;
  gameStatus.textContent = xTurn ? "X-Turn" : "O-Turn";
}

function checkDraw() {
  return boxes.every(box => box.classList.contains("circle") || box.classList.contains("cross"));
}

function checkWin() {
  return winningCombinations.some(([a, b, c]) => {
    return (
      boxes[a].classList.length > 1 &&
      boxes[a].classList.contains(boxes[b].classList[1]) &&
      boxes[a].classList.contains(boxes[c].classList[1])
    );
  });
}

function resetGame() {
  boxes.forEach(box => box.className = "box");
  xTurn = true;
  popupContainer.style.display = "none";
  gameStatus.textContent = "X-Turn";
}
