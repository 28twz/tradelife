// Force le retour tout en haut de la page dès le chargement
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Navigation Smooth Scroll
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', e => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const navMenu = document.querySelector('.nav-menu');
                    if (navMenu) navMenu.classList.remove('active');

                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    // 2. Gestion du Menu Burger Mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // 3. Animation dynamique des blocs de la méthode Sticky au scroll
    const stepBlocks = document.querySelectorAll('.method-step-block');
    const visualSlides = document.querySelectorAll('.method-slide');

    function updateStickyMethod() {
        let currentStep = "1";
        
        stepBlocks.forEach(block => {
            const rect = block.getBoundingClientRect();
            if (rect.top <= window.innerHeight * 0.45 && rect.bottom >= window.innerHeight * 0.15) {
                currentStep = block.getAttribute('data-step');
            }
        });

        visualSlides.forEach(slide => {
            if (slide.getAttribute('data-step') === currentStep) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });

        stepBlocks.forEach(block => {
            if (block.getAttribute('data-step') === currentStep) {
                block.classList.add('active-step');
            } else {
                block.classList.remove('active-step');
            }
        });
    }

    window.addEventListener('scroll', updateStickyMethod);
    updateStickyMethod();

    // 4. Gestion du retournement des cartes de formation (Bouton rond "+")
    const flipCards = document.querySelectorAll('.flip-card');

    flipCards.forEach(card => {
        const btnFlip = card.querySelector('.btn-flip-icon');
        const btnBack = card.querySelector('.btn-flip-back');

        if (btnFlip && btnBack) {
            btnFlip.addEventListener('click', (e) => {
                e.stopPropagation();
                card.classList.add('is-flipped');
            });

            btnBack.addEventListener('click', (e) => {
                e.stopPropagation();
                card.classList.remove('is-flipped');
            });
        }
    });
});

// 5. Navigation Pilule Flottante - Chargement complet de la page
window.addEventListener('load', () => {
    window.scrollTo(0, 0);
    
    const navItems = document.querySelectorAll('.nav-link, .btn-header-cta');
    const slider = document.querySelector('.nav-slider');
    const navMenuContainer = document.querySelector('.nav-menu');
    const defaultActive = document.querySelector('.btn-header-cta');

    if (navMenuContainer && slider && defaultActive) {
        function moveSlider(item) {
            const itemLeft = item.offsetLeft;
            const itemWidth = item.offsetWidth;
            const itemHeight = item.offsetHeight;
            const itemTop = item.offsetTop;
            
            slider.style.width = `${itemWidth}px`;
            slider.style.height = `${itemHeight}px`;
            slider.style.left = `${itemLeft}px`;
            slider.style.top = `${itemTop}px`;
            slider.style.opacity = '1';
            
            navItems.forEach(link => {
                link.style.color = 'var(--text-dark)';
            });
            item.style.color = '#fff';
        }

        moveSlider(defaultActive);
        window.addEventListener('resize', () => moveSlider(defaultActive));

        navItems.forEach(item => {
            item.addEventListener('mouseenter', (e) => {
                moveSlider(e.target);
            });
        });

        navMenuContainer.addEventListener('mouseleave', () => {
            moveSlider(defaultActive);
        });
    }
});