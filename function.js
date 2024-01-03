// Fonction pour supprimer les tâches terminées du tableau de tâches et de l'affichage.
export function deleteCompletedTasks(tasks) {
  const taskList = document.getElementById('task-list');
  
  const completedTasks = Array.from(taskList.querySelectorAll('li')).filter(taskElement => {
    return taskElement.querySelector('input[type="checkbox"]').checked;
  });

  completedTasks.forEach(taskElement => {
    const taskId = parseInt(taskElement.getAttribute('data-id'), 10);
    const index = tasks.findIndex(task => task.id === taskId);

    if (index !== -1) {
      tasks.splice(index, 1);
      taskElement.remove();
    }
  });
}

// Fonction pour ajouter une nouvelle tâche à la liste de tâches.
export function addTask(task) {
  const taskList = document.getElementById('task-list');

  const taskItem = document.createElement('li');
  taskItem.classList.add('task-item');
  taskItem.setAttribute('data-id', task.id);

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = task.completed;

  const taskText = document.createElement('span');
  taskText.textContent = task.text;

  taskItem.append(checkbox, taskText);

  taskText.addEventListener('click', () => {
    checkbox.checked = !checkbox.checked;
    markTaskAsCompleted(task);
  });

  taskList.appendChild(taskItem);

  if (task.completed) {
    taskText.classList.add('completed');
  }
}

// Fonction pour marquer une tâche comme terminée ou non terminée.
export function markTaskAsCompleted(task) {
  const taskText = document.querySelector(`li[data-id="${task.id}"] span`);

  if (taskText) {
    task.completed = !task.completed;
    taskText.classList.toggle('completed', task.completed);
  }
}


