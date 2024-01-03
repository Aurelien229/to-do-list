import { addTask, markTaskAsCompleted, deleteCompletedTasks } from './function.js';

// Lorsque le contenu de la page est chargé
document.addEventListener('DOMContentLoaded', () => {
  // Récupère les tâches stockées localement ou initialise un tableau vide
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  // Ajoute chaque tâche à l'interface utilisateur
  tasks.forEach(task => addTask(task));

  // Récepteur d'événements pour l'ajout d'une nouvelle tâche
  document.getElementById('submit-button').addEventListener('click', () => {
    // Récupère la nouvelle tâche depuis l'input
    const newTaskInput = document.getElementById('new-task-input');
    const taskText = newTaskInput.value.trim();

    // Vérifie si la tâche n'est pas vide
    if (taskText !== '') {
      // Crée une nouvelle tâche
      const newTask = { id: Date.now(), text: taskText, completed: false };
      // Ajoute la tâche à l'interface utilisateur et au tableau de tâches
      addTask(newTask);
      tasks.push(newTask);
      // Met à jour le stockage local avec le nouveau tableau de tâches
      localStorage.setItem('tasks', JSON.stringify(tasks));
      // Réinitialise l'input
      newTaskInput.value = '';
    }
  });

  // Récepteur d'événements pour marquer une tâche comme terminée
  document.getElementById('task-list').addEventListener('change', event => {
    if (event.target.type === 'checkbox') {
      // Récupère l'ID de la tâche et la marque comme complétée
      const taskId = parseInt(event.target.parentElement.getAttribute('data-id'));
      const task = tasks.find(task => task.id === taskId);
      markTaskAsCompleted(task);
      // Met à jour le stockage local avec le tableau de tâches mis à jour
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  });

  // Récepteur d'événements pour la suppression des tâches complétées
  document.getElementById('delete-completed-button').addEventListener('click', () => {
    // Supprime les tâches complétées de l'interface utilisateur et du tableau de tâches
    deleteCompletedTasks(tasks);
    // Met à jour le stockage local avec le tableau de tâches mis à jour
    localStorage.setItem('tasks', JSON.stringify(tasks));
  });

  // Récepteur d'événements pour modifier une tâche au double-clic
  document.getElementById('task-list').addEventListener('dblclick', event => {
    if (event.target.tagName === 'SPAN') {
      // Récupère l'ID de la tâche et permet à l'utilisateur de modifier la description
      const taskId = parseInt(event.target.parentElement.getAttribute('data-id'));
      const task = tasks.find(task => task.id === taskId);

      const newDescription = prompt('Modifier la tâche :', task.text);
      // Met à jour la description de la tâche et le stockage local si une nouvelle description est fournie
      if (newDescription !== null) {
        task.text = newDescription;
        updateTaskDescription(taskId, newDescription);
        localStorage.setItem('tasks', JSON.stringify(tasks));
      }
    }
  });

  // Supprime les tâches complétées après l'initialisation
  deleteCompletedTasks(tasks);
});

// Fonction pour mettre à jour la description d'une tâche dans l'interface utilisateur
function updateTaskDescription(taskId, newDescription) {
  const taskText = document.querySelector(`li[data-id="${taskId}"] span`);

  if (taskText) {
    taskText.textContent = newDescription;
  }
}


