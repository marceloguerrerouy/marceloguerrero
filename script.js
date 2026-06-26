// GALERÍA DE PROPIEDADES
const imagenes = {
    casas: ["casas/18.png","casas/24.png","casas/32.png","casas/33.png","casas/B.png","casas/G.png","casas/K.png","casas/M.png","casas/N.png","casas/01.png"],
    apartamentos: ["apartamentos/14.png","apartamentos/15.png","apartamentos/16.png","apartamentos/20.png","apartamentos/21.png","apartamentos/22.png","apartamentos/23.png","apartamentos/26.png","apartamentos/28.png","apartamentos/E.png","apartamentos/F.png"],
    galpones: ["galpones/25.png","galpones/D.png"],
    locales: ["locales comerciales/34.png","locales comerciales/J.png"],
    chacras: ["chacras terrenos/21.png","chacras terrenos/27.png"],



    berkley: [
"Promociones aseguradoras 24junio2026/berk20/berkley.png"
],

bse: [
"Promociones aseguradoras 24junio2026/bse20/BSE.png",
"Promociones aseguradoras 24junio2026/bse20/BSE2.png",
"Promociones aseguradoras 24junio2026/bse20/BSE3.png",
"Promociones aseguradoras 24junio2026/bse20/BSE4.png",
"Promociones aseguradoras 24junio2026/bse20/bse30.png"

],

hdi: [
"Promociones aseguradoras 24junio2026/hdi20/hdi.png",
"Promociones aseguradoras 24junio2026/hdi20/hdi4.png"
],

mapfre: [
"Promociones aseguradoras 24junio2026/mapfre20/MAPFRE.png",
"Promociones aseguradoras 24junio2026/mapfre20/MAPFRE1.png"
],

porto: [
"Promociones aseguradoras 24junio2026/porto20/PORTO SEGURO.png",
"Promociones aseguradoras 24junio2026/porto20/PORTODEGURO2.png",
"Promociones aseguradoras 24junio2026/porto20/POTOSEGURO1.png"
],

sancrist: [
"Promociones aseguradoras 24junio2026/san crist20/san cristobal1.png",
"Promociones aseguradoras 24junio2026/san crist20/san cristobal2.png"
],

sbi: [
"Promociones aseguradoras 24junio2026/sbi20/SBI.png",
"Promociones aseguradoras 24junio2026/sbi20/SBI2.png",
"Promociones aseguradoras 24junio2026/sbi20/SBI3.png",
"Promociones aseguradoras 24junio2026/sbi20/SBI4.png",
"Promociones aseguradoras 24junio2026/sbi20/SBI5.png"
],

sura: [
"Promociones aseguradoras 24junio2026/sura20/sur.png",
"Promociones aseguradoras 24junio2026/sura20/sura.png",
"Promociones aseguradoras 24junio2026/sura20/su.png"
],


};

let currentGallery = [];
let currentIndex = 0;

const modal = document.getElementById("modalOverlay");
const modalImg = document.getElementById("modalImg");
const modalCounter = document.getElementById("modalCounter");
const modalClose = document.getElementById("modalClose");
const modalPrev = document.getElementById("modalPrev");
const modalNext = document.getElementById("modalNext");

function abrirGaleria(categoria) {
    currentGallery = imagenes[categoria];
    currentIndex = 0;
    mostrarImagen();
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
}

function cerrarGaleria() {
    modal.classList.remove("active");
    document.body.style.overflow = "";
}

function mostrarImagen() {

    console.log("Ruta: " + currentGallery[currentIndex]);


    modalImg.src = currentGallery[currentIndex];
    modalCounter.textContent = (currentIndex + 1) + " / " + currentGallery.length;
}

function imagenAnterior() {
    currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
    mostrarImagen();
}

function imagenSiguiente() {
    currentIndex = (currentIndex + 1) % currentGallery.length;
    mostrarImagen();
}

modalClose.addEventListener("click", cerrarGaleria);
modalPrev.addEventListener("click", imagenAnterior);
modalNext.addEventListener("click", imagenSiguiente);

document.addEventListener("keydown", function(e) {
    if (!modal.classList.contains("active")) return;
    if (e.key === "Escape") cerrarGaleria();
    if (e.key === "ArrowLeft") imagenAnterior();
    if (e.key === "ArrowRight") imagenSiguiente();
});



// LinkedIn: solo clickeable en celular
const linkedinLink = document.querySelector('a[aria-label="LinkedIn"]');
if (linkedinLink) {


if (/Android|iPhone|iPad|iPod|webOS/i.test(navigator.userAgent)) {
    linkedinLink.href = "https://uy.linkedin.com/in/marcelo-guerrero-491451327";
} else {
    linkedinLink.href = "#";
    linkedinLink.addEventListener("click", function(e) {
        e.preventDefault();
    });
}
}

// Protección básica contra copias
document.addEventListener("contextmenu", function(e){
    e.preventDefault();
});

emailjs.init("5f1M7I51Zw5bALWBc");

document.getElementById("contactForm").addEventListener("submit", function(e){
    e.preventDefault();

    emailjs.sendForm(
        "service_8zsx485",
        "template_rizo0z5",
        this
    )
    .then(function() {
        alert("¡Mensaje enviado correctamente!");
        document.getElementById("contactForm").reset();
    })
    .catch(function(error) {
        alert("Error al enviar el mensaje.");
        console.error(error);
    });
});











