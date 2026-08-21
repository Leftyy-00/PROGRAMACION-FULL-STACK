<?php

$usuarios = [
    [
        "id" => 1,
        "nombre" => "Juan",
        "usuario" => "juan123",
        "contraseña" => "1234",
        "rol" => "administrador",
        "activo" => true
    ],
    [
        "id" => 2,
        "nombre" => "Maria",
        "usuario" => "maria123",
        "contraseña" => "5678",
        "rol" => "empleado",
        "activo" => true
    ],
    [
        "id" => 3,
        "nombre" => "Pedro",
        "usuario" => "pedro123",
        "contraseña" => "abcd",
        "rol" => "empleado",
        "activo" => false
    ]
];

$usuario_buscado = "juan123";
$contraseña_ingresada = "1234";

$usuario_encontrado = null;


foreach ($usuarios as $usuario) {

    if ($usuario["usuario"] == $usuario_buscado) {
        $usuario_encontrado = $usuario;
    }
}



if ($usuario_encontrado == null) {

    echo "Usuario o contraseña incorrectos.";

} else {


    if ($usuario_encontrado["contraseña"] != $contraseña_ingresada) {

        echo "Usuario o contraseña incorrectos.";

    } else {


        if ($usuario_encontrado["activo"] == false) {

            echo "El usuario está inactivo.";

        } else {

            echo "Inicio de sesión correcto.\n";
            echo "Bienvenido, " . $usuario_encontrado["nombre"] . "\n";

        
            if ($usuario_encontrado["rol"] == "administrador") {

                echo "Tiene permisos de administrador.";

            } elseif ($usuario_encontrado["rol"] == "empleado") {

                echo "Tiene permisos de empleado.";

            } else {

                echo "Rol no reconocido.";
            }
        }
    }
}

?>