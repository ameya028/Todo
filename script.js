document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => addTaskToDOM(task));
    };

    const saveTasks = () => {
        const tasks = Array.from(taskList.children).map(item => ({
            text: item.querySelector('span').textContent,
            date: item.dataset.date
        }));
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const addTaskToDOM = (task) => {
        const li = document.createElement('li');
        li.className = 'task-item';
        li.dataset.date = task.date;

        const span = document.createElement('span');
        span.textContent = `${task.text} (Added: ${task.date})`;
        li.appendChild(span);

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.className = 'edit-btn';
        editBtn.onclick = () => editTask(li, span);
        li.appendChild(editBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';
        deleteBtn.onclick = () => {
            li.remove();
            saveTasks();
        };
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    };

    const editTask = (li, span) => {
        const newText = prompt('Edit task:', span.textContent.split(' (Added:')[0]);
        if (newText) {
            const date = li.dataset.date;
            span.textContent = `${newText} (Added: ${date})`;
            saveTasks();
        }
    };

    addTaskBtn.onclick = () => {
        const text = taskInput.value.trim();
        if (text) {
            const date = new Date().toLocaleString();
            const task = { text, date };
            addTaskToDOM(task);
            saveTasks();
            taskInput.value = '';
        }
    };

    loadTasks();
});
