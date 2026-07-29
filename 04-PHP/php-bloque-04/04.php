<?php

$nota_examen = 9;

if ($nota_examen < 1 || $nota_examen > 12) {
    echo "Error: la nota debe estar entre 1 y 12";
} elseif ($nota_examen < 6) {
    echo "Insuficiente";
} elseif ($nota_examen <= 8) {
    echo "Aprobado";
} elseif ($nota_examen <= 10) {
    echo "Muy bueno";
} else {
    echo "Excelente";
}

?>