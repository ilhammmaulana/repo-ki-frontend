const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const clearAllButton = document.getElementById('clear-all');

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTaskToDOM(task));
}

function addTaskToDOM(task) {
    const li = document.createElement('li');
    li.textContent = task;
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteTask(task, li));
    li.appendChild(deleteButton);
    todoList.appendChild(li);
}

function addTaskToStorage(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function deleteTask(task, li) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(t => t !== task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    li.remove();
}

function clearAllTasks() {
    localStorage.clear();
    todoList.innerHTML = '';
}

todoForm.addEventListener('submit', e => {
    e.preventDefault();
    const task = todoInput.value.trim();
    if (task) {
        addTaskToDOM(task);
        addTaskToStorage(task);
        todoInput.value = '';
    }
});

clearAllButton.addEventListener('click', clearAllTasks);

loadTasks();