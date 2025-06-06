// // Create form and elements
// document.body.innerHTML = `
//   <form id="userForm">
//     <label for="name">Name:</label>
//     <input id="name" name="name" required>
//     <br>
//     <label for="age">Age:</label>
//     <input id="age" name="age" type="number" min="0" required>
//     <br>
//     <button type="submit">Submit</button>
//   </form>
//   <div id="message"></div>
// `;

// const form = document.getElementById('userForm');
// const messageDiv = document.getElementById('message');

// form.onsubmit = e => {
//   e.preventDefault();
//   const name = form.name.value.trim();
//   const age = parseInt(form.age.value, 10);

//   let msg = '', color = '', bg = '';
//   if (!name || isNaN(age)) {
//     msg = "Please enter valid information."; color = "red";
//   } else if (age < 0) {
//     msg = "Age cannot be negative."; color = "red"; bg = "#f8d7da";
//   } else if (age > 1000) {
//     msg = "That is soo dumb, you can't be that old!"; color = "red"; bg = "#f8d7da";
//   } else if (age > 120) {
//     msg = "Please enter a realistic age."; color = "red"; bg = "#f8d7da";
//   } else if (age >= 18) {
//     msg = `Hello <strong>${name}</strong>! 🎉<br>You're allowed to enter the site.`; color = "green"; bg = "#d4edda";
//   } else {
//     msg = `Sorry <strong>${name}</strong>, you're not allowed to access this page. 🚫`; color = "darkred"; bg = "#f8d7da";
//   }
//   messageDiv.innerHTML = msg;
//   messageDiv.style.color = color;
//   document.body.style.backgroundColor = bg;
// };

const form = document.getElementById('userForm');
const messageDiv = document.getElementById('message');

form.onsubmit = e => {
  e.preventDefault();
  const name = form.name.value.trim();
  const age = parseInt(form.age.value, 10);

  let msg = '', color = '', bg = '';
  if (!name || isNaN(age)) {
    msg = "Please enter valid information."; color = "red";
  } else if (age < 0) {
    msg = "Age cannot be negative."; color = "red"; bg = "#f8d7da";
  } else if (age > 1000) {
    msg = "That is soo dumb, you can't be that old!"; color = "red"; bg = "#f8d7da";
  } else if (age > 120) {
    msg = "Please enter a realistic age."; color = "red"; bg = "#f8d7da";
  } else if (age >= 18) {
    msg = `Hello <strong>${name}</strong>! 🎉<br>You're allowed to enter the site.`; color = "green"; bg = "#d4edda";
  } else {
    msg = `Sorry <strong>${name}</strong>, you're not allowed to access this page. 🚫`; color = "darkred"; bg = "#f8d7da";
  }

  messageDiv.innerHTML = msg;
  messageDiv.style.color = color;
  document.body.style.backgroundColor = bg;
};
