// Fonction pour supprimer les tâches terminées du tableau de tâches et de l'affichage.
export function deleteCompletedTasks(tasks) {
  // Récupère la liste des tâches dans le document.
  const taskList = document.getElementById('task-list');
  
  // Sélectionne toutes les tâches terminées à l'aide d'une requête DOM et d'un filtre.
  const completedTasks = Array.from(taskList.querySelectorAll('li')).filter(task => {
      return task.querySelector('input[type="checkbox"]').checked;
  });

  // Parcourt toutes les tâches terminées, les supprime du tableau de tâches et les retire de l'affichage.
  completedTasks.forEach(task => {
      // Récupère l'identifiant de la tâche à partir de l'attribut 'data-id'.
      const taskId = parseInt(task.getAttribute('data-id'));
      // Trouve l'index de la tâche dans le tableau de tâches.
      const index = tasks.findIndex(task => task.id === taskId);

      // Vérifie si la tâche a été trouvée dans le tableau.
      if (index !== -1) {
          // Supprime la tâche du tableau de tâches.
          tasks.splice(index, 1);
          // Supprime la tâche de l'affichage.
          task.remove();
      }
  });
}

// Fonction pour ajouter une nouvelle tâche à la liste de tâches.
export function addTask(task) {
  // Récupère la liste des tâches dans le document.
  const taskList = document.getElementById('task-list');

  // Crée un nouvel élément de liste (li) pour la nouvelle tâche.
  const taskItem = document.createElement('li');
  taskItem.classList.add('task-item');
  taskItem.setAttribute('data-id', task.id);

  // Crée un élément span pour afficher le texte de la tâche.
  const taskText = document.createElement('span');
  taskText.textContent = task.text;

  // Crée une case à cocher et configure son état (cochée ou non).
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = task.completed;

  // Ajoute le texte de la tâche et la case à cocher à l'élément de liste.
  taskItem.append(taskText, checkbox);

  // Ajoute l'élément de liste à la liste des tâches dans le document.
  taskList.appendChild(taskItem);

  // Si la tâche est marquée comme terminée, ajoute la classe 'completed' au texte de la tâche.
  if (task.completed) {
      taskText.classList.add('completed');
  }
}

// Fonction pour marquer une tâche comme terminée ou non terminée.
export function markTaskAsCompleted(task) {
  // Récupère l'élément span de la tâche à partir de son identifiant.
  const taskText = document.querySelector(`li[data-id="${task.id}"] span`);

  // Vérifie si l'élément span de la tâche a été trouvé.
  if (taskText) {
      // Inverse l'état de terminaison de la tâche et applique ou retire la classe 'completed' au texte de la tâche.
      task.completed = !task.completed;
      taskText.classList.toggle('completed', task.completed);
  }
}


