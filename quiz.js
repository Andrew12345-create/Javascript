// --- Supabase Setup ---
const SUPABASE_URL = 'https://cgwhktwtgzjxbhvuzccs.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNnd2hrdHd0Z3pqeGJodnV6Y2NzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzOTg0NDIsImV4cCI6MjA2NTk3NDQ0Mn0.72p0s_3h3e1cLIMmgugNxdiEjQFrt7c20a5QjXJqldo';
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// --- Kenya Quiz Questions ---
const questions = [
  {
    question: "🇰🇪 What is the capital city of Kenya?",
    options: ["Nairobi", "Mombasa", "Kisumu"],
    answer: "Nairobi"
  },
  {
    question: "🌊 Which ocean borders Kenya to the southeast?",
    options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean"],
    answer: "Indian Ocean"
  },
  {
    question: "🗣️ What is the official language of Kenya?",
    options: ["Swahili and English", "French", "Arabic"],
    answer: "Swahili and English"
  },
  {
    question: "⛰️ Which is the highest mountain in Kenya?",
    options: ["Mount Elgon", "Mount Kenya", "Mount Kilimanjaro"],
    answer: "Mount Kenya"
  },
  {
    question: "🦓 Which famous wildlife migration occurs in the Maasai Mara?",
    options: ["The Great Migration", "The Arctic Migration", "The Monarch Migration"],
    answer: "The Great Migration"
  },
  {
    question: "💰 What currency is used in Kenya?",
    options: ["Kenyan Dollar", "Kenyan Shilling", "Kenyan Pound"],
    answer: "Kenyan Shilling"
  },
  {
    question: "👑 Who was the first President of Kenya?",
    options: ["Jomo Kenyatta", "Daniel arap Moi", "Uhuru Kenyatta"],
    answer: "Jomo Kenyatta"
  },
  {
    question: "🌅 Which lake is the largest in Kenya?",
    options: ["Lake Naivasha", "Lake Victoria", "Lake Turkana"],
    answer: "Lake Turkana"
  },
  {
    question: "📞 What is Kenya's country code for phone calls?",
    options: ["+254", "+256", "+250"],
    answer: "+254"
  },
  {
    question: "🐾 Which animal is NOT part of Kenya's 'Big Five'?",
    options: ["Lion", "Cheetah", "Buffalo"],
    answer: "Cheetah"
  }
];

// --- Quiz Logic ---
let currentIndex = 0;
let score = 0;
let answered = false;
let quizStartTime = null;

// --- Timer Variables ---
let timer;
let timerDuration = 8; // 16 seconds

const questionDiv = document.getElementById("question");
const optionsDiv = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const resultDiv = document.getElementById("result");
const leaderboardDiv = document.getElementById("leaderboard");
const leaderboardStatusDiv = document.getElementById("leaderboard-status");
const countdownDiv = document.getElementById("countdown");

function loadQuestion() {
  if (currentIndex === 0 && !quizStartTime) quizStartTime = Date.now();
  answered = false;
  const q = questions[currentIndex];
  questionDiv.textContent = q.question;
  optionsDiv.innerHTML = "";
  resultDiv.textContent = "";
  nextBtn.style.display = "none";

  // Set up countdown
  let countdown = timerDuration;
  countdownDiv.textContent = `⏳ Time left: ${countdown}s`;
  clearInterval(timer); // clear any existing timer
  timer = setInterval(() => {
    countdown--;
    countdownDiv.textContent = `⏳ Time left: ${countdown}s`;
    if (countdown <= 0) {
      clearInterval(timer);
      autoFail();
    }
  }, 1000);

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.classList.add("option");
    btn.style.backgroundColor = "";
    btn.disabled = false;
    btn.addEventListener("click", () => {
      clearInterval(timer);
      checkAnswer(option, btn);
    });
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

// --- Auto-fail if timer runs out ---
function autoFail() {
  if (answered) return;
  answered = true;
  const correct = questions[currentIndex].answer;
  resultDiv.innerHTML = `⏱️ Time's up! Correct answer: <strong>${correct}</strong>`;
  resultDiv.style.color = "red";

  // Highlight correct answer
  const allOptions = document.querySelectorAll(".option");
  allOptions.forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correct) {
      btn.style.backgroundColor = "#d4edda";
    }
  });

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
  clearInterval(timer);
  countdownDiv.textContent = "";
  questionDiv.textContent = "";
  optionsDiv.innerHTML = "";
  resultDiv.innerHTML = `🎉 Quiz Completed! You scored <strong>${score}/${questions.length}</strong>`;

  // Calculate time taken
  const quizEndTime = Date.now();
  const timeTaken = Math.round((quizEndTime - quizStartTime) / 1000);

  // Ask for name
  const name = prompt("Enter your name for the leaderboard:");
  if (name) {
    submitScore(name, score, timeTaken);
  } else {
    getLeaderboard();
  }

  const restartBtn = document.createElement("button");
  restartBtn.textContent = "Restart Quiz";
  restartBtn.addEventListener("click", restartQuiz);
  restartBtn.style.marginTop = "20px";
  optionsDiv.appendChild(restartBtn);

  // Show feedback form
  document.getElementById('feedback-section').style.display = 'block';
}

