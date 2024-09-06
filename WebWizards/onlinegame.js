let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup");
let newgameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let msgRef = document.getElementById("message");
let scoreX = document.getElementById("scoreX");
let scoreO = document.getElementById("scoreO");
let musicToggle = document.getElementById("music-toggle");
let backgroundMusic = document.getElementById("background-music");
let playerXInput = document.getElementById("playerX");
let playerOInput = document.getElementById("playerO");

let winningPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [2, 5, 8],
  [6, 7, 8],
  [3, 4, 5],
  [1, 4, 7],
  [0, 4, 8],
  [2, 4, 6],
];

let xTurn = true;
let count = 0;
let scoreXValue = 0;
let scoreOValue = 0;
let isMusicOn = true;

// Initialize scores from localStorage if available
if (localStorage.getItem('scoreX')) {
  scoreXValue = parseInt(localStorage.getItem('scoreX'), 10);
  scoreX.innerText = scoreXValue;
}
if (localStorage.getItem('scoreO')) {
  scoreOValue = parseInt(localStorage.getItem('scoreO'), 10);
  scoreO.innerText = scoreOValue;
}

const disableButtons = () => {
  btnRef.forEach((element) => (element.disabled = true));
  popupRef.classList.remove("hide");
};

const enableButtons = () => {
  btnRef.forEach((element) => {
    element.innerText = "";
    element.disabled = false;
  });
  popupRef.classList.add("hide");
};

const winFunction = (letter) => {
  disableButtons();
  let playerXName = playerXInput.value.trim() || "X";
  let playerOName = playerOInput.value.trim() || "O";

  if (letter === "X") {
    msgRef.innerHTML = `&#x1F389; <br> '${playerXName}' Wins`;
    scoreXValue += 1;
    scoreX.innerText = scoreXValue;
    localStorage.setItem('scoreX', scoreXValue);
  } else {
    msgRef.innerHTML = `&#x1F389; <br> '${playerOName}' Wins`;
    scoreOValue += 1;
    scoreO.innerText = scoreOValue;
    localStorage.setItem('scoreO', scoreOValue);
  }
};

const drawFunction = () => {
  disableButtons();
  msgRef.innerHTML = "&#x1F60E; <br> It's a Draw";
};

newgameBtn.addEventListener("click", () => {
  count = 0;
  enableButtons();
});

restartBtn.addEventListener("click", () => {
  count = 0;
  enableButtons();
});

const winChecker = () => {
  for (let i of winningPattern) {
    let [element1, element2, element3] = [
      btnRef[i[0]].innerText,
      btnRef[i[1]].innerText,
      btnRef[i[2]].innerText,
    ];
    if (element1 !== "" && (element2 !== "") && (element3 !== "")) {
      if (element1 === element2 && element2 === element3) {
        winFunction(element1);
      }
    }
  }
};

btnRef.forEach((element) => {
  element.addEventListener("click", () => {
    if (xTurn) {
      xTurn = false;
      element.innerText = "X";
      element.disabled = true;
    } else {
      xTurn = true;
      element.innerText = "O";
      element.disabled = true;
    }
    count += 1;
    if (count === 9) {
      drawFunction();
    }
    winChecker();
  });
});

window.onload = enableButtons;

musicToggle.addEventListener("click", () => {
  if (isMusicOn) {
    backgroundMusic.pause();
    musicToggle.innerText = "Music Off";
  } else {
    backgroundMusic.play();
    musicToggle.innerText = "Music On";
  }
  isMusicOn = !isMusicOn;
});
