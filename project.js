document.getElementById("addTask").addEventListener("click", function () {
    let taskInput = document.getElementById("taskInput").value.trim();
    if (taskInput === "") return;

    addTaskToDOM(taskInput, false);
    document.getElementById("taskInput").value = "";
    fetchQuote();
    saveTasks();
});

function addTaskToDOM(text, isCompleted) {
    let taskList = document.getElementById("taskList");
    let taskItem = document.createElement("li");

    if (isCompleted) taskItem.classList.add("completed");
    taskItem.innerText = text;

    // Toggle completion on click
    taskItem.addEventListener("click", function () {
        taskItem.classList.toggle("completed");
        saveTasks(); // Update completion state in storage
    });

    // Delete button
    let deleteButton = document.createElement("button");
    deleteButton.innerText = "❌";
    deleteButton.addEventListener("click", function (event) {
        event.stopPropagation(); // Prevent toggling when clicking delete
        taskList.removeChild(taskItem);
        fetchQuote();
        saveTasks();
    });

    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);
}

function fetchQuote() {
    fetch("https://api.quotable.io/random")
        .then(response => response.json())
        .then(data => {
            document.getElementById("quoteDisplay").innerText = `"${data.content}"`;
        })
        .catch(error => console.error("Error fetching quote:", error));
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach(task => {
        tasks.push({
            text: task.childNodes[0].nodeValue.trim(),
            completed: task.classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach(task => {
        addTaskToDOM(task.text, task.completed);
    });
}

window.onload = loadTasks;
