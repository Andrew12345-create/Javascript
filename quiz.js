// --- Supabase Setup ---
const SUPABASE_URL = 'https://cgwhktwtgzjxbhvuzccs.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNnd2hrdHd0Z3pqeGJodnV6Y2NzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzOTg0NDIsImV4cCI6MjA2NTk3NDQ0Mn0.72p0s_3h3e1cLIMmgugNxdiEjQFrt7c20a5QjXJqldo';
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// --- Quiz Questions ---
const questions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyperlinks and Text Markup Language",
      "HyperText Markup Language",
      "Home Tool Markup Language"
    ],
    answer: "HyperText Markup Language"
  },
  {
    question: "What is the correct syntax to link a CSS file?",
    options: [
      '<link rel="stylesheet" href="style.css">',
      '<style src="style.css">',
      '<css>style.css</css>'
    ],
    answer: '<link rel="stylesheet" href="style.css">'
  },
  {
    question: "Which JavaScript keyword declares a variable?",
    options: ["let", "define", "create"],
    answer: "let"
  },
  {
    question: "Which tag is used to create a numbered list in HTML?",
    options: ["<ol>", "<ul>", "<li>"],
    answer: "<ol>"
  },
  {
    question: "How do you write a single-line comment in JavaScript?",
    options: ["// comment", "<!-- comment -->", "# comment"],
    answer: "// comment"
  },
  {
    question: "Which property changes the text color in CSS?",
    options: ["color", "background-color", "font-style"],
    answer: "color"
  },
  {
    question: "What does DOM stand for?",
    options: [
      "Document Object Model",
      "Data Object Management",
      "Display Oriented Model"
    ],
    answer: "Document Object Model"
  },
  {
    question: "Which method adds an element to the end of a JavaScript array?",
    options: ["push()", "pop()", "shift()"],
    answer: "push()"
  },
  {
    question: "How do you select an element with the id 'main' in CSS?",
    options: ["#main", ".main", "main"],
    answer: "#main"
  },
  {
    question: "What is the output of: console.log(typeof null);",
    options: ["object", "null", "undefined"],
    answer: "object"
  }
];

// --- Quiz Logic ---
let currentIndex = 0;
let score = 0;
let answered = false;

const questionDiv = document.getElementById("question");
const optionsDiv = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const resultDiv = document.getElementById("result");
const leaderboardDiv = document.getElementById("leaderboard");

function loadQuestion() {
  answered = false;
  const q = questions[currentIndex];
  questionDiv.textContent = q.question;
  optionsDiv.innerHTML = "";
  resultDiv.textContent = "";
  nextBtn.style.display = "none";

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.classList.add("option");
    btn.style.backgroundColor = "";
    btn.disabled = false;
    btn.addEventListener("click", () => checkAnswer(option, btn));
    optionsDiv.appendChild(btn);
  });
}

function checkAnswer(selected, button) {
  if (answered) return;
  answered = true;
  const correct = questions[currentIndex].answer;

  if (selected === correct) {
    score++;
    resultDiv.innerHTML = "✅ Correct!";
    resultDiv.style.color = "green";
    button.style.backgroundColor = "#d4edda";
  } else {
    resultDiv.innerHTML = `❌ Incorrect! Correct answer: <strong>${correct}</strong>`;
    resultDiv.style.color = "red";
    button.style.backgroundColor = "#ffcdd2";
  }

  // Always show the correct answer for question 2 (index 1)
  if (currentIndex === 1) {
    resultDiv.innerHTML += `<br><em>The correct answer is: <strong>${correct}</strong></em>`;
  }

  // Highlight correct answer if user was wrong
  if (selected !== correct) {
    const allOptions = document.querySelectorAll(".option");
    allOptions.forEach(btn => {
      if (btn.textContent === correct) {
        btn.style.backgroundColor = "#d4edda";
      }
    });
  }

  // Disable all buttons after an answer is selected
  const allOptions = document.querySelectorAll(".option");
  allOptions.forEach(btn => btn.disabled = true);

  nextBtn.style.display = "block";
}

nextBtn.addEventListener("click", () => {
  currentIndex++;
  if (currentIndex < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  questionDiv.textContent = "";
  optionsDiv.innerHTML = "";
  resultDiv.innerHTML = `🎉 Quiz Completed! You scored <strong>${score}/${questions.length}</strong>`;

  // Ask for name
  const name = prompt("Enter your name for the leaderboard:");
  if (name) {
    submitScore(name, score);
  } else {
    getLeaderboard(); // Still show leaderboard even if no name entered
  }

  const restartBtn = document.createElement("button");
  restartBtn.textContent = "Restart Quiz";
  restartBtn.addEventListener("click", restartQuiz);
  restartBtn.style.marginTop = "20px";
  optionsDiv.appendChild(restartBtn);
}

// --- Supabase Leaderboard Functions ---

// Save score to Supabase
async function submitScore(name, score) {
  const { error } = await client
    .from('quiz_scores') // Use your table name
    .insert([{ name, score }]);
  if (error) {
    alert('Failed to submit score.');
    console.error(error);
  }
  getLeaderboard();
}

// Fetch and display leaderboard from Supabase
async function getLeaderboard() {
  const { data, error } = await client
    .from('quiz_scores') // Use your table name
    .select('name, score')
    .order('score', { ascending: false })
    .limit(10);
  if (error) {
    leaderboardDiv.innerHTML = "<p>Could not load leaderboard.</p>";
    console.error(error);
    return;
  }
  let html = '<h3>Leaderboard</h3><ol>';
  data.forEach(entry => {
    html += `<li>${entry.name}: ${entry.score}</li>`;
  });
  html += '</ol>';
  leaderboardDiv.innerHTML = html;
}

function restartQuiz() {
  currentIndex = 0;
  score = 0;
  leaderboardDiv.innerHTML = "";
  loadQuestion();
}

loadQuestion();
nextBtn.style.display = "none";