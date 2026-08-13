<?php
$notas = [8, 5, 2, 6, 10, 3, 9];

foreach ($notas as $nota) {
    if ($nota >= 6) {
        echo "La nota $nota se escapo \n";
    } else {
        echo "La nota $nota se quedo atras \n";
    }
}