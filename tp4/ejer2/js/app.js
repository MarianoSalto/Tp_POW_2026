
let nro_maximo=0;
let nro_minimo=0;

let listaNro= [];//lista Vacia;



/**Asignación de eventos a los botones  */

const btn_generar= document.querySelector(".generar");
const btn_reiniciar= document.querySelector(".reiniciar");


btn_generar.addEventListener('click', (e)=>{
    e.preventDefault();

    nro_minimo= Number(document.querySelector(".minimo").value);
    nro_maximo= Number(document.querySelector(".maximo").value);

    generarNro(nro_minimo, nro_maximo);
})

btn_reiniciar.addEventListener('click', (e)=>{
    e.preventDefault();

    nro_minimo=0
    nro_maximo=0
    listaNro=[]

    editarDatos();
})

//Inicio de DOM

document.addEventListener('DOMContentLoaded', ()=>{
    cargarDatos();
})


/** FUNCIONES */

function generarNro(min, max) {
    
    min= Math.ceil(min);//redondea arriba
    max= Math.floor(max)//redondea abajo
    
    if(nro_minimo === nro_maximo || nro_minimo > nro_maximo )
        return


    const nro_aleatorio= Math.floor(Math.random() * (max - min +1)) + min;
    
    const nro_disponible=cargarListaNro(nro_aleatorio, min , max);

    const nroGenerado = document.querySelector(".nroGenerado");


    if(nro_disponible !== null){
        nroGenerado.textContent= nro_disponible
        listaNro.push(nro_disponible);
    }
    else
        nroGenerado.textContent= "Ya se generaron todos los números"

}

function cargarListaNro(nro, min, max) {

    // Si el número generado todavía no está usado
    if (!listaNro.includes(nro)) {
        return nro;
    }

    // Buscar números superiores
    for (let i = nro + 1; i <= max; i++) {

        if (!listaNro.includes(i)) {
            return i;
        }
    }

    // Si no hay superiores, buscar números inferiores
    for (let i = nro - 1; i >= min; i--) {

        if (!listaNro.includes(i)) {
            return i;
        }
    }

    // No queda ningún número disponible
    return null;
}


//Aceso al archivo datos.json

function cargarDatos() {

    fetch('./datos.json')
        .then(respuesta => {

            //console.log("Status:", respuesta.status);
            //console.log("OK:", respuesta.ok);

            if (!respuesta.ok) {
                throw new Error("No se pudo encontrar datos.json");
            }

            return respuesta.json();
        })
        .then(data => {
        
            document.querySelector(".minimo").value = data.minimo;

            document.querySelector(".maximo").value = data.maximo;

            listaNro= data.numeros

            if (data.minimo === data.maximo) {
                document.querySelector(".nroGenerado").textContent= "Máximo y minimo son iguales"
            }
        })
        .catch(error => {
            console.log("ERROR:", error);
        });
}

function editarDatos(){

    const infoNueva = {
        minimo: nro_minimo,
        maximo: nro_maximo,
        numeros: listaNro
    };


    fetch('editar.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(infoNueva)
    })
    .then(respuesta => respuesta.text())
    .then(data => {
        cargarDatos();
    })
    .catch(err => {
        console.log("Error al editar:", err);
    });
}


window.addEventListener('beforeunload', () => {
    const infoNueva = {
        minimo: nro_minimo,
        maximo: nro_maximo,
        numeros: listaNro
    };

    const datos = new Blob(
        [JSON.stringify(infoNueva)],
        {
            type: 'application/json'
        }
    );

    navigator.sendBeacon('editar.php', datos);
});