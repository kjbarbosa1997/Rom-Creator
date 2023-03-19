<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: *');

    $isAdmin = filter_input(INPUT_POST, 'adminaccess', FILTER_VALIDATE_BOOL);

    $host = "localhost";
    $dbname = "romdb";
    $username = "root";
    $password = "12354";

    //$conn = mysqli_connect($host, $username, $password, $dbname);

    $conn = mysqli_connect(hostname: $host, username: $username, password: $password, database: $dbname) or die("Could not connect to database");

    if (mysqli_connect_errno()) { die("Connection error: " . mysqli_connect_error()); }   

    if($isAdmin){
        $servicevalue = $_POST['service'];
        $unitsvalue = filter_input(INPUT_POST, 'units', FILTER_VALIDATE_INT);
        $paymentvalue = filter_input(INPUT_POST, 'payment', FILTER_VALIDATE_BOOL);
        $yearlyvalue = filter_input(INPUT_POST, 'yearlycost', FILTER_VALIDATE_INT);
        $weeklyvalue = filter_input(INPUT_POST, 'weeklycost', FILTER_VALIDATE_INT);
        $startvalue = $_POST['dosstart'];
        $endvalue = $_POST['dosend'];
        $descvalue = $_POST['description'];
        $romid = 1; //Will soon be a generated value or something else.
        $serviceid = 4; //Will soon be a generated value or something else.
        $taskvalue = $_POST["task"];
        echo "UNITS AMOUNT: ";
        echo $unitsvalue;

        $sql = "INSERT INTO task (romID, serviceID, taskName, startDate, endDate, taskDescription, units) VALUES (?,?,?,?,?,?,?)";

        //$sql = "INSERT INTO 'task' ($romid, $serviceid, $servicevalue, $startvalue, $endvalue, $descvalue, $unitsvalue) VALUES (?,?,?,?,?,?,?)";
        
        $stmt = mysqli_stmt_init($conn);
        if ( ! mysqli_stmt_prepare($stmt, $sql)) { die(mysqli_error($conn)); }
        mysqli_stmt_bind_param($stmt,'iissssi',
        //$romid, $serviceid, "Send String To Table", "2023-03-16", $endvalue, "Task 5 Description Testing...", $unitsvalue
        $romid, $serviceid, $taskvalue, $startvalue, $endvalue, $descvalue, $unitsvalue
        // 1       4         Task Name   Start Date   endDate    description  units   
        );
        mysqli_stmt_execute($stmt);
        echo "Admin record(s) saved.";
        
        
    }
    else{

        
        $customeremail = $_POST["email"];
        $projectname = $_POST['projectName']; 
        $regname = $_POST['name'];
        $tpmname = $_POST['tpm'];
        $financialanalyst = $_POST['financialAnalyst'];
        $fileupload = $_POST['pathname'];
        echo $customeremail;
        echo $projectname;
        echo $regname;
        echo $tpmname;
        echo $financialanalyst;
        echo $fileupload;
        
        $sql = "INSERT INTO tickets (name, email, project, tpm, financialAnalyst) VALUES (?, ?, ?, ?, ?)";
        $stmt = mysqli_stmt_init($conn);
        if ( ! mysqli_stmt_prepare($stmt, $sql)) { die(mysqli_error($conn)); }
        mysqli_stmt_bind_param($stmt,'sssss', $regname, $customeremail, $projectname, $tpmname, $financialanalyst);
        mysqli_stmt_execute($stmt);
        echo "Customer record saved.";
        
    }
    

