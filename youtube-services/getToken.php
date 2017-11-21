<?php
// Um codigo responsavel pela obtençao de um token atualizado

$OAUTH2_CLIENT_ID = '682239625401-39f64qpsctu3nncq12k527t4c154n6h4.apps.googleusercontent.com';
$OAUTH2_SCOPES = array(
  1 => 'https://www.googleapis.com/auth/youtube',
);
$REFRESH_TOKEN = '1/Y36o3Qt8CB4PA6sjYTLAhvGUOfDPKtjjJraAwAJmm5g';
	
$OAUTH2_CLIENT_SECRET = 'et7bDKl3xG1ueTEtUz6a8Rh4';


/**
* Verifica a situação atual do token e quanto tempo falta pra ele vencer
*/
//$obj = new stdClass;
//$obj->refresh_token = $REFRESH_TOKEN;
//$obj->client_id = $OAUTH2_CLIENT_ID;
//$obj->client_secret = 'et7bDKl3xG1ueTEtUz6a8Rh4';
//$obj->grant_type = 'refresh_token';
//$obj->access_type = 'offline';

$obj = array(
    'refresh_token' => $REFRESH_TOKEN,
    'client_id' => $OAUTH2_CLIENT_ID,
    'client_secret' => 'et7bDKl3xG1ueTEtUz6a8Rh4',
    'grant_type' => 'refresh_token',
    'access_type' => 'offline'
);

// POST "https://www.googleapis.com/oauth2/v4/token"
$user = post("https://www.googleapis.com/oauth2/v4/token?" . http_build_query($obj), $obj);
header('Content-Type: application/json');
echo ($user);

function post($url, $dados) {
    // Get cURL resource
    $curl = curl_init();
    
    // Set some options - we are passing in a useragent too here
    curl_setopt_array($curl, array (
        CURLOPT_RETURNTRANSFER => 1,
        CURLOPT_URL => $url,
        CURLOPT_POST => 1,
        CURLOPT_HTTPHEADER => array(
            'Content-Type: application/json'
        ),
        CURLOPT_POSTFIELDS => json_encode($dados)
    ));
    
    
    $result = curl_exec($curl);
    // Close request to clear up some resources
    curl_close($curl);
    
//    $jsonResult = json_decode($result);
    return $result;
    
}