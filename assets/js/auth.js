// Clés d'accès Supabase
const SUPABASE_URL = "https://kqhzqurtkrepttwcnoap.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_qTMHEbqXxNFXkoJqS2P8bg_03PSikk2";

let supabaseClient = null;

// Initialisation au chargement de la page
document.addEventListener("DOMContentLoaded", () => {
    if (window.supabase) {
        supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        checkUserSession();
    } else {
        console.error("Le SDK Supabase n'est pas chargé.");
    }
    setupAuthForms();
});

// Gestion des formulaires Inscription / Connexion
function setupAuthForms() {
    const formLogin = document.getElementById("form-login");
    const formSignup = document.getElementById("form-signup");
    const feedback = document.getElementById("auth-feedback");

    if (formLogin) {
        formLogin.addEventListener("submit", async (e) => {
            e.preventDefault();
            feedback.textContent = "Connexion en cours...";
            feedback.className = "auth-feedback";

            const email = document.getElementById("login-email").value;
            const password = document.getElementById("login-password").value;

            const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });

            if (error) {
                feedback.textContent = "Erreur : " + error.message;
                feedback.className = "auth-feedback error";
            } else {
                feedback.textContent = "Connexion réussie ! Redirection...";
                feedback.className = "auth-feedback success";
                setTimeout(() => window.location.href = "dashboard.html", 1000);
            }
        });
    }

    if (formSignup) {
        formSignup.addEventListener("submit", async (e) => {
            e.preventDefault();
            feedback.textContent = "Création du compte...";
            feedback.className = "auth-feedback";

            const email = document.getElementById("signup-email").value;
            const password = document.getElementById("signup-password").value;

            const { data, error } = await supabaseClient.auth.signUp({ email, password });

            if (error) {
                feedback.textContent = "Erreur : " + error.message;
                feedback.className = "auth-feedback error";
            } else {
                feedback.textContent = "Compte créé ! Vérifie ta boîte mail pour valider l'inscription.";
                feedback.className = "auth-feedback success";
            }
        });
    }
}

// Vérification de la session utilisateur pour le Dashboard
async function checkUserSession() {
    const userEmailElement = document.getElementById("user-email");
    const btnLogout = document.getElementById("btn-logout");

    if (userEmailElement || btnLogout) {
        const { data: { session } } = await supabaseClient.auth.getSession();

        if (!session) {
            // Redirection si l'utilisateur n'est pas connecté
            window.location.href = "login.html";
        } else if (userEmailElement) {
            userEmailElement.textContent = session.user.email;
        }

        if (btnLogout) {
            btnLogout.addEventListener("click", async () => {
                await supabaseClient.auth.signOut();
                window.location.href = "../index.html";
            });
        }
    }
}