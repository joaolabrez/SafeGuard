document.addEventListener('DOMContentLoaded', function() {
    const elementsToAnimate = document.querySelectorAll('.animar-entrada');

    gsap.fromTo(elementsToAnimate,
        {
            opacity: 0,
            y: 50
        },
        {
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

const btnTopo = document.getElementById("voltarAoTopoBtn");

window.onscroll = function() {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        btnTopo.style.display = "flex";
    } else {
        btnTopo.style.display = "none";
    }
};

btnTopo.addEventListener('click', function(e) {
    e.preventDefault(); //
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});