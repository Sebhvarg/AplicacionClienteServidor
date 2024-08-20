function simularTransmision(data) {
    const segmentos = dataSegmentada(data);
    return segmentos.map(segmento => applicarErroresRandom(segmento));
}

function dataSegmentada(data) {
    const tamanioSegmento = 50;  // Ejemplo de tamaño de segmento
    const segmentos = [];

    for (let i = 0; i < data.length; i += tamanioSegmento) {
        const dataSegmentada = data.slice(i, i + tamanioSegmento);
        segmentso.push({ sequence: i / tamanioSegmento, data: dataSegmentada });
    }

    return segmentos;
}

function applicarErroresRandom(segmento) {
    // Simulación de pérdida de paquetes (20% de probabilidad)
    if (Math.random() < 0.2) {
        return { ...segmento, missing: true };
    }

    // Simulación de cambio de bits (10% de probabilidad)
    if (Math.random() < 0.1) {
        const dataCorrompida = segmento.data.split('').map(char => {
            if (Math.random() < 0.05) {
                return String.fromCharCode(char.charCodeAt(0) + 1);  // Modificación simple
            }
            return char;
        }).join('');
        return { ...segmentp, data: dataCorrompida, error: true };
    }

    // Simulación de envío fuera de orden
    segmento.sequence += Math.random() < 0.3 ? (Math.random() < 0.5 ? -1 : 1) : 0;

    return segmento;
}

module.exports = { simularTransmision };
