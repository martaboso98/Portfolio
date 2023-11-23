"use strict";

const grande = document.querySelector(".grande");
const puntos = document.querySelectorAll(".punto");

// Función para calcular la operación según el tamaño de la pantalla
function calcularOperacion() {
  const ventanaAncho = window.innerWidth;

  // Ajusta estos valores según tus necesidades
  if (ventanaAncho > 902 && ventanaAncho < 1200) {
    return -270;
  } else if (ventanaAncho <= 1200) {
    return -300; 
  } else if (ventanaAncho <= 1400) {
    return -240;
  } else if (ventanaAncho <= 1600){
    return -220;
  } else if (ventanaAncho <= 1900) {
    return -170;
  }
  else {
    return -122; // Valor predeterminado para pantallas más grandes
  }
}

// Cuando haces clic en un punto
puntos.forEach((cadaPunto, i) => {
  cadaPunto.addEventListener("click", () => {
    // Guarda la posición del punto
    let posicion = i;

    // Calcula la distancia que grande tiene que moverse
    let operacion = posicion * calcularOperacion();

    // Mueve grande
    grande.style.transform = `translateX(${operacion}%)`;

    // Borra "activo" de todos los puntos
    puntos.forEach((cadaPunto) => {
      cadaPunto.classList.remove("activo");
    });

    // Añade "activo" al punto que hiciste clic
    cadaPunto.classList.add("activo");
  });
});

// Actualiza la operación cuando cambia el tamaño de la ventana
window.addEventListener("resize", () => {
  // Recalcula la operación y ajusta la posición de grande
  let operacion = calcularOperacion();
  let puntoActivo = document.querySelector(".punto.activo");
  let posicion = Array.from(puntos).indexOf(puntoActivo);

  // Mueve grande
  grande.style.transform = `translateX(${posicion * operacion}%)`;
});
