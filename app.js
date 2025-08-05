  
  const addTaskBtn = document.getElementById('add-task');
  const taskTitle = document.getElementById('task-title');
  const taskDesc = document.getElementById('task-desc');
  const taskList = document.getElementById('task-list');

  document.addEventListener('DOMContentLoaded', loadTasks);

  function saveTasks() {
    const tasks = [];
    document.querySelectorAll('.task').forEach(task => {
      const title = task.querySelector('h3').textContent;
      const desc = task.querySelector('p').textContent;
      tasks.push({ title, desc });
    });
    localStorage.setItem('empleados', JSON.stringify(tasks));
  }

  function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('empleados')) || [];
    if (savedTasks.length > 0) {
      taskList.innerHTML = '';
      savedTasks.forEach(task => {
        const taskDiv = createTaskElement(task.title, task.desc);
        taskList.appendChild(taskDiv);
      });
    }
  }

  function createTaskElement(title, desc) {
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task');

    const titleEl = document.createElement('h3');
    titleEl.textContent = title;

    const descEl = document.createElement('p');
    descEl.textContent = desc || 'Sin descripción';

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Editar';
    editBtn.addEventListener('click', () => {
      const newTitle = prompt('Editar nombre:', titleEl.textContent);
      if (newTitle !== null && newTitle.trim() !== '') {
        titleEl.textContent = newTitle.trim();
      }
      const newDesc = prompt('Editar descripción:', descEl.textContent);
      if (newDesc !== null) {
        descEl.textContent = newDesc.trim() || 'Sin descripción';
      }
      saveTasks();
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Eliminar';
    deleteBtn.classList.add('btn-delete');
    deleteBtn.addEventListener('click', () => {
      taskDiv.remove();
      if (taskList.children.length === 0) {
        showEmptyMessage();
      }
      saveTasks();
    });

    taskDiv.appendChild(titleEl);
    taskDiv.appendChild(descEl);
    taskDiv.appendChild(editBtn);
    taskDiv.appendChild(deleteBtn);

    return taskDiv;
  }

  function showEmptyMessage() {
    const emptyMsg = document.createElement('p');
    emptyMsg.classList.add('empty-message');
    emptyMsg.textContent = 'Aún no has agregado un empleado.';
    taskList.appendChild(emptyMsg);
  }

  addTaskBtn.addEventListener('click', () => {
    const title = taskTitle.value.trim();
    const desc = taskDesc.value.trim();

    if (!title) {
      alert('Por favor, escribe un nombre.');
      return;
    }

    const emptyMsg = taskList.querySelector('.empty-message');
    if (emptyMsg) {
      emptyMsg.remove();
    }

    const taskDiv = createTaskElement(title, desc);
    taskList.appendChild(taskDiv);

    taskTitle.value = '';
    taskDesc.value = '';

    saveTasks();
  });
