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

    // Fonction globale pour afficher la Pop-up iOS
    const popup = document.getElementById("ios-popup");
    const popupTitle = document.getElementById("ios-popup-title");
    const popupText = document.getElementById("ios-popup-text");
    const popupClose = document.getElementById("ios-popup-close");

    function showPopup(title, message) {
        if (popup && popupTitle && popupText) {
            popupTitle.textContent = title;
            popupText.textContent = message;
            popup.classList.add("active");
        }
    }

    if (popupClose && popup) {
        popupClose.addEventListener("click", () => {
            popup.classList.remove("active");
        });

        popup.addEventListener("click", (e) => {
            if (e.target === popup) {
                popup.classList.remove("active");
            }
        });
    }

    // 5.A Validation sécurisée du formulaire de contact
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const prenom = document.getElementById("form-prenom").value.trim();
            const nom = document.getElementById("form-nom").value.trim();
            const email = document.getElementById("form-email").value.trim();
            const objet = document.getElementById("form-objet").value.trim();
            const message = document.getElementById("form-message").value.trim();

            if (!prenom || !nom || !email || !objet || !message) {
                showPopup("Formulaire incomplet", "Veuillez remplir l'intégralité des champs avant d'envoyer votre message.");
                return;
            }

            const nameRegex = /^[a-zA-Zàâäéèêëïîôöùûüç -]{2,}$/;
            const gibberishCheck = /(.)\1{3,}/; 
            if (!nameRegex.test(prenom) || gibberishCheck.test(prenom) || !nameRegex.test(nom) || gibberishCheck.test(nom)) {
                showPopup("Nom invalide", "Veuillez entrer un prénom et un nom valides et cohérents.");
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showPopup("Email invalide", "Veuillez fournir une adresse email vérifiable.");
                return;
            }

            const bannedWords = ["connard", "pute", "salope", "merde", "enculé", "fdp", "connasse", "nique", "idiot", "cretin"];
            const fullText = (objet + " " + message).toLowerCase();
            if (bannedWords.some(word => fullText.includes(word))) {
                showPopup("Message non autorisé", "Votre message comporte des termes non réglementaires. L'envoi a été annulé.");
                return;
            }

            showPopup("Message envoyé !", "Votre message a bien été transmis à notre équipe. Nous vous répondrons dans les plus brefs délais.");
            contactForm.reset();
        });
    }

    // 5.B Validation de la création de mot de passe (Setup Account)
    const setupForm = document.getElementById("setup-form");
    if (setupForm) {
        setupForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const pwd = document.getElementById("new-password").value;
            const confirmPwd = document.getElementById("confirm-password").value;

            // Regex de sécurité : au moins 12 caractères, 1 majuscule, 1 minuscule, 1 chiffre, 1 symbole spécial
            const securePwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{12,}$/;

            if (!pwd || !confirmPwd) {
                showPopup("Champs vides", "Veuillez remplir les deux champs de mot de passe.");
                return;
            }

            if (!securePwdRegex.test(pwd)) {
                showPopup("Mot de passe faible", "Votre mot de passe doit contenir au moins 12 caractères, incluant des majuscules, minuscules, chiffres et symboles spéciaux.");
                return;
            }

            if (pwd !== confirmPwd) {
                showPopup("Erreur de confirmation", "Les mots de passe ne correspondent pas. Veuillez vérifier votre saisie.");
                return;
            }

            // Si tout est bon (simulation avant l'intégration du vrai backend)
            showPopup("Compte activé !", "Votre mot de passe a été enregistré avec succès. Vous allez être redirigé vers votre espace membre.");
            setupForm.reset();
        });
    }

}); // <-- C'est ici que se ferme proprement le DOMContentLoaded

// 6. Navigation Pilule Flottante - Synchro Scroll & Hover de la souris
window.addEventListener('load', () => {
    window.scrollTo(0, 0);
    
    const navItems = document.querySelectorAll('.nav-link, .btn-header-cta');
    const slider = document.querySelector('.nav-slider');
    const navMenuContainer = document.querySelector('.nav-menu');
    const defaultActive = document.querySelector('.btn-header-cta');

    if (navMenuContainer && slider && defaultActive) {
        let isHovered = false;

        function moveSlider(item) {
            if (!item) return;
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

        // Initialisation position par défaut (Espace Membre)
        moveSlider(defaultActive);
        window.addEventListener('resize', () => {
            if (!isHovered) moveSlider(defaultActive);
        });

        // Gestion du survol par la souris
        navItems.forEach(item => {
            item.addEventListener('mouseenter', (e) => {
                isHovered = true;
                moveSlider(e.target);
            });
        });

        navMenuContainer.addEventListener('mouseleave', () => {
            isHovered = false;
            updateActiveNavOnScroll();
        });

        // 7. Synchronisation automatique du slider de la navbar selon la position du scroll
        function updateActiveNavOnScroll() {
            if (isHovered) return;

            const scrollPos = window.scrollY + 200;
            let activeItem = defaultActive;

            const sections = {
                '#method': document.querySelector('#method'),
                '#formations': document.querySelector('#formations'),
                '#about': document.querySelector('#about'),
                '#testimonials': document.querySelector('#testimonials'),
                '#contact': document.querySelector('#contact')
            };

            for (const [selector, section] of Object.entries(sections)) {
                if (section) {
                    const top = section.offsetTop;
                    const height = section.offsetHeight;
                    if (scrollPos >= top && scrollPos < top + height) {
                        activeItem = document.querySelector(`.nav-link[href="${selector}"]`) || defaultActive;
                        break;
                    }
                }
            }

            moveSlider(activeItem);
        }

        window.addEventListener('scroll', updateActiveNavOnScroll);
    }
});