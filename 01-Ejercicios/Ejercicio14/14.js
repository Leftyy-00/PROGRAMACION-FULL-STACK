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
let contadorGustar = document.querySelector("#contadorgustar");
let contadorNoGustar = document.querySelector("#contadornogustar");

let gusta = 0;
let noGusta = 0;

catButton.addEventListener("click", async() => {
    try {
        let response = await fetch("https://api.thecatapi.com/v1/images/search");

        if (!response.ok) {
            throw new Error("Error al obtener la imagen");
        }

        let data = await response.json();
        console.log("data", data);
        gatitos.src = data[0].url;
        idImagenActual = data[0].id;
        console.log("ID de la imagen:", idImagenActual);

    } catch (error) {

        console.error(error);
        alert("No se pudo cargar la imagen del gato.");
    }
});

catbuttonGustar.addEventListener("click", () => {
    gusta++;
    contadorGustar.textContent = gusta;
});

catbuttonNoGustar.addEventListener("click", () => {
    noGusta++;
    contadorNoGustar.textContent = noGusta;
});