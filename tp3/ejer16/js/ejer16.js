
var dato=document.getElementById("dato");

var aux="as";

var tipo="";
var nro="";
var dijitoVerificador="";

var SUMA_P=0;
var SUMA_MODULO11=0;



//****************FUNCIONES************************* */

function validarCC(event){

    event.preventDefault(); // Detiene el envío del formulario

    var informacion= dato.value;
    console.log(informacion);
    var value=filtro1(informacion);
    if(value){

        informacion=informacion.replace(/-/g, "");//Reemplazo - por ""

        tipo=informacion.substring(0,2);
        nro=informacion.substring(2,10);
        dijitoVerificador= informacion.substring(10);
        
        
        
        console.log("Cad: "+informacion);
        console.log("Tip: "+ tipo);
        console.log("Nro: " + nro);
        console.log("DV: "+ dijitoVerificador);

        value=controlNumeros();
    }
    console.log("Fin:"+value);
    salida(value);
    
}


function salida(value){
    var texto= document.getElementById("resultado");

    if(value){
        texto.innerHTML="<p style='color:green';>Valido </p>";
    }
    else{
        texto.innerHTML="<p style='color:red';>Erroneo </p>";
    }
}


/*Controlador de string */

function filtro1(aux){
    var cont=0;
    var value=false;
    console.log("tamaño:"+ aux.length);
    if(aux.length>10 && aux.length<14){
        for(var x=0;x<aux.length; x++){
            
            if(aux[x]=='-'){
                
                console.log("X vale: "+x);
                if(x==2 || x==11){
                    cont++;
                }
                else{
                    x=14;
                }

            }

            
        }
        
        if(cont==0 || cont==2){
            value=true
        }
    }

    return value;
}

/*Controladores de numeros */

function controlNumeros(){

    var value=esTipo();
    if(value){
        multiplicacion(tipo+nro);
        value=esDigVerificador();
        
    }

    return value;
}


function esTipo(){
    var tipos= new Array("20", "23", "24", "27", "30", "33", "34");
    var value=false;

    for(var x=0;x< tipos.length;x++){
        if(tipo==tipos[x] && !value){
            value= true;
        }
        
    }

    return  value;
}

function multiplicacion (aux){
    
    var cont=2;
    SUMA_P=0;
    SUMA_MODULO11=0;

    for(var x= (aux.length-1);x>=0;x--){

        SUMA_P=SUMA_P + parseInt(aux[x])* cont;
        cont++;

        console.log("Suma_P: "+ SUMA_P);

        if(cont>7){
            cont=2;
        }
    }

    SUMA_MODULO11= SUMA_P % 11;
    console.log("Modulo = "+ SUMA_MODULO11);
}

function esDigVerificador(){
    
    var ONCEMENOS= 11 - SUMA_MODULO11;
    var value= false;

    if(ONCEMENOS==10){
        tipo="33"; // o 23 dice pero no dice dependiendo que 
        multiplicacion(tipo+nro);  
    }

    if( ONCEMENOS == parseInt(dijitoVerificador)){
        value=true;
    }
    

    return value;

}