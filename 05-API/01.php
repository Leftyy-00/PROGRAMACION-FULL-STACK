<?php

header('Content-Type: application/json; charset=utf-8');

$productos = require __DIR__ . '/mock/productos.php';

$metodo = $_SERVER['REQUEST_METHOD'];

// Lo recomendado sería usar un path parameter: /productos/3
// En esta versión básica usamos un query parameter: /productos?id=3

$id = $_GET['id'] ?? null;

switch ($metodo) {
    case 'GET':
        obtenerProductos($productos, $id);
        break;

    case 'POST':
        crearProducto($productos);
        break;

    case 'PUT':
        actualizarProducto($productos, $id);
        break;

    case 'DELETE':
        eliminarProducto($productos, $id);
        break;

    default:
        responderJson(
            ['mensaje' => 'Método no permitido'],
            405
        );
}

function obtenerProductos(array $productos, $id): void
{
    if ($id === null) {
        responderJson($productos);
    }

    foreach ($productos as $producto) {
        if ($producto['id'] == $id) {
            responderJson($producto);
        }
    }

    responderJson(
        ['mensaje' => 'Producto no encontrado'],
        404
    );
}

function crearProducto(array $productos): void
{
    $datos = leerJson();

    if (!isset($datos['nombre'], $datos['precio'])) {
        responderJson(
            ['mensaje' => 'Nombre y precio son obligatorios'],
            400
        );
    }

    if (!is_string($datos['nombre']) || trim($datos['nombre']) === '') {
        responderJson(
            ['mensaje' => 'El nombre no es válido'],
            400
        );
    }

    if (!is_numeric($datos['precio']) || $datos['precio'] <= 0) {
        responderJson(
            ['mensaje' => 'El precio debe ser mayor que cero'],
            400
        );
    }

    $nuevoProducto = [
        'id' => count($productos) + 1,
        'nombre' => trim($datos['nombre']),
        'precio' => (float) $datos['precio']
    ];

    responderJson($nuevoProducto, 201);
}

function actualizarProducto(
    array $productos,
    $id
): void {
    if ($id === null) {
        responderJson(
            ['mensaje' => 'Debes enviar el id'],
            400
        );
    }

    $datos = leerJson();

    if (
        isset($datos['precio']) &&
        (!is_numeric($datos['precio']) || $datos['precio'] <= 0)
    ) {
        responderJson(
            ['mensaje' => 'El precio no es válido'],
            400
        );
    }

    foreach ($productos as $producto) {
        if ($producto['id'] == $id) {
            $producto['nombre'] =
                $datos['nombre'] ?? $producto['nombre'];

            $producto['precio'] =
                isset($datos['precio'])
                    ? (float) $datos['precio']
                    : $producto['precio'];

            responderJson($producto);
        }
    }

    responderJson(
        ['mensaje' => 'Producto no encontrado'],
        404
    );
}

function eliminarProducto(
    array $productos,
    $id
): void {
    if ($id === null) {
        responderJson(
            ['mensaje' => 'Debes enviar el id'],
            400
        );
    }

    foreach ($productos as $producto) {
        if ($producto['id'] == $id) {
            responderJson(
                ['mensaje' => 'Producto eliminado']
            );
        }
    }

    responderJson(
        ['mensaje' => 'Producto no encontrado'],
        404
    );
}

function leerJson(): array
{
    return json_decode(
        file_get_contents('php://input'),
        true
    ) ?? [];
}

function responderJson(
    array $datos,
    int $codigo = 200
): void {
    http_response_code($codigo);

    echo json_encode(
        $datos,
        JSON_UNESCAPED_UNICODE
    );

    exit;
}