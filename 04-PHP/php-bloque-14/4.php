<?php

$numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
            31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100];

$suma = 0;
$pares = 0;
$impares = 0;

$mayor = $numeros[0];
$menor = $numeros[0];

foreach($numeros as $numero) {
    
    echo "El numero $numero \n";

    $suma = $suma + $numero;

    if ($numero > $mayor) {
        $mayor = $numero;

    }

    if ($numero < $menor) {
        $menor = $numero;
    }

    if ($numero % 2 == 0) {
        $pares++;
    } else {
        $impares++;
    }
}

$cantidad = count($numeros);
$promedio = $suma / $cantidad;

echo " \nLa cantidad de numeros es $cantidad \n";
echo "\n La suma es $suma \n";
echo "\n El promedio es $promedio \n";
echo "\n Cantidad de pares: $pares \n";
echo "\n Cantidad de impares: $impares \n";
echo "\n El mayor es $mayor \n";
echo "\n El menor es $menor \n";
?>