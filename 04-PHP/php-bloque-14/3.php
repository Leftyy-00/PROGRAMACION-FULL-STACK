<?php

$notas = [8, 5, 2, 6, 10, 3, 9, 4, 1, 11, 2, 5];

$suma = 0;
$aprobados = 0;
$reprobados = 0;

foreach($notas as $nota) {
    
    echo "La nota $nota \n";

    $suma = $suma + $nota;

    if ($nota >= 5) {
        $aprobados++;
    } else {
        $reprobados++;
    }
}

$cantidad = count($notas);
$promedio = $suma / $cantidad;

echo "El promedio es $promedio \n";
echo "Cantidad de aprobados: $aprobados \n";
echo "Cantidad de reprobados: $reprobados \n";
?>