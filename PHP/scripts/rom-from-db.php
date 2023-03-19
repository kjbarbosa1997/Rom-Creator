<?php
//db connection
$conn = new mysqli("localhost","root","","romdb") or die("Unable to connect");
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