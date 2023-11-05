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

const eyeRadius = 10;

//Redimensionar el canvas
function resizeCanvas () {
    canvas.width = window.innerWidth * 0.7; //Ancho interno de la pantalla
    canvas.height = window.innerHeight * 0.7; 
    context.height = canvas.height/2; //Resolución
    context.width = canvas.width/2;
    render();
}

function drawFaceWithoutEyes () {
    const x = canvas.width * 0.63 - faceWithoutEyes.width/2; //Para ponerlo en medio
    const y = canvas.height/2 - faceWithoutEyes.height/2;
    context.drawImage(faceWithoutEyes, x, y);
}

//Fórmula para calcular la distancia entre dos puntos
function distance (a,b) {
    return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
}

//Para ver dónde apunta el mouse, la dirección
function getUnitVector (a,b) {
    const module = distance(a,b);
    return {
        x: (b.x - a.x)/module,
        y: (b.y - a.y)/module,
    };
}

function getTranslatePosition(eyePosition){
    //Si la posición del ratón está dentro del ojo, lo pinta ahí
    const uniVector = getUnitVector (eyePosition, mousePosition);
    return {
        x: eyePosition.x + eyeRadius * uniVector.x,
        y: eyePosition.y + eyeRadius * uniVector.y,
    };
}

function drawEyes () {
    const eyeOriginPositions = [ //Colocarlo donde yo quiera manualmente
        {
            x:canvas.width * 0.63 - 58,
            y:canvas.height/2 
        },
        {
            x:canvas.width * 0.63 + 60,
            y:canvas.height/2
        }
    ];

    //Aplido la función a todos los elementos
    const eyePositions = eyeOriginPositions.map(getTranslatePosition);

    //Recorrer array
    eyePositions.forEach((eyePosition) => {
        context.drawImage(
            eye, 
            eyePosition.x - eye.width/2, 
            eyePosition.y - eye.height/2
            );
    });
}

/*function drawMouse () {
    //Pinto un cuadrado para ver si funciona
    context.fillRect(mousePosition.x, mousePosition.y, 10, 10);
}
*/

//Para borrar el rastro del ratón al moverse
function clearCanvas () {
    context.clearRect(0,0, canvas.width, canvas.height);
}

//Cuando hago resize, desaparece el dibujo. Para corregirlo:
function render () {
    clearCanvas();
    drawFaceWithoutEyes();
    drawEyes();
    /*drawMouse();*/
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

//Para móviles
function onTouchMove (event) {
    mousePosition.x = event.touches[0].clientX;
    mousePosition.y = event.touches[0].clientY;
    render();
}

//Función principal - main: se ejecuta cuando ya ha cargado la página
function main () {
    resizeCanvas();
    render();
    //Evento para que se redimensione cada vez que cargue para que sea reponsive
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove);
}

window.onload = main;