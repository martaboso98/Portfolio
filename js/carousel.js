"use strict";

const grande = document.querySelector(".grande");
const puntos = document.querySelectorAll(".punto");

// When you click on a point
puntos.forEach((cadaPunto, i) => {
  cadaPunto.addEventListener("click", () => {
    //Guarda la posición del punto
    let posicion = i;

    //Calcula la distancia que grande tiene que moverse
    let operacion = posicion * -122;

    //Se mueve grande
    grande.style.transform = `translateX(${operacion}%)`;

    //Borra activo de todos
    puntos.forEach((cadaPunto, i) => {
      cadaPunto.classList.remove("activo");
    });

    //Añade activo del que has hecho click
    cadaPunto.classList.add("activo");
  });
});
