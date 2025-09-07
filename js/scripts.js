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

    const safetyCtx = document.getElementById('safetyChart');
    if (safetyCtx) {
        new Chart(safetyCtx.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Redução de Acidentes', 'Cultura Positiva', 'Engajamento', 'Conformidade'],
                datasets: [{
                    label: 'Impacto do Programa',
                    data: [40, 25, 20, 15],
                    backgroundColor: ['#0d6efd', '#6c757d', '#198754', '#ffc107'],
                    hoverOffset: 4
                }]
            },
            options: {responsive: true, maintainAspectRatio: false}
        });
    }

    const processSteps = document.querySelectorAll('.process-step');
    const processContentEl = document.getElementById('process-content');
    if (processSteps.length > 0 && processContentEl) {
        const processContentData = {
            planejar: 'Nesta fase, mergulhamos nos seus processos para identificar desperdícios, gargalos e oportunidades de melhoria.',
            executar: 'Com o plano definido, implementamos as mudanças de forma controlada, seja através de eventos Kaizen ou ajuste de fluxos.',
            verificar: 'Medimos o impacto das mudanças com dados concretos, comparando os indicadores de performance (KPIs) antes e depois.',
            agir: 'Se os resultados forem positivos, padronizamos a nova prática. Se não, analisamos os dados para ajustar a rota e garantir a evolução.'
        };

        function updateProcessContent(stepId) {
            processContentEl.innerHTML = `<p class="m-0">${processContentData[stepId]}</p>`;
            processSteps.forEach(step => step.classList.remove('active'));
            document.getElementById(`step-${stepId}`).classList.add('active');
        }

        processSteps.forEach(step => {
            step.addEventListener('click', () => {
                const stepId = step.id.replace('step-', '');
                updateProcessContent(stepId);
            });
        });

        updateProcessContent('planejar'); // Inicia com o primeiro passo ativo
    }

    const efficiencyCtx = document.getElementById('efficiencyChart');
    if (efficiencyCtx) {
        new Chart(efficiencyCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Tempo de Ciclo', 'Desperdício', 'Produtividade'],
                datasets: [
                    {label: 'Antes', data: [100, 80, 60], backgroundColor: 'rgba(108, 117, 125, 0.5)'},
                    {label: 'Depois', data: [65, 25, 95], backgroundColor: 'rgba(13, 110, 253, 0.7)'}
                ]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                scales: {y: {beginAtZero: true}}
            }
        });
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