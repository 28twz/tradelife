// Smooth scroll pour les liens de navigation
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', e => {
        const href = link.getAttribute('href');
        // Vérifie si c'est un lien d'ancrage (#)
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
});

// Animation de visibilité de la box Trustpilot
const trustBox = document.querySelector('#testimonials .trust-soon');

function checkVisibility() {
    if (!trustBox) return;

    const rect = trustBox.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
        trustBox.classList.add('visible');
    }
}

window.addEventListener('scroll', checkVisibility);
window.addEventListener('load', checkVisibility);