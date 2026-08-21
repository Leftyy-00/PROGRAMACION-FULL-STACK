<?php

$productos = [
    [
        "id" => 1,
        "nombre" => "Laptop",
        "precio" => 25000
    ],
    [
        "id" => 2,
        "nombre" => "Mouse",
        "precio" => 800
    ],
    [
        "id" => 3,
        "nombre" => "Teclado",
        "precio" => 1500
    ]
];

$id_buscado = 2;

$producto_encontrado = null;


foreach ($productos as $producto) {

    if ($producto["id"] == $id_buscado) {
        $producto_encontrado = $producto;
    }
}



if ($producto_encontrado != null) {

    $respuesta = [
        "exito" => true,
        "producto" => $producto_encontrado
    ];

} else {

    $respuesta = [
        "exito" => false,
        "mensaje" => "Producto no encontrado"
    ];
}


$json = json_encode($respuesta);

echo $json;

?>