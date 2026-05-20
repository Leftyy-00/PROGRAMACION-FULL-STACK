/* Undécimo ejercicio */
let suma = 0;
let numero = Number(prompt("Escribe un número (0 para terminar)"));
while (numero != 0) {
    suma = suma + numero;
    numero = Number(prompt("Escribe otro número (0 para terminar)"));
}
alert("La suma total es: " + suma);


/* Duodécimo ejercicio */
let numero1 = Number(prompt("Ingrese el primer número:"));
let numero2 = Number(prompt("Ingrese el segundo número:"));
let operador = prompt("Ingrese el operador (+, -, *, /):");

if (operador == "+") {
    alert("El resultado de la suma es: " + (numero1 + numero2));
} else if (operador == "-") {
    alert("El resultado de la resta es: " + (numero1 - numero2));
} else if (operador == "*") {
    alert("El resultado de la multiplicación es: " + (numero1 * numero2));
} else if (operador == "/") {
    if (numero2 != 0) {
        alert("El resultado de la división es: " + (numero1 / numero2));
    } else {
        alert("No se puede dividir por cero");
    }
} else {
    alert("Operador no válido");
}
