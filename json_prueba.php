<?php
header("Content-type:application/json");
$nombreDispositivo = $_GET["nombreDispositivo"];
$luzLed10 = "1";//1 = Prendida, 0 = Apagada
$luzLed10 = array("LuzLed10"=>$luzLed10);
echo json_encode($luzLed10);
?>