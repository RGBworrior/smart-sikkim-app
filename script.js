// ======= MINI GAME =======
const grid = document.getElementById('grid');
const scoreDisplay = document.getElementById('score');
const buildingType = document.getElementById('buildingType');
const cellSize = 8;
const totalCells = cellSize * cellSize;

let buildingCounts = {
  house: 0,
  solar: 0,
  bus: 0,
  recycle: 0,
};

const scoreValues = {
  house: 5,
  solar: 15,
  bus: 10,
  recycle: 20,
};

let totalScore = 0;

function createGrid() {
  grid.innerHTML = '';
  for (let i = 0; i < totalCells; i++) {
    const cell = document.createElement('div');
    cell.dataset.index = i;
    cell.addEventListener('click', () => addBuilding(cell));
    grid.appendChild(cell);
  }
}

function addBuilding(cell) {
  if (cell.dataset.placed) return;

  const type = buildingType.value;
  const emojis = {
    house: '🏠',
    solar: '☀️',
    bus: '🚍',
    recycle: '♻️',
  };

  cell.textContent = emojis[type];
  cell.classList.add('added');
  cell.dataset.placed = type;

  buildingCounts[type]++;
  totalScore += calculatePlacementScore(type, parseInt(cell.dataset.index));
  updateScoreDisplay();
}

function calculatePlacementScore(type, index) {
  const row = Math.floor(index / cellSize);
  const col = index % cellSize;

  if (type === 'solar') return row < 2 ? 20 : 10;
  if (type === 'recycle') return row >= 3 && row <= 4 && col >= 3 && col <= 4 ? 25 : 10;
  if (type === 'bus') return col === 0 || col === cellSize - 1 ? 15 : 10;
  return 5;
}

function updateScoreDisplay() {
  document.getElementById('count-house').textContent = buildingCounts.house;
  document.getElementById('count-solar').textContent = buildingCounts.solar;
  document.getElementById('count-bus').textContent = buildingCounts.bus;
  document.getElementById('count-recycle').textContent = buildingCounts.recycle;
  scoreDisplay.textContent = totalScore;
}

function clearGrid() {
  totalScore = 0;
  buildingCounts = { house: 0, solar: 0, bus: 0, recycle: 0 };
  createGrid();
  updateScoreDisplay();
}

createGrid();

// ======= TAB NAVIGATION =======
function showTab(tabId) {
  document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
  document.getElementById(tabId).classList.add('active');
}

// ======= QUIZ SECTION =======
const quizData = [
  {
    question: "Which of the following is a key feature of a smart city?",
    options: ["More highways", "Smart waste management", "More malls"],
    answer: 1
  },
  {
    question: "Why is solar energy preferred in smart cities?",
    options: ["It is cheap", "It is renewable", "It comes from coal"],
    answer: 1
  },
  {
    question: "What does smart mobility include?",
    options: ["Horse carts", "Diesel buses", "Electric buses and bike sharing"],
    answer: 2
  },
  {
    question: "How can smart cities help the environment?",
    options: ["By cutting trees", "By using plastic", "By reducing pollution and waste"],
    answer: 2
  }
];

let currentQuestion = 0;
let quizScore = 0;

function loadQuestion() {
  const q = quizData[currentQuestion];
  document.getElementById('quiz-question').textContent = q.question;

  const optionsDiv = document.getElementById('quiz-options');
  optionsDiv.innerHTML = '';
  q.options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.textContent = opt;
    btn.onclick = () => checkAnswer(idx);
    optionsDiv.appendChild(btn);
  });

  document.getElementById('quiz-feedback').textContent = '';
}

function checkAnswer(selectedIndex) {
  const correct = quizData[currentQuestion].answer;
  const feedback = document.getElementById('quiz-feedback');
  if (selectedIndex === correct) {
    feedback.textContent = '✅ Correct!';
    quizScore++;
  } else {
    feedback.textContent = '❌ Incorrect!';
  }
  document.getElementById('quiz-score').textContent = quizScore;
}

function nextQuestion() {
  if (currentQuestion < quizData.length - 1) {
    currentQuestion++;
    loadQuestion();
  } else {
    document.getElementById('quiz-feedback').textContent += " 🎉 Quiz Complete!";
  }
}

function resetQuiz() {
  currentQuestion = 0;
  quizScore = 0;
  document.getElementById('quiz-score').textContent = quizScore;
  document.getElementById('quiz-feedback').textContent = '';
  loadQuestion();
}
