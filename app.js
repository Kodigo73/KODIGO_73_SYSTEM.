import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const SB_URL = "https://cutpwedmojdhbaqyemcv.supabase.co"; 
const SB_KEY = "sb_publishable_Gsm9HFUlJnywkBeoWKjSqA_A_Wdkn5m"; 
const supabase = createClient(SB_URL, SB_KEY);

// --- PROTOCOLO MODO FANTASMA ---
let clics = 0;
const PASSWORD_MAESTRA = "K73_SYSTEM"; 

document.getElementById('logo-secreto').addEventListener('click', () => {
    clics++;
    if (clics === 1) setTimeout(() => { clics = 0; }, 2000);
    if (clics === 3) {
        const password = prompt("SISTEMA BLOQUEADO. INTRODUCE CLAVE:");
        if (password === PASSWORD_MAESTRA) {
            alert("ACCESO CONCEDIDO.");
            document.getElementById('btn-admin-fantasma').style.display = "inline-block";
        } else {
            alert("ACCESO DENEGADO.");
        }
        clics = 0;
    }
});

// --- CARGA DE DATOS ---
async function sincronizarSistema() {
    const { data: videos } = await supabase.from('VIDEOS').select('*').order('created_at', { ascending: false });
    const { data: imagenes } = await supabase.from('IMAGENES').select('*').order('created_at', { ascending: false });

    if(videos) distribuirVideos(videos);
    if(imagenes) distribuirImagenes(imagenes);
}

function distribuirVideos(videos) {
    const grids = { "OCTÁGONO": "grid-octagono", "X-TREME": "grid-xtreme", "STREET": "grid-street" };
    Object.values(grids).forEach(id => document.getElementById(id).innerHTML = '');

    videos.forEach(v => {
        const targetId = grids[v.categoria];
        if (targetId) {
            const embedUrl = v.url_youtube.replace('watch?v=', 'embed/').split('&')[0];
            document.getElementById(targetId).innerHTML += `
                <div class="card">
                    <h4 style="color:#00ff41">${v.TITULO}</h4>
                    <iframe src="${embedUrl}" allowfullscreen></iframe>
                </div>`;
        }
    });
}

function distribuirImagenes(imagenes) {
    const gridFotos = document.getElementById('grid-fotos');
    gridFotos.innerHTML = '';
    imagenes.forEach(img => {
        gridFotos.innerHTML += `
            <div class="card">
                <img src="${img.url_imagen}" alt="${img.TITULO}">
                <p style="color:var(--verde)">${img.TITULO}</p>
            </div>`;
    });
}

// --- INYECCIÓN ---
document.getElementById('btn-inyectar').addEventListener('click', async () => {
    const tipo = document.getElementById('tipo-carga').value;
    const titulo = document.getElementById('v-titulo').value;
    const url = document.getElementById('v-url').value;
    const cat = document.getElementById('v-cat').value;

    if(!titulo || !url) return alert("CAMPOS VACÍOS");

    let error;
    if (tipo === "video") {
        ({ error } = await supabase.from('VIDEOS').insert([{ TITULO: titulo, url_youtube: url, categoria: cat }]));
    } else {
        ({ error } = await supabase.from('IMAGENES').insert([{ TITULO: titulo, url_imagen: url, seccion: cat }]));
    }

    if (error) alert("ERROR: " + error.message);
    else {
        alert("INYECCIÓN COMPLETADA");
        location.reload();
    }
});

sincronizarSistema();