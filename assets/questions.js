// Banco de Questões e Desafios Práticos para Prova de Web & PHP
window.STUDY_DATA = {
  // ==========================================
  // DESAFIOS PRÁTICOS DE DIGITAÇÃO DE CÓDIGO
  // ==========================================
  drills: [
    {
      id: "form-manual-1",
      category: "HTML & Formulários",
      title: "1. Criando um Formulário HTML a Mão com POST",
      difficulty: "Básico",
      description: `
        Escreva um formulário HTML manual que envie dados via <code>POST</code> para <code>login.php</code>.
        <br>O formulário deve conter:
        <ul>
          <li>Tag <code>&lt;form action="login.php" method="post"&gt;</code></li>
          <li>Um campo de texto com <code>name="usuario"</code> e <code>placeholder="Digite o usuário"</code></li>
          <li>Um campo de senha com <code>type="password"</code> e <code>name="senha"</code></li>
          <li>Um botão de envio com <code>type="submit"</code> e texto <code>Entrar</code></li>
        </ul>
        <div class="tip-box">💡 <strong>Regra de Ouro da Prova:</strong> O atributo <code>name</code> é o que vira a chave no PHP (<code>$_POST['usuario']</code> e <code>$_POST['senha']</code>). Sem o atributo <code>name</code>, o PHP NUNCA receberá o campo!</div>
      `,
      starterCode: `<form action="login.php" method="post">
  <!-- Adicione os campos aqui -->

</form>`,
      solution: `<form action="login.php" method="post">
  <input type="text" name="usuario" placeholder="Digite o usuário">
  <input type="password" name="senha">
  <button type="submit">Entrar</button>
</form>`,
      hint: "Use <input type=\"text\" name=\"usuario\" ...>, <input type=\"password\" name=\"senha\"> e <button type=\"submit\">Entrar</button>.",
      validate: (code) => {
        const tests = [];
        const hasForm = /<form\s+[^>]*action=["']login\.php["'][^>]*method=["']post["']/i.test(code) ||
                        /<form\s+[^>]*method=["']post["'][^>]*action=["']login\.php["']/i.test(code);
        tests.push({
          name: 'Tag <form> com action="login.php" e method="post"',
          passed: hasForm,
          feedback: hasForm ? 'Correto!' : 'Verifique se action="login.php" e method="post" estão definidos no form.'
        });

        const hasUser = /<input\s+[^>]*name=["']usuario["']/i.test(code);
        tests.push({
          name: 'Input com name="usuario"',
          passed: hasUser,
          feedback: hasUser ? 'Correto!' : 'Falta um <input> com o atributo name="usuario". Lembre-se que "name" é a chave que o PHP lê!'
        });

        const hasPass = /<input\s+[^>]*type=["']password["'][^>]*name=["']senha["']/i.test(code) ||
                        /<input\s+[^>]*name=["']senha["'][^>]*type=["']password["']/i.test(code);
        tests.push({
          name: 'Input com type="password" e name="senha"',
          passed: hasPass,
          feedback: hasPass ? 'Correto!' : 'Falta um input de senha com type="password" e name="senha".'
        });

        const hasBtn = /<button\s+[^>]*type=["']submit["'][^>]*>.*Entrar.*<\/button>/is.test(code) ||
                       /<input\s+[^>]*type=["']submit["'][^>]*value=["']Entrar["']/i.test(code);
        tests.push({
          name: 'Botão de submissão explícito (type="submit")',
          passed: hasBtn,
          feedback: hasBtn ? 'Correto!' : 'Crie um botão explícito: <button type="submit">Entrar</button>.'
        });

        return tests;
      }
    },

    {
      id: "fetch-2-thens-get",
      category: "Fetch & Promises",
      title: "2. Escrevendo Fetch com 2 .then() (GET)",
      difficulty: "Essencial",
      description: `
        Faça uma chamada <code>fetch</code> para a URL <code>'https://exemplo.com/api'</code>.
        <br>Você DEVE utilizar a estrutura com <strong>dois <code>.then()</code></strong> e um <code>.catch()</code>:
        <ol>
          <li>O <strong>primeiro .then()</strong> recebe <code>response</code> e retorna <code>response.json()</code>.</li>
          <li>O <strong>segundo .then()</strong> recebe <code>data</code> e imprime no console com <code>console.log(data)</code>.</li>
          <li>O <strong>.catch()</strong> captura o <code>error</code> e imprime no console com <code>console.error('Erro:', error)</code>.</li>
        </ol>
        <div class="tip-box">
          🎯 <strong>Por que 2 .then()? Pergunta clássica de prova!</strong><br>
          1. O <code>fetch()</code> devolve a 1ª Promise (que resolve quando chegam os headers HTTP com o objeto <code>Response</code>).<br>
          2. O método <code>response.json()</code> lê o corpo assincronamente e devolve a 2ª Promise (com o dado decodificado).<br>
          3. O 2º <code>.then()</code> aguarda essa 2ª Promise para entregar o dado pronto!
        </div>
      `,
      starterCode: `// Escreva o fetch completo com os 2 .then() e .catch()
fetch('https://exemplo.com/api')
`,
      solution: `fetch('https://exemplo.com/api')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Erro:', error));`,
      hint: "fetch('https://exemplo.com/api').then(response => response.json()).then(data => console.log(data)).catch(error => console.error('Erro:', error));",
      validate: (code) => {
        const tests = [];
        const hasFetch = /fetch\(\s*['"`]https:\/\/exemplo\.com\/api['"`]\s*\)/.test(code);
        tests.push({
          name: "Chamada fetch('https://exemplo.com/api')",
          passed: hasFetch,
          feedback: hasFetch ? 'Correto!' : "Inicie com fetch('https://exemplo.com/api')."
        });

        const hasThen1 = /\.then\(\s*(\(?\s*\w+\s*\)?|\(\s*\))\s*=>\s*(\w+\.json\(\)|\{\s*return\s+\w+\.json\(\);?\s*\})\s*\)/.test(code);
        tests.push({
          name: "Primeiro .then() chamando response.json()",
          passed: hasThen1,
          feedback: hasThen1 ? 'Correto!' : 'O 1º .then deve retornar response.json(), ex: .then(response => response.json()).'
        });

        const hasThen2 = /\.then\([^)]*response\.json\(\)[^)]*\)[\s\S]*\.then\(\s*(\(?\s*\w+\s*\)?)\s*=>\s*console\.log\(\s*\w+\s*\)\s*\)/.test(code) ||
                         (code.match(/\.then\(/g) || []).length >= 2 && /console\.log\(\w+\)/.test(code);
        tests.push({
          name: "Segundo .then() recebendo data e usando console.log(data)",
          passed: hasThen2,
          feedback: hasThen2 ? 'Correto!' : 'O 2º .then deve receber os dados parseados: .then(data => console.log(data)).'
        });

        const hasCatch = /\.catch\(\s*(\(?\s*\w+\s*\)?)\s*=>\s*console\.error\(/.test(code);
        tests.push({
          name: ".catch() tratando erros com console.error",
          passed: hasCatch,
          feedback: hasCatch ? 'Correto!' : 'Adicione .catch(error => console.error(\'Erro:\', error)).'
        });

        return tests;
      }
    },

    {
      id: "fetch-post-json",
      category: "Fetch & Promises",
      title: "3. Enviando POST com JSON no Fetch",
      difficulty: "Intermediário",
      description: `
        Faça um <code>fetch</code> enviando dados para <code>'https://exemplo.com/api'</code> via <code>POST</code>.
        <br>Você deve configurar o 2º parâmetro do fetch:
        <ul>
          <li><code>method: 'POST'</code></li>
          <li><code>headers: { 'Content-Type': 'application/json' }</code></li>
          <li><code>body: JSON.stringify({ usuario: 'joao', mensagem: 'Olá' })</code></li>
        </ul>
        E encadear os dois <code>.then()</code>: o 1º convertendo com <code>response.json()</code> e o 2º exibindo <code>console.log(data)</code>.
      `,
      starterCode: `fetch('https://exemplo.com/api', {
  // Complete as opções do POST aqui

})
  .then(response => response.json())
  .then(data => console.log(data));`,
      solution: `fetch('https://exemplo.com/api', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ usuario: 'joao', mensagem: 'Olá' })
})
  .then(response => response.json())
  .then(data => console.log(data));`,
      hint: "Lembre de: method: 'POST', headers com 'Content-Type': 'application/json', e body usando JSON.stringify(...).",
      validate: (code) => {
        const tests = [];
        const hasMethod = /method:\s*['"]POST['"]/i.test(code);
        tests.push({
          name: "method: 'POST'",
          passed: hasMethod,
          feedback: hasMethod ? 'Correto!' : "Defina method: 'POST'."
        });

        const hasHeader = /headers:\s*\{[^}]*['"]Content-Type['"]\s*:\s*['"]application\/json['"][^}]*\}/i.test(code);
        tests.push({
          name: "Header Content-Type: application/json",
          passed: hasHeader,
          feedback: hasHeader ? 'Correto!' : "Defina headers: { 'Content-Type': 'application/json' }."
        });

        const hasBody = /body:\s*JSON\.stringify\(\s*\{[^}]*usuario:\s*['"]joao['"][^}]*\}\s*\)/i.test(code) ||
                        /body:\s*JSON\.stringify\(/.test(code);
        tests.push({
          name: "body com JSON.stringify({ ... })",
          passed: hasBody,
          feedback: hasBody ? 'Correto!' : "O body deve ser JSON.stringify({ usuario: 'joao', mensagem: 'Olá' })."
        });

        const hasTwoThens = (code.match(/\.then\(/g) || []).length >= 2;
        tests.push({
          name: "Presença dos 2 .then() sucessivos",
          passed: hasTwoThens,
          feedback: hasTwoThens ? 'Correto!' : "Mantenha a cadeia de 2 .then()."
        });

        return tests;
      }
    },

    {
      id: "form-event-prevent-default",
      category: "HTML & Formulários",
      title: "4. Interceptando Submit do Form e preventDefault()",
      difficulty: "Essencial",
      description: `
        Capture o evento <code>submit</code> do formulário com id <code>#meuForm</code>.
        <br>Na função de callback do evento:
        <ol>
          <li>Chame <code>e.preventDefault()</code> para impedir o recarregamento automático da página.</li>
          <li>Crie os dados com <code>new FormData(e.target)</code>.</li>
          <li>Envie com <code>fetch('/submit', { method: 'POST', body: dados })</code>.</li>
          <li>Trate a resposta lendo como texto com <code>.then(r => r.text())</code> e mostrando com <code>.then(texto => alert(texto))</code>.</li>
        </ol>
        <div class="tip-box">
          ⚠️ <strong>Pegadinha de Prova:</strong> O que acontece se esquecer <code>e.preventDefault()</code>?<br>
          O navegador recarrega a página inteira instantaneamente, cancelando a requisição fetch assíncrona antes dela terminar!
        </div>
      `,
      starterCode: `const form = document.querySelector('#meuForm');
form.addEventListener('submit', e => {
  // 1. Cancele o envio padrão
  
  // 2. Colete os dados com FormData
  
  // 3. Chame fetch com POST e body
  
});`,
      solution: `const form = document.querySelector('#meuForm');
form.addEventListener('submit', e => {
  e.preventDefault();
  const dados = new FormData(e.target);
  fetch('/submit', {
    method: 'POST',
    body: dados
  })
    .then(r => r.text())
    .then(texto => alert(texto));
});`,
      hint: "Use e.preventDefault(), const dados = new FormData(e.target) e passe body: dados nas opções do fetch.",
      validate: (code) => {
        const tests = [];
        const hasPrev = /e\.preventDefault\(\)/.test(code);
        tests.push({
          name: "Chamada a e.preventDefault()",
          passed: hasPrev,
          feedback: hasPrev ? 'Excelente!' : 'Não se esqueça de e.preventDefault() logo no início da função!'
        });

        const hasFormData = /new\s+FormData\(\s*e\.target\s*\)/.test(code) || /new\s+FormData\(\s*form\s*\)/.test(code) || /new\s+FormData\(\s*this\s*\)/.test(code);
        tests.push({
          name: "Coleta com new FormData(e.target)",
          passed: hasFormData,
          feedback: hasFormData ? 'Correto!' : 'Instancie os dados com new FormData(e.target).'
        });

        const hasFetchPost = /fetch\(\s*['"`]\/submit['"`]\s*,\s*\{[\s\S]*method:\s*['"]POST['"][\s\S]*body:[\s\S]*\}\s*\)/.test(code);
        tests.push({
          name: "fetch('/submit', { method: 'POST', body: ... })",
          passed: hasFetchPost,
          feedback: hasFetchPost ? 'Correto!' : 'Envie a requisição POST com o body contendo o FormData.'
        });

        const hasTextAndAlert = /\.then\(\s*(\(?\w+\)?)\s*=>\s*\w+\.text\(\)\s*\)[\s\S]*\.then\(/i.test(code);
        tests.push({
          name: "Cadeia de 2 .then() com .text() e alert",
          passed: hasTextAndAlert,
          feedback: hasTextAndAlert ? 'Correto!' : 'Faça .then(r => r.text()).then(texto => alert(texto)).'
        });

        return tests;
      }
    },

    {
      id: "form-get-urlsearchparams",
      category: "HTML & Formulários",
      title: "5. Envio de Formulário via GET com URLSearchParams",
      difficulty: "Intermediário",
      description: `
        Quando enviamos um formulário via <code>GET</code> com Fetch, não podemos colocar <code>body</code> na requisição (especificação HTTP!).
        <br>Os parâmetros precisam ir na <strong>Query String</strong> da URL.
        <br>Implemente no evento submit:
        <ol>
          <li><code>e.preventDefault()</code></li>
          <li><code>const dados = new FormData(e.target)</code></li>
          <li><code>const params = new URLSearchParams(dados)</code></li>
          <li><code>fetch(\`/submit?\${params}\`)</code></li>
          <li>Cadeia com <code>.then(r => r.text())</code> e <code>.then(texto => alert(texto))</code></li>
        </ol>
      `,
      starterCode: `form.addEventListener('submit', e => {
  // Escreva o fluxo GET com URLSearchParams aqui

});`,
      solution: `form.addEventListener('submit', e => {
  e.preventDefault();
  const dados = new FormData(e.target);
  const params = new URLSearchParams(dados);
  fetch(\`/submit?\${params}\`)
    .then(r => r.text())
    .then(texto => alert(texto));
});`,
      hint: "Use new URLSearchParams(dados) e monte a URL como `/submit?${params}` ou '/submit?' + params.",
      validate: (code) => {
        const tests = [];
        const hasPrev = /e\.preventDefault\(\)/.test(code);
        tests.push({ name: "e.preventDefault()", passed: hasPrev, feedback: hasPrev ? 'OK' : 'Falta e.preventDefault().' });

        const hasParams = /new\s+URLSearchParams\(\s*\w+\s*\)/.test(code);
        tests.push({ name: "new URLSearchParams(dados)", passed: hasParams, feedback: hasParams ? 'OK' : 'Falta new URLSearchParams(dados).' });

        const hasQueryFetch = /fetch\(\s*(`\/submit\?\$\{\w+\}`|['"]\/submit\?['"]\s*\+\s*\w+(\.toString\(\))?)/.test(code);
        tests.push({
          name: "fetch com query string (/submit?param1=...)",
          passed: hasQueryFetch,
          feedback: hasQueryFetch ? 'OK' : 'A requisição GET deve passar os parâmetros na URL após o ponto de interrogação ?.'
        });

        return tests;
      }
    },

    {
      id: "php-filter-post-request",
      category: "Backend PHP",
      title: "6. PHP: Filtrando REQUEST_METHOD e Retornando JSON",
      difficulty: "Essencial",
      description: `
        Escreva um script PHP que atue como API para receber requisições <code>POST</code>:
        <ol>
          <li>Defina o cabeçalho JSON: <code>header('Content-Type: application/json; charset=utf-8');</code></li>
          <li>Verifique se <code>$_SERVER['REQUEST_METHOD'] !== 'POST'</code>. Se NÃO for POST:
            <ul>
              <li>Defina o código HTTP 405: <code>http_response_code(405);</code></li>
              <li>Imprima o JSON de erro: <code>echo json_encode(['erro' => 'Método não permitido.']);</code></li>
              <li>Encerre imediatamente com <code>exit;</code></li>
            </ul>
          </li>
          <li>Capture o parâmetro <code>'sabor'</code> vindo de <code>$_POST['sabor']</code> usando coalescência nula <code>?? ''</code> e limpe com <code>trim()</code>.</li>
          <li>Se o sabor estiver vazio (<code>=== ''</code>), responda com código 400, json <code>['erro' => 'Informe um sabor.']</code> e <code>exit;</code>.</li>
          <li>Se tudo ok, retorne o array com o sabor e preço usando <code>echo json_encode(['sabor' => $sabor, 'preco' => 'caro']);</code></li>
        </ol>
      `,
      starterCode: `<?php
// 1. Defina o Content-Type

// 2. Filtre o REQUEST_METHOD se não for POST

// 3. Pegue o parâmetro com coalescência nula

// 4. Valide e responda em JSON
`,
      solution: `<?php
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['erro' => 'Método não permitido.']);
    exit;
}

$sabor = trim($_POST['sabor'] ?? '');

if ($sabor === '') {
    http_response_code(400);
    echo json_encode(['erro' => 'Informe um sabor.']);
    exit;
}

$sorvete = [
    'sabor' => $sabor,
    'preco' => 'caro'
];

echo json_encode($sorvete);
?>`,
      hint: "Use header('Content-Type: application/json; charset=utf-8');, confira $_SERVER['REQUEST_METHOD'] !== 'POST' com http_response_code(405), e $sabor = trim($_POST['sabor'] ?? '');.",
      validate: (code) => {
        const tests = [];
        const hasHeader = /header\(\s*['"]Content-Type:\s*application\/json/i.test(code);
        tests.push({
          name: "header('Content-Type: application/json...')",
          passed: hasHeader,
          feedback: hasHeader ? 'OK' : 'Defina o cabeçalho Content-Type para JSON.'
        });

        const hasMethodFilter = /\$_SERVER\s*\[\s*['"]REQUEST_METHOD['"]\s*\]\s*(!==|!=)\s*['"]POST['"]/i.test(code) ||
                                /\$_SERVER\s*\[\s*['"]REQUEST_METHOD['"]\s*\]\s*===?\s*['"]POST['"]/i.test(code);
        tests.push({
          name: "Verificação de $_SERVER['REQUEST_METHOD']",
          passed: hasMethodFilter,
          feedback: hasMethodFilter ? 'OK' : 'Filtre o método verificando $_SERVER[\'REQUEST_METHOD\'].'
        });

        const has405 = /http_response_code\(\s*405\s*\)/.test(code);
        tests.push({
          name: "Status HTTP 405 (Method Not Allowed)",
          passed: has405,
          feedback: has405 ? 'OK' : 'Use http_response_code(405) quando a requisição não for POST.'
        });

        const hasExit = /exit;?/.test(code);
        tests.push({
          name: "Interrupção do fluxo com exit;",
          passed: hasExit,
          feedback: hasExit ? 'OK' : 'Lembre-se de chamar exit; após enviar a resposta de erro!'
        });

        const hasCoalesce = /\$_POST\s*\[\s*['"]sabor['"]\s*\]\s*\?\?\s*['"]/i.test(code);
        tests.push({
          name: "Uso do operador de coalescência nula ?? ''",
          passed: hasCoalesce,
          feedback: hasCoalesce ? 'OK' : 'Evite warnings usando $_POST[\'sabor\'] ?? \'\'.'
        });

        const hasJsonEncode = /echo\s+json_encode\(/.test(code);
        tests.push({
          name: "echo json_encode(...)",
          passed: hasJsonEncode,
          feedback: hasJsonEncode ? 'OK' : 'Converta a resposta com echo json_encode(...).'
        });

        return tests;
      }
    },

    {
      id: "php-session-login-flow",
      category: "Sessões & Cookies",
      title: "7. PHP: Fluxo de Autenticação com Sessão Segura",
      difficulty: "Intermediário",
      description: `
        Escreva o trecho de login em <code>login.php</code>:
        <ol>
          <li>Inicie a sessão com <code>session_start();</code> (sempre a primeira instrução!).</li>
          <li>Receba <code>$usuario = $_POST['usuario'] ?? '';</code> e <code>$senha = $_POST['senha'] ?? '';</code>.</li>
          <li>Se <code>$usuario === 'admin' && $senha === '1234'</code>:
            <ul>
              <li>Regenere o ID da sessão contra Session Fixation: <code>session_regenerate_id(true);</code></li>
              <li>Salve o usuário na sessão: <code>$_SESSION['usuario'] = $usuario;</code></li>
              <li>Redirecione para <code>painel.php</code>: <code>header('Location: painel.php');</code></li>
              <li>Termine a execução com <code>exit;</code></li>
            </ul>
          </li>
          <li>Caso contrário, exiba <code>echo 'Login inválido.';</code></li>
        </ol>
        <div class="tip-box">
          🚨 <strong>Pegadinha Clássica de Prova:</strong> Nunca execute <code>echo</code> antes de <code>header()</code> ou <code>session_start()</code>! E sempre coloque <code>exit;</code> após <code>header('Location: ...')</code> para impedir que o script continue executando.
        </div>
      `,
      starterCode: `<?php
// 1. Inicie a sessão

// 2. Leia as variáveis do POST

// 3. Valide as credenciais com session_regenerate_id e redirecione

`,
      solution: `<?php
session_start();

$usuario = $_POST['usuario'] ?? '';
$senha = $_POST['senha'] ?? '';

if ($usuario === 'admin' && $senha === '1234') {
    session_regenerate_id(true);
    $_SESSION['usuario'] = $usuario;
    header('Location: painel.php');
    exit;
} else {
    echo 'Login inválido.';
}
?>`,
      hint: "Chame session_start(), valide com if ($usuario === 'admin' && $senha === '1234'), faça session_regenerate_id(true), grave em $_SESSION['usuario'] e finalize com header('Location: painel.php'); exit;.",
      validate: (code) => {
        const tests = [];
        const hasStart = /session_start\(\);?/.test(code);
        tests.push({ name: "session_start() no início", passed: hasStart, feedback: hasStart ? 'OK' : 'Falta chamar session_start().' });

        const hasRegen = /session_regenerate_id\(\s*true\s*\);?/.test(code);
        tests.push({
          name: "session_regenerate_id(true) para proteção contra fixation",
          passed: hasRegen,
          feedback: hasRegen ? 'Excelente!' : 'É fundamental chamar session_regenerate_id(true) ao autenticar.'
        });

        const hasSessionSet = /\$_SESSION\s*\[\s*['"]usuario['"]\s*\]\s*=/.test(code);
        tests.push({ name: "Gravação em $_SESSION['usuario']", passed: hasSessionSet, feedback: hasSessionSet ? 'OK' : 'Salve o usuário em $_SESSION[\'usuario\'].' });

        const hasHeaderAndExit = /header\(\s*['"]Location:\s*painel\.php['"]\s*\);?[\s\S]*exit;?/.test(code);
        tests.push({
          name: "header('Location: painel.php') seguido de exit;",
          passed: hasHeaderAndExit,
          feedback: hasHeaderAndExit ? 'OK' : 'Redirecione com header(\'Location: painel.php\') e nunca esqueça o exit;!'
        });

        return tests;
      }
    },

    {
      id: "php-session-logout-4steps",
      category: "Sessões & Cookies",
      title: "8. O Logout Perfeito em 4 Passos Obrigatórios",
      difficulty: "Mestre",
      description: `
        Em PHP, chamar apenas <code>session_destroy()</code> <strong>NÃO</strong> é suficiente para encerrar o login porque o cookie de ID continua no navegador do usuário!
        <br>Escreva a rotina completa de logout em <code>logout.php</code> cumprindo exatamente os 4 passos dos slides:
        <ol>
          <li><code>session_start();</code> (precisa iniciar para poder manipular a sessão ativa)</li>
          <li><code>session_unset();</code> (limpa as variáveis da superglobal <code>$_SESSION</code>)</li>
          <li><code>session_destroy();</code> (destrói o arquivo de dados da sessão no servidor)</li>
          <li>Apagar o cookie da sessão no navegador do usuário:
            <pre><code>if (isset($_COOKIE[session_name()])) {
    setcookie(session_name(), '', time() - 3600, '/');
}</code></pre>
          </li>
          <li>Exiba a mensagem final e o link de volta:
            <br><code>echo "Você saiu com sucesso!&lt;br&gt;";</code>
            <br><code>echo "&lt;a href='index.html'&gt;Voltar para o login&lt;/a&gt;";</code>
          </li>
        </ol>
      `,
      starterCode: `<?php
// Passo 1: Inicie a sessão

// Passo 2: Limpe as variáveis da sessão

// Passo 3: Destrua a sessão no servidor

// Passo 4: Remova o cookie de sessão do navegador com data no passado

// Passo 5: Mensagem e link
`,
      solution: `<?php
session_start();
session_unset();
session_destroy();

if (isset($_COOKIE[session_name()])) {
    setcookie(session_name(), '', time() - 3600, '/');
}

echo "Você saiu com sucesso!<br>";
echo "<a href='index.html'>Voltar para o login</a>";
?>`,
      hint: "session_start(); session_unset(); session_destroy(); if (isset($_COOKIE[session_name()])) { setcookie(session_name(), '', time() - 3600, '/'); }",
      validate: (code) => {
        const tests = [];
        const hasStart = /session_start\(\);?/.test(code);
        tests.push({ name: "Passo 1: session_start()", passed: hasStart, feedback: hasStart ? 'OK' : 'Falta session_start().' });

        const hasUnset = /session_unset\(\);?/.test(code);
        tests.push({ name: "Passo 2: session_unset()", passed: hasUnset, feedback: hasUnset ? 'OK' : 'Falta session_unset() para limpar $_SESSION.' });

        const hasDestroy = /session_destroy\(\);?/.test(code);
        tests.push({ name: "Passo 3: session_destroy()", passed: hasDestroy, feedback: hasDestroy ? 'OK' : 'Falta session_destroy().' });

        const hasSetCookiePast = /setcookie\(\s*session_name\(\)\s*,\s*['"]['"]\s*,\s*time\(\)\s*-\s*\d+\s*,\s*['"]\/['"]\s*\);?/.test(code);
        tests.push({
          name: "Passo 4: setcookie(session_name(), '', time() - 3600, '/')",
          passed: hasSetCookiePast,
          feedback: hasSetCookiePast ? 'Perfeito! Cookie expirado com sucesso.' : 'Expire o cookie usando setcookie(session_name(), \'\', time() - 3600, \'/\').'
        });

        return tests;
      }
    },

    {
      id: "mysql-prepared-statement-insert",
      category: "Banco de Dados & MySQL",
      title: "9. Inserção Segura com Prepared Statement (Anti-SQL-Injection)",
      difficulty: "Avançado",
      description: `
        Para evitar ataques de <strong>SQL Injection</strong>, nunca devemos concatenar dados de formulário na query.
        <br>Dado o objeto de conexão <code>$conn</code> e as variáveis <code>$nome</code> (string), <code>$valor</code> (double) e <code>$cor</code> (string):
        <ol>
          <li>Prepare a consulta parametrizada usando <code>?</code> como placeholders:
            <br><code>$stmt = $conn->prepare('INSERT INTO sabores (nome, valor, cor) VALUES (?, ?, ?)');</code>
          </li>
          <li>Vincule os parâmetros com <code>bind_param</code> especificando as letras dos tipos correspondentes (<code>'sds'</code> para string, double, string):
            <br><code>$stmt->bind_param('sds', $nome, $valor, $cor);</code>
          </li>
          <li>Execute a query preparada:
            <br><code>$stmt->execute();</code>
          </li>
        </ol>
        <div class="tip-box">
          📖 <strong>Tipos do bind_param para guardar na mente:</strong><br>
          • <code>i</code> : integer (inteiro)<br>
          • <code>d</code> : double (ponto flutuante / moeda)<br>
          • <code>s</code> : string (texto)<br>
          • <code>b</code> : blob (binário / imagem)
        </div>
      `,
      starterCode: `// 1. Prepare a declaração SQL com placeholders ?
$stmt = $conn->prepare('INSERT INTO sabores (nome, valor, cor) VALUES (?, ?, ?)');

// 2. Faça o bind_param com os tipos corretos ('sds')

// 3. Execute a declaração
`,
      solution: `$stmt = $conn->prepare('INSERT INTO sabores (nome, valor, cor) VALUES (?, ?, ?)');
$stmt->bind_param('sds', $nome, $valor, $cor);
$stmt->execute();`,
      hint: "$stmt->bind_param('sds', $nome, $valor, $cor); seguido de $stmt->execute();",
      validate: (code) => {
        const tests = [];
        const hasPrepare = /\$stmt\s*=\s*\$conn->prepare\(\s*['"]INSERT\s+INTO\s+sabores\s*\([^)]+\)\s*VALUES\s*\(\s*\?\s*,\s*\?\s*,\s*\?\s*\)['"]\s*\);?/i.test(code);
        tests.push({
          name: "prepare() com placeholders (?, ?, ?)",
          passed: hasPrepare,
          feedback: hasPrepare ? 'OK' : 'Prepare o statement com (?, ?, ?).'
        });

        const hasBind = /\$stmt->bind_param\(\s*['"]sds['"]\s*,\s*\$nome\s*,\s*\$valor\s*,\s*\$cor\s*\);?/.test(code);
        tests.push({
          name: "bind_param('sds', $nome, $valor, $cor)",
          passed: hasBind,
          feedback: hasBind ? 'OK' : 'Vincule os parâmetros com $stmt->bind_param(\'sds\', $nome, $valor, $cor).'
        });

        const hasExec = /\$stmt->execute\(\);?/.test(code);
        tests.push({
          name: "$stmt->execute()",
          passed: hasExec,
          feedback: hasExec ? 'OK' : 'Execute o statement com $stmt->execute().'
        });

        return tests;
      }
    },

    {
      id: "mysql-select-fetch-assoc-xss",
      category: "Banco de Dados & MySQL",
      title: "10. Consulta em Loop com mysqli_fetch_assoc e Proteção XSS",
      difficulty: "Avançado",
      description: `
        Faça a consulta de todos os usuários e exiba em tela com proteção contra <strong>Cross-Site Scripting (XSS)</strong>:
        <ol>
          <li>Execute a query: <code>$result = mysqli_query($conn, 'SELECT * FROM usuarios');</code></li>
          <li>Percorra todas as linhas usando o laço <code>while ($row = mysqli_fetch_assoc($result))</code></li>
          <li>Dentro do laço, imprima o id formatado como inteiro <code>(int) $row['id']</code>, um hífen e o nome do usuário <strong>escapado com <code>htmlspecialchars</code></strong>:
            <br><code>echo (int)$row['id'] . ' - ' . htmlspecialchars($row['nome'], ENT_QUOTES, 'UTF-8') . '&lt;br&gt;';</code>
          </li>
        </ol>
        <div class="tip-box">
          🛡️ <strong>Por que usar htmlspecialchars?</strong><br>
          Se um usuário cadastrar <code>&lt;script&gt;alert('hack')&lt;/script&gt;</code> no banco, sem o <code>htmlspecialchars</code> o navegador executará o código malicioso na tela de outros usuários. Com ele, o navegador apenas renderiza como texto inofensivo.
        </div>
      `,
      starterCode: `$result = mysqli_query($conn, 'SELECT * FROM usuarios');

// Percorra com while e mysqli_fetch_assoc escapando a saída com htmlspecialchars
`,
      solution: `$result = mysqli_query($conn, 'SELECT * FROM usuarios');
while ($row = mysqli_fetch_assoc($result)) {
    echo (int) $row['id'] . ' - ' . htmlspecialchars($row['nome'], ENT_QUOTES, 'UTF-8') . '<br>';
}`,
      hint: "while ($row = mysqli_fetch_assoc($result)) { echo (int) $row['id'] . ' - ' . htmlspecialchars($row['nome'], ENT_QUOTES, 'UTF-8') . '<br>'; }",
      validate: (code) => {
        const tests = [];
        const hasQuery = /mysqli_query\(\s*\$conn\s*,\s*['"]SELECT\s+\*\s+FROM\s+usuarios['"]\s*\);?/i.test(code);
        tests.push({ name: "mysqli_query executando SELECT", passed: hasQuery, feedback: hasQuery ? 'OK' : 'Execute o mysqli_query.' });

        const hasWhile = /while\s*\(\s*\$row\s*=\s*mysqli_fetch_assoc\(\s*\$result\s*\)\s*\)/.test(code);
        tests.push({ name: "while ($row = mysqli_fetch_assoc($result))", passed: hasWhile, feedback: hasWhile ? 'OK' : 'Use while com mysqli_fetch_assoc.' });

        const hasHtmlSpecial = /htmlspecialchars\(\s*\$row\s*\[\s*['"]nome['"]\s*\]\s*,\s*ENT_QUOTES\s*,\s*['"]UTF-8['"]\s*\)/.test(code) ||
                              /htmlspecialchars\(\s*\$row\s*\[\s*['"]nome['"]\s*\]\s*\)/.test(code);
        tests.push({
          name: "htmlspecialchars($row['nome'], ENT_QUOTES, 'UTF-8')",
          passed: hasHtmlSpecial,
          feedback: hasHtmlSpecial ? 'Excelente! Proteção XSS aplicada.' : 'Proteja a saída com htmlspecialchars.'
        });

        return tests;
      }
    }
  ],

  // ==========================================
  // QUIZZES TEÓRICOS DE ALTO RENDIMENTO
  // ==========================================
  quizzes: [
    {
      id: "q1",
      category: "Arquitetura Web & REST",
      question: "Qual a diferença fundamental entre a comunicação via Sockets TCP/UDP puros e a arquitetura REST sobre HTTP?",
      options: [
        "Sockets são de alto nível e padronizados para web, enquanto REST é de baixo nível.",
        "TCP/UDP oferecem comunicação direta de baixo nível (ideal para jogos e VoIP), enquanto REST usa HTTP estruturado em requisição e resposta padronizada.",
        "REST é mais rápido que UDP porque não exige confirmação de pacotes.",
        "Navegadores não suportam HTTP, apenas sockets TCP nativos."
      ],
      correct: 1,
      explanation: "TCP e UDP são protocolos de camada de transporte de baixo nível (TCP é confiável e ordenado; UDP é rápido sem garantia de entrega). REST é um estilo arquitetural de aplicação que roda sobre HTTP seguindo o padrão de requisição e resposta."
    },
    {
      id: "q2",
      category: "Fetch & Promises",
      question: "Por que uma requisição com fetch() tradicionalmente encadeia DOIS métodos .then()?",
      options: [
        "Porque o primeiro .then() envia os dados e o segundo aguarda a resposta do servidor.",
        "Porque o primeiro trata erros de conexão e o segundo executa o callback de sucesso.",
        "Porque existem duas Promises sucessivas: a 1ª é devolvida pelo fetch() com a resposta HTTP bruta, e a 2ª é devolvida por response.json() ao ler e decodificar o corpo assincronamente.",
        "É apenas uma convenção estética do JavaScript, podendo ser substituído por apenas um .then() com os mesmos parâmetros."
      ],
      correct: 2,
      explanation: "O fetch() retorna uma Promise que resolve assim que os cabeçalhos chegam (Response). O corpo da resposta pode ser grande e chega em streams de dados; por isso, response.json() precisa fazer uma segunda leitura assíncrona, retornando uma SEGUNDA Promise que é resolvida no segundo .then()."
    },
    {
      id: "q3",
      category: "HTML & Formulários",
      question: "O que acontece com um campo de formulário <input type=\"text\" value=\"Maria\"> se o desenvolvedor esquecer de colocar o atributo 'name' nele ao enviar via FormData ou submit tradicional?",
      options: [
        "O navegador usa o atributo 'id' automaticamente como substituto da chave.",
        "O campo é completamente ignorado e não é enviado nem no FormData nem para a superglobal $_POST no PHP.",
        "O PHP recebe o valor na chave numérica $_POST[0].",
        "O navegador gera um erro fatal de JavaScript no console e bloqueia o envio."
      ],
      correct: 1,
      explanation: "O atributo 'name' é obrigatório para que os dados do formulário sejam transmitidos. Sem 'name', tanto o FormData quanto a submissão padrão do navegador descartam o input. No PHP, a chave em $_POST corresponde exatamente ao valor do atributo name do HTML."
    },
    {
      id: "q4",
      category: "HTML & Formulários",
      question: "No HTML moderno, o que acontece com uma tag <button>Sem Type</button> colocada dentro de um <form> quando clicada?",
      options: [
        "Ela se comporta como type=\"button\" e não faz nada por padrão.",
        "Ela se comporta como type=\"submit\" por padrão e submete o formulário.",
        "Ela reseta todos os campos do formulário para o estado inicial.",
        "O navegador ignora o clique por ser considerado código inválido."
      ],
      correct: 1,
      explanation: "Segundo a especificação HTML, qualquer <button> dentro de um formulário sem o atributo type explícito assume o valor padrão type=\"submit\"! Para que ele não submeta, deve ser explicitamente definido como type=\"button\"."
    },
    {
      id: "q5",
      category: "Fetch & Formulários",
      question: "Por que é necessário chamar e.preventDefault() dentro do listener de 'submit' de um formulário quando usamos fetch?",
      options: [
        "Para limpar os campos do formulário após a digitação.",
        "Para validar se os campos numéricos são positivos.",
        "Para cancelar o recarregamento de página padrão do navegador, permitindo que a requisição assíncrona do fetch aconteça sem ser abortada.",
        "Para converter automaticamente os dados de texto em formato JSON."
      ],
      correct: 2,
      explanation: "O comportamento padrão do navegador ao submeter um formulário é disparar uma navegação tradicional síncrona recarregando a página. O e.preventDefault() cancela essa navegação nativa, mantendo a página aberta para que o fetch() ocorra em background."
    },
    {
      id: "q6",
      category: "REST & HTTP",
      question: "Qual o mapeamento convencional correto entre os métodos HTTP e as operações do CRUD em arquitetura REST?",
      options: [
        "GET = Create, POST = Read, PUT = Update, DELETE = Delete",
        "POST = Create, GET = Read, PUT = Update, DELETE = Delete",
        "POST = Read, GET = Create, DELETE = Update, PUT = Delete",
        "PUT = Create, GET = Read, POST = Update, DELETE = Delete"
      ],
      correct: 1,
      explanation: "A convenção REST dita: POST para Criar (Create), GET para Ler/Obter (Read), PUT para Atualizar (Update) e DELETE para Remover (Delete)."
    },
    {
      id: "q7",
      category: "REST & HTTP",
      question: "Sobre a diferença técnica entre requisições GET e POST nas especificações HTTP:",
      options: [
        "GET pode transportar dados confidenciais criptografados na URL, enquanto POST não tem criptografia.",
        "GET não possui semântica geral definida para corpo (body); servidores podem ignorar body em GET. Já o POST é projetado para transportar dados no corpo.",
        "POST só aceita texto puro, enquanto GET suporta uploads de arquivos binários.",
        "GET é restrito a 256 bytes e POST é restrito a 1024 bytes."
      ],
      correct: 1,
      explanation: "Nas especificações HTTP, o método GET transfere parâmetros na Query String da URL (após '?') e seu body não possui semântica definida (muitos servidores e proxies descartam o body de um GET). O POST transporta sua carga útil estruturada no corpo da requisição."
    },
    {
      id: "q8",
      category: "Sessões & Cookies",
      question: "Qual a diferença primária de armazenamento e segurança entre Cookies e Sessões em PHP?",
      options: [
        "Cookies ficam armazenados no servidor e sessões ficam salvas no navegador.",
        "Cookies são armazenados no navegador (máximo ~4KB); os dados de sessão ficam salvos no servidor e o navegador guarda apenas o identificador (ex: PHPSESSID) em um cookie.",
        "Sessões são salvas permanentemente no banco de dados e cookies expiram em 1 segundo.",
        "JavaScript consegue ler diretamente qualquer dado salvo em $_SESSION do PHP."
      ],
      correct: 1,
      explanation: "Dados de sessão ficam no servidor (em arquivos ou memória), enquanto o cliente guarda apenas o ID da sessão (normalmente PHPSESSID em um cookie). Os dados de sessão não são expostos diretamente ao cliente nem ao JavaScript."
    },
    {
      id: "q9",
      category: "Sessões & Cookies",
      question: "Para que serve a flag de segurança 'HttpOnly' ao definir um Cookie no servidor?",
      options: [
        "Garante que o cookie só pode ser acessado em conexões locais (localhost).",
        "Impede que scripts JavaScript executados no navegador acessem o cookie via document.cookie, mitigando roubo de sessão por ataques XSS.",
        "Faz com que o cookie expire imediatamente quando o navegador for fechado.",
        "Obriga o envio do cookie apenas através de requisições POST."
      ],
      correct: 1,
      explanation: "A flag HttpOnly instrui o navegador a NÃO disponibilizar o cookie para APIs JavaScript (como document.cookie). Isso impede que um script malicioso injetado (XSS) roube o token ou ID de sessão do usuário."
    },
    {
      id: "q10",
      category: "Sessões & Cookies",
      question: "Por que a função session_start() e setcookie() DEVEM ser chamadas antes de qualquer comando 'echo' ou impressão de HTML?",
      options: [
        "Porque o PHP interrompe a execução caso haja comandos echo em qualquer parte do script.",
        "Porque cookies e sessões trafegam nos cabeçalhos (headers) da resposta HTTP, e os cabeçalhos devem ser enviados antes do corpo (HTML/texto) da resposta.",
        "Porque o session_start() precisa inicializar a conexão com o banco MySQL primeiro.",
        "Porque o navegador recusa páginas que tenham código PHP misturado com HTML."
      ],
      correct: 1,
      explanation: "No protocolo HTTP, os cabeçalhos são transmitidos antes do corpo. Como setcookie() e session_start() enviam o cabeçalho 'Set-Cookie', se qualquer byte de texto ou HTML já tiver sido emitido via echo, os headers já foram enviados e o PHP emitirá um erro de 'Headers already sent'."
    },
    {
      id: "q11",
      category: "Sessões & Cookies",
      question: "No processo de logout em PHP, por que apenas chamar session_destroy() é considerado insuficiente?",
      options: [
        "Porque o session_destroy() não apaga o cookie PHPSESSID do navegador do usuário, permitindo potenciais ataques caso o ID seja reutilizado.",
        "Porque o session_destroy() só funciona se o banco de dados MySQL estiver desconectado.",
        "Porque o session_destroy() não desloga usuários se eles tiverem mais de uma aba aberta.",
        "Porque o session_destroy() destrói apenas o cache do Apache e não as variáveis de memória."
      ],
      correct: 0,
      explanation: "session_destroy() apaga os dados da sessão no servidor, mas NÃO apaga o cookie presente no navegador do cliente! Para uma saída segura e completa, deve-se limpar o array ($_SESSION = [] ou session_unset), destruir a sessão (session_destroy) e expirar o cookie explicitamente com setcookie(session_name(), '', time() - 3600, '/')."
    },
    {
      id: "q12",
      category: "Sessões & Cookies",
      question: "Qual o objetivo da função session_regenerate_id(true) no momento do login bem-sucedido?",
      options: [
        "Acelerar o processamento das consultas SQL do usuário.",
        "Prevenir o ataque de Fixação de Sessão (Session Fixation), gerando um novo ID de sessão e descartando o antigo.",
        "Converter a sessão em um cookie permanente sem expiração.",
        "Salvar a senha do usuário criptografada na memória RAM do servidor."
      ],
      correct: 1,
      explanation: "Em ataques de Session Fixation, o invasor tenta induzir a vítima a se autenticar usando um ID de sessão conhecido previamente. Chamar session_regenerate_id(true) descarta o ID anterior e cria um ID novinho em folha imediatamente após a confirmação das credenciais."
    },
    {
      id: "q13",
      category: "Banco de Dados & MySQL",
      question: "Por que concatenar variáveis diretamente em uma query SQL (ex: \"SELECT * FROM users WHERE user = '$user'\") é uma falha grave de segurança?",
      options: [
        "Porque o MySQL não suporta aspas simples em comandos SELECT.",
        "Porque permite ataque de SQL Injection, onde caracteres especiais como ' ou or 1=1 alteram a lógica da instrução SQL executada pelo banco.",
        "Porque diminui drasticamente a velocidade de indexação da tabela.",
        "Porque o PHP 8.4 proíbe o uso do operador de concatenação em strings SQL."
      ],
      correct: 1,
      explanation: "A concatenação mistura a estrutura do comando com dados não confiáveis enviados pelo usuário. Ao digitar apóstrofos e comandos SQL nos campos, o invasor manipula a query executada no banco. A solução definitiva é o uso de Prepared Statements com bind_param."
    },
    {
      id: "q14",
      category: "Banco de Dados & MySQL",
      question: "Na chamada $stmt->bind_param('sds', $a, $b, $c), o que representam exatamente as letras 'sds'?",
      options: [
        "Substituir, Deletar, Salvar",
        "String (texto), Double (ponto flutuante/moeda), String (texto)",
        "Secure, Dynamic, Static",
        "Session, Database, Server"
      ],
      correct: 1,
      explanation: "As letras definem os tipos dos parâmetros para validação e transporte seguro: 'i' = integer, 'd' = double/float, 's' = string, 'b' = blob."
    },
    {
      id: "q15",
      category: "Segurança & XSS",
      question: "Qual a função do htmlspecialchars($dado, ENT_QUOTES, 'UTF-8') ao exibir informações na tela que vieram do banco ou de inputs?",
      options: [
        "Criptografa o texto usando algoritmos AES de 256 bits.",
        "Converte caracteres especiais em entidades HTML (como < para &lt; e \" para &quot;), impedindo a injeção e execução de scripts maliciosos (XSS).",
        "Remove todos os espaços em branco e letras maiúsculas.",
        "Valida se o formato do e-mail é válido antes de salvar."
      ],
      correct: 1,
      explanation: "O htmlspecialchars é a principal defesa contra Cross-Site Scripting (XSS). Ele converte tags como <script> para texto inofensivo no HTML (&lt;script&gt;), fazendo com que o navegador apenas mostre o texto sem executá-lo."
    }
  ],

  // ==========================================
  // RESUMO ESTRUTURADO PARA MEMORIZAÇÃO (CHEATSHEET)
  // ==========================================
  cheatSheet: [
    {
      title: "1. Estrutura do Fetch com 2 .then()",
      code: `fetch(url, {
  method: 'POST', // ou 'GET'
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(dados) // Apenas no POST/PUT
})
  .then(response => {
    // 1ª Promise: Chegada dos cabeçalhos / Response
    if (!response.ok) throw new Error('Falha HTTP: ' + response.status);
    return response.json(); // Retorna a 2ª Promise (leitura do corpo)
  })
  .then(data => {
    // 2ª Promise: Dados JSON parseados e prontos!
    console.log(data);
  })
  .catch(erro => console.error('Erro de rede ou parse:', erro))
  .finally(() => console.log('Sempre executa'));`,
      notes: "Por que 2 .then()? O 1º trata a Promise do fetch (Response); o 2º trata a Promise do response.json() ou response.text()."
    },
    {
      title: "2. Form HTML e Interceptação no JS",
      code: `<!-- HTML -->
<form id="meuForm">
  <input type="text" name="usuario" placeholder="Nome">
  <input type="password" name="senha">
  <button type="submit">Enviar</button>
</form>

// JavaScript
const form = document.querySelector('#meuForm');
form.addEventListener('submit', e => {
  e.preventDefault(); // OBRIGATÓRIO: impede reload da página!
  
  // POST com FormData
  const dados = new FormData(e.target);
  fetch('/api.php', { method: 'POST', body: dados })
    .then(r => r.json())
    .then(data => console.log(data));
    
  // GET com URLSearchParams
  // const params = new URLSearchParams(dados);
  // fetch('/api.php?' + params).then(...);
});`,
      notes: "O atributo 'name' do input é OBRIGATÓRIO. Sem 'name', o FormData ignora o campo e o PHP não recebe nada!"
    },
    {
      title: "3. Backend PHP — Recepção e Validação",
      code: `<?php
header('Content-Type: application/json; charset=utf-8');

// 1. Filtrar método
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405); // Method Not Allowed
    echo json_encode(['erro' => 'Método inválido']);
    exit; // NUNCA esqueça o exit!
}

// 2. Coalescência nula (evita warnings no PHP)
$usuario = trim($_POST['usuario'] ?? '');

// 3. Validação
if ($usuario === '') {
    http_response_code(400); // Bad Request
    echo json_encode(['erro' => 'Preencha o usuário']);
    exit;
}

// 4. Retorno em JSON
echo json_encode([
    'status' => 'sucesso',
    'mensagem' => "Olá, $usuario"
]);
exit;`,
      notes: "Chaves de $_POST casam exatamente com name='' do HTML. Sempre use ?? '' para evitar aviso de undefined array key."
    },
    {
      title: "4. Sessões e o Logout Perfeito em 4 Passos",
      code: `<?php
// === LOGIN ===
session_start();
if ($loginOk) {
    session_regenerate_id(true); // Anti Session Fixation!
    $_SESSION['usuario'] = $usuario;
    header('Location: painel.php');
    exit; // Sempre exit após header Location!
}

// === LOGOUT COMPLETO (DECORAR PARA A PROVA) ===
session_start();                          // 1. Inicia
session_unset();                          // 2. Limpa $_SESSION
session_destroy();                        // 3. Destrói no servidor
if (isset($_COOKIE[session_name()])) {    // 4. Expira cookie no browser
    setcookie(session_name(), '', time() - 3600, '/');
}
header('Location: index.html');
exit;`,
      notes: "session_destroy() sozinho NÃO apaga o cookie do navegador! O cookie precisa ser expirado com data no passado (time() - 3600)."
    },
    {
      title: "5. MySQL: Prepared Statement e XSS",
      code: `<?php
// 1. Conexão com tratamento de exceções (PHP 8.1+)
try {
    $conn = mysqli_connect('127.0.0.1', 'root', 'senha', 'meubanco', 3306);
} catch (mysqli_sql_exception $e) {
    die('Erro na conexão com o banco');
}

// 2. Inserção Segura (Prevenção de SQL Injection)
$stmt = $conn->prepare('INSERT INTO clientes (nome, saldo, ativo) VALUES (?, ?, ?)');
$stmt->bind_param('sds', $nome, $saldo, $ativo); // i=int, d=double, s=string, b=blob
$stmt->execute();

// 3. Consulta em Loop com proteção XSS
$res = mysqli_query($conn, 'SELECT id, nome FROM clientes');
while ($row = mysqli_fetch_assoc($res)) {
    echo (int)$row['id'] . ' - ' . htmlspecialchars($row['nome'], ENT_QUOTES, 'UTF-8') . '<br>';
}`,
      notes: "Prepared statements separam o código SQL dos dados, neutralizando SQL Injection. htmlspecialchars neutraliza XSS."
    }
  ]
};
