// Cargar y configurar la API de Google
function loadGoogleAPI() {
  gapi.load('client:auth2', () => {
    gapi.auth2.init({
      client_id: '890406186782-oaip2pgh1v703oud0iso2a1ol3s947g3.apps.googleusercontent.com', // Reemplaza con tu Client ID
      scope: 'https://www.googleapis.com/auth/drive.file'
    }).then(() => {
      console.log('API de Google cargada e inicializada.');
    });
  });
}

// Autenticar al usuario
async function authenticateUser() {
  try {
    await gapi.auth2.getAuthInstance().signIn();
    console.log('Usuario autenticado correctamente.');
    alert('¡Autenticado con Google!');
  } catch (error) {
    console.error('Error al autenticar:', error);
    alert('No se pudo autenticar al usuario.');
  }
}

// Cargar la API de Google Drive
async function loadDriveAPI() {
  try {
    await gapi.client.load('https://www.googleapis.com/discovery/v1/apis/drive/v3/rest');
    console.log('API de Google Drive cargada.');
  } catch (error) {
    console.error('Error al cargar la API de Google Drive:', error);
    alert('No se pudo cargar la API de Google Drive.');
  }
}

// Función para recuperar un archivo JSON desde Google Drive
async function retrieveFromGoogleDrive(fileId) {
  try {
    const response = await gapi.client.drive.files.get({
      fileId: fileId,
      alt: 'media'
    });
    const data = JSON.parse(response.body); // Convertir el contenido JSON
    console.log('Archivo recuperado:', data);
    alert('¡Archivo recuperado correctamente desde Google Drive!');
    return data; // Devuelve el contenido
  } catch (error) {
    console.error('Error al recuperar el archivo:', error);
    alert('Error al recuperar el archivo desde Google Drive.');
  }
}

// Función para guardar un archivo JSON en Google Drive
async function saveToGoogleDrive(fileName, content) {
  try {
    const response = await gapi.client.drive.files.create({
      resource: {
        name: fileName,
        mimeType: 'application/json'
      },
      media: {
        mimeType: 'application/json',
        body: JSON.stringify(content)
      }
    });
    console.log('Archivo guardado exitosamente:', response.result);
    alert('¡Archivo guardado exitosamente en Google Drive!');
  } catch (error) {
    console.error('Error al guardar el archivo:', error);
    alert('Error al guardar el archivo en Google Drive.');
  }
}

// Función para renderizar proyectos en una lista
function renderProjects(projects) {
  const projectList = document.getElementById('projects');
  projectList.innerHTML = projects.map((p, i) => `<li>${i + 1}. ${p.nombre} - ${p.descripcion}</li>`).join('');
}

// Función para añadir un nuevo proyecto
function addProject() {
  const projectName = document.getElementById('new-project-name').value;
  const projectDescription = document.getElementById('new-project-description').value;

  if (projectName.trim() === '' || projectDescription.trim() === '') {
    alert('Por favor, introduce un nombre y descripción válidos.');
    return;
  }

  projects.push({ nombre: projectName, descripcion: projectDescription });
  renderProjects(projects);
  document.getElementById('new-project-name').value = '';
  document.getElementById('new-project-description').value = '';
}

// Variables y botones iniciales
let projects = []; // Lista global para proyectos
document.getElementById('authenticate').addEventListener('click', authenticateUser);
document.getElementById('load').addEventListener('click', loadDriveAPI);
document.getElementById('retrieve').addEventListener('click', () => {
  const fileId = prompt('Introduce el ID del archivo en Google Drive:');
  retrieveFromGoogleDrive(fileId).then((data) => {
    projects = data.proyectos || []; // Actualizar proyectos
    renderProjects(projects);
  });
});
document.getElementById('save').addEventListener('click', () => {
  const fileName = 'project.json';
  saveToGoogleDrive(fileName, { proyectos: projects });
});
document.getElementById('add').addEventListener('click', addProject);
