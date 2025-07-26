// --- Supabase Setup ---
const supabase = window.supabase.createClient(
    'https://wnztzjupjrbrlkqzitrk.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InduenR6anVwanJicmxrcXppdHJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5ODc5NDksImV4cCI6MjA2ODU2Mzk0OX0.fXOmrdpPZDNOaxJEMReNzqEvHz4Zx7pMcRS1VsBr0Lc'
);

// --- DOM Elements ---
const dom = {
    loginBtn: document.getElementById('login-btn'),
    email: document.getElementById('email'),
    password: document.getElementById('password'),
    categoryBtns: document.querySelectorAll('.category-btn'),
    questionText: document.getElementById('question-text'),
    answers: document.getElementById('answers'),
    score: document.getElementById('score'),
    streak: document.getElementById('streak'),
    finalScore: document.getElementById('final-score'),
    leaderboard: document.getElementById('leaderboard'),
    screens: {
        login: document.getElementById('login-screen'),
        verification: document.getElementById('verification-screen'),
        category: document.getElementById('category-screen'),
        quiz: document.getElementById('quiz-screen'),
        end: document.getElementById('end-screen')
    },
    verificationCodeInput: document.getElementById('verification-code'),
    verifyBtn: document.getElementById('verify-btn'),
    resendBtn: document.getElementById('resend-btn')
};

// --- Hardcoded Questions ---
const QUESTIONS = {
    tech: [
        {
            question: "What does CPU stand for?",
            answers: ["Central Processing Unit", "Computer Personal Unit", "Central Peripheral Unit", "Control Processing Utility"],
            correct: 0
        },
        {
            question: "Who founded Microsoft?",
            answers: ["Steve Jobs", "Bill Gates", "Elon Musk", "Mark Zuckerberg"],
            correct: 1
        },
        {
            question: "What is the main programming language for web development?",
            answers: ["Python", "JavaScript", "C++", "Java"],
            correct: 1
        },
        {
            question: "What does the acronym 'URL' stand for?",
            answers: ["Uniform Resource Locator", "Universal Resource Link", "Uniform Reference Locator", "Universal Reference Link"],
            correct: 0
        },
        {
            question: "Who is known as the “father of the computer”?",
            answers: ["Alan Turing", "Charles Babbage", "Ada Lovelace", "John von Neumann"],
            correct: 1
        },
        {
            question: "What is the name of the first computer virus?",
            answers: ["Adolf Hitler", "Melissa", "Soviet Union", "Stuxnet"],
            correct: 3
        },
        {
            question: "Which company developed the iPhone?",
            answers: ["Google", "Microsoft", "Apple", "Samsung"],
            correct: 2
        },
        {
            question: "What is the most popular programming language as of 2021?",
            answers: ["Java", "Python", "JavaScript", "C#"],
            correct: 2
        },
        {
            question: "What is the name of the first computer?",
            answers: ["ENIAC", "EDVAC", "UNIVAC", "MARK 1"],
            correct: 0
        },
        {
            question: "What does HTML stand for?",
            answers: ["HyperText Markup Language", "HyperText Marking Language", "HyperText Multi Language", "HyperText Machine Language"],
            correct: 0
        }
    ],
    culture: [
        {
            question: "Which country is famous for the Eiffel Tower?",
            answers: ["Italy", "France", "Spain", "Germany"],
            correct: 1
        },
        {
            question: "What is the traditional dress of Japan?",
            answers: ["Hanbok", "Kimono", "Sari", "Cheongsam"],
            correct: 1
        },
        {
            question: "What is the capital of Japan?",
            answers: ["Tokyo", "Osaka", "Kyoto", "Sapporo"],
            correct: 0
        },
        {
            question: "What is the capital of France?",
            answers: ["Paris", "London", "Berlin", "Rome"],
            correct: 0
        },
        {
            question: "What is the capital of Italy?",
            answers: ["Rome", "Venice", "Milan", "Florence"],
            correct: 0
        },
        {
            question: "What is the capital of Spain?",
            answers: ["Madrid", "Barcelona", "Valencia", "Seville"],
            correct: 0
        },
        {
            question: "What is the capital of Germany?",
            answers: ["Berlin", "Munich", "Frankfurt", "Hamburg"],
            correct: 0
        },
        {
            question: "What is the capital of China?",
            answers: ["Beijing", "Shanghai", "Guangzhou", "Shenzhen"],
            correct: 0
        },
        {
            question: "What is the capital of India?",
            answers: ["New Delhi", "Mumbai", "Kolkata", "Bangalore"],
            correct: 0
        },
        {
            question: "What is the capital of Russia?",
            answers: ["Moscow", "St. Petersburg", "Kazan", "Novosibirsk"],
            correct: 0
        },
    ],
    anime: [
        {
            question: "Who is the main character in 'Naruto'?",
            answers: ["Sasuke", "Naruto", "Sakura", "Kakashi"],
            correct: 1
        },
        {
            question: "Which anime features Dragon Balls?",
            answers: ["One Piece", "Dragon Ball", "Bleach", "Attack on Titan"],
            correct: 1
        },
        {
            question: "What is the name of the main character in 'Attack on Titan'?",
            answers: ["Eren Yeager", "Levi Ackerman", "Armin Arlert", "Mikasa Ackerman"],
            correct: 0
        },
        {
            question: "What is the name of the main character in 'Fullmetal Alchemist: Brotherhood'?",
            answers: ["Edward Elric", "Alphonse Elric", "Roy Mustang", "Riza Hawkeye"],
            correct: 0
        },
        {
            question: "What is the name of the main character in 'Death Note'?",
            answers: ["Light Yagami", "L", "Misa Amane", "Ryuk"],
            correct: 0
        },
        {
            question: "What is the name of the main character in 'My Hero Academia'?",
            answers: ["Izuku Midoriya", "Katsuki Bakugo", "All Might", "Shoto Todoroki"],
            correct: 0
        },
        {
            question: "What is the name of the main character in 'One Piece'?",
            answers: ["Monkey D. Luffy", "Roronoa Zoro", "Nami", "Sanji"],
            correct: 0
        },
        {
            question: "What is the name of the main character in 'Sword Art Online'?",
            answers: ["Kirito", "Asuna", "Leafa", "Sinon"],
            correct: 0
        },
        {
            question: "What is the name of the main character in 'Demon Slayer'?",
            answers: ["Tanjiro Kamado", "Nezuko Kamado", "Zenitsu Agatsuma", "Inosuke Hashibira"],
            correct: 0
        },
        {
            question: "What is the name of the main character in 'Tokyo Ghoul'?",
            answers: ["Ken Kaneki", "Touka Kirishima", "Rize Kamishiro", "Shuu Tsukiyama"],
            correct: 0
        }
    ]
};

