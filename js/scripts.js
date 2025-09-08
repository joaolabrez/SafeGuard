document.addEventListener('DOMContentLoaded', function () {
    const elementsToAnimate = document.querySelectorAll('.animar-entrada');
    gsap.fromTo(elementsToAnimate,
        {opacity: 0, y: 50},
        {opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out"}
    );

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

    const acidentesCanvas = document.getElementById('acidentesChart');
    if (acidentesCanvas) {
        const dataAntes = {values: [8, 10, 7, 9, 11, 8], label: 'Nº de Acidentes (Sem DDS)'};
        const dataDepois = {values: [3, 2, 2, 1, 3, 1], label: 'Nº de Acidentes (Com DDS)'};

        const acidentesCtx = acidentesCanvas.getContext('2d');
        let acidentesChart = new Chart(acidentesCtx, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
                datasets: [{
                    label: dataDepois.label,
                    data: dataDepois.values,
                    backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--laranja-primario').trim(),
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
            acidentesChart.data.datasets[0].backgroundColor = (data.label.includes('Sem')) ? '#6c757d' : getComputedStyle(document.documentElement).getPropertyValue('--laranja-primario').trim();
            acidentesChart.update();

            if (btnAntes && btnDepois) {
                [btnAntes, btnDepois].forEach(btn => btn.classList.remove('active'));
                buttonToActivate.classList.add('active');
            }
        }

        if (btnAntes && btnDepois) {
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
                    borderColor: '#ffffff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {legend: {position: 'bottom'}},
                cutout: '60%'
            }
        });
    }

    const stepItems = document.querySelectorAll('.step-item');
    const detailsContent = document.getElementById('step-details');
    if (stepItems.length > 0 && detailsContent) {
        const stepDetailsData = {
            1: {
                title: '1. Observar com Atenção',
                description: 'Esteja consciente do seu entorno e preste atenção a potenciais perigos. Uma observação atenta é o primeiro passo para a prevenção.'
            },
            2: {
                title: '2. Abordar com Respeito',
                description: 'Se identificar um risco, aproxime-se da pessoa envolvida de maneira calma e privada, demonstrando preocupação genuína.'
            },
            3: {
                title: '3. Dialogar para Entender',
                description: 'Converse para entender a situação. Use perguntas abertas para criar um diálogo, não dar uma ordem.'
            },
            4: {
                title: '4. Resolver em Conjunto',
                description: 'Trabalhem juntos para encontrar uma solução segura, seja parando a tarefa, corrigindo a condição ou buscando ajuda.'
            }
        };

        function updateStepDetails(step) {
            const data = stepDetailsData[step];
            detailsContent.innerHTML = `<h4 class="fw-bold">${data.title}</h4><p class="mb-0">${data.description}</p>`;
        }

        stepItems.forEach(item => {
            item.addEventListener('click', () => {
                const step = item.dataset.step;
                stepItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
                updateStepDetails(step);
            });
        });

        updateStepDetails(1);
    }

    const epiStepItems = document.querySelectorAll('.epi-step-item');
    const epiDetailsContent = document.getElementById('epi-step-content');
    if (epiStepItems.length > 0 && epiDetailsContent) {
        const epiStepData = {
            1: {
                title: '1. Identificação de Riscos',
                description: 'Analisar o ambiente e as atividades para identificar os riscos (físicos, químicos, biológicos, etc.) e documentá-los no PGR.'
            },
            2: {
                title: '2. Seleção do EPI',
                description: 'Com base nos riscos, escolher o EPI adequado, sempre verificando se possui Certificado de Aprovação (CA) válido.'
            },
            3: {
                title: '3. Compra e Recebimento',
                description: 'Adquirir os EPIs de fornecedores qualificados, conferir os produtos e controlar o estoque para garantir a disponibilidade.'
            },
            4: {
                title: '4. Distribuição e Treinamento',
                description: 'Registrar a entrega do EPI e treinar o trabalhador sobre a importância, o uso correto e a conservação do equipamento.'
            },
            5: {
                title: '5. Uso e Fiscalização',
                description: 'Garantir e fiscalizar o uso correto do EPI durante toda a jornada de trabalho, reforçando a cultura de segurança.'
            },
            6: {
                title: '6. Higienização e Manutenção',
                description: 'Orientar sobre a limpeza e manutenção dos EPIs reutilizáveis para garantir sua eficácia e durabilidade.'
            },
            7: {
                title: '7. Descarte',
                description: 'Realizar o descarte correto dos EPIs danificados ou vencidos, seguindo normas ambientais.'
            }
        };

        function updateEpiStepDetails(step) {
            const data = epiStepData[step];
            if (data) {
                epiDetailsContent.innerHTML = `<h4 class="fw-bold">${data.title}</h4><p class="mb-0">${data.description}</p>`;
            }
        }

        epiStepItems.forEach(item => {
            item.addEventListener('click', () => {
                const step = item.dataset.step;
                epiStepItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
                updateEpiStepDetails(step);
            });
        });

        updateEpiStepDetails(1);
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