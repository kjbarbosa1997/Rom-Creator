<?php
//db connection

$host = "localhost:3306";
$dbname = "romdb";
$username = "root";
$password = "";
	
$conn = mysqli_connect(hostname: $host, username: $username, password: $password, database: $dbname) or die("Could not connect to database");

if (mysqli_connect_errno()){
	die("Connection error: " . mysqli_connect_error());
}
	

?>
<html>
    <head>
        <title>ROM Generator</title>
    </head>
    <body>
        select rom:
        <form method='get' action='rom-db.php'>
            <select name='romID'>
                <?php
                    //show invoices list as options
                    $query = mysqli_query($conn,"select * from rom");
                    while($rom = mysqli_fetch_array($query)){
                        echo "<option value='".$rom['romID']."'>".$rom['romID']."</option>";
                    }
                ?>
            </select>
            <input type='submit' value='Generate'>
        </form>
    </body>
</html>