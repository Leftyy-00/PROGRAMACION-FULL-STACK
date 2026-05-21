/*Vigésimo primero Ejercicio*/
let Games = ["Five Nights at Freddy's", "Resident Evil", "The Last of Us", "God of War"];

console.log("El array tiene " +Games.length+ " elementos");


/*Vigésimo segundo Ejercicio*/
let Numbers = [121, 232, 20, 320, 240, 8, 3, 9, 55];

for (let i = 0; i < Numbers.length; i++) {
    if (Numbers[i] % 2 === 0) {
        console.log(Numbers[i] + " es par.");
    }
}