// --- State ---
let user = null;
let currentCategory = '';
let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let streak = 0;
let startTime = null;
let elapsedTime = 0;
let verificationCode = null;

// --- UI Functions ---
function showScreen(screen) {
    Object.values(dom.screens).forEach(s => s.style.display = 'none');
    dom.screens[screen].style.display = 'block';
}
function resetQuizState(showCategory = true) {
    score = 0;
    streak = 0;
    currentQuestionIndex = 0;
    questions = [];
    dom.score.textContent = score;
    dom.streak.textContent = streak;
    startTime = Date.now();
    elapsedTime = 0;
    if (showCategory) {
        showScreen('category');
    }
}

// New function to show category screen directly after login
function showCategoryScreenAfterLogin() {
    showScreen('category');
}
function initUI() {
    dom.score.textContent = '0';
    dom.streak.textContent = '0';

    // Check URL params or localStorage to decide which screen to show
    // For simplicity, show quiz screen directly after login
    showScreen('quiz');
}
initUI();

// --- Brevo Email Sending Function ---
// NOTE: Sending emails directly from client-side JavaScript using Brevo API or SMTP is not secure and may fail due to CORS or security restrictions.
// It is recommended to implement a backend service or serverless function to send emails securely using your Brevo SMTP or API credentials.
// Below is a placeholder function that calls a backend endpoint '/send-verification-email' which you need to implement separately.

async function sendVerificationEmail(email, code) {
    try {
        const response = await fetch('http://localhost:5500/send-verification-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, code })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Backend email sending error:', errorData);
            alert('Failed to send verification email. Please try again later.');
            return false;
        }
        return true;
    } catch (error) {
        console.error('Error sending verification email:', error);
        alert('Failed to send verification email. Please try again later.');
        return false;
    }
}

// --- Generate Random 6-digit Code ---
function generateVerificationCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// --- Authentication ---
dom.loginBtn.addEventListener('click', async () => {
    const email = dom.email.value.trim();
    const password = dom.password.value.trim();
    if (!email || !password) {
        alert('❌ Please enter both email and password.');
        return;
    }
    // Generate and send verification code
    verificationCode = generateVerificationCode();
    const sent = await sendVerificationEmail(email, verificationCode);
    if (sent) {
        user = { email };
        alert('✅ Verification code sent to your email.');
        showScreen('verification');
    }
});

// --- Verification ---
dom.verifyBtn.addEventListener('click', () => {
    const enteredCode = dom.verificationCodeInput.value.trim();
    if (enteredCode === verificationCode) {
        alert('✅ Email verified successfully!');
        resetQuizState();
        showScreen('category');
    } else {
        alert('❌ Incorrect verification code. Please try again.');
    }
});

