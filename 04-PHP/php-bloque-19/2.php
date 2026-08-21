<?php

function mostrar_productos($productos)
{
    foreach ($productos as $producto) {
        echo "ID: " . $producto["id"] . "\n";
        echo "Nombre: " . $producto["nombre"] . "\n";
        echo "Precio: $" . $producto["precio"] . "\n";
        echo "Stock: " . $producto["stock"] . "\n";
        echo "Categoría: " . $producto["categoria"] . "\n";
        echo "____________________________\n";
    }
}

function mostrar_productos_con_stock($productos)
{
    foreach ($productos as $producto) {

        if ($producto["stock"] > 0) {
            echo "Nombre: " . $producto["nombre"] . "\n";
            echo "Precio: $" . $producto["precio"] . "\n";
            echo "Stock: " . $producto["stock"] . "\n";
            echo "Categoría: " . $producto["categoria"] . "\n";
            echo "_________________________\n";
        }
    }
}

function buscar_producto_por_id($productos, $id)
{
    foreach ($productos as $producto) {

        if ($producto["id"] == $id) {
            return $producto;
        }
    }

    return null;
}

function calcular_valor_inventario($productos)
{
    $total = 0;

    foreach ($productos as $producto) {
        $total = $total + ($producto["precio"] * $producto["stock"]);
    }

    return $total;
}

function producto_mas_caro($productos)
{
    $mas_Caro = $productos[0];

    foreach ($productos as $producto) {

        if ($producto["precio"] > $mas_Caro["precio"]) {
            $mas_Caro = $producto;
        }
    }

    return $mas_Caro;
}


$productos = [
    [
        "id" => 1,
        "nombre" => "Laptop",
        "precio" => 25000,
        "stock" => 5,
        "categoria" => "Informática"
    ],
    [
        "id" => 2,
        "nombre" => "Mouse",
        "precio" => 800,
        "stock" => 10,
        "categoria" => "Accesorios"
    ],
    [
        "id" => 3,
        "nombre" => "Teclado",
        "precio" => 1500,
        "stock" => 0,
        "categoria" => "Accesorios"
    ],
    [
        "id" => 4,
        "nombre" => "Monitor",
        "precio" => 18000,
        "stock" => 3,
        "categoria" => "Informática"
    ]
];


echo "TODOS LOS PRODUCTOS\n";
echo "____________________\n";

mostrar_productos($productos);


echo "\nPRODUCTOS CON STOCK\n";
echo "_______________________\n";

mostrar_productos_con_stock($productos);


echo "\nBUSCAR PRODUCTO POR ID\n";
echo "__________________________\n";

$id_Buscado = 2;

$producto = buscar_producto_por_id($productos, $id_Buscado);

if ($producto != null) {
    echo "ID: " . $producto["id"] . "\n";
    echo "Nombre: " . $producto["nombre"] . "\n";
    echo "Precio: $" . $producto["precio"] . "\n";
    echo "Stock: " . $producto["stock"] . "\n";
    echo "Categoría: " . $producto["categoria"] . "\n";
} else {
    echo "Producto no encontrado\n";
}


echo "\nVALOR TOTAL DEL INVENTARIO\n";
echo "____________________________\n";

$total = calcular_valor_inventario($productos);

echo "$" . $total . "\n";


echo "\nPRODUCTO MÁS CARO\n";
echo "_____________________\n";

$mas_Caro = producto_mas_caro($productos);

echo "Nombre: " . $mas_Caro["nombre"] . "\n";
echo "Precio: $" . $mas_Caro["precio"] . "\n";

?>