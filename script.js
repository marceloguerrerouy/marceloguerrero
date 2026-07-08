// GALERÍA DE PROPIEDADES


const imagenes = {
    casas: [
        "casas-fotos/casa-1.webp",
        "casas-fotos/casa-2.webp",
        "casas-fotos/casa-3.webp",
        "casas-fotos/casa-4.webp",
        "casas-fotos/casa-5.webp",
        "casas-fotos/casa-6.webp",
        "casas-fotos/casa-7.webp",
        "casas-fotos/casa-8.webp",
        "casas-fotos/casa-9.webp",
        "casas-fotos/casa-10.webp"
    ],

   

apartamentos: [
        "apartamentos-fotos/apto-1.webp",
        "apartamentos-fotos/apto-2.webp",
        "apartamentos-fotos/apto-3.webp",
        "apartamentos-fotos/apto-4.webp",
        "apartamentos-fotos/apto-5.webp",
        "apartamentos-fotos/apto-6.webp",
        "apartamentos-fotos/apto-7.webp",
        "apartamentos-fotos/apto-8.webp",
        "apartamentos-fotos/apto-9.webp",
        "apartamentos-fotos/apto-10.webp",
        "apartamentos-fotos/apto-11.webp"
    ],


    

 galpones: [
        "galpones-fotos/galpon-1.webp",
        "galpones-fotos/galpon-2.webp"
    ],

    
 locales: [
        "locales-comerciales-fotos/local-1.webp",
        "locales-comerciales-fotos/local-2.webp",
        "locales-comerciales-fotos/local-almacen.webp"
        
        
],







chacras: [
        "chacras-terrenos-fotos/chacra-1.webp",
        "chacras-terrenos-fotos/chacra-2.webp"
    ],

   berkley: [
    "berkley-fotos/berkley-1.webp"
],

bse: [
    "bse-fotos/bse-1.webp",
    "bse-fotos/bse-2.webp",
    "bse-fotos/bse-3.webp",
    "bse-fotos/bse-4.webp",
    "bse-fotos/bse-5.webp"
],

hdi: [
    "hdi-fotos/hdi-1.webp",
    "hdi-fotos/hdi-2.webp"
],

mapfre: [
    "mapfre-fotos/mapfre-1.webp",
    "mapfre-fotos/mapfre-2.webp"
],
    


porto: [
"porto-fotos/porto-1.webp",
"porto-fotos/porto-2.webp",
"porto-fotos/porto-3.webp"
],



sancrist: [
"san-cristobal-fotos/san-1.webp",
"san-cristobal-fotos/san-2.webp"
],

sbi: [
"sbi-fotos/sbi-1.webp",
"sbi-fotos/sbi-2.webp",
"sbi-fotos/sbi-3.webp",
"sbi-fotos/sbi-4.webp",
"sbi-fotos/sbi-5.webp"
],

sura: [
"sura-fotos/sura-1.webp",
"sura-fotos/sura-2.webp",
"sura-fotos/sura-3.webp"
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











