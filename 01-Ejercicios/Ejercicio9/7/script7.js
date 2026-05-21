/*  Décimo tercero ejercicio */
let Menu = prompt("Seleccione una opción: \n1. Saludar \n2. Mostrar fecha \n3. Numero Random");

if (Menu == "1") {
    alert("Hola, Buenos dias, tardes o noches");
} else if(Menu == "2"){
    let fecha = new Date();
    alert("La fecha actual es: " + fecha.toLocaleDateString());
} else if(Menu == "3"){
    alert((Math.random() * 100 + 1).toFixed(0));
} else {
    alert("Opción no válida");
}

/* Décimo cuarto ejercicio */
alert("Bienvenido, juguemos un juego de adivinanza, elija un numero del 1 al 10");
let numero = Math.floor(Math.random() * 10) + 1;

let adivina = Number(prompt("Introduce tu numero"));
if (numero == adivina) {
    alert("Felicidades, has adivinado el numero");
} else {
    alert("Lo siento, el numero era " + numero);
}