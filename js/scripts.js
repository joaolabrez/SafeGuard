document.addEventListener('DOMContentLoaded', function () {
    const elementsToAnimate = document.querySelectorAll('.animar-entrada');
    if (elementsToAnimate.length > 0 && typeof gsap !== 'undefined') {
        gsap.fromTo(elementsToAnimate,
            {opacity: 0, y: 50},
            {opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out"}
        );
    }

    const location = window.location.pathname;
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    let isHomePage = location.endsWith('/') || location.endsWith('index.html');
    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkPath = link.getAttribute('href');
        if ((isHomePage && linkPath === 'index.html') || (!isHomePage && location.includes(linkPath) && linkPath !== 'index.html')) {
            link.classList.add('active');
        }
    });

    const btnTopo = document.getElementById("voltarAoTopoBtn");
    if (btnTopo) {
        window.onscroll = function () {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                btnTopo.classList.add("visivel");
            } else {
                btnTopo.classList.remove("visivel");
            }
        };
        btnTopo.addEventListener('click', function (e) {
            e.preventDefault();
            window.scrollTo({top: 0, behavior: 'smooth'});
        });
    }

    const acidentesCanvas = document.getElementById('acidentesChart');
    if (acidentesCanvas) {
        const dataAntes = {values: [8, 10, 7, 9, 11, 8], label: 'Nº de Acidentes (Sem DDS)'};
        const dataDepois = {values: [3, 2, 2, 1, 3, 1], label: 'Nº de Acidentes (Com DDS)'};
        const laranjaPrimario = getComputedStyle(document.documentElement).getPropertyValue('--laranja-primario').trim();

        const acidentesCtx = acidentesCanvas.getContext('2d');
        let acidentesChart = new Chart(acidentesCtx, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
                datasets: [{
                    label: dataDepois.label,
                    data: dataDepois.values,
                    backgroundColor: laranjaPrimario,
                    borderRadius: 5
                }]
            },
            options: {responsive: true, maintainAspectRatio: false, plugins: {legend: {display: false}}}
        });

        const btnAntes = document.getElementById('btnAcidentesAntes');
        const btnDepois = document.getElementById('btnAcidentesDepois');

        if (btnAntes && btnDepois) {
            function updateChart(data, buttonToActivate) {
                acidentesChart.data.datasets[0].data = data.values;
                acidentesChart.data.datasets[0].label = data.label;
                acidentesChart.data.datasets[0].backgroundColor = (data.label.includes('Sem')) ? '#6c757d' : laranjaPrimario;
                acidentesChart.update();
                [btnAntes, btnDepois].forEach(btn => btn.classList.remove('active'));
                buttonToActivate.classList.add('active');
            }

            btnAntes.addEventListener('click', () => updateChart(dataAntes, btnAntes));
            btnDepois.addEventListener('click', () => updateChart(dataDepois, btnDepois));
        }
    }

    const engajamentoCanvas = document.getElementById('engajamentoChart');
    if (engajamentoCanvas) {
        new Chart(engajamentoCanvas.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Participação Ativa', 'Relatos Proativos', 'Treinamentos'],
                datasets: [{
                    data: [45, 25, 30],
                    backgroundColor: [
                        getComputedStyle(document.documentElement).getPropertyValue('--laranja-primario').trim(),
                        getComputedStyle(document.documentElement).getPropertyValue('--azul-escuro-primario').trim(),
                        '#6c757d'
                    ],
                    borderWidth: 4,
                    borderColor: getComputedStyle(document.documentElement).getPropertyValue('--cinza-claro-fundo').trim()
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {legend: {position: 'bottom'}},
                cutout: '70%'
            }
        });
    }

    const stepButtonsContainer = document.getElementById('epi-step-buttons');
    const contentDiv = document.getElementById('epi-step-content');

    if (stepButtonsContainer && contentDiv) {
        const stepData = {
            1: {
                icon: 'bi-search-heart',
                title: '1. Análise de Riscos',
                description: 'Tudo começa aqui. Esta é a fase de diagnóstico, onde identificamos e avaliamos todos os riscos presentes no ambiente de trabalho para cada função específica. A partir do Programa de Gerenciamento de Riscos (PGR), determinamos quais perigos (químicos, físicos, biológicos, etc.) precisam ser neutralizados pelo uso de EPIs.'
            },
            2: {
                icon: 'bi-check2-circle',
                title: '2. Seleção do EPI Adequado',
                description: 'Com os riscos mapeados, selecionamos o equipamento ideal. Isso envolve escolher o EPI que oferece o nível de proteção necessário, possui Certificado de Aprovação (CA) válido e é o mais confortável e ergonômico possível para o trabalhador, a fim de garantir sua aceitação e uso contínuo.'
            },
            3: {
                icon: 'bi-cart-check',
                title: '3. Compra e Aquisição',
                description: 'A fase de compra deve priorizar a qualidade e a conformidade. É essencial adquirir EPIs de fornecedores confiáveis, verificar a validade do CA no momento da compra e garantir que os produtos atendam a todas as especificações técnicas definidas na etapa de seleção. A gestão de estoque também começa aqui.'
            },
            4: {
                icon: 'bi-box-arrow-in-down',
                title: '4. Entrega e Treinamento',
                description: 'O EPI só é eficaz se o trabalhador souber usá-lo. Nesta etapa, o equipamento é entregue formalmente ao colaborador mediante registro em ficha de EPI. O mais importante é o treinamento, que deve cobrir o uso correto, a colocação, a retirada, a higienização e as limitações do equipamento.'
            },
            5: {
                icon: 'bi-person-workspace',
                title: '5. Uso Efetivo',
                description: 'Esta é a fase prática, onde o EPI cumpre sua função no dia a dia. A responsabilidade é mútua: o empregado deve usar o EPI conforme treinado, e o empregador deve fiscalizar e garantir que as regras de uso estão sendo seguidas por toda a equipe, de forma consistente.'
            },
            6: {
                icon: 'bi-wrench-adjustable-circle',
                title: '6. Manutenção e Guarda',
                description: 'A durabilidade e eficácia do EPI dependem de seu cuidado. O trabalhador é responsável por guardar e conservar o equipamento, realizando a higienização conforme as instruções. A empresa deve fornecer os meios para a limpeza e realizar inspeções periódicas para identificar avarias ou desgastes.'
            },
            7: {
                icon: 'bi-trash3',
                title: '7. Descarte',
                description: 'Quando o EPI atinge o fim de sua vida útil, está danificado ou com o CA vencido, ele deve ser descartado. O descarte correto é fundamental, especialmente para EPIs contaminados com produtos químicos ou biológicos, que podem exigir procedimentos específicos para não gerar riscos ambientais ou de saúde.'
            }
        };

        function updateContent(step) {
            const data = stepData[step];
            if (data) {
                contentDiv.innerHTML = `
                    <div class="d-flex flex-column flex-md-row align-items-center text-center text-md-start">
                        <i class="bi ${data.icon} display-3 text-laranja-primario me-md-4 mb-3 mb-md-0"></i>
                        <div>
                            <h3 class="fw-bold">${data.title}</h3>
                            <p class="lead-sm mb-0">${data.description}</p>
                        </div>
                    </div>
                `;
            }
        }

        stepButtonsContainer.addEventListener('click', function (e) {
            if (e.target.matches('.epi-step-item')) {
                const step = e.target.dataset.step;
                stepButtonsContainer.querySelectorAll('.epi-step-item').forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
                updateContent(step);
            }
        });
        updateContent(1);
    }

    const efficiencyCanvas = document.getElementById('efficiencyChart');
    if (efficiencyCanvas) {
        const laranjaPrimario = getComputedStyle(document.documentElement).getPropertyValue('--laranja-primario').trim();
        new Chart(efficiencyCanvas.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Custos com Desperdício', 'Tempo de Ciclo (Horas)'],
                datasets: [
                    {
                        label: 'Antes da Otimização',
                        data: [100, 48],
                        backgroundColor: '#6c757d',
                        borderRadius: 5,
                    },
                    {
                        label: 'Depois da Otimização',
                        data: [35, 22],
                        backgroundColor: laranjaPrimario,
                        borderRadius: 5,
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.y !== null) {
                                    if (context.dataIndex === 0) label += `R$ ${context.parsed.y.toFixed(2)}`;
                                    else label += `${context.parsed.y}h`;
                                }
                                return label;
                            }
                        }
                    }
                }
            }
        });
    }

    const processStepsContainer = document.getElementById('process-steps-container');
    const processContentDiv = document.getElementById('process-content');
    if (processStepsContainer && processContentDiv) {
        const processData = {
            planejar: {
                icon: 'bi-clipboard-data-fill',
                title: '1. Planear (Plan)',
                description: 'Esta é a fase de diagnóstico. Mapeamos o fluxo de valor atual, identificamos os 8 desperdícios, analisamos a causa raiz dos problemas e definimos metas claras e mensuráveis para a melhoria. Um plano de ação detalhado é criado com a participação da equipa.'
            },
            executar: {
                icon: 'bi-gear-fill',
                title: '2. Executar (Do)',
                description: 'Colocamos o plano em ação. As mudanças são implementadas de forma controlada, muitas vezes em pequena escala (piloto) para testar as soluções. A equipa é treinada nas novas práticas e a comunicação é fundamental para garantir que todos estejam alinhados.'
            },
            verificar: {
                icon: 'bi-check-circle-fill',
                title: '3. Verificar (Check)',
                description: 'Recolhemos e analisamos os dados para medir o impacto das mudanças. Comparamos os resultados obtidos com as metas definidas na fase de planeamento. Esta etapa é crucial para confirmar se as ações implementadas realmente eliminaram os desperdícios e trouxeram os benefícios esperados.'
            },
            agir: {
                icon: 'bi-arrow-repeat',
                title: '4. Agir (Act)',
                description: 'Com base na verificação, tomamos ações corretivas. Se os resultados foram positivos, padronizamos o novo processo e expandimo-lo para outras áreas. Se não, analisamos o que correu mal e reiniciamos o ciclo PDCA com um novo plano. É a garantia da melhoria contínua.'
            }
        };

        function updateProcessContent(step) {
            const data = processData[step];
            if (data) {
                processContentDiv.innerHTML = `
                    <div class="d-flex align-items-center">
                        <i class="bi ${data.icon} display-4 text-laranja-primario me-4"></i>
                        <div>
                            <h5 class="fw-bold text-start">${data.title}</h5>
                            <p class="text-muted text-start mb-0 small">${data.description}</p>
                        </div>
                    </div>
                `;
            }
        }

        processStepsContainer.addEventListener('click', function (e) {
            if (e.target.matches('.process-step')) {
                const step = e.target.dataset.step;
                processStepsContainer.querySelectorAll('.process-step').forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
                updateProcessContent(step);
            }
        });

        updateProcessContent('planejar');
    }

    const laranjaPrimarioGlobal = getComputedStyle(document.documentElement).getPropertyValue('--laranja-primario').trim();
    const azulEscuroPrimarioGlobal = getComputedStyle(document.documentElement).getPropertyValue('--azul-escuro-primario').trim();
    const cinzaGlobal = '#6c757d';

    const chartDefaults = {
        plugins: {
            legend: {
                labels: {
                    font: {family: 'Poppins'}
                }
            },
            tooltip: {
                titleFont: {family: 'Poppins', weight: 'bold'},
                bodyFont: {family: 'Poppins'}
            }
        },
        scales: {
            x: {
                ticks: {font: {family: 'Poppins'}},
                grid: {display: false}
            },
            y: {
                ticks: {font: {family: 'Poppins'}},
                grid: {color: '#e9ecef'}
            }
        },
        maintainAspectRatio: false
    };

    const defectRateCanvas = document.getElementById('defectRateChart');
    if (defectRateCanvas) {
        new Chart(defectRateCanvas, {
            type: 'line',
            data: {
                labels: ['Início', 'T1', 'T2', 'T3', 'T4'],
                datasets: [{
                    label: 'Taxa de Defeitos (%)',
                    data: [8.5, 6.2, 4.1, 2.5, 1.8],
                    borderColor: laranjaPrimarioGlobal,
                    backgroundColor: 'rgba(255, 140, 0, 0.1)',
                    fill: true,
                    tension: 0.3
                }]
            },
            options: chartDefaults
        });
    }

    const efficiencyImprovementCanvas = document.getElementById('efficiencyImprovementChart');
    if (efficiencyImprovementCanvas) {
        new Chart(efficiencyImprovementCanvas, {
            type: 'bar',
            data: {
                labels: ['Antes', 'Depois'],
                datasets: [{
                    label: 'Eficiência Operacional (%)',
                    data: [65, 90],
                    backgroundColor: [cinzaGlobal, azulEscuroPrimarioGlobal],
                    borderRadius: 5
                }]
            },
            options: {...chartDefaults, scales: {...chartDefaults.scales, y: {beginAtZero: true, max: 100}}}
        });
    }

    const competenciesCanvas = document.getElementById('competenciesChart');
    if (competenciesCanvas) {
        new Chart(competenciesCanvas, {
            type: 'radar',
            data: {
                labels: ['Qualidade', 'Custo', 'Entrega', 'Segurança', 'Moral'],
                datasets: [{
                    label: 'Antes',
                    data: [6, 5, 7, 6, 5],
                    backgroundColor: 'rgba(108, 117, 125, 0.2)',
                    borderColor: cinzaGlobal,
                    pointBackgroundColor: cinzaGlobal,
                }, {
                    label: 'Depois',
                    data: [9, 7, 8, 9, 8],
                    backgroundColor: 'rgba(255, 140, 0, 0.2)',
                    borderColor: laranjaPrimarioGlobal,
                    pointBackgroundColor: laranjaPrimarioGlobal,
                }]
            },
            options: {
                ...chartDefaults,
                scales: {r: {beginAtZero: true, max: 10, pointLabels: {font: {size: 12, family: 'Poppins'}}}}
            }
        });
    }

    const ideasOriginCanvas = document.getElementById('ideasOriginChart');
    if (ideasOriginCanvas) {
        new Chart(ideasOriginCanvas, {
            type: 'doughnut',
            data: {
                labels: ['Produção', 'Engenharia', 'Logística', 'Gestão'],
                datasets: [{
                    label: 'Origem das Ideias',
                    data: [55, 20, 15, 10],
                    backgroundColor: [azulEscuroPrimarioGlobal, laranjaPrimarioGlobal, cinzaGlobal, '#adb5bd'],
                    hoverOffset: 4
                }]
            },
            options: {...chartDefaults, plugins: {...chartDefaults.plugins, legend: {position: 'bottom'}}}
        });
    }

    const fiveSTabsContainer = document.getElementById('five-s-tabs-container');
    if (fiveSTabsContainer) {
        const tabButtons = fiveSTabsContainer.querySelectorAll('.five-s-tab-button');
        const tabContents = document.querySelectorAll('.five-s-tab-content');

        function switchFiveSTab(targetId) {
            tabButtons.forEach(button => {
                button.classList.toggle('active', button.dataset.target === targetId);
            });

            tabContents.forEach(content => {
                content.classList.toggle('active', content.id === targetId);
            });
        }

        fiveSTabsContainer.addEventListener('click', function (e) {
            if (e.target.matches('.five-s-tab-button')) {
                const targetId = e.target.dataset.target;
                switchFiveSTab(targetId);
            }
        });

        if (tabButtons.length > 0) {
            switchFiveSTab(tabButtons[0].dataset.target);
        }
    }

    const leanPrinciplesNav = document.getElementById('lean-principles-nav');
    if (leanPrinciplesNav) {
        const principleContent = document.getElementById('lean-principle-content');
        const principlesData = [
            {
                id: 'valor',
                title: '1. Valor',
                icon: 'bi-gem',
                content: 'O ponto de partida é sempre definir o que é "valor" sob a perspetiva do cliente final. Qualquer atividade que não contribui para o que o cliente está disposto a pagar é considerada desperdício.'
            },
            {
                id: 'fluxo',
                title: '2. Fluxo de Valor',
                icon: 'bi-map-fill',
                content: 'Mapeie todas as etapas do processo para entregar o valor ao cliente. Esta análise ajuda a visualizar onde o valor é realmente criado e onde ocorrem desperdícios, identificando oportunidades de melhoria.'
            },
            {
                id: 'continuo',
                title: '3. Fluxo Contínuo',
                icon: 'bi-infinity',
                content: 'Após eliminar os desperdícios, o próximo passo é garantir que as etapas restantes fluam suavemente, sem interrupções, gargalos ou atrasos, criando um processo contínuo e ágil.'
            },
            {
                id: 'puxada',
                title: '4. Produção Puxada',
                icon: 'bi-download',
                content: 'Em vez de "empurrar" produtos, o sistema puxado produz apenas o que é solicitado pelo cliente, no momento e na quantidade exata. Isso reduz drasticamente o excesso de estoque e a superprodução.'
            },
            {
                id: 'perfeicao',
                title: '5. Perfeição (Kaizen)',
                icon: 'bi-bullseye',
                content: 'A busca pela perfeição é um esforço contínuo. Envolve a cultura de melhoria contínua (Kaizen), onde todos na organização estão constantemente procurando maneiras de aprimorar os processos.'
            }
        ];

        principlesData.forEach(p => {
            const button = document.createElement('button');
            button.className = 'btn btn-outline-primary lean-tab-button';
            button.dataset.target = p.id;
            button.innerHTML = `<i class="bi ${p.icon} me-2"></i> ${p.title}`;
            leanPrinciplesNav.appendChild(button);
        });

        function updatePrincipleContent(targetId) {
            const principle = principlesData.find(p => p.id === targetId);
            if (principle) {
                principleContent.innerHTML = `<h5 class="fw-bold">${principle.title}</h5><p class="text-muted mb-0">${principle.content}</p>`;
            }
        }

        leanPrinciplesNav.addEventListener('click', function (e) {
            if (e.target.matches('.lean-tab-button')) {
                leanPrinciplesNav.querySelectorAll('.lean-tab-button').forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
                updatePrincipleContent(e.target.dataset.target);
            }
        });

        if (leanPrinciplesNav.querySelector('.lean-tab-button')) {
            leanPrinciplesNav.querySelector('.lean-tab-button').click();
        }
    }

    const wastesGrid = document.getElementById('lean-wastes-grid');
    if (wastesGrid) {
        wastesGrid.addEventListener('click', function (e) {
            const card = e.target.closest('.waste-card');
            if (card) {
                const wasOpen = card.classList.contains('open');
                wastesGrid.querySelectorAll('.waste-card').forEach(c => c.classList.remove('open'));
                if (!wasOpen) {
                    card.classList.add('open');
                }
            }
        });
    }

    const leanToolsNav = document.getElementById('lean-tools-nav');
    if (leanToolsNav) {
        const toolContent = document.getElementById('lean-tool-content');
        const toolsData = [
            {
                id: 'kanban',
                title: 'Kanban',
                icon: 'bi-kanban-fill',
                content: 'Um sistema de gestão visual que ajuda a controlar o fluxo de trabalho, utilizando cartões para representar tarefas e limitar o trabalho em progresso para evitar gargalos.'
            },
            {
                id: '5s',
                title: '5S',
                icon: 'bi-ui-checks-grid',
                content: 'Uma metodologia para organizar o local de trabalho (Utilização, Organização, Limpeza, Padronização e Disciplina), resultando num ambiente mais seguro, limpo e eficiente.'
            },
            {
                id: 'kaizen',
                title: 'Kaizen',
                icon: 'bi-lightbulb-fill',
                content: 'A filosofia da melhoria contínua. Envolve todos os funcionários na busca constante por pequenas melhorias incrementais nos processos, que levam a grandes transformações.'
            },
            {
                id: 'jit',
                title: 'Just-in-Time (JIT)',
                icon: 'bi-clock-history',
                content: 'Um sistema que visa fabricar e entregar produtos na quantidade exata e no momento exato em que são necessários, reduzindo drasticamente os custos de estoque e o tempo de espera.'
            }
        ];

        toolsData.forEach(tool => {
            const button = document.createElement('button');
            button.className = 'btn btn-outline-primary lean-tab-button';
            button.dataset.target = tool.id;
            button.innerHTML = `<i class="bi ${tool.icon} me-2"></i> ${tool.title}`;
            leanToolsNav.appendChild(button);
        });

        function updateToolContent(targetId) {
            const tool = toolsData.find(t => t.id === targetId);
            if (tool) {
                toolContent.innerHTML = `<h5 class="fw-bold">${tool.title}</h5><p class="text-muted mb-0">${tool.content}</p>`;
            }
        }

        leanToolsNav.addEventListener('click', function (e) {
            if (e.target.matches('.lean-tab-button')) {
                leanToolsNav.querySelectorAll('.lean-tab-button').forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
                updateToolContent(e.target.dataset.target);
            }
        });

        if (leanToolsNav.querySelector('.lean-tab-button')) {
            leanToolsNav.querySelector('.lean-tab-button').click();
        }
    }

    const leanBenefitsCanvas = document.getElementById('leanBenefitsChart');
    if (leanBenefitsCanvas) {
        new Chart(leanBenefitsCanvas, {
            type: 'bar',
            data: {
                labels: ['Redução de Lead Time', 'Melhora na Qualidade (Menos Defeitos)', 'Redução de Custos', 'Aumento de Produtividade'],
                datasets: [{
                    label: 'Abordagem Tradicional',
                    data: [100, 100, 100, 100],
                    backgroundColor: cinzaGlobal,
                    borderRadius: 5,
                }, {
                    label: 'Abordagem Lean',
                    data: [40, 30, 65, 140],
                    backgroundColor: laranjaPrimarioGlobal,
                    borderRadius: 5,
                }]
            },
            options: {
                ...chartDefaults,
                indexAxis: 'y',
                scales: {
                    ...chartDefaults.scales,
                    x: {
                        ...chartDefaults.scales.x,
                        ticks: {
                            callback: function (value) {
                                return value + '%'
                            }
                        },
                        title: {
                            display: true,
                            text: 'Performance Relativa (Tradicional = 100%)',
                            font: {family: 'Poppins'}
                        }
                    }
                },
                plugins: {
                    ...chartDefaults.plugins,
                    tooltip: {
                        ...chartDefaults.plugins.tooltip,
                        callbacks: {
                            label: function (context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.x !== null) {
                                    if (context.dataset.label === 'Abordagem Tradicional') {
                                        label += 'Baseline (100%)';
                                    } else {
                                        const traditionalValue = 100;
                                        const leanValue = context.parsed.x;
                                        let change = '';
                                        if (context.label.includes('Redução') || context.label.includes('Melhora')) {
                                            change = `Melhora de ${traditionalValue - leanValue}%`;
                                        } else if (context.label.includes('Aumento')) {
                                            change = `Aumento de ${leanValue - traditionalValue}%`;
                                        }
                                        label += `${leanValue}% (${change})`;
                                    }
                                }
                                return label;
                            }
                        }
                    }
                }
            }
        });
    }

    const gembaChartCanvas = document.getElementById('gembaChart');
    if (gembaChartCanvas) {
        const gembaData = {
            typical: {
                labels: ['Reuniões', 'Relatórios & E-mails', 'Tempo no Gemba'],
                values: [45, 40, 15]
            },
            lean: {
                labels: ['Tempo no Gemba', 'Suporte à Equipa', 'Reuniões Estratégicas'],
                values: [60, 25, 15]
            }
        };

        const gembaChart = new Chart(gembaChartCanvas.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: gembaData.typical.labels,
                datasets: [{
                    data: gembaData.typical.values,
                    backgroundColor: [azulEscuroPrimarioGlobal, cinzaGlobal, laranjaPrimarioGlobal]
                }]
            },
            options: {
                ...chartDefaults,
                plugins: {...chartDefaults.plugins, title: {display: true, text: 'Alocação de Tempo: Gestão Típica'}}
            }
        });

        function updateGembaChart(type) {
            const data = gembaData[type];
            gembaChart.data.labels = data.labels;
            gembaChart.data.datasets[0].data = data.values;
            gembaChart.options.plugins.title.text = `Alocação de Tempo: Gestão ${type === 'lean' ? 'Lean' : 'Típica'}`;
            gembaChart.update();
            document.getElementById('gemba-typical-btn').classList.toggle('active', type === 'typical');
            document.getElementById('gemba-lean-btn').classList.toggle('active', type === 'lean');
        }

        document.getElementById('gemba-typical-btn').addEventListener('click', () => updateGembaChart('typical'));
        document.getElementById('gemba-lean-btn').addEventListener('click', () => updateGembaChart('lean'));
    }

    const nemawashiChartCanvas = document.getElementById('nemawashiChart');
    if (nemawashiChartCanvas) {
        const nemawashiData = {
            without: [80, 75, 20],
            with: [15, 25, 95]
        };
        const nemawashiChart = new Chart(nemawashiChartCanvas.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Resistência da Equipa', 'Tempo de Implementação', 'Taxa de Sucesso'],
                datasets: [{
                    label: 'Nível (%)',
                    data: nemawashiData.without,
                    backgroundColor: [laranjaPrimarioGlobal, cinzaGlobal, azulEscuroPrimarioGlobal]
                }]
            },
            options: {
                ...chartDefaults,
                indexAxis: 'y',
                scales: {x: {beginAtZero: true, max: 100, ticks: {callback: (value) => value + '%'}}},
                plugins: {
                    ...chartDefaults.plugins,
                    title: {display: true, text: 'Resultados da Mudança: Sem Nemawashi'},
                    legend: {display: false}
                }
            }
        });

        function updateNemawashiChart(type) {
            nemawashiChart.data.datasets[0].data = nemawashiData[type];
            nemawashiChart.options.plugins.title.text = `Resultados da Mudança: ${type === 'with' ? 'Com' : 'Sem'} Nemawashi`;
            nemawashiChart.update();
            document.getElementById('nemawashi-without-btn').classList.toggle('active', type === 'without');
            document.getElementById('nemawashi-with-btn').classList.toggle('active', type === 'with');
        }

        document.getElementById('nemawashi-without-btn').addEventListener('click', () => updateNemawashiChart('without'));
        document.getElementById('nemawashi-with-btn').addEventListener('click', () => updateNemawashiChart('with'));
    }
});
