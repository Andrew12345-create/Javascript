const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000; // The server will run on http://localhost:3000

// In-memory leaderboard (resets when server restarts)
let leaderboard = [];

app.use(cors());
app.use(express.json());

// Get top 10 scores
app.get('/leaderboard', (req, res) => {
  // Sort by score descending, take top 10
  const top = leaderboard
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);
  res.json(top);
});

// Add a new score
app.post('/leaderboard', (req, res) => {
  const { name, score } = req.body;
  if (typeof name === 'string' && typeof score === 'number') {
    leaderboard.push({ name, score });
    res.json({ success: true });
  } else {
    res.status(400).json({ success: false, message: 'Invalid data' });
  }
});

app.listen(PORT, () => {
 console.log(`Leaderboard server running on http://localhost:3000`);
});