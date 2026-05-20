
/* Noveno ejercicio */
let numeroZ = Number(prompt("Ingrese un número entre el 1 y el 21 que sea par:"));
if (numeroZ % 2 == 0 && numeroZ > 1 && numeroZ < 21) {
    alert("El número " + numeroZ + " es válido");
} else if (numeroZ % 2 != 0 && numeroZ > 1 && numeroZ < 21) {
    alert("El número " + numeroZ + " no es válido, ingrese un numero sea par");
} else {
    alert("El número " + numeroZ + " no es válido, ingrese uno entre 1 y 20 que sea par");
}


/* Décimo ejercicio */
let contraseña = Number(prompt("Ingrese una contraseña:"));
if (contraseña == 1234) {
    alert("Contraseña correcta");
} else {
    alert("Contraseña incorrecta");
}

