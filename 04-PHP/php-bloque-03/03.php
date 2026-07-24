<?php 

$numero_comparar = 10;
$texto_comparar = "10";

if ($numero_comparar == $texto_comparar) {
    echo "Con == son iguales.\n";
} else {
    echo "Con == son diferentes.\n";
}

if ($numero_comparar === $texto_comparar) {
    echo "Con === son iguales. \n";
} else {
    echo "Con === son diferentes.\n";
}

/*== (comparación débil) compara solo el valor. PHP convierte los tipos si es necesario.
=== (comparación estricta) compara el valor y el tipo de dato.*/
?>


