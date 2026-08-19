<?php

$producto = [
    "nombre" => "Laptop Asus TUF Gaming A-16",
    "precio" => 1200,
    "stock" => 5
];

$cantidad_Solicitada = 2;


if ($cantidad_Solicitada <= $producto["stock"]) {

    $total = $producto["precio"] * $cantidad_Solicitada;

    $producto["stock"] = $producto["stock"] - $cantidad_Solicitada;

    echo "Venta realizada correctamente.\n";
    echo "Producto: " . $producto["nombre"] . "\n";
    echo "Cantidad: " . $cantidad_Solicitada . "\n";
    echo "Total: $" . $total . "\n";
    echo "Stock restante: " . $producto["stock"];
} else {
    echo "Error: No hay suficiente stock disponible para la cantidad solicitada.";
}
?>