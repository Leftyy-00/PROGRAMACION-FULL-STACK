<?php

function obtenerproductosconstock($productos)
{
    $productos_con_stock = [];

    foreach ($productos as $producto) {

        if ($producto["stock"] > 0) {
            $productos_con_stock[] = $producto;
        }
    }

    return $productos_con_stock;
}

$productos = [
    [
        "id" => 1,
        "nombre" => "Laptop",
        "precio" => 25000,
        "stock" => 5
    ],
    [
        "id" => 2,
        "nombre" => "Mouse",
        "precio" => 800,
        "stock" => 0
    ],
    [
        "id" => 3,
        "nombre" => "Teclado",
        "precio" => 1500,
        "stock" => 7
    ]
];

$resultado = obtenerproductosconstock($productos);

foreach ($resultado as $producto) {

    echo "ID: " . $producto["id"] . "\n";
    echo "Nombre: " . $producto["nombre"] . "\n";
    echo "Precio: $" . $producto["precio"] . "\n";
    echo "Stock: " . $producto["stock"] . "\n \n";
}

?>

