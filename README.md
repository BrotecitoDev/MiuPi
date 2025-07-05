# Traductor Broteñol

Este proyecto muestra un ejemplo muy sencillo de traducción del español a un idioma ficticio llamado **broteñol** utilizando un modelo pequeño de TensorFlow.js alojado en GitHub Pages.

## Uso
1. Abre `index.html` en un navegador con conexión a Internet.
2. Escribe un texto en español y pulsa **Traducir**.
3. Verás la traducción generada por el modelo.

El modelo se carga con `tf.loadLayersModel('model.json')` y está formado por `model.json` y el archivo de pesos `group1-shard1of1.bin`.
