<?php

$productos = [
    [
        "nombre" => "Laptop",
        "precio" => 25000
    ],
    [
        "nombre" => "Mouse",
        "precio" => 800
    ],
    [
        "nombre" => "Teclado",
        "precio" => 1500
    ],
    [
        "nombre" => "Monitor",
        "precio" => 18000
    ]
];

$producto_Mas_Caro = $productos[0];

foreach ($productos as $producto) {

    if ($producto["precio"] > $producto_Mas_Caro["precio"]) {
        $producto_Mas_Caro = $producto;
    }
}

echo "Producto más caro:\n";
echo "Nombre: " . $producto_Mas_Caro["nombre"] . "\n";
echo "Precio: $" . $producto_Mas_Caro["precio"];

?>