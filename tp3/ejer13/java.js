var nro_total = "";
var nro_guardado = "";
var nro_actual = "";
var operador = "";

// Pantalla
var html = document.querySelector(".nro_actual");
var html_resultado = document.querySelector(".resultado");
var html_cuenta = document.querySelector(".cuenta");

// Variables para eventos de botones
const btns_nro = document.querySelectorAll(".numero");
const btns_operaciones = document.querySelectorAll(".operaciones");
const btn_limpiar= document.querySelector(".limpiar")
const btn_limpiarNroActual= document.querySelector(".limpiarNroActual");
// Inicializa la calculadora
document.addEventListener("DOMContentLoaded", function () {

    html_resultado.textContent = "";
    html.textContent = "0";
    html_cuenta.textContent = "";

});


// __________________ EVENTOS __________________

// Botones de números
btns_nro.forEach(btn_nro => {

    btn_nro.addEventListener('click', (e) => {

        const digitoPresionado = e.target.textContent;

        armarNro(digitoPresionado);

    });

});


// Botones de operaciones
btns_operaciones.forEach(btn_operacion => {

    btn_operacion.addEventListener('click', (e) => {

        const operacion = e.target.textContent;

        selecionarOperacion(operacion);

    });

});


// Boton limpiar
btn_limpiar.addEventListener('click', (e)=>{
    limpiar();
})

// Boton limpiar Nro actual
btn_limpiarNroActual.addEventListener('click',(e)=>{
    limpiarNroActual();
})

// __________________ FUNCIONES __________________
/** Armado de números*/

function armarNro(digito) {

    // Evita agregar más de un punto decimal
    if (digito === "." && nro_actual.includes(".")) {
        return;
    }

    // Si está mostrando 0, reemplazarlo
    if (nro_actual === "0" && digito !== ".") {

        nro_actual = digito;

    } else {

        nro_actual += digito;

    }

    actualizoPantalla();
}


/**Seleccionar operación */

function selecionarOperacion(operacion) {

    console.log("operador:", operador);
    console.log("nro_actual:", nro_actual);
    console.log("nro_guardado:", nro_guardado);


    if (nro_actual === "" && nro_guardado === "") {//No hay ningún número
        return;
    }
    else if (nro_guardado === "" && nro_actual !== "") { // Primera operación
        nro_guardado = nro_actual;
        nro_actual = "";

        if (operacion !== "=") {

            operador = operacion;

        }
    }
    else if ( nro_guardado !== "" && nro_actual !== "" && operador !== "") { //Ya tenemos todo para realizar una operación
        realizoOperacion(operacion);
    }
    else if (nro_guardado !== "" && nro_actual === "" && operacion !== "=") {//Tenemos número guardado pero todavía no ingresamos el segundo número. Permite cambiar el operador.
        operador = operacion;
    }

    actualizoPantalla();
}


/** Actualización de pantalla*/
function actualizoPantalla() {

    html.textContent = nro_actual !== "" ? nro_actual : "0";

    html_cuenta.textContent = nro_guardado + (operador ? " " + operador : "");

    html_resultado.textContent = nro_total !== "" ? nro_total : "";
}


/** Realizar operación*/
function realizoOperacion(operacion) {
    var resultado = null;

    switch (operador) {

        case "+":
            resultado = parseFloat(nro_guardado) + parseFloat(nro_actual);
            break;
        case "-":
            resultado = parseFloat(nro_guardado) - parseFloat(nro_actual);
            break;
        case "x":
            resultado = parseFloat(nro_guardado) * parseFloat(nro_actual);
            break;

        case "/":
            // Evitamos la división por cero
            if (parseFloat(nro_actual) === 0) {
                return;
            }
            resultado =  parseFloat(nro_guardado) / parseFloat(nro_actual);
            break;
        case "%":
            resultado =  parseFloat(nro_guardado) * parseFloat(nro_actual) / 100;
            break;
        default:
            return;
    }


    // Guardamos el resultado solamente si la operación fue válida
    nro_total = resultado;

    // El resultado pasa a ser el nuevo número guardado
    nro_guardado = nro_total;

    // Limpiamos el número actual
    nro_actual = "";


    if (operacion !== "=") {
        operador = operacion;
    } else {
        operador = "";
    }

    actualizoPantalla();
}


/** Limpiar calculadora */
function limpiar() {
    
    nro_total = "";
    nro_guardado = "";
    nro_actual = "0";
    operador = "";

    actualizoPantalla();
}

/**Limpiar nro actual */

function limpiarNroActual(){
    nro_actual="";
    actualizoPantalla();
}
