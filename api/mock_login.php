<?php
session_start();
header('Content-Type: application/json; charset=utf-8');

$action = $_GET['action'] ?? ($_POST['action'] ?? 'status');

if ($action === 'login') {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        http_response_code(405);
        echo json_encode(['erro' => 'Login exige método POST'], JSON_UNESCAPED_UNICODE);
        exit;
    }

    $inputJson = json_decode(file_get_contents('php://input'), true);
    $usuario = $inputJson['usuario'] ?? ($_POST['usuario'] ?? '');
    $senha = $inputJson['senha'] ?? ($_POST['senha'] ?? '');

    // Validação com credenciais de teste
    if ($usuario === 'admin' && $senha === '1234') {
        // Anti Session Fixation
        session_regenerate_id(true);
        $_SESSION['usuario'] = $usuario;
        $_SESSION['login_time'] = time();

        echo json_encode([
            'status' => 'sucesso',
            'mensagem' => "Bem-vindo, $usuario! Sessão iniciada.",
            'session_id' => session_id(),
            'usuario' => $usuario
        ], JSON_UNESCAPED_UNICODE);
        exit;
    } else {
        http_response_code(401);
        echo json_encode([
            'erro' => 'Login inválido.',
            'dica' => 'Use usuario: "admin" e senha: "1234"'
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }
}

if ($action === 'logout') {
    // Sequência completa de 4 passos dos slides
    session_unset();
    session_destroy();

    if (isset($_COOKIE[session_name()])) {
        setcookie(session_name(), '', time() - 3600, '/');
    }

    echo json_encode([
        'status' => 'sucesso',
        'mensagem' => 'Sessão destruída e cookie expirado com sucesso.',
        'passos_executados' => [
            '1. session_start() executado',
            '2. session_unset() executado',
            '3. session_destroy() executado',
            '4. setcookie() chamado com data no passado (time() - 3600)'
        ]
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// Status da sessão (GET padrão)
echo json_encode([
    'autenticado' => isset($_SESSION['usuario']),
    'usuario' => $_SESSION['usuario'] ?? null,
    'session_id' => session_id(),
    'session_name' => session_name(),
    'tempo_sessao' => isset($_SESSION['login_time']) ? (time() - $_SESSION['login_time']) . 's' : null
], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
exit;
