// Lógica Interativa da Plataforma de Estudos Web & PHP (2026.2)
document.addEventListener('DOMContentLoaded', () => {
  const data = window.STUDY_DATA;
  if (!data) {
    console.error('Dados de estudo não encontrados.');
    return;
  }

  // Estado Local
  let currentDrillIndex = 0;
  let currentQuizIndex = 0;
  let quizScore = 0;
  let quizAnswered = {};

  // LocalStorage para salvar progresso
  const STORAGE_KEY = 'webdev_study_progress_2026';
  let userProgress = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{"completedDrills": []}');

  function saveProgress() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userProgress));
    updateStatsBar();
  }

  function updateStatsBar() {
    const totalDrills = data.drills.length;
    const completedCount = userProgress.completedDrills.length;
    const xp = (completedCount * 100) + (quizScore * 20);

    const xpEl = document.getElementById('stat-xp');
    const drillsEl = document.getElementById('stat-drills');
    if (xpEl) xpEl.textContent = `${xp} XP`;
    if (drillsEl) drillsEl.textContent = `${completedCount}/${totalDrills} Concluídos`;
  }

  // ==========================================
  // NAVEGAÇÃO DE ABAS
  // ==========================================
  const navButtons = document.querySelectorAll('.nav-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.dataset.tab;
      navButtons.forEach(b => b.classList.remove('active'));
      tabContents.forEach(t => t.classList.remove('active'));

      btn.classList.add('active');
      const activeTab = document.getElementById(tabId);
      if (activeTab) activeTab.classList.add('active');

      if (tabId === 'tab-cheatsheet') renderCheatSheet();
    });
  });

  // ==========================================
  // DRILLS (DESAFIOS PRÁTICOS DE CÓDIGO)
  // ==========================================
  const drillsListEl = document.getElementById('drills-list');
  const codeEditorEl = document.getElementById('code-editor');
  const drillTitleEl = document.getElementById('drill-title');
  const drillCategoryEl = document.getElementById('drill-category');
  const drillDifficultyEl = document.getElementById('drill-difficulty');
  const drillDescEl = document.getElementById('drill-description');
  const testsContainerEl = document.getElementById('tests-container');
  const testsSummaryEl = document.getElementById('tests-summary');
  const solutionBoxEl = document.getElementById('solution-box');
  const btnRunTests = document.getElementById('btn-run-tests');
  const btnShowHint = document.getElementById('btn-show-hint');
  const btnShowSolution = document.getElementById('btn-show-solution');
  const btnResetCode = document.getElementById('btn-reset-code');

  // Suporte a indentação com tecla TAB no editor
  if (codeEditorEl) {
    codeEditorEl.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        const start = codeEditorEl.selectionStart;
        const end = codeEditorEl.selectionEnd;
        codeEditorEl.value = codeEditorEl.value.substring(0, start) + "  " + codeEditorEl.value.substring(end);
        codeEditorEl.selectionStart = codeEditorEl.selectionEnd = start + 2;
      }
    });
  }

  function renderDrillsList() {
    if (!drillsListEl) return;
    drillsListEl.innerHTML = '';

    data.drills.forEach((drill, idx) => {
      const isPassed = userProgress.completedDrills.includes(drill.id);
      const item = document.createElement('div');
      item.className = `drill-item ${idx === currentDrillIndex ? 'active' : ''}`;
      item.innerHTML = `
        <div class="drill-item-title">
          <span>${drill.title}</span>
          <span class="status-icon ${isPassed ? 'passed' : 'pending'}">${isPassed ? '✓' : '○'}</span>
        </div>
        <div class="drill-item-meta">
          <span>${drill.category}</span>
          <span class="badge-diff ${drill.difficulty}">${drill.difficulty}</span>
        </div>
      `;
      item.addEventListener('click', () => loadDrill(idx));
      drillsListEl.appendChild(item);
    });
  }

  function loadDrill(index) {
    currentDrillIndex = index;
    const drill = data.drills[index];
    if (!drill) return;

    renderDrillsList();

    if (drillTitleEl) drillTitleEl.textContent = drill.title;
    if (drillCategoryEl) drillCategoryEl.textContent = drill.category;
    if (drillDifficultyEl) {
      drillDifficultyEl.textContent = drill.difficulty;
      drillDifficultyEl.className = `badge-diff ${drill.difficulty}`;
    }
    if (drillDescEl) drillDescEl.innerHTML = drill.description;

    // Recupera código salvo do usuário ou código inicial
    const savedUserCode = localStorage.getItem(`code_${drill.id}`);
    if (codeEditorEl) {
      codeEditorEl.value = savedUserCode !== null ? savedUserCode : drill.starterCode;
    }

    // Oculta solução
    if (solutionBoxEl) {
      solutionBoxEl.style.display = 'none';
      solutionBoxEl.textContent = drill.solution;
    }

    // Limpa resultados
    if (testsContainerEl) {
      testsContainerEl.innerHTML = `
        <div style="color: var(--text-muted); font-size: 0.85rem; text-align: center; padding: 2rem 1rem;">
          Clique em <strong>"Executar & Testar"</strong> para avaliar seu código contra os requisitos do professor.
        </div>
      `;
    }
    if (testsSummaryEl) testsSummaryEl.textContent = 'Aguardando execução...';
  }

  function runDrillTests() {
    const drill = data.drills[currentDrillIndex];
    if (!drill || !codeEditorEl) return;

    const code = codeEditorEl.value;
    // Salva o código digitado
    localStorage.setItem(`code_${drill.id}`, code);

    // Valida com as regras
    const results = drill.validate(code);
    const totalTests = results.length;
    const passedTests = results.filter(r => r.passed).length;
    const allPassed = passedTests === totalTests;

    if (testsSummaryEl) {
      testsSummaryEl.innerHTML = allPassed
        ? `<span style="color: var(--success); font-weight: bold;">🎉 Todos os ${totalTests} testes passaram!</span>`
        : `<span style="color: var(--warning); font-weight: bold;">⚠️ ${passedTests}/${totalTests} testes passaram</span>`;
    }

    if (testsContainerEl) {
      testsContainerEl.innerHTML = '';
      results.forEach(res => {
        const card = document.createElement('div');
        card.className = `test-card ${res.passed ? 'passed' : 'failed'}`;
        card.innerHTML = `
          <div class="test-card-title">
            <span>${res.passed ? '✓' : '✗'}</span>
            <span>${res.name}</span>
          </div>
          <div class="test-card-desc">${res.feedback}</div>
        `;
        testsContainerEl.appendChild(card);
      });
    }

    // Se for código PHP, consulta o linter real do PHP 8.4 via API
    if (drill.category.includes('PHP') || drill.category.includes('Banco')) {
      fetch('/api/run_test.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: code })
      })
        .then(response => response.json())
        .then(lintRes => {
          if (!lintRes.valid) {
            const lintCard = document.createElement('div');
            lintCard.className = 'test-card failed';
            lintCard.innerHTML = `
              <div class="test-card-title" style="color: var(--error);">
                <span>⚠️</span>
                <span>Erro de Sintaxe do Interpretador PHP</span>
              </div>
              <div class="test-card-desc" style="font-family: var(--font-mono); white-space: pre-wrap; color: #fca5a5;">${lintRes.error}</div>
            `;
            if (testsContainerEl) testsContainerEl.prepend(lintCard);
          }
        })
        .catch(() => {});
    }

    if (allPassed) {
      if (!userProgress.completedDrills.includes(drill.id)) {
        userProgress.completedDrills.push(drill.id);
        saveProgress();
        renderDrillsList();
      }
    }
  }

  if (btnRunTests) btnRunTests.addEventListener('click', runDrillTests);

  if (btnShowHint) {
    btnShowHint.addEventListener('click', () => {
      const drill = data.drills[currentDrillIndex];
      if (drill && drill.hint) {
        alert('💡 DICA DE ESTUDO:\n\n' + drill.hint);
      }
    });
  }

  if (btnShowSolution) {
    btnShowSolution.addEventListener('click', () => {
      if (solutionBoxEl) {
        const isHidden = solutionBoxEl.style.display === 'none' || solutionBoxEl.style.display === '';
        solutionBoxEl.style.display = isHidden ? 'block' : 'none';
        btnShowSolution.innerHTML = isHidden ? '👁️ Ocultar Gabarito' : '💡 Ver Gabarito';
      }
    });
  }

  if (btnResetCode) {
    btnResetCode.addEventListener('click', () => {
      const drill = data.drills[currentDrillIndex];
      if (drill && codeEditorEl && confirm('Deseja restaurar o código original deste exercício?')) {
        codeEditorEl.value = drill.starterCode;
        localStorage.removeItem(`code_${drill.id}`);
        runDrillTests();
      }
    });
  }

  // ==========================================
  // QUIZ TEÓRICO
  // ==========================================
  const quizCategoryEl = document.getElementById('quiz-category');
  const quizCounterEl = document.getElementById('quiz-counter');
  const quizQuestionEl = document.getElementById('quiz-question');
  const quizOptionsEl = document.getElementById('quiz-options');
  const quizExplanationEl = document.getElementById('quiz-explanation');
  const quizProgressFillEl = document.getElementById('quiz-progress-fill');
  const btnPrevQuiz = document.getElementById('btn-prev-quiz');
  const btnNextQuiz = document.getElementById('btn-next-quiz');

  function renderQuizQuestion(index) {
    const q = data.quizzes[index];
    if (!q) return;

    currentQuizIndex = index;
    const total = data.quizzes.length;

    if (quizCategoryEl) quizCategoryEl.textContent = q.category;
    if (quizCounterEl) quizCounterEl.textContent = `Questão ${index + 1} de ${total}`;
    if (quizQuestionEl) quizQuestionEl.textContent = q.question;
    if (quizProgressFillEl) {
      quizProgressFillEl.style.width = `${((index + 1) / total) * 100}%`;
    }

    if (quizOptionsEl) {
      quizOptionsEl.innerHTML = '';
      const answered = quizAnswered[q.id];

      q.options.forEach((optText, optIdx) => {
        const optBtn = document.createElement('div');
        optBtn.className = 'quiz-option';

        if (answered !== undefined) {
          optBtn.classList.add('locked');
          if (optIdx === q.correct) {
            optBtn.classList.add('correct');
            optBtn.innerHTML = `<span>✓</span><span>${optText}</span>`;
          } else if (optIdx === answered) {
            optBtn.classList.add('incorrect');
            optBtn.innerHTML = `<span>✗</span><span>${optText}</span>`;
          } else {
            optBtn.innerHTML = `<span>○</span><span>${optText}</span>`;
          }
        } else {
          optBtn.innerHTML = `<span>○</span><span>${optText}</span>`;
          optBtn.addEventListener('click', () => handleQuizAnswer(q, optIdx));
        }

        quizOptionsEl.appendChild(optBtn);
      });
    }

    if (quizExplanationEl) {
      const answered = quizAnswered[q.id];
      if (answered !== undefined) {
        quizExplanationEl.style.display = 'block';
        quizExplanationEl.innerHTML = `
          <strong>${answered === q.correct ? '🎉 Resposta Correta!' : '⚠️ Resposta Incorreta!'}</strong><br>
          ${q.explanation}
        `;
      } else {
        quizExplanationEl.style.display = 'none';
      }
    }

    if (btnPrevQuiz) btnPrevQuiz.disabled = index === 0;
    if (btnNextQuiz) {
      btnNextQuiz.textContent = index === total - 1 ? 'Concluir Quiz' : 'Próxima Questão →';
    }
  }

  function handleQuizAnswer(question, selectedIdx) {
    if (quizAnswered[question.id] !== undefined) return;

    quizAnswered[question.id] = selectedIdx;
    if (selectedIdx === question.correct) {
      quizScore++;
      saveProgress();
    }
    renderQuizQuestion(currentQuizIndex);
  }

  if (btnPrevQuiz) {
    btnPrevQuiz.addEventListener('click', () => {
      if (currentQuizIndex > 0) renderQuizQuestion(currentQuizIndex - 1);
    });
  }

  if (btnNextQuiz) {
    btnNextQuiz.addEventListener('click', () => {
      if (currentQuizIndex < data.quizzes.length - 1) {
        renderQuizQuestion(currentQuizIndex + 1);
      } else {
        alert(`🏁 Quiz Concluído!\n\nVocê acertou ${quizScore} de ${data.quizzes.length} questões!`);
      }
    });
  }

  // ==========================================
  // HTTP CLIENT-SERVER LAB (SIMULADOR DE REQUISIÇÃO)
  // ==========================================
  const labMethod = document.getElementById('lab-method');
  const labUrl = document.getElementById('lab-url');
  const labContentType = document.getElementById('lab-content-type');
  const labKey1 = document.getElementById('lab-key1');
  const labVal1 = document.getElementById('lab-val1');
  const labKey2 = document.getElementById('lab-key2');
  const labVal2 = document.getElementById('lab-val2');
  const wirePreviewEl = document.getElementById('wire-preview');
  const btnFireRequest = document.getElementById('btn-fire-request');
  const serverOutputEl = document.getElementById('server-output');

  function updateWirePreview() {
    if (!wirePreviewEl) return;
    const method = labMethod ? labMethod.value : 'POST';
    const url = labUrl ? labUrl.value : '/api/mock_sorvete.php';
    const cType = labContentType ? labContentType.value : 'application/x-www-form-urlencoded';

    const k1 = labKey1 ? labKey1.value.trim() : 'sabor';
    const v1 = labVal1 ? labVal1.value.trim() : 'pistache';
    const k2 = labKey2 ? labKey2.value.trim() : '';
    const v2 = labVal2 ? labVal2.value.trim() : '';

    let bodyStr = '';
    let fullUrl = url;

    if (method === 'GET') {
      const params = new URLSearchParams();
      if (k1) params.append(k1, v1);
      if (k2) params.append(k2, v2);
      const qs = params.toString();
      if (qs) fullUrl += '?' + qs;

      wirePreviewEl.textContent =
`${method} ${fullUrl} HTTP/1.1
Host: localhost:8000
Accept: application/json
User-Agent: WebDevMastery/1.0

(Requisições GET passam parâmetros na Query String da URL — sem corpo!)`;
    } else {
      if (cType === 'application/json') {
        const obj = {};
        if (k1) obj[k1] = v1;
        if (k2) obj[k2] = v2;
        bodyStr = JSON.stringify(obj, null, 2);
      } else {
        const params = new URLSearchParams();
        if (k1) params.append(k1, v1);
        if (k2) params.append(k2, v2);
        bodyStr = params.toString();
      }

      wirePreviewEl.textContent =
`${method} ${fullUrl} HTTP/1.1
Host: localhost:8000
Content-Type: ${cType}
Content-Length: ${bodyStr.length}
Accept: application/json

${bodyStr}`;
    }
  }

  [labMethod, labUrl, labContentType, labKey1, labVal1, labKey2, labVal2].forEach(el => {
    if (el) el.addEventListener('input', updateWirePreview);
    if (el) el.addEventListener('change', updateWirePreview);
  });

  if (btnFireRequest) {
    btnFireRequest.addEventListener('click', async () => {
      const method = labMethod.value;
      const baseUrl = labUrl.value;
      const cType = labContentType.value;
      const k1 = labKey1.value.trim();
      const v1 = labVal1.value.trim();
      const k2 = labKey2.value.trim();
      const v2 = labVal2.value.trim();

      if (serverOutputEl) {
        serverOutputEl.textContent = 'Enviando requisição via Fetch real...';
      }

      try {
        let fetchUrl = baseUrl;
        let options = { method: method };

        if (method === 'GET') {
          const params = new URLSearchParams();
          if (k1) params.append(k1, v1);
          if (k2) params.append(k2, v2);
          const qs = params.toString();
          if (qs) fetchUrl += '?' + qs;
        } else {
          options.headers = { 'Content-Type': cType };
          if (cType === 'application/json') {
            const obj = {};
            if (k1) obj[k1] = v1;
            if (k2) obj[k2] = v2;
            options.body = JSON.stringify(obj);
          } else {
            const params = new URLSearchParams();
            if (k1) params.append(k1, v1);
            if (k2) params.append(k2, v2);
            options.body = params;
          }
        }

        // Executando o Fetch com 2 thens
        const startTime = performance.now();
        fetch(fetchUrl, options)
          .then(response => {
            const status = response.status;
            const statusText = response.statusText;
            const contentType = response.headers.get('content-type') || '';
            const isJson = contentType.includes('application/json');

            return (isJson ? response.json() : response.text()).then(body => ({
              status,
              statusText,
              contentType,
              body,
              time: Math.round(performance.now() - startTime)
            }));
          })
          .then(result => {
            if (serverOutputEl) {
              serverOutputEl.textContent =
`=== RESPOSTA DO SERVIDOR HTTP (${result.time}ms) ===
Status: ${result.status} ${result.statusText}
Content-Type: ${result.contentType}

Dados Retornados (Body):
` + (typeof result.body === 'object' ? JSON.stringify(result.body, null, 2) : result.body);
            }
          })
          .catch(err => {
            // Se estiver no GitHub Pages ou offline, simula a resposta do PHP diretamente no browser
            const isGitHubPages = window.location.hostname.includes('github.io');
            const simResult = simulatePhpBackend(method, baseUrl, k1, v1, k2, v2, cType);
            
            if (serverOutputEl) {
              serverOutputEl.textContent =
`=== RESPOSTA DO SERVIDOR HTTP (${isGitHubPages ? 'Simulação Nativa GitHub Pages' : 'Fallback'}) ===
Status: ${simResult.status} ${simResult.statusText}
Content-Type: application/json; charset=utf-8

Dados Retornados (Body):
` + JSON.stringify(simResult.body, null, 2) + `

💡 Dica: No ambiente local com PHP (php -S localhost:8000), a requisição é processada pelo interpretador PHP real. No GitHub Pages (ambiente estático), a resposta é simulada com a lógica idêntica do PHP.`;
            }
          });

      } catch (err) {
        if (serverOutputEl) serverOutputEl.textContent = 'Erro ao montar fetch: ' + err.message;
      }
    });
  }

  // Simulador do Backend PHP para GitHub Pages
  function simulatePhpBackend(method, url, k1, v1, k2, v2, cType) {
    if (url.includes('sorvete')) {
      if (method !== 'POST') {
        return {
          status: 405,
          statusText: 'Method Not Allowed',
          body: { erro: 'Método não permitido.', metodo_recebido: method, esperado: 'POST' }
        };
      }
      const sabor = (k1 === 'sabor' || k1 === 'sab') ? v1.trim() : (k2 === 'sabor' ? v2.trim() : '');
      if (!sabor) {
        return {
          status: 400,
          statusText: 'Bad Request',
          body: { erro: 'Informe um sabor.', dica: 'Envie o campo "sabor" ou "sab" no body da requisição POST' }
        };
      }
      return {
        status: 200,
        statusText: 'OK',
        body: {
          sabor: sabor,
          preco: 'caro',
          status: 'cadastrado com sucesso',
          debug_servidor: {
            REQUEST_METHOD: 'POST',
            superglobal_post: { [k1 || 'sabor']: v1 }
          }
        }
      };
    }

    if (url.includes('login')) {
      if (url.includes('logout') || k1 === 'action' && v1 === 'logout') {
        return {
          status: 200,
          statusText: 'OK',
          body: {
            status: 'sucesso',
            mensagem: 'Sessão destruída e cookie expirado com sucesso.',
            passos_executados: [
              '1. session_start() executado',
              '2. session_unset() executado',
              '3. session_destroy() executado',
              '4. setcookie() chamado com data no passado (time() - 3600)'
            ]
          }
        };
      }
      if (method !== 'POST') {
        return { status: 405, statusText: 'Method Not Allowed', body: { erro: 'Login exige método POST' } };
      }
      if (v1 === 'admin' && v2 === '1234') {
        return {
          status: 200,
          statusText: 'OK',
          body: {
            status: 'sucesso',
            mensagem: 'Bem-vindo, admin! Sessão iniciada.',
            session_id: 'phpsessid_simulado_8f3a92',
            usuario: 'admin'
          }
        };
      } else {
        return {
          status: 401,
          statusText: 'Unauthorized',
          body: { erro: 'Login inválido.', dica: 'Use usuario: "admin" e senha: "1234"' }
        };
      }
    }

    return {
      status: 200,
      statusText: 'OK',
      body: { mensagem: 'Requisição processada com sucesso' }
    };
  }

  // ==========================================
  // RESUMO / CHEATSHEET
  // ==========================================
  function renderCheatSheet() {
    const container = document.getElementById('cheatsheet-container');
    if (!container) return;
    container.innerHTML = '';

    data.cheatSheet.forEach(item => {
      const card = document.createElement('div');
      card.className = 'cheat-card';
      card.innerHTML = `
        <div class="cheat-card-header">${item.title}</div>
        <div class="cheat-card-body">
          <pre><code>${escapeHtml(item.code)}</code></pre>
          <div class="cheat-notes">💡 ${item.notes}</div>
        </div>
      `;
      container.appendChild(card);
    });
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Inicialização
  updateStatsBar();
  renderDrillsList();
  loadDrill(0);
  renderQuizQuestion(0);
  updateWirePreview();
});
