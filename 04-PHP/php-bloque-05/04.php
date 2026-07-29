<?php

$edad_verificacion = 16;
$tieneentrada_acceso = true;
$acompanadoporadulto_condicion = true;

if (($edad_verificacion >= 18 && $tieneentrada_acceso) || ($edad_verificacion < 18 && $acompanadoporadulto_condicion)) {
    echo "tiene acceso, puede pasar";
} else {
    echo "no tiene acceso, largo pendejo miado";
}
?>