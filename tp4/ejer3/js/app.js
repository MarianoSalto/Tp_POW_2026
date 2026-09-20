const API_URL = "https://pokeapi.co/api/v2/pokemon";
let pagina = 0;
const limite = 12;

const resultados = document.querySelector("#resultados");
const spinner = document.querySelector("#spinner");
const mensaje = document.querySelector("#mensaje");
const formBusqueda = document.querySelector("#formBusqueda");
const inputBusqueda = document.querySelector("#busqueda");
const btnAnterior = document.querySelector("#btnAnterior");
const btnSiguiente = document.querySelector("#btnSiguiente");
const paginaActual = document.querySelector("#paginaActual");

async function obtenerPokemon(url = `${API_URL}?limit=${limite}&offset=${pagina * limite}`) {
    spinner.classList.remove("d-none");
    mensaje.className = "alert d-none";

    try {
        const respuesta = await fetch(url);
        if (!respuesta.ok) throw new Error("Error al consultar la API");

        const data = await respuesta.json();

        const pokemon = await Promise.all(
            data.results.map(p => fetch(p.url).then(r => r.json()))
        );

        mostrarPokemon(pokemon);
        actualizarPaginacion(data);
    } catch (error) {
        console.error(error);
        mostrarMensaje("No se pudieron obtener los Pokémon.", "danger");
    } finally {
        spinner.classList.add("d-none");
    }
}

function mostrarPokemon(lista) {
    resultados.innerHTML = "";

    lista.forEach(pokemon => {
        resultados.innerHTML += `
            <div class="col-sm-6 col-md-4 col-lg-3">
                <div class="card h-100 shadow-sm pokemon-card">
                    <img src="${pokemon.sprites.other["official-artwork"].front_default}"
                         class="card-img-top pokemon-img"
                         alt="${pokemon.name}">

                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title text-capitalize fw-bold">
                            ${pokemon.name}
                        </h5>

                        <p class="card-text">
                            <strong>Tipo:</strong>
                            ${pokemon.types.map(t => t.type.name).join(", ")}
                        </p>

                        <button class="btn btn-primary mt-auto"
                                onclick="verDetalle('${pokemon.name}')">
                            Ver detalles
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
}

async function verDetalle(nombre) {
    try {
        const respuesta = await fetch(`${API_URL}/${nombre}`);

        if (!respuesta.ok) throw new Error("No se pudo obtener el Pokémon");

        const pokemon = await respuesta.json();

        const imagen = pokemon.sprites.other["official-artwork"].front_default;

        document.querySelector("#modalTitulo").textContent =
            pokemon.name;

        document.querySelector("#modalContenido").innerHTML = `
            <div class="row g-4">
                <div class="col-md-5 text-center">
                    <img src="${imagen}"
                         class="img-fluid"
                         alt="${pokemon.name}">
                </div>

                <div class="col-md-7">
                    <h3 class="text-capitalize">${pokemon.name}</h3>

                    <ul class="list-group">
                        <li class="list-group-item">
                            <strong>Altura:</strong> ${pokemon.height / 10} m
                        </li>

                        <li class="list-group-item">
                            <strong>Peso:</strong> ${pokemon.weight / 10} kg
                        </li>

                        <li class="list-group-item">
                            <strong>Tipos:</strong>
                            ${pokemon.types.map(t => t.type.name).join(", ")}
                        </li>

                        <li class="list-group-item">
                            <strong>Habilidades:</strong>
                            ${pokemon.abilities.map(a => a.ability.name).join(", ")}
                        </li>
                    </ul>
                </div>
            </div>
        `;

        bootstrap.Modal.getOrCreateInstance(
            document.querySelector("#modalPokemon")
        ).show();

    } catch (error) {
        console.error(error);
        mostrarMensaje("No se pudo obtener el detalle.", "danger");
    }
}

formBusqueda.addEventListener("submit", async e => {
    e.preventDefault();

    const nombre = inputBusqueda.value.trim().toLowerCase();

    if (nombre === "") {
        pagina = 0;
        obtenerPokemon();
        return;
    }

    try {
        spinner.classList.remove("d-none");

        const respuesta = await fetch(`${API_URL}/${nombre}`);

        if (!respuesta.ok) throw new Error("Pokémon no encontrado");

        const pokemon = await respuesta.json();

        mostrarPokemon([pokemon]);
        btnAnterior.disabled = true;
        btnSiguiente.disabled = true;
        paginaActual.textContent = "Resultado de búsqueda";

    } catch (error) {
        resultados.innerHTML = "";
        mostrarMensaje("No se encontró ese Pokémon.", "warning");
    } finally {
        spinner.classList.add("d-none");
    }
});

btnSiguiente.addEventListener("click", () => {
    pagina++;
    obtenerPokemon();
});

btnAnterior.addEventListener("click", () => {
    if (pagina > 0) {
        pagina--;
        obtenerPokemon();
    }
});

function actualizarPaginacion(data) {
    paginaActual.textContent = `Página ${pagina + 1}`;

    btnAnterior.disabled = pagina === 0;
    btnSiguiente.disabled = !data.next;
}

function mostrarMensaje(texto, tipo) {
    mensaje.className = `alert alert-${tipo}`;
    mensaje.textContent = texto;
}

document.addEventListener("DOMContentLoaded", () => {
    obtenerPokemon();
});