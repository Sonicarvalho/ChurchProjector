<html>
<head>
<?php $debug = false; ?>

<?php

$q = $_GET['CANTICO'];
if ($q == "") die ('err');
if($debug) echo ($q.".html");
$contents = file_get_contents($q.".html");
echo $contents;
?>
</head>
<body>

</body>
</html>