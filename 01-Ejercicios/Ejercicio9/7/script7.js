/* Decimo primero ejercicio */
let Menu = prompt("Seleccione una opción: \n1. Saludar \n2. Mostrar fecha \n3. Numero Random");

if (Menu == "1") {
    alert("Hola, Buenos dias, tardes o noches");
} else if(Menu == "2"){
    alert(new Date());
} else if(Menu == "3"){
    alert(Math.random());
} else {
    alert("Opción no válida");
}