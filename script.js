const canvas = document.querySelector("canvas");

//Dos dimensiones, tiene la resolución
const context = canvas.getContext("2d");

//Crear objeto imagen
const faceWithoutEyes = new Image ();
faceWithoutEyes.src = 

//Redimensionar el canvas
function resizeCanvas () {
    canvas.width = window.innerWidth; //Ancho interno de la pantalla
    canvas.height = window.innerHeight; 
    context.height = canvas.height; //Resolución
    context.width = canvas.width;
}

//Función principal - main: se ejecuta cuando ya ha cargado la página
function main () {
    resizeCanvas();
    //Evento para que se redimensione cada vez que cargue para que sea reponsive
    window.addEventListener("resize", resizeCanvas);
}

window.onload = main;