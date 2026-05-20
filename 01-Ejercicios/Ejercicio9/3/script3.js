/* Quinto ejercicio */
let numero = Number(prompt("Escribe un número"));

if (numero % 2 == 0) {
    alert("Es par");
} else {
    alert("Es impar");
}

/* Sexto ejercicio */
let numeroA = Number(prompt("Escribe un número"));
let numeroB = Number(prompt("Escribe un segundo número"));
let numeroC = Number(prompt("Escribe un tercer número"));
if (numeroA > numeroB && numeroA > numeroC){
    alert(numeroA + " es el mayor");
} else if (numeroB > numeroA && numeroB > numeroC){
    alert(numeroB + " es el mayor");
} else {
    alert(numeroC + " es el mayor");
}