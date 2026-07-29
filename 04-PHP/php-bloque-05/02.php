<?php

$rol_user = "administrador";

if ($rol_user == "administrador" || $rol_user == "docente" ) {
    echo "Acceso permitido";
} else {
    echo "Acceso denegado";
}
?>