// Variables globales
let projects = []; // Lista para almacenar proyectos

// Añadir un nuevo proyecto
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

// Renderizar la lista de proyectos
function renderProjects() {
  const projectList = document.getElementById('projects');
  projectList.innerHTML = projects.map((p, i) => `<li>${i + 1}. ${p}</li>`).join('');
}

// Guardar proyectos en GitHub
async function saveToGitHub() {
  const token = prompt('Introduce tu token personal de GitHub:');
  const repo = 'nightmareglioficial/MyProjects'; // Cambia esto a tu repositorio
  const filePath = 'proyectos.json'; // Nombre del archivo
  const content = btoa(JSON.stringify(projects)); // Codificar en Base64

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
    alert('Ocurrió un problema al guardar.');
  }
}

// Recuperar proyectos guardados desde GitHub
async function retrieveProjectsFromGitHub() {
  const token = prompt('Introduce tu token personal de GitHub:');
  const repo = 'nightmareglioficial/MyProjects'; // Cambia esto a tu repositorio
  const filePath = 'proyectos.json'; // Ruta del archivo

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
      const decodedContent = atob(fileData.content); // Decodificar Base64
      projects = JSON.parse(decodedContent); // Convertir JSON en arreglo

      // Renderizar los proyectos recuperados
      renderProjects();

      alert('¡Proyectos recuperados correctamente!');
    } else {
      const error = await response.json();
      alert(`Error al recuperar proyectos: ${error.message}`);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Ocurrió un problema al recuperar los proyectos.');
  }
}

// Asignar eventos a los botones
document.getElementById('add').addEventListener('click', addProject);
document.getElementById('save').addEventListener('click', saveToGitHub);
document.getElementById('retrieve').addEventListener('click', retrieveProjectsFromGitHub);
