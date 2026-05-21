/* Decimo noveno ejercicio */
const notas = [5, 8, 9, 10, 4];

let suma = 0;

for (let i = 0; i < notas.length; i++) {
    suma = suma + notas[i];
}

let promedio = suma / notas.length;

console.log("La suma de las notas es:" + suma);
console.log("El promedio de las notas es:" + promedio);


/* Vigésimo ejercicio */
let nombres = [];
    let nombre;
    while (nombre !== "salir") {
        nombre = prompt("Ingrese un nombre (o escriba 'salir' para terminar):");
            if (nombre !== "salir") {
                nombres.push(nombre);
            }
    }
console.log("Los nombres almacenados son:");
console.log(nombres);