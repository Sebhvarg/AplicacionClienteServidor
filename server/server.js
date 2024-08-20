const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { simulateTransmission } = require('./utils');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post('/upload', (req, res) => {
    const { data } = req.body;

    const segments = simulateTransmission(data);

    const orderedData = segments.sort((a, b) => a.sequence - b.sequence)
                                .map(segment => segment.data)
                                .join('');

    const dir = path.join(__dirname, 'archivos');
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }

    const filePath = path.join(dir, 'data1.txt');
    fs.writeFileSync(filePath, orderedData);

    const hasError = segments.some(segment => segment.error);
    const missingSegments = segments.filter(segment => segment.missing).length;

    if (hasError || missingSegments > 0) {
        res.json({ message: 'Archivo recibido con errores o segmentos faltantes.' });
    } else {
        res.json({ message: 'Archivo recibido correctamente.' });
    }
});

app.listen(3000, () => console.log('Servidor escuchando en el puerto 3000'));
