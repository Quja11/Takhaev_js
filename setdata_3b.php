<?php

$conn = mysqli_connect("localhost", "root", "", "otziv");
if(!$conn) die("Connection er" . mysqli_connect_error());
//else echo "<u>Подключение к БД установлено</u><br>";

$name = mysqli_real_escape_string($conn, $_GET["name"]);
$email = mysqli_real_escape_string($conn, $_GET["email"]);
$tmsg = mysqli_real_escape_string($conn, $_GET["tmsg"]);

$sql = "INSERT INTO information (name, email, msg) VALUES ('$name', '$email', '$tmsg')";
    if(mysqli_query($conn, $sql)) echo "<u>Ваш отзыв принят</u>";
    else echo "Ошибка: " . mysqli_error($conn);










?>