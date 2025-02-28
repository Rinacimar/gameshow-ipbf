const gameTypes = {
    1: "APENAS O GRUPO JOGA",
    2: "**TODOS JOGAM**",
    3: "APENAS O GRUPO JOGA",
    4: "**TODOS JOGAM**",
    5: "APENAS O GRUPO JOGA",
    6: "**TODOS JOGAM**",
    7: "**TODOS JOGAM**",
    8: "APENAS O GRUPO JOGA",
    9: "APENAS O GRUPO JOGA",
    10: "**TODOS JOGAM**",
    11: "APENAS O GRUPO JOGA",
    12: "**TODOS JOGAM**",
    13: "**TODOS JOGAM**",
    14: "APENAS O GRUPO JOGA",
    15: "APENAS O GRUPO JOGA",
    16: "**TODOS JOGAM**",
    17: "APENAS O GRUPO JOGA",
    18: "APENAS O GRUPO JOGA"
}

const numberTexts = {
    1: "Soletrando Bíblico",
    2: "Worshipando",
    3: "Imagem & Ação Gospel",
    4: "Perfil Crente",
    5: "Worshipando",
    6: "Perfil Crente",
    7: "Soletrando Bíblico",
    8: "Worshipando",
    9: "Antes ou Depois",
    10: "Imagem & Ação Gospel",
    11: "Worshipando",
    12: "Perfil Crente",
    13: "Imagem & Ação Gospel",
    14: "Imagem & Ação Gospel",
    15: "Antes ou Depois",
    16: "Perfil Crente",
    17: "Imagem & Ação Gospel",
    18: "Worshipando"
}

const possiblePoints = [500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000];
let pointValues = {};
let completedNumbers = new Set();
let currentNumber = null;
let final_scores = { blue: 0, red: 0 };
let scores = {blue: 0, red: 0};

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

function generatePointValues() {
    const shuffledPoints = shuffleArray([...possiblePoints, ...possiblePoints]);
    for (let i = 1; i <= 18; i++) {
        pointValues[i] = shuffledPoints[i - 1];
    }
}

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
        modalText.textContent = "Escolha outra opção!";
        modalGameType.textContent = "";
        modalPoints.textContent = "";
        teamButtons.style.display = 'none';
    } else {
        modalText.textContent = numberTexts[number];
        modalGameType.textContent = gameTypes[number];
        modalPoints.textContent = `${pointValues[number]} pontos`;
        teamButtons.style.display = 'flex';
    }

    modal.style.display = 'block'
}

function concludeNumber(team) {
    if (currentNumber && !completedNumbers.has(currentNumber)) {
        const boxes = document.querySelectorAll('.number-box');
        boxes[currentNumber - 1].classList.add(`completed-${team}`);
        final_scores[team] += pointValues[currentNumber];
        scores[team] += 1;
        completedNumbers.add(currentNumber);
        updateScores();

        if (completedNumbers.size === 18) {
            showFinalScore();
        }
    }
    document.getElementById('modal').style.display = 'none';
}

function updateScores() {
    document.getElementById('blue-score').textContent = `Time Azul: ${scores.blue}`;
    document.getElementById('red-score').textContent = `Time Vermelho: ${scores.red}`;
}

function showFinalScore() {
    const finalModal = document.getElementById('final-modal');
    const finalBlueScore = document.getElementById('final-blue-score');
    const finalRedScore = document.getElementById('final-red-score');
    const winnerText = document.getElementById('winner-text');
  
    finalBlueScore.textContent = `Time Azul: ${final_scores.blue}`;
    finalRedScore.textContent = `Time Vermelho: ${final_scores.red}`;
  
    if (final_scores.blue > final_scores.red) {
      winnerText.textContent = "Time Azul Venceu! ";
    } else if (final_scores.red > final_scores.blue) {
      winnerText.textContent = "Time Vermelho Venceu! ";
    } else {
      winnerText.textContent = "Empate! ";
    }
  
    finalModal.style.display = 'block';
}

window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

createNumbers();