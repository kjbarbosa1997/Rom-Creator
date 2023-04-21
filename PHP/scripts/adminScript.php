<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: *');

    $isAdmin = filter_input(INPUT_POST, 'adminaccess', FILTER_VALIDATE_BOOL);

    $host = "localhost:3306";
    $dbname = "romdb";
    $username = "root";
    $password = "12354";

    //$conn = mysqli_connect($host, $username, $password, $dbname);

    $conn = mysqli_connect(hostname: $host, username: $username, password: $password, database: $dbname) or die("Could not connect to database");

    if (mysqli_connect_errno()) { die("Connection error: " . mysqli_connect_error()); }   

    if($isAdmin){
        $unitsvalue = filter_input(INPUT_POST, 'units', FILTER_VALIDATE_INT);
        // $paymentvalue = filter_input(INPUT_POST, 'payment', FILTER_VALIDATE_BOOL);
        // $yearlyvalue = filter_input(INPUT_POST, 'yearlycost', FILTER_VALIDATE_INT);
        // $weeklyvalue = filter_input(INPUT_POST, 'weeklycost', FILTER_VALIDATE_INT);
        $startvalue = $_POST['startDate'];
        $endvalue = $_POST['endDate'];
        $descvalue = $_POST['taskDescription'];
        $romid = $_POST['romID'];
        $serviceid = $_POST['serviceID']; //Will soon be a generated value or something else.
        $taskvalue = $_POST["taskName"];

        $turnOffFKC = mysqli_execute_query($conn, "SET foreign_key_checks = 0");

        $timestampStart = strtotime($startvalue);
        $timestampEnd = strtotime($endvalue);
        $mysql_date_start = date('Y-m-d H:i:s', $timestampStart);
        $mysql_date_end = date('Y-m-d H:i:s', $timestampEnd);

        
        $sql = "INSERT INTO task (romID, serviceID, taskName, startDate, endDate, taskDescription, units) VALUES (?,?,?,?,?,?,?)";

        

        $stmt = mysqli_stmt_init($conn);
        if ( ! mysqli_stmt_prepare($stmt, $sql)) { die(mysqli_error($conn)); }
        mysqli_stmt_bind_param($stmt,'iissssi',
        //$romid, $serviceid, "Send String To Table", "2023-03-16", $endvalue, "Task 5 Description Testing...", $unitsvalue
        $romid, $serviceid, $taskvalue, $mysql_date_start, $mysql_date_end, $descvalue, $unitsvalue
        // 1       4         Task Name   Start Date   endDate    description  units   
        );

    

        mysqli_stmt_execute($stmt);
    
        echo "Admin record(s) saved.";

        $turnOnFKC = mysqli_execute_query($conn, "SET foreign_key_checks = 0");

        
        
    }
    

