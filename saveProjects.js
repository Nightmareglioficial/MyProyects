async function saveToGitHub() {
  const token = prompt('Introduce tu token de GitHub'); // Pide al usuario su token personal
  const repo = 'nightmareglioficial/MyProjects'; // Repositorio en GitHub
  const filePath = 'proyectos.json'; // Nombre del archivo a guardar
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
  } catch (err) {
    console.error('Error:', err);
    alert('Ocurrió un problema al guardar.');
  }
}

document.getElementById('save').onclick = saveToGitHub;
