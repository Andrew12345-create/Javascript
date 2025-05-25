const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = 5500;  // ← New port

// Middleware
app.use(express.json());
app.use(express.static(__dirname));

// 👇👇👇 REPLACE THIS WITH YOUR ACTUAL API KEY 👇👇👇
const API_KEY = 'sk-your-actual-deepseek-api-key-here';

app.post('/api/chat', async (req, res) => {
  try {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: req.body.message }
        ]
      })
    });

    const data = await response.json();
    res.json({ reply: data.choices[0].message.content });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});