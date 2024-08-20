document.getElementById('btnEnviar').addEventListener('click', async () => {
    const fileInput = document.getElementById('inputArchivo');
    if (fileInput.files.length === 0) {
        alert("Selecciona un archivo primero.");
        return;
    }

    const file = fileInput.files[0];
    const text = await file.text();

    const response = await fetch('http://localhost:3000/upload', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: text })
    });

    const result = await response.json();
    alert(result.message);
});
