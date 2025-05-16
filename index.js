document.getElementById("addTask").addEventListener("click", () => {
    const input = document.getElementById("taskInput");
    const taskText = input.value.trim();
    if (!taskText) return;

    addTaskToDOM(taskText, false);
    input.value = "";
    fetchQuote();
    saveTasks();
    updateTaskCount();
    updateDoneCount();
    updateDoneSectionVisibility();
});

document.getElementById("newQuote").addEventListener("click", fetchQuote);

function addTaskToDOM(text, isCompleted) {
    const taskList = document.getElementById("taskList");
    const doneList = document.getElementById("doneList");
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.textContent = text;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";

    deleteBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (li.parentElement === taskList) {
            taskList.removeChild(li);
        } else {
            doneList.removeChild(li);
        }
        fetchQuote();
        saveTasks();
        updateTaskCount();
        updateDoneCount();
        updateDoneSectionVisibility();
    });

    li.addEventListener("click", (e) => {
        if (e.target === deleteBtn) return;

        if (li.parentElement === taskList) {
            li.classList.add("completed");
            doneList.appendChild(li);
        } else {
            li.classList.remove("completed");
            taskList.appendChild(li);
        }

        saveTasks();
        updateTaskCount();
        updateDoneCount();
        updateDoneSectionVisibility();
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);

    if (isCompleted) {
        li.classList.add("completed");
        doneList.appendChild(li);
    } else {
        taskList.appendChild(li);
    }

    updateTaskCount();
    updateDoneCount();
    updateDoneSectionVisibility();
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
        tasks.push({ text, completed: false });
    });
    document.querySelectorAll("#doneList li").forEach(li => {
        const text = li.querySelector("span").textContent;
        tasks.push({ text, completed: true });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const saved = JSON.parse(localStorage.getItem("tasks")) || [];
    saved.forEach(task => addTaskToDOM(task.text, task.completed));
    updateTaskCount();
    updateDoneCount();
    updateDoneSectionVisibility();
}

function updateTaskCount() {
    const remaining = document.querySelectorAll("#taskList li").length;
    document.getElementById("taskCount").textContent = `You have ${remaining} task(s) remaining.`;
}

function updateDoneCount() {
    const completed = document.querySelectorAll("#doneList li").length;
    document.getElementById("doneCount").textContent = `✅ ${completed} task${completed !== 1 ? 's' : ''} done`;
}

function updateDoneSectionVisibility() {
    const doneSection = document.getElementById("doneSection");
    const doneTasks = document.querySelectorAll("#doneList li");
    doneSection.classList.toggle("visible", doneTasks.length > 0);
}

window.onload = () => {
    loadTasks();
    fetchQuote();
};
