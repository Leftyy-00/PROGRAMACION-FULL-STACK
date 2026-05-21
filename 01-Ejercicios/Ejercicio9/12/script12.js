/*Vigésimo tercero Ejercicio*/
let frutas = ["Manzana", "Pera", "Naranja", "Plátano", "Fresa", "Kiwi", "Melón", "Sandía", "Cereza", "Durazno", "Banana"];

let FrutaBuscada = "Banana";

if (frutas.includes(FrutaBuscada)) {
    console.log("La fruta existe en el arreglo.");
    alert("La fruta existe en el arreglo.");
}else {
    console.log("La fruta no existe en el arreglo.");
    alert("La fruta no existe en el arreglo.");
}


/*Vigésimo cuarto Ejercicio*/
let frutas_parte2 = ["Manzana", "Pera", "Naranja", "Plátano", "Fresa"];

console.log("Array original:");
console.log(frutas_parte2);

let frutas_parte2Eliminada = frutas_parte2.pop();

console.log("Fruta eliminada:" + frutas_parte2Eliminada);
console.log(frutas_parte2);


/*Vigésimo quinto Ejercicio*/
let frutas_parte3 = ["Sandía", "kiwi"];

console.log("Array original:");
console.log(frutas_parte3);

frutas_parte3.push("Naranja");
frutas_parte3.push("Uva");

console.log("Array después de usar push():");
console.log(frutas_parte3);
