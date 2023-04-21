<?php
    header('Access-Control-Allow-Origin: http://localhost:3000');

    $projectName = $_POST['projectName'];
    $email = $_POST['email'];
    $name = $_POST['name'];
    $tpm = $_POST['tpm'];
    $financialAnalyst = $_POST['financialAnalyst'];
    $fileName = $_POST['fileName'];
    $fileURL = $_POST['fileURL'];

    $host = "localhost:3306";
    $dbname = "romdb";
    $username = "root";
    $password = "12354";
    
    $conn = mysqli_connect($host, $username, $password, $dbname) or die("Could not connect to database");

    if (mysqli_connect_errno()){
        die("Connection error: " . mysqli_connect_error());
    }
    
    $turnOffFKC = mysqli_execute_query($conn, "SET foreign_key_checks = 0");

    $sql = "INSERT INTO tickets (name, email, projectName, tpm, financialAnalyst, fileName, fileURL) VALUES (?, ?, ?, ?, ?, ?, ?)";

    $stmt = mysqli_stmt_init($conn);

    if (! mysqli_stmt_prepare($stmt, $sql)){
        die(mysqli_error($conn)); 
    }

    mysqli_stmt_bind_param($stmt, "sssssss", $name, $email, $projectName, $tpm, $financialAnalyst, $fileName, $fileURL);

    mysqli_stmt_execute($stmt);

    


   

    echo "Customer ticket submitted";
?>
