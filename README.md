# 🚀 WebDev Mastery Lab - Plataforma Interativa de Estudos (Prova 2026.2)
##⚠️ Disclaimer

## This project is intended exclusively as a personal study aid, developed with the assistance of Generative AI to reinforce and assess knowledge acquired through coursework and classroom instruction.

## It is not intended to serve as a representation of my independent programming abilities, professional experience, or original development work. No claim of sole authorship or independent implementation is made regarding AI-generated code or scripts.

## The repository is publicly accessible solely to accommodate GitHub Pages hosting requirements. Its public availability should not be interpreted as a claim of original authorship over AI-generated components.

Plataforma completa de treino prático e teoria para dominar os conteúdos cobrados na prova:
- **Fetch API** com 2 `.then()` e anatomia das Promises
- **Formulários HTML** feitos à mão e mapeamento de chaves com `name="..."`
- Interceptação com `e.preventDefault()`, `FormData` e `URLSearchParams`
- **Backend PHP**: filtragem de `$_SERVER['REQUEST_METHOD']`, extração de parâmetros com coalescência nula (`?? ''`) e retorno formatado em JSON
- **Sessões e Cookies**: `session_start()`, `session_regenerate_id(true)`, proteção de rotas com `header('Location: ...'); exit;`, e o **Logout Completo em 4 Etapas**
- **Banco de Dados MySQL & PHP**: conexão segura, consultas com `mysqli_fetch_assoc`, **Prepared Statements** contra SQL Injection (`prepare`, `bind_param`, `execute`) e proteção contra XSS (`htmlspecialchars`)

---

## 🌐 Acesso Online via GitHub Pages

A plataforma está hospedada e pode ser acessada de qualquer lugar (celular, tablet ou PC):
👉 **[https://daniab-sec.github.io/ProjectStudyExam/](https://daniab-sec.github.io/ProjectStudyExam/)**

---

## 🏃 Como Rodar Localmente (com Backend PHP Real)

No terminal, dentro desta pasta, basta executar:

```bash
./run.sh
```

Ou diretamente pelo PHP:

```bash
php -S 0.0.0.0:8000
```

Em seguida, abra seu navegador no endereço:
👉 **[http://localhost:8000](http://localhost:8000)**

---

## 🧭 O que tem na plataforma?

1. **⚡ Desafios de Código (Drills Práticos)**:
   - 10 exercícios passo a passo onde você digita o código à mão (sem autocomplete enganoso).
   - Validador em tempo real que testa cada requisito do professor.
   - Linter PHP integrado que acusa erros de sintaxe (como ponto e vírgula esquecido) na hora.
   - Botões de **Dica**, **Gabarito** e **Restaurar**.
   - Progresso salvo automaticamente no seu navegador.

2. **🧠 Simulado de Questões Teóricas (Quiz)**:
   - 15 questões de múltipla escolha com alta incidência em prova.
   - Explicações aprofundadas dos porquês para cada alternativa.
   - Barra de progresso e pontuação imediata.

3. **🔬 Laboratório HTTP (Client-Server Inspector)**:
   - Monte requisições GET ou POST com parâmetros.
   - Veja o **Pacote HTTP Bruto** exatamente como ele trafega na rede (igual ao slide 16 da aula).
   - Dispare requisições reais com Fetch contra os servidores de teste locais (`/api/mock_sorvete.php` e `/api/mock_login.php`) e veja as superglobais do PHP ao vivo.

4. **📚 Resumo "Cai na Prova" (Cheat Sheet)**:
   - As 5 estruturas de código que você precisa memorizar e saber escrever de olhos fechados no dia da prova.
