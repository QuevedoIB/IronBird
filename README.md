<h1>IronBird</h1>

<h2>Descripción</h2>

El proyecto consiste en realizar un juego utilizando canvas, la dinámica del juego tendrá la base de un Flappy Birds con sprites customizados.

MVP - Tecnología (DOM - CANVAS)

Para la realización del juego se usarán principalmente canvas con algún detalle de manipulación del DOM.

<h2>Backlog</h2>

- Habrá un contador para recrear las puntuaciones.
- La base de las puntuaciones variará según el tiempo transcurrido además de un bonus al conseguir un elemento bonus.
- Canción para cada pantalla.

<h2>Estructuras de Datos</h2>

La estructura será:

- Documento HTML
- Documento CSS
- Documento main.js: Documento que vincula las pantallas del juego.

main()
buildDom()
buildSplashScreen()
buildGameScreen()
buildGameOverScreen()
window.addEventListener("load",main)


- Documento game.js: Documento que engloba las diferentes clases del juego.

Class Game
new Base
new Player
new Obstacle
new Bonus
clearCanvas()
drawCanvas()
checkCollisions()
gameOver()
loop(new Obstacle, requestAnimationFrame)

- Documento player.js: Documento que recoge la clase player con sus valores.

player.size
player.x
player.y
player.context
update()
draw()
checkScreen()
checkCollisionObstacle()

- Documento obstacles.js: Documento que recoge la clase obstacles con sus valores.

obstacle.size
obstacle.x
obstacle.y
obstacle.context
update()
draw()


- Documento score.js: Documento con la clase score que recoge la logística de la puntuación.

score.currentScore
score.interval
clearInterval()
updateScore()

- Documento map.js: Documento que recoge la clase base con sus valores.

base.size
base.x
base.y
base.context

- Documento bonus.js: Documento que recoge la clase bonus con sus valores.

bonus.size
bonus.x
bonus.y
bonus.context
update()

<h2>States y States Transitions</h2>
Definicion del las transiciones del juego y del main.

- splashScreen: Un botón vincula splashScreen y gameScreen, un segundo botón manipula el DOM para mostrar una tabla de puntuaciones.

- gameScreen: Al cumplirse determinadas condiciones se activa un vinculo con gameOverScreen.

- gameOverScreen: Un botón vincula gameOverScreen con gameScreen.

Funciones de transición.

- buildSplashScreen():

- buildGameScreen():

- buildGameOverScreen():

<h2>Task</h2>
Definicion de las tareas por orden de prioridad

- Crear la función que inicializa el juego en pantalla.

- Crear la función que crea la pantalla de inicio.

- Crear la función que crea la pantalla de juego.

- Crear la función que crea la pantalla de Game Over.

- Crear la clase game.

- Crear la clase base.

- Crear la clase player.

- Crear la clase obstacle.

- Crear la clase score.

- Crear la clase bonus.

<h2>Links</h2>
Trello
Link url

Git

Link Repositorio

https://github.com/QuevedoIB/IronBird

Link Deploy

https://quevedoib.github.io/IronBird/

Slides.com

Link Slides.com

<h2>Instrucciones del juego</h2>
Al finalizar el juego generar las instrucciones

Click para desplazar el player arriba.

Evitar los obstaculos para sobrevivir el mayor tiempo posible.

Coger los bonus para aumentar la puntuación final.
