/* Modo Claro/Oscuro */
const btnModo = document.getElementById("btnModoOscuro");
const body = document.body;

btnModo.addEventListener("click", function () {
    body.classList.toggle("dark-mode");
});
/* ---------------------------------------------------- */

const btnJoke = document.getElementById("btnJoke");
const jokeBox = document.getElementById("content");
const loading = document.getElementById("loading");
const errorBox = document.getElementById("error");
const category = document.getElementById("category");
const type = document.getElementById("type");
const lang = document.getElementById("lang");
btnJoke.addEventListener("click", traerChiste)
async function traerChiste() {

    jokeBox.innerHTML = "";
    errorBox.textContent = "";
    loading.textContent = "Cargando chiste... ⌛";

    try {
        const categoriaSeleccionada = category.value;
        const tipoSeleccionado = type.value;
        const idiomaSeleccionado = lang.value;
        const filtrosMarcados = document.querySelectorAll(".filters input:checked");
        let blacklistFlags = [];

        filtrosMarcados.forEach(function (filtro) {
            blacklistFlags.push(filtro.value);
        });

        let url = `https://v2.jokeapi.dev/joke/${categoriaSeleccionada}?lang=${idiomaSeleccionado}`;
        
        if (tipoSeleccionado !== "any") {
            url += `&type=${tipoSeleccionado}`;
        }

        if (blacklistFlags.length > 0) {
             url += `&blacklistFlags=${blacklistFlags.join(",")}`;
        }
        const respuesta = await fetch(url);

        if (!respuesta.ok) {
            throw new Error("Error con la API");
        }
        const datos = await respuesta.json();

        loading.textContent = "";

        if (datos.type === "single") {
            jokeBox.innerHTML = `<p>${datos.joke}</p>`;
        } else {
            jokeBox.innerHTML = `<h3>${datos.setup}</h3> <p>${datos.delivery}</p>`;
        }

    } catch (error) {
        loading.textContent = "";
        errorBox.textContent = "No se pudo cargar el chiste 💀";
        console.error(error);
    }
}