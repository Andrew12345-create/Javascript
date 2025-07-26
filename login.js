document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value.trim();

  if (!email || !password) {
    alert('Please enter both email and password.');
    return;
  }

  // Here you can add authentication logic or call backend API for login
  // For now, just alert success and redirect to category selection or main app page


  alert('Login successful!');

  // Store user email in localStorage for session persistence
  localStorage.setItem('userEmail', email);

  // Redirect to quiz page after login
  window.location.href = 'quiz.html';
});
=======
  
// Login page JavaScript

document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value.trim();

  if (!email || !password) {
    alert('Please enter both email and password.');
    return;
  }

  // Here you can add authentication logic or call backend API for login
  // For now, just alert success and redirect to category selection or main app page

  alert('Login successful!');

  // Store user email in localStorage for session persistence
  localStorage.setItem('userEmail', email);

  // Redirect to quiz page after login
  window.location.href = 'quiz.html';
});
