

const questions = [
  {
    question: "What does HTML stand for?",
    options: ["Hyperlinks and Text Markup Language", "HyperText Markup Language", "Home Tool Markup Language"],
    answer: "HyperText Markup Language"
  },
  {
    question: "What is the correct syntax to link a CSS file?",
    options: ['<link rel="stylesheet" href="style.css">', '<style src="style.css">', '<css>style.css</css>'],
    answer: '<link rel="stylesheet" href="style.css">'
  },
  {
    question: "Which JavaScript keyword declares a variable?",
    options: ["let", "define", "create"],
    answer: "let"
  }
  ,
  {
    question: "Which tag is used to create a hyperlink in HTML?",
    options: ["<a>", "<link>", "<href>"],
    answer: "<a>"
  },
  {
    question: "What does CSS stand for?",
    options: ["Cascading Style Sheets", "Computer Style Sheets", "Creative Style Syntax"],
    answer: "Cascading Style Sheets"
  },
  {
    question: "Which of the following is NOT a JavaScript data type?",
    options: ["Boolean", "Float", "Undefined"],
    answer: "Float"
  },
  {
    question: "How do you write a single-line comment in JavaScript?",
    options: ["// comment", "<!-- comment -->", "# comment"],
    answer: "// comment"
  },
  {
    question: "Which method is used to select an element by its ID in JavaScript?",
    options: ["getElementById", "querySelectorAll", "getElementsByClassName"],
    answer: "getElementById"
  }
];


let currentIndex = 0;
let score = 0;
let quizCompleted = false;

const questionDiv = document.getElementById("question");
const optionsDiv = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const resultDiv = document.getElementById("result");

function loadQuestion() {
  const q = questions[currentIndex];
  questionDiv.textContent = q.question;
  optionsDiv.innerHTML = "";
  resultDiv.textContent = "";

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.classList.add("option");
    btn.addEventListener("click", () => checkAnswer(option, btn));
    optionsDiv.appendChild(btn);
  });
}

function checkAnswer(selected, button) {
  const correct = questions[currentIndex].answer;

  if (selected === correct) {
    score++;
    resultDiv.innerHTML = "✅ Correct!";
    resultDiv.style.color = "green";
    button.style.backgroundColor = "#d4edda";
  } else {
    resultDiv.innerHTML = `❌ Incorrect! Correct answer: <strong>${correct}</strong>`;
    resultDiv.style.color = "red";
    button.style.backgroundColor = "#f8d7da";
  }

  document.querySelectorAll(".option").forEach(btn => btn.disabled = true);
  nextBtn.style.display = "block";
}

nextBtn.addEventListener("click", () => {
  if (quizCompleted) return;

  currentIndex++;
  if (currentIndex < questions.length) {
    nextBtn.style.display = "none";
    loadQuestion();
  } else {
    quizCompleted = true;
    showResult();
  }
});

function showResult() {
  questionDiv.textContent = "";
  optionsDiv.innerHTML = "";
  resultDiv.innerHTML = `🎉 Quiz Completed! You scored <strong>${score}/${questions.length}</strong>`;
  resultDiv.style.color = "black";

  // Save score with timestamp
  const history = JSON.parse(localStorage.getItem("quizScores")) || [];
  history.push({
    score: `${score}/${questions.length}`,
    timestamp: new Date().toLocaleString()
  });
  localStorage.setItem("quizScores", JSON.stringify(history));

  // Display score history
  const historyDiv = document.createElement("div");
  historyDiv.innerHTML = "<h4>📜 Score History</h4>";
  history.forEach(entry => {
    const p = document.createElement("p");
    p.innerHTML = `🕒 ${entry.timestamp} — Score: ${entry.score}`;
    historyDiv.appendChild(p);
  });
  optionsDiv.appendChild(historyDiv);

  // Restart button
  const restartBtn = document.createElement("button");
  restartBtn.textContent = "Restart Quiz";
  restartBtn.addEventListener("click", restartQuiz);
  restartBtn.style.marginTop = "20px";
  optionsDiv.appendChild(restartBtn);
}

function restartQuiz() {
  currentIndex = 0;
  score = 0;
  quizCompleted = false;
  nextBtn.style.display = "none";
  loadQuestion();
}

loadQuestion();
nextBtn.style.display = "none";
