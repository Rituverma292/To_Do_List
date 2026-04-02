let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

// Save to Local Storage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add Task
function addTask() {
    const input = document.getElementById("taskInput");
    const date = document.getElementById("dueDate");

    if (input.value.trim() === "") {
        alert("Task cannot be empty!");
        return;
    }

    tasks.push({
        text: input.value,
        completed: false,
        date: date.value
    });

    input.value = "";
    date.value = "";

    saveTasks();
    renderTasks();
}

// Render Tasks
function renderTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    let filtered = tasks.filter(task => {
        if (currentFilter === "completed") return task.completed;
        if (currentFilter === "pending") return !task.completed;
        return true;
    });
    
filtered.forEach((task) => {
    let realIndex = tasks.indexOf(task);

    let li = document.createElement("li");
    if (task.completed) li.classList.add("completed");

    li.innerHTML = `
        <span onclick="toggleComplete(${realIndex})">
            ${task.text} ${task.date ? `<small>(${task.date})</small>` : ""}
        </span>
        <div class="actions">
            <i class="fa fa-edit" onclick="editTask(${realIndex})"></i>
            <i class="fa fa-trash" onclick="deleteTask(${realIndex})"></i>
        </div>
    `;

    list.appendChild(li);
});

    updateStats();
}

// Toggle Complete
function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

// Delete Task
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

// Edit Task
function editTask(index) {
    let newTask = prompt("Edit task:", tasks[index].text);
    if (newTask !== null && newTask.trim() !== "") {
        tasks[index].text = newTask;
        saveTasks();
        renderTasks();
    }
}

// Filter
function filterTasks(type) {
    currentFilter = type;
    renderTasks();
}

// Stats
function updateStats() {
    document.getElementById("total").innerText = tasks.length;
    document.getElementById("completed").innerText =
        tasks.filter(t => t.completed).length;
}



// Initial Load
renderTasks();