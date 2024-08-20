const crypto = require('crypto');

// Calcular Checksum
function calcularChecksum(data) {
    var checkS = crypto.createHash('md5').update(data).digest('hex');
    console.log("Checksum: " + checkS);
    return checkS;
}

function simularTransmision(data) {
    const segmentos = dataSegmentada(data);
    return segmentos.map(segmento => applicarErroresRandom(segmento));
}

function dataSegmentada(data) {
    const tamanioSegmento = 50;  
    const segmentos = [];

    for (let i = 0; i < data.length; i += tamanioSegmento) {
        const dataSegmentada = data.slice(i, i + tamanioSegmento);
        const checksum = calcularChecksum(dataSegmentada);
        segmentos.push({ sequence: i / tamanioSegmento, data: dataSegmentada, checksum });
    }

    return segmentos;
}

function applicarErroresRandom(segmento) {
 
    // Simulación de pérdida de paquetes (30% de probabilidad)
    if (Math.random() < 0.1) {
        console.log("La data perdida es:" + segmento.data);
        segmento.data = '';
        console.log("El archivo sufrió pérdida de paquetes");
        return { ...segmento, missing: true };
    }

    // Simulación de cambio de bits (20% de probabilidad)
    if (Math.random() < 0.1) {
        console.log("La data con cambio de bits fue:" + segmento.data);
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
        const nuevoChecksum = calcularChecksum(dataCorrompida);
        console.log("Nuevo checksum: " + nuevoChecksum);
        console.log("El archivo sufrió cambio de bits");
        return { ...segmento, data: dataCorrompida, checksum: nuevoChecksum, error: true };
    }

    
    // Simulación de envío fuera de orden (20 % de probabilidad)
    if (Math.random() < 0.8) {
        console.log("La data con envío fuera de orden:" + segmento.data);
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
