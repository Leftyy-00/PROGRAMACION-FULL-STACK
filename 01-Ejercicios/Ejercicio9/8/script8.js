/* Decimo tercero ejercicio */
let NumerosPares = 0;
let numeros = Number;
do {
    numeros = parseInt(prompt("Ingrese un numero: "));
    if (numeros !==0 && numeros % 2 == 0) {
        NumerosPares++;
    }
} while (numeros != 0);
alert("La cantidad de numeros pares ingresados es: " + NumerosPares);

/* Decimo cuarto ejercicio */
const Nombres = ["Freddy", "Bonnie", "Chica", "Foxy", "Golden Freddy"];
console.log(Nombres[0]);
alert(Nombres[0]);
/*-----------------------*/
console.log(Nombres[1]);
alert(Nombres[1]);
/*-----------------------*/
console.log(Nombres[2]);
alert(Nombres[2]);
/*-----------------------*/
console.log(Nombres[3]);
alert(Nombres[3]);
/*-----------------------*/
console.log(Nombres[4]);
alert(Nombres[4]);
/*-----------------------*/
