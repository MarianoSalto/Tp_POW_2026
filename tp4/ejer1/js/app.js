
var nro_aleatorio="";
var mensaje="";
var intentos=0;

const puntaje={
    totalIntento:0,
    mejorPuntaje:0,
    partidasfinalizadas:0
    
}


//Constantes Botones::
const btn_verificar= document.querySelector(".verificar")
const btn_reinicio= document.querySelector(".reinicio")



document.addEventListener("DOMContentLoaded", ()=>{
    crearNroAleatorio(1, 1000);
    cargarDatos();
})


/**Funciones */


function crearNroAleatorio(min, max) {
    min= Math.ceil(min);
    max= Math.floor(max)

    nro_aleatorio= Math.floor(Math.random() * (max - min +1)) + min;
    
}

function corroborarNumero(numero){

    const mensajeArea= document.querySelector(".mensaje");
    
    if (isNaN(parseInt(numero))) {
        mensaje= "Debe ingresar un numero";
    }
    else if(parseInt(numero) === parseInt(nro_aleatorio)){
        mensaje="Felicitaciones, Adivinaste el Numero"
        mensajeArea.classList.remove("error"); 
        mensajeArea.classList.add("exito"); 

        puntaje.partidasfinalizadas+= 1;
    }
    else{
        if(parseInt(numero) > parseInt(nro_aleatorio))
            mensaje="Es mayor";
        else
            mensaje="Es menor";
        mensajeArea.classList.remove("exito"); 
        mensajeArea.classList.add("error"); 
    }


    mensajeArea.textContent= mensaje;
    

}
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
            
            puntaje.mejorPuntaje = data.mejorPuntaje;
            puntaje.totalIntento = data.totalIntento;
            puntaje.partidasfinalizadas = data.partidasfinalizadas;

            document.querySelector(".mejIntento").textContent = puntaje.mejorPuntaje;

            document.querySelector(".totIntentos").textContent = puntaje.totalIntento;

            document.querySelector(".partFinalizadas").textContent = puntaje.partidasfinalizadas;

            if (puntaje.partidasfinalizadas !== 0) {
                document.querySelector(".promedioPuntaje").textContent =
                    Math.floor(puntaje.totalIntento / puntaje.partidasfinalizadas);
            } else {
                document.querySelector(".promedioPuntaje").textContent =
                    puntaje.totalIntento;
            }
        })
        .catch(error => {
            console.error("ERROR:", error);
        });
}

function editarDatos(){

    let mejPuntaje = 0;

    if (puntaje.mejorPuntaje === 0) {
        mejPuntaje = intentos;
    }
    else if (puntaje.mejorPuntaje > intentos) {
        mejPuntaje = intentos;
    }
    else {
        mejPuntaje = puntaje.mejorPuntaje;
    }

    const infoNueva = {
        totalIntento: puntaje.totalIntento + intentos,
        mejorPuntaje: mejPuntaje,
        partidasfinalizadas: puntaje.partidasfinalizadas
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

/** Asignacion de eventos a botones */

btn_verificar.addEventListener("click", (e)=>{
    const areaIntentos= document.querySelector(".intento");
    e.preventDefault();//evitamos que se recargue la página....
    
    const numero= document.querySelector("#numero").value;// obtenemos el valor del input     
    corroborarNumero(numero);
    intentos += 1;
    areaIntentos.textContent=intentos;
})

btn_reinicio.addEventListener("click", (e) => {
    e.preventDefault();

    editarDatos();

    intentos = 0;

    crearNroAleatorio(1, 1000);
});



