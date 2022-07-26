const playbtn = document.getElementById("play-btn");
const settings = document.getElementById("settings");
const settingsbtn = document.getElementById("settings-btn");
const difficulty = document.getElementById("difficulty");
const word = document.getElementById("word");
const text = document.getElementById("text");
const time = document.getElementById("time");
const score = document.getElementById("score");
const endGameContainer = document.getElementById("end-game-container");

const words = [
  "programming",
  "attribute",
  "egypt",
  "africa",
  "container",
  "beautiful",
  "function",
];

function randomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

let timeVal;
let scoreVal;

startScreen();

function startScreen() {
  timeVal = 10;
  time.innerHTML = `${timeVal}s`;
  scoreVal = 0;
  score.innerHTML = scoreVal;
  word.innerHTML = "";
  text.value = "";
  text.setAttribute("disabled", "disabled");
  playbtn.removeAttribute("disabled");
  difficulty.removeAttribute("disabled");

  endGameContainer.style.display = "none";
}

function play() {
  playbtn.setAttribute("disabled", "disabled");
  text.removeAttribute("disabled");
  text.focus();
  difficulty.setAttribute("disabled", "disabled");

  word.innerHTML = randomWord();

  const countDown = setInterval(() => {
    timeVal--;
    time.innerHTML = `${timeVal}s`;
    if (timeVal === 0) {
      clearInterval(countDown);
      endGameContainer.innerHTML = `<h1>Game Over</h1> <p>Score: ${scoreVal}</p> <button onclick="startScreen()">Play again</button>`;
      endGameContainer.style.display = "flex";
    }
  }, 1000);
}

function checkInput(e) {
  if (e.target.value === word.innerHTML) {
    e.target.value = "";
    word.innerHTML = randomWord();
    if (difficulty.value === "easy") {
      timeVal += 7;
      score.innerHTML = scoreVal += 1;
    } else if (difficulty.value === "medium") {
      timeVal += 5;
      score.innerHTML = scoreVal += 3;
    } else if (difficulty.value === "hard") {
      timeVal += 3;
      score.innerHTML = scoreVal += 5;
    }
  }
}

playbtn.addEventListener("click", play);

text.addEventListener("input", checkInput);

settingsbtn.addEventListener("click", () => {
  settings.classList.toggle("hide");
});
