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
    console.log('CHANGED',event)
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

});



