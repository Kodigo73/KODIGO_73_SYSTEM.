const grids = document.querySelectorAll('.video-grid');
const navBtns = document.querySelectorAll('.nav-btn');
const adminPanel = document.getElementById('adminPanel');
const adminToggle = document.getElementById('adminToggle');
const btnPublicar = document.getElementById('btnPublicar');
const buscar = document.getElementById('buscar');

const modal = document.getElementById('modal');
const modalVideo = document.getElementById('modalVideo');
const cerrarModal = document.getElementById('cerrarModal');

/* LOGIN SIMPLE */

adminToggle.addEventListener('click',()=>{

const pass = prompt('K73 ACCESS KEY');

if(pass === 'k73admin'){

adminPanel.classList.remove('hidden');
mostrarToast('ACCESS GRANTED');

}else{

mostrarToast('ACCESS DENIED','#ff0000');

}

});

/* NAVEGACIÓN */

navBtns.forEach(btn=>{

btn.addEventListener('click',()=>{

navBtns.forEach(b=>b.classList.remove('active'));
btn.classList.add('active');

const id = btn.dataset.section;

mostrarSeccion(id);

});

});

function mostrarSeccion(id){

grids.forEach(g=>g.classList.remove('active-grid'));

const section = document.getElementById(id);

section.classList.add('active-grid');

}

/* YOUTUBE ID */

function obtenerYoutubeID(url){

const regExp =
/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([^?&\/]+)/;

const match = url.match(regExp);

return match ? match[1] : null;

}

/* TOAST */

function mostrarToast(texto,color='#00ff88'){

const toast = document.createElement('div');

toast.className = 'toast';

toast.textContent = texto;

toast.style.color = color;
cargarVideos();
