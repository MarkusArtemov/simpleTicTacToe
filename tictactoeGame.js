const boxes = Array.from(document.getElementsByClassName('box'));
document.querySelector('.restart-button').addEventListener("click", function() {
  location.reload()
});
let xTurn = true;
const winningCombinations =   [[0, 1, 2],[3, 4, 5],[6, 7, 8], 
                              [0, 3, 6],[1, 4, 7],[2, 5, 8],  
                              [0, 4, 8],[2, 4, 6]];        
boxes.forEach(box => {
  box.addEventListener("click", function() {
    if (!box.classList.contains("circle") && !box.classList.contains("cross")) {
      box.classList.add(xTurn ? "cross" : "circle");
       (checkWin() || checkDraw()) && showPopup();
      changeTurn();
    }
  })
});

function showPopup() {
  document.querySelector('.popup-container').style.display = "flex";
  document.querySelector('.endgame-message').textContent = checkWin() ? (xTurn ? "X hat gewonnen" : "O hat gewonnen") : ("unentschieden");
}

function changeTurn() {
  xTurn = !xTurn;
  document.querySelector('.game-status').textContent = xTurn ? "X-Turn" : "0-Turn";
}

function checkDraw() {
  return boxes.every(box => box.classList.contains("circle") || box.classList.contains("cross"));
}

function checkWin() {
  return winningCombinations.some(combination => 
    combination.every(fieldOfCombination => 
      boxes[fieldOfCombination].classList.contains(xTurn ? "cross" : "circle")));
}