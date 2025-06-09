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
    question: "Are you enjoying this quiz?",
    options: ["Yes", "No", "Maybe"],
    answer: "Yes"
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Cascading Style Sheets",
      "Creative Style System",
      "Computer Style Sheets"
    ],
    answer: "Cascading Style Sheets"
  },
  {
    question: "Which HTML element is used to define an internal style sheet?",
    options: ["<style>", "<css>", "<script>"],
    answer: "<style>"
  },
  {
    question: "What is the purpose of the <head> tag in HTML?",
    options: [
      "To contain metadata",
      "To display content",
      "To create links"
    ],
    answer: "To contain metadata"
  },
  {
    question: "Which of the following is a JavaScript data type?",
    options: [
      "String",
      "Number",
      "Boolean",
      "All of the above"
    ],
    answer: "All of the above"
  },
  {
    question: "What is the purpose of the <div> tag in HTML?",
    options: [
      "To create a division or section",
      "To display an image",
      "To create a link"
    ],
    answer: "To create a division or section"
  },
  {
    question: "Which of the following is used to style HTML elements?",
    options: ["CSS", "HTML", "JavaScript"],
    answer: "CSS"
  },
  {
    question: "What is the purpose of the <script> tag in HTML?",
    options: [
      "To include JavaScript code",
      "To link to an external CSS file",
      "To create a hyperlink"
    ],
    answer: "To include JavaScript code"
  },
  {
    question: "Which HTML element is used to create a hyperlink?",
    options: ["<link>", "<a>", "<url>"],
    answer: "<a>"
  },
  {
    question: "What is the correct HTML element for inserting a line break?",
    options: ["<break>", "<br>", "<lb>"],
    answer: "<br>"
  },
  {
    question: "What is the purpose of the alt attribute in an <img> tag?",
    options: [
      "To provide alternative text for the image",
      "To specify the image source",
      "To set the image width"
    ],
    answer: "To provide alternative text for the image"
  }
];

let currentIndex = 0;
let score = 0;

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

  // Always show the correct answer for question 2 (index 1)
  if (currentIndex === 1) {
    resultDiv.innerHTML += `<br><em>The correct answer is: <strong>${correct}</strong></em>`;
  }

  // Disable all buttons after an answer is selected
  const allOptions = document.querySelectorAll(".option");
  allOptions.forEach(btn => btn.disabled = true);

  nextBtn.style.display = "block";
}

nextBtn.addEventListener("click", () => {
  currentIndex++;
  if (currentIndex < questions.length) {
    nextBtn.style.display = "none";
    loadQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  questionDiv.textContent = "";
  optionsDiv.innerHTML = "";
  resultDiv.innerHTML = `🎉 Quiz Completed! You scored <strong>${score}/${questions.length}</strong>`;
  resultDiv.style.color = "black";

  const restartBtn = document.createElement("button");
  restartBtn.textContent = "Restart Quiz";
  restartBtn.addEventListener("click", restartQuiz);
  restartBtn.style.marginTop = "20px";
  optionsDiv.appendChild(restartBtn);
}

function restartQuiz() {
  currentIndex = 0;
  score = 0;
  nextBtn.style.display = "none";
  loadQuestion();
}

loadQuestion();
nextBtn.style.display = "none";