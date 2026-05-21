/* Décimo septimo ejercicio */
const Nombres = ["Freddy", "Bonnie", "Chica", "Foxy", "Golden Freddy", "Marioneta"];
for (let i = 0; i < Nombres.length; i++) {
    console.log(Nombres[i]);
    alert(Nombres[i]);
}

/* Décimo octavo ejercicio */
const Number = [1,2,8,7,9,5,18,19,20,598];

let mayor = Math.max(...Number);
let menor = Math.min(...Number);

console.log("Número mayor:", mayor);
console.log("Número menor:", menor);