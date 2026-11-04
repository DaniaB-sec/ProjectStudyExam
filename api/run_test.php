<?php
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['erro' => 'Método inválido']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
$code = $input['code'] ?? ($_POST['code'] ?? '');

if (trim($code) === '') {
    echo json_encode(['valid' => false, 'error' => 'Código vazio']);
    exit;
}

// Garante tag <?php se não houver
if (strpos($code, '<?php') === false && strpos($code, '<?') === false) {
    $codeToCheck = "<?php\n" . $code;
} else {
    $codeToCheck = $code;
}

$tmpFile = tempnam(sys_get_temp_dir(), 'php_eval_');
file_put_contents($tmpFile, $codeToCheck);

$cmd = 'php -l ' . escapeshellarg($tmpFile) . ' 2>&1';
$output = shell_exec($cmd);
unlink($tmpFile);

if (strpos($output, 'No syntax errors detected') !== false) {
    echo json_encode([
        'valid' => true,
        'message' => 'Sintaxe PHP válida! Sem erros de sintaxe.'
    ], JSON_UNESCAPED_UNICODE);
} else {
    // Limpa caminhos temporários da mensagem
    $cleanOutput = preg_replace('/in\s+\/.*\.tmp/i', '', $output);
    echo json_encode([
        'valid' => false,
        'error' => trim($cleanOutput)
    ], JSON_UNESCAPED_UNICODE);
}
exit;
