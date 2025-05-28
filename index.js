document.addEventListener('DOMContentLoaded', () => {
  const chatbox = document.getElementById('chatbox');
  const userInput = document.getElementById('userInput');
  const sendBtn = document.getElementById('sendBtn');

  function addMessage(sender, message) {
    const msgElement = document.createElement('div');
    msgElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatbox.appendChild(msgElement);
    chatbox.scrollTop = chatbox.scrollHeight;
  }

  async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    addMessage('You', message);
    userInput.value = '';

    try {
      const response = await fetch('http://localhost:5500/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message })
      });

      const data = await response.json();
      addMessage('DeepSeek', data.reply);
    } catch (error) {
      addMessage('System', `Error: ${error.message}`);
      console.error('Error:', error);
    }
  }