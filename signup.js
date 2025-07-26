// Sign up page JavaScript

document.getElementById('signup-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('signup-email').value.trim();
  const password = document.getElementById('signup-password').value.trim();

  if (!email || !password) {
    alert('Please enter both email and password.');
    return;
  }

  // Here you can add sign up logic or call backend API for registration
  // For now, just alert success and redirect to login page

  alert('Sign up successful! Please login.');

  // Redirect to login page
  window.location.href = 'login.html';
});
