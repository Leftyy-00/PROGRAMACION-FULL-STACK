const lightDarkBtn = document.getElementById("lightdark");
const body = document.body;

lightDarkBtn.addEventListener("click", function () {
    body.classList.toggle("light-mode");
});

/*---------------------------------------------------------------------*/

let catButton = document.querySelector("#catbutton");
let catbuttonGustar = document.querySelector("#catbuttonGustar");
let catbuttonNoGustar = document.querySelector("#catbuttonNoGustar");
let gatitos = document.querySelector("#catImage");
/* 
let contadorGustar = document.querySelector("#contadorgustar");
let contadorNoGustar = document.querySelector("#contadornogustar");
*/

catButton.addEventListener("click", async() => {
    let response = await fetch("https://api.thecatapi.com/v1/images/search");
    let data = await response.json();
    
    console.log("data", data);

    let imagen = data[0].url;
    gatitos.src = imagen;
    
});