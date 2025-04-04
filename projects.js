// Lista global para proyectos
let projects = [];

// Función para recuperar el archivo JSON desde un repositorio público
async function retrieveProjectsFromGitHub() {
  const repo = 'nightmareglioficial/MyProjects'; // Cambia esto por tu repositorio
  const filePath = 'project.json'; // Ruta exacta del archivo en el repositorio

  alert(`Intentando recuperar el archivo: ${filePath} desde el repositorio público.`);

  try {
    const response = await fetch(`https://api.github.com/repos/${repo}/contents/${filePath}`);

    if (response.ok) {
      const fileData = await response.json();
      const decodedContent = atob(fileData.content); // Decodificar contenido Base64
      projects = JSON.parse(decodedContent); // Convertir contenido JSON en arreglo

      renderProjects();

      alert('¡Proyectos recuperados correctamente desde el repositorio público!');
    } else {
      const error = await response.json();
      alert(`Error al recuperar proyectos: ${error.message}`);
    }
  } catch (error) {
    console.error('Error al intentar recuperar:', error);
    alert('Ocurrió un problema inesperado al recuperar los proyectos.');
  }
}

// Función para renderizar proyectos en la lista HTML
function renderProjects() {
  const projectList = document.getElementById('projects');
  projectList.innerHTML = projects.map((p, i) => `<li>${i + 1}. ${p}</li>`).join('');
}

// Función para añadir un nuevo proyecto
function addProject() {
  const projectName = document.getElementById('new-project').value;

  if (projectName.trim() === '') {
    alert('Por favor, introduce un nombre válido para el proyecto.');
    return;
  }

  projects.push(projectName);
  renderProjects();
  document.getElementById('new-project').value = '';
}

// Función para guardar proyectos en GitHub (requiere autenticación)
async function saveToGitHub() {
  alert('Guardar proyectos en GitHub requiere autenticación mediante token.');

  const token = prompt('Introduce tu token personal de GitHub:'); // Solicitar token al usuario
  const repo = 'nightmareglioficial/MyProjects'; // Cambia esto por tu repositorio
  const filePath = 'project.json'; // Ruta exacta del archivo en el repositorio
  const content = btoa(JSON.stringify(projects)); // Codificar contenido en Base64

  alert(`Intentando guardar el archivo: ${filePath} en el repositorio público.`);

  try {
    const response = await fetch(`https://api.github.com/repos/${repo}/contents/${filePath}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: 'Guardar proyectos',
        content: content
      })
    });

    if (response.ok) {
      alert('¡Proyectos guardados correctamente en GitHub!');
    } else {
      const error = await response.json();
      alert(`Error al guardar proyectos: ${error.message}`);
    }
  } catch (error) {
    console.error('Error al intentar guardar:', error);
    alert('Ocurrió un problema inesperado al guardar los proyectos.');
  }
}

// Vincular funciones a los botones en HTML
document.getElementById('retrieve').addEventListener('click', retrieveProjectsFromGitHub);
document.getElementById('add').addEventListener('click', addProject);
document.getElementById('save').addEventListener('click', saveToGitHub);
