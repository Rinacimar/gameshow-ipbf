const numberTexts = {
  1: "Worshipando",
  2: "Cantando alto",
  3: "Dançando muito",
  4: "Pulando forte",
  5: "Glorificando",
  6: "Adorando",
  7: "Celebrando",
  8: "Exaltando",
  9: "Louvando",
  10: "Aplaudindo",
  11: "Reverenciando",
  12: "Agradecendo",
  13: "Honrando",
  14: "Proclamando",
  15: "Declarando",
  16: "Todos cantam",
  17: "Unidos em adoração",
  18: "Glorificando ao Rei"
};

const gameTypes = {
  1: "**TODOS JOGAM**",
  2: "APENAS O GRUPO JOGA",
  3: "**TODOS JOGAM**",
  4: "APENAS O GRUPO JOGA",
  5: "**TODOS JOGAM**",
  6: "APENAS O GRUPO JOGA",
  7: "**TODOS JOGAM**",
  8: "APENAS O GRUPO JOGA",
  9: "**TODOS JOGAM**",
  10: "APENAS O GRUPO JOGA",
  11: "**TODOS JOGAM**",
  12: "APENAS O GRUPO JOGA",
  13: "**TODOS JOGAM**",
  14: "APENAS O GRUPO JOGA",
  15: "**TODOS JOGAM**",
  16: "APENAS O GRUPO JOGA",
  17: "**TODOS JOGAM**",
  18: "APENAS O GRUPO JOGA"
};

const possiblePoints = [500, 800, 1000, 1100, 1200, 1400, 1500, 1800, 2000];
let pointValues = {};
let completedNumbers = new Set();

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function generatePointValues() {
  const shuffledPoints = shuffleArray([...possiblePoints, ...possiblePoints]);
  for (let i = 1; i <= 18; i++) {
    pointValues[i] = shuffledPoints[i - 1];
  }
}

let currentNumber = null;
let scores = {
  blue: 0,
  red: 0
};

function createNumbers() {
  generatePointValues();
  const container = document.getElementById('grid-container');
  container.innerHTML = '';
  for (let i = 1; i <= 18; i++) {
    const box = document.createElement('div');
    box.className = 'number-box';
    box.textContent = i;
    box.onclick = () => openModal(i);
    container.appendChild(box);
  }
}

function openModal(number) {
  currentNumber = number;
  const modal = document.getElementById('modal');
  const modalText = document.getElementById('modal-text');
  const modalGameType = document.getElementById('modal-game-type');
  const modalPoints = document.getElementById('modal-points');
  const teamButtons = document.querySelector('.team-buttons');

  if (completedNumbers.has(number)) {
    modalText.textContent = "Indisponível";
    modalGameType.textContent = "";
    modalPoints.textContent = "";
    teamButtons.style.display = 'none';
  } else {
    modalText.textContent = numberTexts[number];
    modalGameType.textContent = gameTypes[number];
    modalPoints.textContent = `${pointValues[number]} pontos`;
    teamButtons.style.display = 'flex';
  }
  modal.style.display = 'block';
}

function concludeNumber(team) {
  if (currentNumber && !completedNumbers.has(currentNumber)) {
    const boxes = document.getElementsByClassName('number-box');
    boxes[currentNumber - 1].classList.add(`completed-${team}`);
    scores[team] += pointValues[currentNumber];
    completedNumbers.add(currentNumber);
    updateScores();
  }
  document.getElementById('modal').style.display = 'none';
}

function updateScores() {
  document.getElementById('blue-score').textContent = `Time Azul: ${scores.blue}`;
  document.getElementById('red-score').textContent = `Time Vermelho: ${scores.red}`;
}

window.onclick = function(event) {
  const modal = document.getElementById('modal');
  if (event.target === modal) {
    modal.style.display = 'none';
  }
}

createNumbers();