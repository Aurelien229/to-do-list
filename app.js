import { addTask, markTaskAsCompleted, deleteCompletedTasks } from './function.js';

document.addEventListener('DOMContentLoaded', () => {
  // Récupère les données stockées localement sous la clé 'tasks' à partir du localStorage,
  // puis les analyse en tant que JSON pour les convertir en un objet JavaScript.
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  // Si aucune donnée n'est associée à la clé 'tasks' dans le localStorage,
  // la variable 'tasks' sera initialisée avec un tableau vide.


  // Mise à jour du HTML avec les tâches du stockage local
  tasks.forEach(task => addTask(task));

  // Récepteur d'événements pour l'ajout d'une nouvelle tâche
  document.getElementById('submit-button').addEventListener('click', () => {
    const newTaskInput = document.getElementById('new-task-input');
    const taskText = newTaskInput.value.trim();

    if (taskText !== '') {
      const newTask = { id: Date.now(), text: taskText, completed: false };
      addTask(newTask);
      tasks.push(newTask);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      newTaskInput.value = '';
    }
  });

  // Récepteur d'événements pour marquer une tâche comme terminée
  document.getElementById('task-list').addEventListener('change', event => {
    if (event.target.type === 'checkbox') {
      const taskId = parseInt(event.target.parentElement.getAttribute('data-id'));
      const task = tasks.find(task => task.id === taskId);

      markTaskAsCompleted(task);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  });

  // Récepteur d'événements pour la suppression des tâches achevées
  document.getElementById('delete-completed-button').addEventListener('click', () => {
    deleteCompletedTasks(tasks);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  });

  // Appeler deleteCompletedTasks après l'initialisation des tâches
  deleteCompletedTasks(tasks);
  // Récepteur d'événements pour la création d'une nouvelle liste
  document.getElementById('create-list-button').addEventListener('click', () => {
    createNewList();
});

 // Récepteur d'événements pour la création d'une nouvelle liste
    document.getElementById('create-list-button').addEventListener('click', () => {
        createNewListBasedOnExistingList();
    });

    // Fonction pour créer une nouvelle liste basée sur la liste existante
    function createNewListBasedOnExistingList() {
        // Sélectionnez la liste existante à partir du localStorage
        const existingList = JSON.parse(localStorage.getItem('tasks')) || [];

        // Vérifiez si la liste existante est vide
        if (existingList.length === 0) {
            alert('La liste existante est vide. Ajoutez des tâches avant de créer une nouvelle liste.');
            return;
        }

        // Dupliquez la liste existante pour créer une nouvelle liste
        const newList = [...existingList];

        // Enregistrez la nouvelle liste dans le stockage local (vous pouvez utiliser un nouveau nom ou le même, selon vos besoins)
        localStorage.setItem('newList', JSON.stringify(newList));

        // Vous pouvez également effectuer des actions supplémentaires ici, par exemple, mettre à jour l'interface utilisateur, etc.
        alert('Nouvelle liste créée avec succès en se basant sur la liste existante!');
    }
});

