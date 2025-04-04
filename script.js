let projects = []; // Lista de proyectos

function addProject() {
  const projectName = document.getElementById('new-project').value;
  if (projectName.trim() === '') {
    alert('Por favor, introduce un nombre válido para el proyecto.');
    return;
  }
  projects.push(projectName); // Añadir proyecto a la lista
  renderProjects();
  document.getElementById('new-project').value = ''; // Limpia el campo de texto
