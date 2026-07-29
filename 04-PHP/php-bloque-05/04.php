<?php

$edad_verificacion = 16;
$tieneentrada_acceso = true;
$acompanadoporadulto_condicion = true;

if (($edad_verificacion >= 18 && $tieneentrada_acceso) || ($edad_verificacion < 18 && $acompanadoporadulto_condicion)) {
    echo "tiene arnès el escuincle, puede pasar";
} else {
    echo "no tiene arnès, pendejos pa' fuera";
}
?>