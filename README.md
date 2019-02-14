IronBird

Descripción

El proyecto consiste en realizar un juego utilizando canvas, la dinámica del juego tendrá la base de un Flappy Birds con sprites customizados.

MVP - Tecnología (DOM - CANVAS)

Para la realización del juego se usarán principalmente canvas con algún detalle de manipulación del DOM.

Backlog

- Habrá un contador para recrear las puntuaciones.
- La base de las puntuaciones variará según el tiempo transcurrido además de un bonus al conseguir un elemento bonus.

Estructuras de Datos

La estructura será:

- Documento HTML
- Documento CSS
- Documento main.js: Documento que vincula las pantallas del juego.
- Documento game.js: Documento que engloba las diferentes clases del juego.
- Documento player.js: Documento que recoge la clase player con sus valores.
- Documento obstacles.js: Documento que recoge la clase obstacles con sus valores.
- Documento score.js: Documento con la clase score que recoge la logística de la puntuación.
- Documento map.js: Documento que recoge la clase base con sus valores.

States y States Transitions
Definicion del las transiciones del juego y del main.

- splashScreen: Un botón vincula splashScreen y gameScreen, un segundo botón manipula el DOM para mostrar una tabla de puntuaciones.

- gameScreen: Al cumplirse determinadas condiciones se activa un vinculo con gameOverScreen.

- gameOverScreen: Un botón vincula gameOverScreen con gameScreen.

Funciones de transición.

- buildSplashScreen():

- buildGameScreen():

- buildGameOverScreen():

Task
Definicion de las tareas por orden de prioridad

- Crear la función que inicializa el juego en pantalla.

- Crear la función que crea la pantalla de inicio.

- Crear la función que crea la pantalla de juego.

- Crear la función que crea la pantalla de Game Over.

- Crear la clase base.

- Crear la clase player.

- Crear la clase obstacle.

- Crear la clase score.

- Crear la clase bonus.

Links
Trello
Link url

Git
Especificar las url del proyecto y del deploy

Link Repositorio

https://github.com/QuevedoIB/IronBird

Link Deploy

https://quevedoib.github.io/IronBird/

Slides.com
Especificar la url de la presentacion

Link Slides.com

Instrucciones del juego
Al finalizar el juego generar las instrucciones

Click para desplazar el player arriba.

Evitar los obstaculos para sobrevivir el mayor tiempo posible.

Coger los bonus para aumentar la puntuación final.
