const openFormBtn = document.getElementById("openFormBtn");
const modal = document.getElementById("taskFormModal");
const closeBtn = document.querySelector(".close");
const cancelBtn = document.getElementById("cancelBtn");
const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");
const showCompletedBtn = document.getElementById("showCompletedBtn");
const showIncompleteBtn = document.getElementById("showIncompleteBtn");
const showAllBtn = document.getElementById("showAllBtn");

openFormBtn.addEventListener("click", () => {
    modal.style.display = "flex";
});

closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

cancelBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

taskForm.addEventListener("submit", (e) => {
    try {
        e.preventDefault();

        const title = document.getElementById("title").value;
        const description = document.getElementById("description").value;
        const priority = document.querySelector("input[name='priority']:checked").value;

        if (!title || !priority) {
            alert("Please fill in all required fields.");
            return;
        }

        addTask(title, description, priority);
        taskForm.reset();
        modal.style.display = "none";
    } catch (error) {
        console.error("An error occurred while adding the task:", error);
    }
});

function addTask(title, description, priority) {
    const taskItem = document.createElement("li");
    taskItem.classList.add("task-item", priority);

    taskItem.innerHTML = `
        <div>
            <strong>${title}</strong>
            <p>${description}</p>
        </div>
        <div class="task-buttons">
            <button class="completeBtn">Complete</button>
            <button class="deleteBtn">Delete</button>
        </div>
    `;

    if (priority === "low") {
        document.getElementById("lowTaskList").appendChild(taskItem);
    } else if (priority === "medium") {
        document.getElementById("mediumTaskList").appendChild(taskItem);
    } else if (priority === "high") {
        document.getElementById("highTaskList").appendChild(taskItem);
    }

    taskItem.classList.add("animate__animated", "animate__flipInX");
}

showCompletedBtn.addEventListener("click", () => {
    const tasks = document.querySelectorAll(".task-item");
    tasks.forEach(task => {
        if (task.classList.contains("completed")) {
            task.style.display = "flex";
        } else {
            task.style.display = "none";
        }
    });
});

showIncompleteBtn.addEventListener("click", () => {
    const tasks = document.querySelectorAll(".task-item");
    tasks.forEach(task => {
        if (!task.classList.contains("completed")) {
            task.style.display = "flex";
        } else {
            task.style.display = "none";
        }
    });
});

showAllBtn.addEventListener("click", () => {
    const tasks = document.querySelectorAll(".task-item");
    tasks.forEach(task => {
        task.style.display = "flex";
    });
});

taskList.addEventListener("click", (e) => {
    if (e.target.classList.contains("deleteBtn")) {
        e.target.closest("li").remove();
    } else if (e.target.classList.contains("completeBtn")) {
        e.target.closest("li").classList.toggle("completed");
        if (e.target.closest("li").classList.contains("completed")) {
            e.target.textContent = "Completed";
            e.target.classList.add("completed");
        } else {
            e.target.textContent = "Complete";
            e.target.classList.remove("completed");
        }
    }
    e.stopPropagation();
});
