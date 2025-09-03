document.addEventListener('DOMContentLoaded', function() {
    const elementsToAnimate = document.querySelectorAll('.animar-entrada');

    // Usando fromTo para definir o estado INICIAL e o estado FINAL da animação
    gsap.fromTo(elementsToAnimate,
        {
            // 1. Estado INICIAL (de onde a animação começa)
            opacity: 0,
            y: 50
        },
        {
            // 2. Estado FINAL (para onde a animação vai)
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out"
        }
    );

    // Lógica para o menu ativo
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
});