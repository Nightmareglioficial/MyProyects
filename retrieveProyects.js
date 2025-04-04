document.getElementById('retrieve').addEventListener('click', async () => {
  const token = prompt('Introduce tu token personal de GitHub:'); // Solicita el token al usuario
  const repo = 'nightmareglioficial/MyProjects'; // Cambia a tu repositorio
  const filePath = 'proyectos.json'; // Ruta del archivo en el repositorio

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
      const decodedContent = atob(fileData.content); // Decodifica el contenido de Base64
      const projects = JSON.parse(decodedContent); // Convierte el contenido en JSON

      // Renderiza los proyectos en la página
      const projectList = document.getElementById('projects');
      projectList.innerHTML = projects.map((p, i) => `<li>${i + 1}. ${p}</li>`).join('');

      alert('¡Proyectos recuperados correctamente!');
    } else {
      const error = await response.json();
      alert(`Error al recuperar los proyectos: ${error.message}`);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Ocurrió un problema al recuperar los proyectos.');
  }
});
