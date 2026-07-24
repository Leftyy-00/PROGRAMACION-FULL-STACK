<?php

$stockDisponible_tienda = 20;
$cantidadSolicitada_cliente = 5;
$precio_tienda = 100;
$presupuestoCliente_cliente = 600;


$costoTotal_compra = $cantidadSolicitada_cliente * $precio_tienda;


if ($stockDisponible_tienda >= $cantidadSolicitada_cliente && $presupuestoCliente_cliente >= $costoTotal_compra) {
    echo "La compra puede realizarse.";
} else {
    echo "La compra no puede realizarse.";
}

?>