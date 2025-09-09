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
            1: {icon: 'bi-search-heart', title: '1. Análise de Riscos', description: 'Tudo começa aqui. Esta é a fase de diagnóstico, onde identificamos e avaliamos todos os riscos presentes no ambiente de trabalho...'},
            2: {icon: 'bi-check2-circle', title: '2. Seleção do EPI Adequado', description: 'Com os riscos mapeados, selecionamos o equipamento ideal...'},
            3: {icon: 'bi-cart-check', title: '3. Compra e Aquisição', description: 'A fase de compra deve priorizar a qualidade e a conformidade...'},
            4: {icon: 'bi-box-arrow-in-down', title: '4. Entrega e Treinamento', description: 'O EPI só é eficaz se o trabalhador souber usá-lo...'},
            5: {icon: 'bi-person-workspace', title: '5. Uso Efetivo', description: 'Esta é a fase prática, onde o EPI cumpre sua função no dia a dia...'},
            6: {icon: 'bi-wrench-adjustable-circle', title: '6. Manutenção e Guarda', description: 'A durabilidade e eficácia do EPI dependem de seu cuidado...'},
            7: {icon: 'bi-trash3', title: '7. Descarte', description: 'Quando o EPI atinge o fim de sua vida útil, está danificado ou com o CA vencido, ele deve ser descartado...'}
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

    // -----------------------------
    // NOVA SEÇÃO BLOG
    // -----------------------------
    const mainBlogView = document.getElementById('blog-main-view');
    const postBlogView = document.getElementById('blog-post-view');

    if (mainBlogView && postBlogView) {
        const postsData = [
            {
                id: 1,
                title: "O Custo Real de um EPI Ausente: Análise de Acidentes que Poderiam Ser Evitados",
                date: "15 de Setembro, 2025",
                author: "SafeGuard",
                imageUrl: "https://images.unsplash.com/photo-1551063229-d3asyc483a93?auto=format&fit=crop&w=870&q=80",
                alt: "[Imagem de um trabalhador com a mão enfaixada, simbolizando um acidente de trabalho]",
                summary: "Todos os anos, milhares de acidentes de trabalho são registrados no Brasil por um motivo trágico: a ausência ou o uso incorreto de EPIs...",
                fullContent: `<p>A discussão sobre EPIs vai muito além de uma simples formalidade...</p>`
            },
            {
                id: 2,
                title: "Além do Obrigatório: Como Normas Voluntárias (ISO 45001) Elevam sua Empresa",
                date: "12 de Setembro, 2025",
                author: "SafeGuard",
                imageUrl: "https://images.unsplash.com/photo-1560264280-980009625ce0?auto=format&fit=crop&w=870&q=80",
                alt: "[Imagem de equipe em reunião de planejamento]",
                summary: "Cumprir as NRs é o ponto de partida, mas as empresas líderes vão além. Adotar normas voluntárias como a ISO 45001...",
                fullContent: `<p>No competitivo mercado atual, simplesmente cumprir a legislação de segurança...</p>`
            },
            {
                id: 3,
                title: "NR-38: O que Muda na Segurança dos Serviços de Limpeza Urbana?",
                date: "08 de Setembro, 2025",
                author: "SafeGuard",
                imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=869&q=80",
                alt: "[Imagem de uma pessoa realizando limpeza profissional com EPI]",
                summary: "A nova Norma Regulamentadora nº 38 chegou para transformar a segurança no setor de limpeza urbana...",
                fullContent: `<p>Publicada para atender a uma demanda histórica por mais segurança em um dos setores...</p>`
            }
        ];

        function showMainBlog() {
            mainBlogView.innerHTML = '';
            postsData.forEach(post => {
                const postElement = document.createElement('div');
                postElement.className = 'card blog-post-card mb-4 animar-entrada';
                postElement.innerHTML = `
                    <img src="${post.imageUrl}" class="card-img-top" alt="${post.alt}">
                    <div class="card-body p-4">
                        <div class="small text-muted mb-2">
                            <i class="bi bi-calendar3 me-1"></i> ${post.date} | <i class="bi bi-person-fill ms-2 me-1"></i> Por ${post.author}
                        </div>
                        <h2 class="card-title h4">${post.title}</h2>
                        <p class="card-text">${post.summary}</p>
                        <button class="btn btn-outline-primary" data-post-id="${post.id}">Leia Mais <i class="bi bi-arrow-right-short"></i></button>
                    </div>
                `;
                mainBlogView.appendChild(postElement);
            });
            mainBlogView.classList.remove('d-none');
            postBlogView.classList.add('d-none');
            window.scrollTo({top: 0, behavior: 'smooth'});
        }

        function showPost(postId) {
            const post = postsData.find(p => p.id === postId);
            if (post) {
                postBlogView.innerHTML = `
                    <div class="animar-entrada">
                        <button id="back-to-blog" class="btn btn-outline-primary mb-4"><i class="bi bi-arrow-left-short"></i> Voltar ao Blog</button>
                        <h1 class="fw-bold display-6 mb-3">${post.title}</h1>
                        <div class="small text-muted mb-3">
                            <i class="bi bi-calendar3 me-1"></i> ${post.date} | <i class="bi bi-person-fill ms-2 me-1"></i> Por ${post.author}
                        </div>
                        <img src="${post.imageUrl}" class="img-fluid rounded mb-4" alt="${post.alt}">
                        <div class="blog-content">${post.fullContent}</div>
                    </div>
                `;
                mainBlogView.classList.add('d-none');
                postBlogView.classList.remove('d-none');
                window.scrollTo({top: 0, behavior: 'smooth'});
                document.getElementById('back-to-blog').addEventListener('click', showMainBlog);
            }
        }

        mainBlogView.addEventListener('click', function (e) {
            if (e.target.matches('[data-post-id]')) {
                const postId = parseInt(e.target.dataset.postId);
                showPost(postId);
            }
        });

        showMainBlog();
    }
});
