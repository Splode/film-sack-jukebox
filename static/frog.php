<?php

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => "http://feeds.frogpants.com/filmsack_feed.xml",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "GET",
  CURLOPT_HTTPHEADER => array(
    "cache-control: no-cache",
    "postman-token: d56b4be6-a4c7-93f5-8e6c-fd75984d7dfd"
  ),
));

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

// if ($err) {
//   echo "cURL Error #:" . $err;
// } else {
//   echo $response;
// }

$xml = simplexml_load_string($response);
$json = json_encode($xml);
$array = json_decode($json,TRUE);

echo $json

?>
