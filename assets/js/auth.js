// Variable globale pour le client Supabase
let supabaseClient = null;

// Initialisation de Supabase (à compléter avec tes clés)
function initSupabase(supabaseUrl, supabaseKey) {
    if (window.supabase) {
        supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);
    } else {
        console.error("Le SDK Supabase n'est pas chargé.");
    }
}

// Fonction d'inscription (Sign Up)
async function signUpUser(email, password) {
    if (!supabaseClient) return { error: "Supabase non initialisé" };
    
    const { data, error } = await supabaseClient.auth.signUp({
        email: email,
        password: password,
    });
    return { data, error };
}

// Fonction de connexion (Sign In)
async function signInUser(email, password) {
    if (!supabaseClient) return { error: "Supabase non initialisé" };

    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: email,
        password: password,
    });
    return { data, error };
}

// Fonction de déconnexion
async function signOutUser() {
    if (!supabaseClient) return;
    await supabaseClient.auth.signOut();
    window.location.href = '../index.html';
}