const boxes = Array.from(document.getElementsByClassName('box'));
const restartButton = document.querySelector('.restart-button');
restartButton.addEventListener("click",function(){
   location.reload()
});
let xTurn = true;

const winningCombinations = [[0,1,2],[3,4,5],[6,7,8], //horizontal 
                            [0,3,6],[1,4,7],[2,5,8],  //vertikal
                            [0,4,8],[2,4,6]];         //diagonal

boxes.forEach(box => {
    box.addEventListener("click", function(){
        if(!box.classList.contains("circle") && !box.classList.contains("cross")){
            box.classList.add(xTurn ? "cross" : "circle");
            if(checkWin() || checkDraw()){
                showPopup();
            }
        changeTurn();
        }   
    })
});

function showPopup(){
document.querySelector('.popup-container').style.display = "flex";
if(checkWin()){
    document.querySelector('.endgame-message').textContent = xTurn ? "X hat gewonnen" : "O hat gewonnen";
} else {
    document.querySelector('.endgame-message').textContent = "unentschieden";
}

}
function changeTurn(){
    xTurn = !xTurn;
}

function checkDraw(){
    boxes.forEach(box=> {
         if(!box.classList.contains("circle") && !box.classList.contains("cross")){
            return false;
        }
        return true;
    });
}

function checkWin() {
    let currentSymbol = xTurn ? "cross" : "circle";
    let found = false;
    for (let i = 0; i < winningCombinations.length; i++) {
        if (winningCombinations[i].every(field => boxes[field].classList.contains(currentSymbol))) {
            found = true;
            break;
        }
    }
    return found;
}