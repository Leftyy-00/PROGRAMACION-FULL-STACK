/* Modo Claro/Oscuro */
const tema_color = document.querySelector("#tema");
const body = document.body;

tema_color.addEventListener("click", function () {
    body.classList.toggle("light-mode");
});
/* ----------------------------------------------- */


/* Formulario */
const Formulario = document.querySelector("#formulario");
const titulo = document.querySelector("#titulo");
const url = document.querySelector("#url");
const Errores = document.querySelector("#Errores");
const Resultado = document.querySelector("#Resultado");

Formulario.addEventListener("submit", function (event) {

    event.preventDefault();

    Errores.textContent = "";

    const tituloimg = titulo.value.trim();
    const urlImg = url.value.trim();

    // VALIDAR CAMPOS
    if (tituloimg === "" || urlImg === "") {

        Errores.textContent = "Por favor, completa todos los campos.";
        return;

    }

    // CREAR TARJETA
    const tarjeta = document.createElement("div");

    tarjeta.classList.add("card");

    // COLOR OPCIONAL
    tarjeta.style.backgroundColor = "#222";
    tarjeta.style.color = "white";
    tarjeta.style.padding = "10px";
    tarjeta.style.margin = "10px";
    tarjeta.style.borderRadius = "10px";
    tarjeta.style.width = "300px";

    tarjeta.innerHTML = `
        <h3>${tituloimg}</h3>

        <img 
            src="${urlImg}" 
            alt="${tituloimg}"
            style="width:100%; border-radius:10px;"
        >
    `;

    Resultado.appendChild(tarjeta);

    Formulario.reset();

});

/* ----------------------------------------------- */