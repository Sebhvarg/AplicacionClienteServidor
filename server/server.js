const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { simularTransmision } = require('./utils');
const os = require('os');
const { log } = require('console');

const app = express();

app.use(cors());
app.use(bodyParser.json());
// servir el archivo

app.get('/descargar', (req, res) => {
    const rutaArchivo = path.join(__dirname, 'archivos', 'data1.txt');
    if (fs.existsSync(rutaArchivo)) {
        res.download(rutaArchivo);
    } else {
        res.json({ message: 'El archivo no existe' });
    }
}
);



app.post('/upload', (req, res) => {
    var tiempoInicio = new Date();
    const { data } = req.body;

    const segmentos = simularTransmision(data);

    const dataOrdenada = segmentos.sort((a, b) => a.sequence - b.sequence)
                                .map(segmento => segmento.data)
                                .join('');


    // Crear directorio si no existe
    const dir = path.join(__dirname, 'archivos');
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }
    // Crear archivo con los datos ordenados
    const rutaArchivo = path.join(dir, 'data1.txt');
    fs.writeFileSync(rutaArchivo, dataOrdenada);

    const tieneError = segmentos.some(segmento => segmento.error); // Verificar si hay segmentos con errores
    const faltaSegmentos = segmentos.filter(segmento => segmento.missing).length; 

    if (tieneError || faltaSegmentos > 0) {
        res.json({ message: 'Archivo recibido con errores o segmentos faltantes.' });
    } else {
        res.json({ message: 'Archivo recibido correctamente.' });
    }

    
    // Tiempo de carga del archivo
    const tiempoFin = new Date();
    console.log("------------------------------------------------------------------------------");
    console.log(`Tiempo de carga del archivo: ${tiempoFin - tiempoInicio} ms`);
    tiempoInicio = tiempoFin;

});

// Función para obtener la IP del servidor
function obtenerIP() {
    const interfaces = os.networkInterfaces();
    for (const nombre in interfaces) {
        for (const interfaz of interfaces[nombre]) {
            if (interfaz.family === 'IPv4' && !interfaz.internal) {
                return interfaz.address;
            }
        }
    }
    return 'No se pudo determinar la IP';
}

// indicar si el servidor esta escuchando
const puerto = 3000;
app.listen(puerto, () => {
    
    console.log(`Servidor escuchando en el puerto ${puerto}`);
    console.log(`IP del servidor: ${obtenerIP()}`);
});
