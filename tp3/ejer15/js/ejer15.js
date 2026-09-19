//===
// VARIABLES
//===
const DATE_TARGET = new Date('01/05/2023 0:00 AM');

// DOM for render... hacemos referencia a las id donde vamos a modificar 
const SPAN_DAYS = document.getElementById('days');
const SPAN_HOURS = document.getElementById('hours');
const SPAN_MINUTES = document.getElementById('minutes');
const SPAN_SECONDS = document.getElementById('seconds');

// Milliseconds for the calculations
const MILLISECONDS_OF_A_SECOND = 1000;                              // Es la cantidad e milisegundos por segundo  
const MILLISECONDS_OF_A_MINUTE = MILLISECONDS_OF_A_SECOND * 60;     // 60.000 milisegundos 
const MILLISECONDS_OF_A_HOUR = MILLISECONDS_OF_A_MINUTE * 60;       // 60.000 * 60 
const MILLISECONDS_OF_A_DAY = MILLISECONDS_OF_A_HOUR * 24           // 60.000 * 60 *24 

//===
// FUNCTIONS
//===

/**
 * Method that updates the countdown and the sample
 * traduccion:: Método que actualiza la cuenta atrás y la muestra.
 */
function updateCountdown() { /// funtion actualiza cuenta regresiva  
    // Calcs
    const NOW = new Date()                                                                                      //  Fecha Actual
    const DURATION = NOW - DATE_TARGET;                                                                         //  La cantidad e milisengundo que hay en tre la fecha establecida y la actual
    const REMAINING_DAYS = Math.floor(DURATION / MILLISECONDS_OF_A_DAY);                                        //  Catidad de dias
    const REMAINING_HOURS = Math.floor((DURATION % MILLISECONDS_OF_A_DAY) / MILLISECONDS_OF_A_HOUR);            //  Catidad de horas
    const REMAINING_MINUTES = Math.floor((DURATION % MILLISECONDS_OF_A_HOUR) / MILLISECONDS_OF_A_MINUTE);       //  Cantidad de minutos
    const REMAINING_SECONDS = Math.floor((DURATION % MILLISECONDS_OF_A_MINUTE) / MILLISECONDS_OF_A_SECOND);     //  Cantidad de segundos
    

    // Render // a los tag referenciados les asigno esos valores 
    SPAN_DAYS.textContent = REMAINING_DAYS;
    SPAN_HOURS.textContent = REMAINING_HOURS;
    SPAN_MINUTES.textContent = REMAINING_MINUTES;
    SPAN_SECONDS.textContent = REMAINING_SECONDS;
}

//===
// INIT
//===
updateCountdown();
// Refresh every second
setInterval(updateCountdown, MILLISECONDS_OF_A_SECOND);


function redireccionamiento(x=0){
    var a= document.getElementById("email");
    var b= document.getElementById("nroTel");
    
    if(x=1){
        a.innerHTML="Enviando email"}
    if(x=2){
        b.innerHTML="Realizando una llamada"}
}

