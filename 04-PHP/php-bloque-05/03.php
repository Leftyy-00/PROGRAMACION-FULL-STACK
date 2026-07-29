<?php

$precio_producto = 100;
$presupuesto_cliente = 500;
$stock_producto = 10;
$cantidadsolicitada_cliente = 3;


$totaldecompra = $precio_producto * $cantidadsolicitada_cliente;

if ($stock_producto >= $cantidadsolicitada_cliente && $presupuesto_cliente >= $totaldecompra) {
    echo "La compra se ah realizado";
} else {
    echo "No se hace nada porque no hay money";
}
?>