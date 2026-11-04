<?php
// API da Sorveteria - Baseada nos Slides de Aula
header('Content-Type: application/json; charset=utf-8');

// Slide 46: Filtragem de método
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'erro' => 'Método não permitido.',
        'metodo_recebido' => $_SERVER['REQUEST_METHOD'],
        'esperado' => 'POST'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// Suporte a form-urlencoded / FormData E a JSON raw body
$inputJson = json_decode(file_get_contents('php://input'), true);
$sabor = '';

if (is_array($inputJson) && isset($inputJson['sabor'])) {
    $sabor = trim($inputJson['sabor']);
} elseif (is_array($inputJson) && isset($inputJson['sab'])) {
    $sabor = trim($inputJson['sab']);
} elseif (isset($_POST['sabor'])) {
    $sabor = trim($_POST['sabor']);
} elseif (isset($_POST['sab'])) {
    $sabor = trim($_POST['sab']);
}

// Slide 46: Validação de campo vazio
if ($sabor === '') {
    http_response_code(400);
    echo json_encode([
        'erro' => 'Informe um sabor.',
        'dica' => 'Envie o campo "sabor" ou "sab" no body da requisição POST'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// Slide 46 e 47: Array associativo retornado como JSON
$sorvete = [
    'sabor' => $sabor,
    'preco' => 'caro',
    'status' => 'cadastrado com sucesso',
    'debug_servidor' => [
        'REQUEST_METHOD' => $_SERVER['REQUEST_METHOD'],
        'headers_content_type' => $_SERVER['CONTENT_TYPE'] ?? 'não informado',
        'superglobal_post' => $_POST
    ]
];

echo json_encode($sorvete, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
exit;
