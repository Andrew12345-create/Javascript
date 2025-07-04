// --- Supabase Setup ---
const SUPABASE_URL = 'https://cgwhktwtgzjxbhvuzccs.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNnd2hrdHd0Z3pqeGJodnV6Y2NzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzOTg0NDIsImV4cCI6MjA2NTk3NDQ0Mn0.72p0s_3h3e1cLIMmgugNxdiEjQFrt7c20a5QjXJqldo';
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// --- Kenya Quiz Questions ---
const questions = [
  {
    question: "What is the capital city of Kenya?",
    options: ["Nairobi", "Mombasa", "Kisumu"],
    answer: "Nairobi"
  },
  {
    question: "Which ocean borders Kenya to the southeast?",
    options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean"],
    answer: "Indian Ocean"
  },
  {
    question: "What is the official language of Kenya?",
    options: ["Swahili and English", "French", "Arabic"],
    answer: "Swahili and English"
  },
  {
    question: "Which is the highest mountain in Kenya?",
    options: ["Mount Elgon", "Mount Kenya", "Mount Kilimanjaro"],
    answer: "Mount Kenya"
  },
  {
    question: "Which famous wildlife migration occurs in the Maasai Mara?",
    options: ["The Great Migration", "The Arctic Migration", "The Monarch Migration"],
    answer: "The Great Migration"
  },
  {
    question: "What currency is used in Kenya?",
    options: ["Kenyan Dollar", "Kenyan Shilling", "Kenyan Pound"],
    answer: "Kenyan Shilling"
  },
  {
    question: "Who was the first President of Kenya?",
    options: ["Jomo Kenyatta", "Daniel arap Moi", "Uhuru Kenyatta"],
    answer: "Jomo Kenyatta"
  },
  {
    question: "Which lake is the largest in Kenya?",
    options: ["Lake Naivasha", "Lake Victoria", "Lake Turkana"],
    answer: "Lake Turkana"
  },
  {
    question: "What is Kenya's country code for phone calls?",
    options: ["+254", "+256", "+250"],
    answer: "+254"
  },
  {
    question: "Which animal is NOT part of Kenya's 'Big Five'?",
    options: ["Lion", "Cheetah", "Buffalo"],
    answer: "Cheetah"
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

// --- Feedback Form Logic ---
const fbForm = document.getElementById("feedbackForm");
const fbStatus = document.getElementById("fb-status");
const fbShowBtn = document.getElementById("showBtn");
const fbList = document.getElementById("feedbackList");

const setFbStatus = (msg, color) => {
  fbStatus.textContent = msg;
  fbStatus.style.color = color;
};

if (fbForm) {
  fbForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("fb-name").value.trim();
    const message = document.getElementById("fb-message").value.trim();
    if (!name || !message) return setFbStatus("Fill in all fields", "red");

    const { error } = await client.from("feedback").insert({ name, message });
    if (error) {
      console.error(error);
      return setFbStatus("❌ insert failed", "red");
    }

    setFbStatus(`✅ Thank you, ${name}! (${new Date().toLocaleString()})`, "green");
    fbForm.reset();
    loadFeedback();
  });

  fbShowBtn.addEventListener("click", loadFeedback);

  async function loadFeedback() {
    fbList.innerHTML = "<li>Loading…</li>";
    const { data, error } = await client
      .from("feedback")
      .select("name, message, created_at")
      .order("created_at", { ascending: false })
      .limit(20);

    if (error) {
      console.error(error);
      fbList.innerHTML = "<li style='color:red'>load failed</li>";
      return;
    }

    fbList.innerHTML = data.length
      ? ""
      : "<li>No feedback yet</li>";

    data.forEach(({ name, message, created_at }) => {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${name}</strong>
                      <em>(${new Date(created_at).toLocaleString()})</em><br>
                      ${message}`;
      fbList.appendChild(li);
    });
  }
}