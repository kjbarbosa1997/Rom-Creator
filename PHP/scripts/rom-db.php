<?php
require('fpdf185/fpdf.php');
//db connection

$host = "localhost:3306";
$dbname = "romdb";
$username = "root";
$password = "12354";
	
$conn = mysqli_connect(hostname: $host, username: $username, password: $password, database: $dbname) or die("Could not connect to database");

if (mysqli_connect_errno()){
	die("Connection error: " . mysqli_connect_error());
}

$query = mysqli_query($conn, "select * from rom
    inner join tickets using(ticketID)
    where 
    romID = '".$_GET['romID']."'");

$rom = mysqli_fetch_array($query);

//A4 width : 219mm
//default margin : 10mm on each side
//writable horizontal : 219-(10*2)=189mm
class PDF extends FPDF
{
    function Footer()
    {
        // Go to 1.5 cm from bottom
        $this->SetY(-15);
        // Select Arial italic 8
        $this->SetFont('Arial','I',8);
        // Print centered page number
        $this->Cell(0,10,$this->PageNo(),0,0,'C');
    }
}

$pdf = new PDF('P','mm','A4');
$numTasks = 3;
//Cover Page
$pdf->AddPage();

//set font to Arial bold 14pt
$pdf->SetFont('TIMES','B',14);

$pdf->SetY(120);

//cell (width, height, text, border, end line, [align])
$pdf->Cell(189,5,'FY23',0,1,"C");
$pdf->Cell(189,5,'Project Name',0,1,"C");
$pdf->Cell(189,5,'Creation Request',0,1,"C");
$pdf->Cell(189,5,'ROM V1.0',0,1,"C");

$pdf->SetY(180);
$pdf->SetFont('TIMES','B',12);
$pdf->Cell(189,5,'Prepared By:',0,1,"C");
$pdf->Cell(189,8,'',0,1,"C");
$pdf->Cell(189,5,$rom['tpm'],0,1,"C");
$pdf->Cell(189,5,'AIMTC Webmaster Lead',0,1,"C");
$pdf->Cell(189,5,'email@domain.com',0,1,"C");
$pdf->Cell(189,5,'',0,1,"C");
$pdf->Cell(189,5,'TPM',0,1,"C");
$pdf->Cell(189,5,'AIMTC Technical Program Manager',0,1,"C");
$pdf->Cell(189,5,'email@domain',0,1,"C");

$query = mysqli_query($conn, "select * from task
    inner join services using(serviceID)
    where 
    romID = '".$rom['romID']."'");
$total = 0;
$x = 1;
while($task = mysqli_fetch_array($query)) {
    $pdf->AddPage();
    $pdf->SetFont('TIMES','',11);
    $pdf->Cell(129,10,"Task Name",1,0);
    $pdf->Cell(30,10,"Start",1,0);
    $pdf->Cell(30,10,"End",1,1);
    $pdf->Cell(129,5,$task['taskName'],1,0);
    $pdf->Cell(30,5,$task['startDate'],1,0);
    $pdf->Cell(30,5,$task['endDate'],1,1);

    $pdf->SetFont('TIMES','B',12);
    $pdf->Cell(189,5,"",0,1);
    $pdf->Cell(189,5,"Task $x Description:",0,1);
    $pdf->SetFont('TIMES','',11);
    $pdf->Cell(189,20,$task['taskDescription'],0,1);

    $pdf->SetFont('TIMES','B',11);
    $pdf->Cell(14,10,"TASK",1,0, "C");
    $pdf->Cell(30,10,"Units",1,0, "C");
    $pdf->Cell(79,10,"AIMTC SCC Service",1,0, "C");
    $pdf->Cell(31,10,"Cost per Unit",1,0, "C");
    $pdf->Cell(35,10,"TOTAL",1,1, "C");

    $pdf->SetFont('TIMES','',11);
    $pdf->Cell(14,5,"1",1,0, "R");
    $pdf->Cell(30,5,$task['units'],1,0, "R");
    $pdf->Cell(79,5,$task['serviceName'],1,0);
    $pdf->Cell(31,5,$task['costPerUnit'],1,0, "R");
    $pdf->Cell(35,5,$task['units']*$task['costPerUnit'],1,1, "R");

    $total += $task['units']*$task['costPerUnit'];
    
}

$pdf->AddPage();
$pdf->SetFont('TIMES','B',12);
$pdf->Cell(189,5,"Total Cost Breakdown:",0,1);
$pdf->Cell(189,5,"",0,1);


$pdf->SetFont('TIMES','B',11);
$pdf->Cell(14,10,"TASK",1,0, "C");
$pdf->Cell(30,10,"Units",1,0, "C");
$pdf->Cell(79,10,"AIMTC SCC Service",1,0, "C");
$pdf->Cell(31,10,"Cost per Unit",1,0, "C");
$pdf->Cell(35,10,"Cost of Task",1,1, "C");

$pdf->SetFont('TIMES','',11);
$query = mysqli_query($conn, "select * from task
    inner join services using(serviceID)
    where 
    romID = '".$rom['romID']."'");
while($task = mysqli_fetch_array($query)) {
    $pdf->Cell(14,5,"1",1,0, "R");
    $pdf->Cell(30,5,$task['units'],1,0, "R");
    $pdf->Cell(79,5,$task['serviceName'],1,0);
    $pdf->Cell(31,5,$task['costPerUnit'],1,0, "R");
    $pdf->Cell(35,5,$task['units']*$task['costPerUnit'],1,1, "R");
}

$pdf->SetX(133);
$pdf->SetFont('TIMES','B',12);
$pdf->Cell(31,10,"Total Cost:",0,0, "");
$pdf->Cell(35,10,$total,0,1, "R");

















$pdf->Output();
