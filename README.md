# Simulación de Errores en la Transmisión | Grupo 3 | P2
## Integrantes

- Sebastian Holguin
- Cristina Pihuave
- Gabriel Salas
<hr />

## Indicaciones y especificaciones

Se requiere diseñar una simulación de una aplicación en la que el cliente guarda datos en un servidor. El propósito es analizar el impacto de errores y fallas que pueden afectar el mensaje cuando está siendo transmitido, ya sea en el medio físico y/o al atravesar los dispositivos intermediarios. Las fallas que se deben analizar son: envío fuera de orden, perdida aleatoria de paquetes y falta de integridad del mensaje. El servidor debe recibir los datos, ordenarlos, y poder identificar si falta algo o si existe un error.

- Cliente recibe input (datos) del usuario (un archivo de txt) y lo envía al servidor.
- Servidor guarda el mensaje enviado en un archivo de texto.
- Segmentar y encapsular el mensaje inspirándose en las capas del modelo TCP/IP.
- Simular/Generar errores válidos y significativos.
  - Simular un envío fuera de orden (aleatorio)
  - Simular pérdida aleatoria de paquetes. (aleatorio)
  - Simular cambios de bits del mensaje. (aleatorio)
- El servidor ordena los segmentos recibidos e indica segmentos con errores/faltantes

<hr />

## Dependencias

Para poder ejecutar el servidor es necesario tener instalado `node.js`

[Node.js](https://nodejs.org/en)

<hr />

## Procedimiento
1. Ejecutar en la consola el servidor con el comando `node .\server.js` desde la carpeta server

   1.1. En la consola debe aparecer `Servidor escuchando en el puerto 3000`
2. Abrir el archivo `index.html` desde la carpeta client
3. Dar click en el botón _Choose File_
4. Seleccionar el archivo `.txt` a cargar
5. Dar click en el botón _Enviar_
6. Descargar el archivo en el botón _Descargar archivo_
7. Guardar el archivo nuevo y revisarlo 
8. Revisar los cambios y errores de la consola

<hr />

## Reporte en formato ACM

[Documento](https://espolec-my.sharepoint.com/:w:/g/personal/mpihuave_espol_edu_ec/EVvi7PjSS9NGkgAtKZThia4B-D1eVIOiWpODoHcoZBfm1w?e=3XvVsE)

