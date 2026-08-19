<?php

$producto = [
    "nombre" => "Mando Inalambrico",
    "precio" => 1900,
    "stock" => 5
];

echo "Producto original:\n";
echo "Nombre: " . $producto["nombre"] . "\n";
echo "Precio: $" . $producto["precio"] . "\n";
echo "Stock: " . $producto["stock"] . "\n";

echo "------------------------------------------\n";

$producto["precio"] = 967;
$producto["stock"] = 25;
$producto["categoria"] = "Tecnología";

echo "Producto modificado:\n";
echo "Nombre: " . $producto["nombre"] . "\n";
echo "Precio: $" . $producto["precio"] . "\n";
echo "Stock: " . $producto["stock"] . "\n";
echo "Categoría: " . $producto["categoria"];

?>