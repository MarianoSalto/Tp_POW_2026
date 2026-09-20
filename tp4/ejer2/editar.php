<?php
    //Recibe los datos que mandaste desde el JS
    $jsonRecibido= file_get_contents('php://input');
    
    if(!empty($jsonRecibido)){
        //Sobreescribe el archivo Json con los nuevos datos
        file_put_contents('datos.json', $jsonRecibido);
        echo "Archivo json editado correctamente ";
    }
    else{
        echo "Error: no se recibieron datos.";
    }

?>