<?php
    $host = "localhost";
    $username = "root";
    $password = "";

    $koneksi = new mysqli($host, $username, $password, "dlh_kotacimahi");

    if ($koneksi->connect_error){
        die("Koneksi ke database gagal");
    } else {
        echo "Koneksi ke database berhasil";
    }
?>