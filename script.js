const canvas = document.querySelector("canvas");

//Dos dimensiones, tiene la resolución
const context = canvas.getContext("2d");

//Crear objeto imagen
const eye = new Image ();
eye.src = "ojo.png";

//Ojos
const faceWithoutEyes = new Image ();
faceWithoutEyes.src = "yoSinOjos.png";

//Iremos actualizando los valores
const mousePosition = {x:0, y:0};

//Redimensionar el canvas
function resizeCanvas () {
    canvas.width = window.innerWidth; //Ancho interno de la pantalla
    canvas.height = window.innerHeight; 
    context.height = canvas.height; //Resolución
    context.width = canvas.width;
}

function drawFaceWithoutEyes () {
    const x = canvas.width/2 - faceWithoutEyes.width/2; //Para ponerlo en medio
    const y = canvas.height/2 - faceWithoutEyes.height/2;
    context.drawImage(faceWithoutEyes, x, y);
}

function drawEyes () {
    const eyePositions = [ //Colocarlo donde yo quiera manualmente
        {
            x:canvas.width/2 - eye.width/2 - 30,
            y:canvas.height/2 - eye.width/2 - 26
        },
        {
            x:canvas.width/2 - eye.width/2 + 65,
            y:canvas.height/2 - eye.width/2 - 26
        }
    ];
    //Recorrer array
    eyePositions.forEach((eyePosition) => {
        context.drawImage(eye, eyePosition.x, eyePosition.y);
    });
}

function drawMouse () {
    //Pinto un cuadrado para ver si funciona
    context.fillRect(mousePosition.x, mousePosition.y, 10, 10);
}

//Para borrar el rastro del ratón al moverse
function clearCanvas () {
    context.clearRect(0,0, canvas.width, canvas.height);
}

//Cuando hago resize, desaparece el dibujo. Para corregirlo:
function render () {
    clearCanvas();
    drawFaceWithoutEyes();
    drawEyes();
    drawMouse();
}

function onResize () {
    resizeCanvas();
    render();
}

//Extraer posición del mouse
function onMouseMove (event) {
    mousePosition.x = event.offsetX;
    mousePosition.y = event.offsetY;
    render();
}

//Función principal - main: se ejecuta cuando ya ha cargado la página
function main () {
    resizeCanvas();
    render();
    //Evento para que se redimensione cada vez que cargue para que sea reponsive
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove);
}

window.onload = main;