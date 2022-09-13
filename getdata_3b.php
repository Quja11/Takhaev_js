<?php

$conn = mysqli_connect("localhost", "root", "", "otziv");
if(!$conn) die("Connection er" . mysqli_connect_error());
//else echo "<u>Подключение к БД установлено</u><br>";

$sql = "SELECT * FROM information";
    if($result = mysqli_query($conn, $sql)){
        while($row = mysqli_fetch_array($result)){
            echo $row["id_otziv"] . ") Имя: " . $row["name"] . "<br> Почта: " . $row["email"] . "<br> Отзыв: " . $row["msg"] . "<br>";
        }
    } 
    else echo "Ошибка: " . mysqli_error($conn);










?>