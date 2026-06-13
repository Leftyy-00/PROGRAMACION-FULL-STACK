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

/*---------------------------------------------------------------------*/

const API_KEY = "live_XwCyGHN3OEVBlXwzPIWqHJq3LD0kF0r42DzpvYE8q3Xei9aUQoM0VMyZB3RglHBw";

/*---------------------------------------------------------------------*/

let gusta = 0;
let noGusta = 0;

let idImagenActual = "";

/*---------------------------------------------------------------------*/

async function traerGato() {

    try {
        let response = await fetch(
            "https://api.thecatapi.com/v1/images/search"
        );
        if (!response.ok) {
            throw new Error("Error al obtener la imagen");
        }
        let data = await response.json();
        console.log("data:", data);
        gatitos.src = data[0].url;
        idImagenActual = data[0].id;
        console.log("ID de la imagen:", idImagenActual);

    } catch (error) {
        console.error(error);
        alert("No se pudo cargar la imagen del gato.");

    }

}

/*---------------------------------------------------------------------*/

catButton.addEventListener("click", traerGato);

/*---------------------------------------------------------------------*/

async function votar(valor) {

    try {
        let response = await fetch(
            "https://api.thecatapi.com/v1/votes",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": API_KEY
                },

                body: JSON.stringify({
                    image_id: idImagenActual,
                    value: 1
                })
            }
        );

        if (!response.ok) {
            throw new Error("Error al enviar el voto");
        }

        let data = await response.json();
        console.log("Voto enviado:", data);

        if (valor === 1) {
            gusta++;
            contadorGustar.textContent = gusta;
        } else {
            noGusta++;
            contadorNoGustar.textContent = noGusta;
        }
        alert("¡Gracias por tu voto!");
        traerGato();

    } catch (error) {
        console.error(error);
        alert("No se pudo enviar tu voto. Por favor, intenta de nuevo.");
    }
}

/*---------------------------------------------------------------------*/

catbuttonGustar.addEventListener("click", function () {

    if (idImagenActual === "") {
        alert("Por favor, carga una imagen de gato antes de votar.");
        return;
    }
    votar(1);
});

/*---------------------------------------------------------------------*/

catbuttonNoGustar.addEventListener("click", function () {
    if (idImagenActual === "") {
        alert("Por favor, carga una imagen de gato antes de votar.");
        return;
    }
    votar(-1);
});