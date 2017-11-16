<?php
// Um codigo responsavel pela obtençao de um token atualizado

$OAUTH2_CLIENT_ID = '682239625401-39f64qpsctu3nncq12k527t4c154n6h4.apps.googleusercontent.com';
$OAUTH2_SCOPES = array(
  1 => 'https://www.googleapis.com/auth/youtube',
);
	
$OAUTH2_CLIENT_SECRET = 'et7bDKl3xG1ueTEtUz6a8Rh4';


//HTTP GET
function get($url) {
    //  Initiate curl
    $ch = curl_init();
    // Disable SSL verification
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    // Will return the response, if false it print the response
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    // Set the url
    curl_setopt($ch, CURLOPT_URL, $url);
    // Execute
    $result = curl_exec($ch);
    // Closing
    curl_close($ch);
    $jsonResult = json_decode($result);
    return $jsonResult;
}

function post($url, $dados) {
    
    // Get cURL resource
    $curl = curl_init();
    // Set some options - we are passing in a useragent too here
    curl_setopt_array($curl, array(
        CURLOPT_RETURNTRANSFER => 1,
        CURLOPT_URL => $url,
        CURLOPT_POST => 1,
        CURLOPT_POSTFIELDS => $dados
    ));
    
    $result = curl_exec($ch);
    // Close request to clear up some resources
    curl_close($curl);
    
    $jsonResult = json_decode($result);
    return $jsonResult;
    
}