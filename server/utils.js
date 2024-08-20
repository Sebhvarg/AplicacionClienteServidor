function simulateTransmission(data) {
    const segments = segmentData(data);
    return segments.map(segment => applyRandomErrors(segment));
}

function segmentData(data) {
    const segmentSize = 50;  // Ejemplo de tamaño de segmento
    const segments = [];

    for (let i = 0; i < data.length; i += segmentSize) {
        const segmentData = data.slice(i, i + segmentSize);
        segments.push({ sequence: i / segmentSize, data: segmentData });
    }

    return segments;
}

function applyRandomErrors(segment) {
    // Simulación de pérdida de paquetes (20% de probabilidad)
    if (Math.random() < 0.2) {
        return { ...segment, missing: true };
    }

    // Simulación de cambio de bits (10% de probabilidad)
    if (Math.random() < 0.1) {
        const corruptedData = segment.data.split('').map(char => {
            if (Math.random() < 0.05) {
                return String.fromCharCode(char.charCodeAt(0) + 1);  // Modificación simple
            }
            return char;
        }).join('');
        return { ...segment, data: corruptedData, error: true };
    }

    // Simulación de envío fuera de orden
    segment.sequence += Math.random() < 0.3 ? (Math.random() < 0.5 ? -1 : 1) : 0;

    return segment;
}

module.exports = { simulateTransmission };
