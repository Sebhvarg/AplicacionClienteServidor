const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { simularTransmision } = require('./utils');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post('/upload', (req, res) => {
    const { data } = req.body;

    const segmentos = simularTransmision(data);

    const dataOrdenada = segmentos.sort((a, b) => a.sequence - b.sequence)
                                .map(segmento => segmento.data)
                                .join('');

    const dir = path.join(__dirname, 'archivos');
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }

    const rutaArchivo = path.join(dir, 'data1.txt');
    fs.writeFileSync(rutaArchivo, dataOrdenada);

    const tieneError = segmentos.some(segmento => segmento.error);
    const faltaSegmentos = segmentos.filter(segmento => segmento.missing).length;

    if (tieneError || faltaSegmentos > 0) {
        res.json({ message: 'Archivo recibido con errores o segmentos faltantes.' });
    } else {
        res.json({ message: 'Archivo recibido correctamente.' });
    }
});

app.listen(3000, () => console.log('Servidor escuchando en el puerto 3000'));
