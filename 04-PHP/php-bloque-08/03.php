<?php 

$contador = 0;

for ($A = 1; $A <= 50; $A++) {
    if ($A % 2 == 0) {
        $contador++;
        echo $A . "\n";
    }
}

echo "La cantidad de números pares es: " . $contador . "\n";

?>