function simularTransmision(data) {
    const segmentos = dataSegmentada(data);
    return segmentos.map(segmento => applicarErroresRandom(segmento));
}

function dataSegmentada(data) {
    const tamanioSegmento = 50;  // Ejemplo de tamaño de segmento
    const segmentos = [];

    for (let i = 0; i < data.length; i += tamanioSegmento) {
        const dataSegmentada = data.slice(i, i + tamanioSegmento);
        segmentos.push({ sequence: i / tamanioSegmento, data: dataSegmentada });
    }

    return segmentos;
}

function applicarErroresRandom(segmento) {
    // Simulación de pérdida de paquetes (60% de probabilidad)
    if (Math.random() < 0.6) {
        segmento.data = '';
        console.log("El archivo sufrió pérdida de paquetes");
        return { ...segmento, missing: true };
    }

    // Simulación de cambio de bits (70% de probabilidad)
    if (Math.random() < 0.7) {
        const dataCorrompida = segmento.data.split('').map(char => {
            if (Math.random() < 0.08) {
                const alterationType = Math.random();
                if (alterationType < 0.4) {
                    
                    return String.fromCharCode(Math.floor(Math.random() * 94) + 32);
                } else if (alterationType < 0.7) {
                    
                    if (/[a-zA-Z]/.test(char)) {
                        return char === char.toLowerCase() ? char.toUpperCase() : char.toLowerCase();
                    }
                } else {
                    
                    return String.fromCharCode(char.charCodeAt(0) + (Math.random() < 0.5 ? -1 : 1));
                }

            }
            return char;
        }).join('');
        console.log("El archivo sufrió cambio de bits");
        return { ...segmento, data: dataCorrompida, error: true };
    }

    // Simulación de envío fuera de orden (60 % de)
    if (Math.random() < 0.6) {
        if (Math.random() < 0.5) {
            segmento.sequence -= 1;
        } else {
            segmento.sequence += 1;
        }
        console.log("El archivo sufrió envío fuera de orden");
    }
    

    return segmento;
}

module.exports = { simularTransmision };
