<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['error' => true, 'message' => 'Method not allowed']);
    exit();
}

$deltaUrl = isset($_GET['url']) ? $_GET['url'] : '';
$apiKey = isset($_GET['api_key']) ? $_GET['api_key'] : '';

if (empty($deltaUrl)) {
    echo json_encode(['error' => true, 'message' => '缺少url参数']);
    exit();
}

$externalApiUrl = 'https://api.bypass.lat/bypass/premium/delta?url=' . urlencode($deltaUrl);
if (!empty($apiKey)) {
    $externalApiUrl .= '&api_key=' . urlencode($apiKey);
}

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $externalApiUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 20);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Accept: application/json',
    'User-Agent: DeltaClient/1.0'
]);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_MAXREDIRS, 5);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

if ($curlError) {
    echo json_encode(['error' => true, 'message' => '请求失败: ' . $curlError]);
    exit();
}

if ($httpCode !== 200) {
    $decoded = json_decode($response, true);
    if ($decoded && isset($decoded['error'])) {
        echo json_encode(['error' => true, 'message' => $decoded['error']]);
    } else {
        echo json_encode(['error' => true, 'message' => 'API返回错误, 状态码: ' . $httpCode]);
    }
    exit();
}

$decoded = json_decode($response, true);
if ($decoded === null) {
    echo json_encode(['error' => true, 'message' => '解析响应失败']);
    exit();
}

echo $response;
?>