// Lista global de proyectos
let projects = [];

// Función para añadir un nuevo proyecto a la lista
function addProject() {
  const projectName = document.getElementById('new-project').value;

  if (projectName.trim() === '') {
    alert('Por favor, introduce un nombre válido para el proyecto.');
    return;
  }

  // Añadir el proyecto a la lista
  projects.push(projectName);

  // Renderizar los proyectos en la página
  renderProjects();

  // Limpiar el campo de entrada
  document.getElementById('new-project').value = '';
}

// Función para renderizar los proyectos en la lista de la página
function renderProjects() {
  const projectList = document.getElementById('projects');
  projectList.innerHTML = projects.map((p, i) => `<li>${i + 1}. ${p}</li>`).join('');
}

// Función para guardar proyectos en un archivo JSON en GitHub
async function saveToGitHub() {
  const token = prompt('Introduce tu token personal de GitHub:');
  const repo = 'nightmareglioficial/MyProjects'; // Cambia esto al nombre de tu repositorio
  const filePath = 'proyectos.json'; // Ruta del archivo en el repositorio
  const content = btoa(JSON.stringify(projects)); // Codificar la lista de proyectos en Base64

  alert('Intentando guardar los proyectos en GitHub...'); // Mensaje de depuración

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
      alert(`Error al guardar en GitHub: ${error.message}`);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Ocurrió un problema inesperado al guardar los proyectos.');
  }
}

// Función para recuperar proyectos guardados desde GitHub
async function retrieveProjectsFromGitHub() {
  const token = prompt('Introduce tu token personal de GitHub:');
  const repo = 'nightmareglioficial/MyProjects'; // Cambia esto al nombre de tu repositorio
  const filePath = 'proyectos.json'; // Ruta del archivo en el repositorio

  alert('Intentando recuperar los proyectos desde GitHub...'); // Mensaje de depuración

  try {
    const response = await fetch(`https://api.github.com/repos/${repo}/contents/${filePath}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      const fileData = await response.json();
      const decodedContent = atob(fileData.content); // Decodificar el contenido del archivo desde Base64
      projects = JSON.parse(decodedContent); // Convertir el contenido JSON en un arreglo

      renderProjects();

      alert('¡Proyectos recuperados correctamente!');
    } else {
      const error = await response.json();
      alert(`Error al recuperar los proyectos: ${error.message}`);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Ocurrió un problema inesperado al recuperar los proyectos.');
  }
}

// Vincular eventos de los botones HTML a las funciones
document.getElementById('add').addEventListener('click', addProject);
document.getElementById('save').addEventListener('click', saveToGitHub);
document.getElementById('retrieve').addEventListener('click', retrieveProjectsFromGitHub);
