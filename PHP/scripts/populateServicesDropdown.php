<?php 
//Add Access-Control-Allow-Origin header
header("Access-Control-Allow-Origin: *");


$host = "localhost";
	$dbname = "romdb";
	$username = "root";
	$password = "12354";
	
	$conn = mysqli_connect(hostname: $host, username: $username, password: $password, database: $dbname) or die("Could not connect to database");

	if (mysqli_connect_errno()){
		die("Connection error: " . mysqli_connect_error());
	}


$userData = mysqli_query($conn,"select * from services"); 
$response = array(); 
while($row = mysqli_fetch_assoc($userData)){ 
  $response[] = $row; 
} 

header('Content-Type: application/json; charset=utf-8');
echo json_encode($response); 

exit;

