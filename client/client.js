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
document.getElementById('btnDescargar').addEventListener('click', async () => {
    const response = await fetch('http://localhost:3000/descargar');
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data1.txt';
    a.click();
    URL.revokeObjectURL(url);
}
);

