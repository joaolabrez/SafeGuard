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

                stepButtonsContainer.querySelectorAll('.epi-step-item').forEach(btn => {
                    btn.classList.remove('active');
                });

                e.target.classList.add('active');
                updateContent(step);
            }
        });

        updateContent(1);
    }
});