// --- Show Leaderboard Status ---
function showLeaderboardStatus(name, time_taken) {
  leaderboardStatusDiv.innerHTML = "";
  leaderboardStatusDiv.style.display = "none";

  client
    .from("quiz_scores")
    .select("name, score, time_taken")
    .order("score", { ascending: false })
    .order("time_taken", { ascending: true })
    .limit(10)
    .then(({ data, error }) => {
      if (error || !data) return;

      // Find the user's place in the leaderboard
      const place = data.findIndex(
        entry =>
          entry.name === name &&
          entry.time_taken === time_taken
      );

      if (place !== -1) {
        // User made the leaderboard
        const medal = place === 0 ? "🥇"
                    : place === 1 ? "🥈"
                    : place === 2 ? "🥉"
                    : "";
        leaderboardStatusDiv.innerHTML = `
          <div class="lb-status success">
            ${medal ? `<span class="medal">${medal}</span>` : ""}
            <strong>Congratulations!</strong> You are <span class="place">#${place + 1}</span> on the leaderboard.<br>
            <span class="time">Your time: <b>${time_taken}s</b></span>
          </div>
        `;
        leaderboardStatusDiv.style.display = "block";
      } else {
        // User did not make the leaderboard
        leaderboardStatusDiv.innerHTML = `
          <div class="lb-status fail">
            <strong>Good try!</strong> You did not reach the top 10 leaderboard.<br>
            <span class="time">Your time: <b>${time_taken}s</b></span>
          </div>
        `;
        leaderboardStatusDiv.style.display = "block";
      }
    });
}

// --- Supabase Leaderboard Functions ---

// Save score to Supabase
async function submitScore(name, score, time_taken) {
  const { error } = await client
    .from('quiz_scores')
    .insert([{ name, score, time_taken }]);
  if (error) {
    alert('Failed to submit score.');
    console.error(error);
  }
  getLeaderboard();
  showLeaderboardStatus(name, time_taken);
}

// Fetch and display leaderboard from Supabase
async function getLeaderboard() {
  const { data, error } = await client
    .from("quiz_scores")
    .select("name, score, time_taken")
    .order("score", { ascending: false })   // highest score first
    .order("time_taken", { ascending: true }) // tie‑break: fastest wins
    .limit(10);

  if (error) {
    leaderboardDiv.innerHTML = "<p>Could not load leaderboard.</p>";
    console.error(error);
    return;
  }

  let html = `
    <h3 style="margin-bottom:18px;font-size:1.3em;">
      🏆 <span style="color:#1e7e34;">Top 10 Fastest Kenyans</span> 🏆
    </h3>
    <ol style="padding-left:0;">`;
  data.forEach((entry, idx) => {
    const medal = idx === 0 ? "🥇"
               : idx === 1 ? "🥈"
               : idx === 2 ? "🥉"
               : "";
    const flag = "🇰🇪";
    const rowClass = idx === 0 ? "top1"
                  : idx === 1 ? "top2"
                  : idx === 2 ? "top3"
                  : "";
    html += `
      <li class="${rowClass}">
        <span class="medal">${medal}</span>
        <span class="flag">${flag}</span>
        <strong>#${idx + 1}</strong>
        <span class="name">${entry.name}</span>
        <span class="score">${entry.score} pts</span>
        <span class="time">⏱️ ${entry.time_taken !== null && entry.time_taken !== undefined ? entry.time_taken : 0}s</span>
      </li>`;
  });
  html += "</ol>";
  leaderboardDiv.innerHTML = html;
}

function restartQuiz() {
  currentIndex = 0;
  score = 0;
  quizStartTime = null;
  leaderboardDiv.innerHTML = "";
  leaderboardStatusDiv.innerHTML = "";
  document.getElementById('feedback-section').style.display = 'none';
  loadQuestion();
}

loadQuestion();
nextBtn.style.display = "none";

// --- Feedback Form Logic ---
const fbForm = document.getElementById("feedbackForm");
const fbStatus = document.getElementById("fb-status");
const fbShowBtn = document.getElementById("showBtn");
const fbList = document.getElementById("feedbackList");

const setFbStatus = (msg, color) => {
  fbStatus}