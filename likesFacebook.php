<html>
<head></head>
<body>
asd
<?php
 
$source_url = "https://www.facebook.com/Noches-de-Code-268201963204097/";  //Esta es la URL de su sitio en Facebook. 
$url = "http://api.facebook.com/restserver.php?method=links.getStats&urls=".urlencode($source_url); 
$xml = file_get_contents($url); 
$xml = simplexml_load_string($xml); 
echo $shares =  $xml->link_stat->share_count; 
echo $likes =  $xml->link_stat->like_count; 
echo $comments = $xml->link_stat->comment_count; 
echo $totals = $xml->link_stat->total_count; 
echo $max = max($shares,$likes,$comments);


?>

<?php echo "{$likes}"; ?> 
</body>
</html>