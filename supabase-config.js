// Importamos la librería directamente
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const SB_URL = "https://cutpwedmojdhbaqyemcv.supabase.co"; 
const SB_KEY = "TU_CLAVE_SB_PUB_AQUÍ"; // Pon la clave larga que empieza por sb_pub

const supabaseClient = createClient(SB_URL, SB_KEY);

// Exportamos la función para que el HTML la vea
window.inyectarVideo = async function() {
    const titulo = document.getElementById('v-titulo').value;
    const url = document.getElementById('v-url').value;
    const cat = document.getElementById('v-cat').value;

    const { data, error } = await supabaseClient
        .from('VIDEOS')
        .insert([{ TITULO: titulo, url_youtube: url, categoria: cat }]);

    if (error) {
        alert("ERROR EN EL SISTEMA: " + error.message);
    } else {
        alert("INYECTADO: Contenido publicado en K73.");
        location.reload();
    }
}