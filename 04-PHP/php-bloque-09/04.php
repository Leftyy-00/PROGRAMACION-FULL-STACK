<?php

$Ahorro = 0;
$mes = 0;

while ($Ahorro < 5000) {
    $mes++;
    $Ahorro = $Ahorro + 100;

    echo "En el mes " . $mes . ", el ahorro es de " . $Ahorro . "\n";
}
?>