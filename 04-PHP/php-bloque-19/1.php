<?php


function calcular_promedio($notas)
{
    $suma = 0;

    foreach ($notas as $nota) {
        $suma = $suma + $nota;
    }

    return $suma / count($notas);
}


function nota_mas_Alta($notas)
{
    $mayor = $notas[0];

    foreach ($notas as $nota) {

        if ($nota > $mayor) {
            $mayor = $nota;
        }
    }

    return $mayor;
}


function nota_mas_baja($notas)
{
    $menor = $notas[0];

    foreach ($notas as $nota) {

        if ($nota < $menor) {
            $menor = $nota;
        }
    }

    return $menor;
}
function contar_aprobados($notas)
{
    $aprobados = 0;

    foreach ($notas as $nota) {

        if ($nota >= 6) {
            $aprobados++;
        }
    }

    return $aprobados;
}

function contar_desaprobados($notas)
{
    $desaprobados = 0;

    foreach ($notas as $nota) {

        if ($nota < 6) {
            $desaprobados++;
        }
    }

    return $desaprobados;
}



$notas = [8, 5, 10, 4, 7, 6, 3];



echo "Notas:\n";

foreach ($notas as $nota) {
    echo $nota . "\n";
}

echo "\n";



echo "Promedio: " . calcular_Promedio($notas) . "\n";
echo "Nota más alta: " . nota_Mas_Alta($notas) . "\n";
echo "Nota más baja: " . nota_Mas_Baja($notas) . "\n";
echo "Aprobados: " . contar_Aprobados($notas) . "\n";
echo "Desaprobados: " . contar_Desaprobados($notas);

?>