<?php 
$suma_impares = 0;

for ($GT = 1; $GT <= 100; $GT++) {
    echo $GT . "\n";    
        if ($GT % 3 == 0) {
        $suma_impares += $GT;
    }
}

echo "La suma de los números impares del 1 al 100 es: " . $suma_impares . "\n";

?>