// --- Resend Code ---
dom.resendBtn.addEventListener('click', async () => {
    if (!user || !user.email) {
        alert('Please enter your email and password first.');
        showScreen('login');
        return;
    }
    verificationCode = generateVerificationCode();
    const sent = await sendVerificationEmail(user.email, verificationCode);
    if (sent) {
        alert('✅ Verification code resent to your email.');
    }
});

// --- Category Selection ---
dom.categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        currentCategory = btn.dataset.category;
        resetQuizState(false);
        showScreen('quiz');
        loadQuestions();
        showQuestion();
    });
});

// --- Load Questions ---
function loadQuestions() {
    questions = QUESTIONS[currentCategory] || [];
    if (!questions.length) {
        alert('❌ No questions found for this category!');
    }
}

// --- Show Question ---
function showQuestion() {
    if (currentQuestionIndex >= questions.length) {
        endQuiz();
        return;
    }
    const q = questions[currentQuestionIndex];
    dom.questionText.textContent = q.question;
    dom.answers.innerHTML = '';

    // Remove previous feedback if any
    let feedback = document.getElementById('feedback');
    if (feedback) feedback.remove();

    q.answers.forEach((answer, idx) => {
        const btn = document.createElement('button');
        btn.textContent = answer;
        btn.className = 'answer-btn';
        btn.addEventListener('click', () => handleAnswer(btn, idx, q.correct, q.answers[q.correct]));
        dom.answers.appendChild(btn);
    });
}

// --- Handle Answer with Feedback ---
function handleAnswer(btn, selected, correct, correctText) {
    // Disable all buttons
    Array.from(dom.answers.children).forEach(b => b.disabled = true);

    // Highlight correct and incorrect
    if (selected === correct) {
        btn.classList.add('correct');
        streak++;
        score += 10 + streak * 5;
        showFeedback(true, correctText);
    } else {
        btn.classList.add('incorrect');
        dom.answers.children[correct].classList.add('correct');
        streak = 0;
        showFeedback(false, correctText);
    }
    dom.score.textContent = score;
    dom.streak.textContent = streak;

    // Next question after delay
    setTimeout(() => {
        currentQuestionIndex++;
        showQuestion();
    }, 1200);
}

// --- Show Feedback Message ---
function showFeedback(isCorrect, correctText) {
    let feedback = document.createElement('div');
    feedback.id = 'feedback';
    feedback.style.marginTop = '1rem';
    feedback.style.fontWeight = 'bold';
    feedback.innerHTML = isCorrect
        ? `<span style="color:limegreen;">✅ Correct!</span>`
        : `<span style="color:#ff5555;">❌ Incorrect.</span> <span style="color:gold;">Correct answer: ${correctText}</span>`;
    dom.answers.parentNode.appendChild(feedback);
}

// --- End Quiz ---
async function endQuiz() {
    showScreen('end');
    dom.finalScore.textContent = score;
    elapsedTime = Date.now() - startTime;
    if (dom.finalTime || dom['final-time']) {
        const finalTimeElement = dom.finalTime || dom['final-time'];
        finalTimeElement.textContent = formatTime(elapsedTime);
    }
    await saveScoreToLeaderboard();
    await updateLeaderboard();
}

function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}m ${seconds}s`;
}

// --- Save Score to Supabase Leaderboard ---
async function saveScoreToLeaderboard() {
    if (!user || !user.email) return;
    const username = user.email.split('@')[0];
    try {
        await supabase.from('leaderboard').insert([{ username, score, time: elapsedTime }]);
    } catch (error) {
        console.error('Error saving score:', error);
    }
}

// --- Fetch and Display Leaderboard ---
async function updateLeaderboard() {
    try {
        const { data, error } = await supabase
            .from('leaderboard')
            .select('username, score, time')
            .order('score', { ascending: false })
            .order('time', { ascending: true })
            .limit(10);

        if (error) {
            console.error('Leaderboard error:', error);
            dom.leaderboard.innerHTML = "<li>Could not load leaderboard.</li>";
            return;
        }

        dom.leaderboard.innerHTML = '';
        const medals = ['🥇', '🥈', '🥉'];
        
        data.forEach((entry, i) => {
            const li = document.createElement('li');
            const medal = medals[i] || (i + 1) + '.';
            li.innerHTML = `<span>${medal} ${entry.username}</span> <span>${entry.score} XP</span> <span>(${formatTime(entry.time)})</span>`;
            dom.leaderboard.appendChild(li);
        });
    } catch (error) {
        console.error('Error updating leaderboard:', error);
        dom.leaderboard.innerHTML = "<li>Could not load leaderboard.</li>";
    }
}
