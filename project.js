// Event listener for adding a task
document.getElementById("addTask").addEventListener("click", () => {
    const input = document.getElementById("taskInput");
    const taskText = input.value.trim();

    if (!taskText) return; // Exit if input is empty

    addTaskToDOM(taskText, false); // Add task to the DOM
    input.value = ""; // Clear input field
    fetchQuote(); // Fetch a new quote
    saveTasks(); // Save tasks to localStorage
});

// Event listener for fetching a new quote
document.getElementById("newQuote").addEventListener("click", fetchQuote);

// Function to add a task to the DOM
function addTaskToDOM(text, isCompleted) {
    const taskList = document.getElementById("taskList");
    const li = document.createElement("li");

    if (isCompleted) li.classList.add("completed"); // Mark as completed if applicable

    const taskText = document.createElement("span");
    taskText.textContent = text;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";

    // Event listener for deleting a task
    deleteBtn.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent triggering parent click event
        taskList.removeChild(li); // Remove task from the list
        fetchQuote(); // Fetch a new quote
        saveTasks(); // Save updated tasks
    });

    // Event listener for toggling task completion
    li.addEventListener("click", () => {
        li.classList.toggle("completed");
        saveTasks(); // Save updated tasks
    });

    li.appendChild(taskText); // Add task text to the list item
    li.appendChild(deleteBtn); // Add delete button to the list item
    taskList.appendChild(li); // Add list item to the task list
}

// Function to fetch a random Chuck Norris quote
function fetchQuote() {
    fetch("https://api.chucknorris.io/jokes/random")
        .then((res) => res.json())
        .then((data) => {
            document.getElementById("quoteDisplay").textContent = `"${data.value}"`;
        })
        .catch((err) => {
            document.getElementById("quoteDisplay").textContent = "Chuck Norris is thinking. Try again.";
            console.error("Quote error:", err);
        });
}

// Function to save tasks to localStorage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#taskList li").forEach((li) => {
        const text = li.querySelector("span").textContent;
        const completed = li.classList.contains("completed");
        tasks.push({ text, completed });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to load tasks from localStorage
function loadTasks() {
    const saved = JSON.parse(localStorage.getItem("tasks")) || [];
    saved.forEach((task) => addTaskToDOM(task.text, task.completed));
}

// Load tasks and fetch a quote when the page loads
window.onload = () => {
    loadTasks();
    fetchQuote();
};