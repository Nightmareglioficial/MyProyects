document.getElementById('upload').addEventListener('click', async () => {
  const fileInput = document.getElementById('file-input');

  // Verifica si el usuario seleccionó un archivo
  if (fileInput.files.length === 0) {
    alert('Por favor selecciona un archivo antes de subirlo.');
    return;
  }

  const file = fileInput.files[0];
  const fileName = file.name;

  // Leer el contenido del archivo
  const reader = new FileReader();
  reader.onload = async (event) => {
    const fileContent = event.target.result;
    const encodedContent = btoa(fileContent); // Codificar en Base64

    const token = prompt('Introduce tu token personal de GitHub:'); // Solicitar token al usuario
    const repo = 'nightmareglioficial/MyProjects'; // Cambia a tu repositorio
    const filePath = fileName; // El archivo se subirá con su nombre original

    try {
      const response = await fetch(`https://api.github.com/repos/${repo}/contents/${filePath}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: `Subir archivo: ${fileName}`,
          content: encodedContent
        })
      });

      if (response.ok) {
        alert('¡Archivo subido correctamente a GitHub!');
      } else {
        const error = await response.json();
        alert(`Error al subir el archivo: ${error.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Ocurrió un problema al subir el archivo.');
    }
  };

  reader.readAsText(file); // Leer contenido del archivo como texto
});
