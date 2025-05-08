document.getElementById("addTask").addEventListener("click", () => {
    const input = document.getElementById("taskInput");
    const taskText = input.value.trim();
    if (!taskText) return;

    addTaskToDOM(taskText, false);
    input.value = "";
    fetchQuote();
    saveTasks();
});

document.getElementById("newQuote").addEventListener("click", fetchQuote);

function addTaskToDOM(text, isCompleted) {
    const taskList = document.getElementById("taskList");
    const li = document.createElement("li");
    if (isCompleted) li.classList.add("completed");

    const taskText = document.createElement("span");
    taskText.textContent = text;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";

    deleteBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        taskList.removeChild(li);
        fetchQuote();
        saveTasks();
    });

    li.addEventListener("click", () => {
        li.classList.toggle("completed");
        saveTasks();
    });

    li.appendChild(taskText);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

function fetchQuote() {
    fetch("https://api.chucknorris.io/jokes/random")
        .then(res => res.json())
        .then(data => {
            document.getElementById("quoteDisplay").textContent = `"${data.value}"`;
        })
        .catch(err => {
            document.getElementById("quoteDisplay").textContent = "Chuck Norris is thinking. Try again.";
            console.error("Quote error:", err);
        });
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        const text = li.querySelector("span").textContent;
        const completed = li.classList.contains("completed");
        tasks.push({ text, completed });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const saved = JSON.parse(localStorage.getItem("tasks")) || [];
    saved.forEach(task => addTaskToDOM(task.text, task.completed));
}

window.onload = () => {
    loadTasks();
    fetchQuote();
};
~