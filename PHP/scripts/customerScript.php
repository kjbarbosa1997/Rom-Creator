<?php

	$email = $_POST['email'];
	$projectName = $_POST['projectName'];
	$name = $_POST['name'];
	$tpm = $_POST['tpm'];
	$financialAnalyst = $_POST['financialAnalyst'];
	

	$host = "localhost:3306";
	$dbname = "romdb";
	$username = "root";
	$password = "12354";
	
	$conn = mysqli_connect(hostname: $host, username: $username, password: $password, database: $dbname) or die("Could not connect to database");

	if (mysqli_connect_errno()){
		die("Connection error: " . mysqli_connect_error());
	}
	
	$sql = "INSERT INTO tickets (name, email, projectName, tpm, financialAnalyst) VALUES (?, ?, ?, ?, ?)";
	

	$stmt = mysqli_stmt_init($conn);

if (! mysqli_stmt_prepare($stmt, $sql)){
	die(mysqli_error(($conn))); 
}

mysqli_stmt_bind_param($stmt, "sssss", $name, $email, $name, $tpm, $financialAnalyst);

mysqli_stmt_execute($stmt);
echo "Customer record(s) saved.";
