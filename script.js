

/* =====================================================
   GALERÍAS DE COMPAÑÍAS ASEGURADORAS
===================================================== */

const imagenes = {

    berkley: [
        "berkley-fotos/foto-1.webp"
    ],

    bse: [
        "bse-fotos/foto-1.webp"
    ],

    barbus: [
        "barbus-fotos/foto-3.webp",
    
    ],

    mapfre: [
        "mapfre-fotos/foto-3.webp",
        
    ],

    porto: [
        "porto-fotos/porto-foto3.webp",
       
    ],

    sancrist: [
        "san-cristobal-fotos/foto-3.webp",
        
    ],

    sbi: [
        "sbi-fotos/foto-6.webp",
       
    ],

    sura: [
        "sura-fotos/foto-4.webp",
        
    ]

};


let currentGallery = [];
let currentIndex = 0;


/* =====================================================
   ELEMENTOS DEL MODAL
===================================================== */

const modal = document.getElementById("modalOverlay");
const modalCounter = document.getElementById("modalCounter");
const modalClose = document.getElementById("modalClose");
const modalPrev = document.getElementById("modalPrev");
const modalNext = document.getElementById("modalNext");

let modalImg = document.getElementById("modalImg");


/*
Si la imagen del modal no existe en el HTML,
el script la crea automáticamente.
*/

if (modal && !modalImg) {

    modalImg = document.createElement("img");

    modalImg.id = "modalImg";
    modalImg.className = "modal-img";
    modalImg.alt = "Imagen de la compañía aseguradora";

    const modalNav = modal.querySelector(".modal-nav");

    if (modalNav) {
        modal.insertBefore(modalImg, modalNav);
    } else {
        modal.appendChild(modalImg);
    }

}


/* =====================================================
   ABRIR GALERÍA
===================================================== */

function abrirGaleria(categoria) {

    if (!imagenes[categoria] || imagenes[categoria].length === 0) {
        console.warn("No se encontraron imágenes para:", categoria);
        return;
    }

    if (!modal || !modalImg) {
        console.error("No se encontró el modal de la galería.");
        return;
    }

    currentGallery = imagenes[categoria];
    currentIndex = 0;

    mostrarImagen();

    modal.classList.add("active");
    document.body.style.overflow = "hidden";

}


/* =====================================================
   CERRAR GALERÍA
===================================================== */

function cerrarGaleria() {

    if (!modal) {
        return;
    }

    modal.classList.remove("active");
    document.body.style.overflow = "";

}


/* =====================================================
   MOSTRAR IMAGEN
===================================================== */

function mostrarImagen() {

    if (
        !modalImg ||
        !modalCounter ||
        currentGallery.length === 0
    ) {
        return;
    }

    modalImg.src = currentGallery[currentIndex];

    modalImg.alt =
        "Imagen " +
        (currentIndex + 1) +
        " de la compañía aseguradora";

    modalCounter.textContent =
        (currentIndex + 1) +
        " / " +
        currentGallery.length;

}


/* =====================================================
   NAVEGACIÓN DE LA GALERÍA
===================================================== */

function imagenAnterior() {

    if (currentGallery.length === 0) {
        return;
    }

    currentIndex =
        (
            currentIndex -
            1 +
            currentGallery.length
        ) %
        currentGallery.length;

    mostrarImagen();

}


function imagenSiguiente() {

    if (currentGallery.length === 0) {
        return;
    }

    currentIndex =
        (
            currentIndex +
            1
        ) %
        currentGallery.length;

    mostrarImagen();

}


/* =====================================================
   EVENTOS DEL MODAL
===================================================== */

if (modalClose) {
    modalClose.addEventListener("click", cerrarGaleria);
}

if (modalPrev) {
    modalPrev.addEventListener("click", imagenAnterior);
}

if (modalNext) {
    modalNext.addEventListener("click", imagenSiguiente);
}

if (modal) {

    modal.addEventListener("click", function (event) {

        if (event.target === modal) {
            cerrarGaleria();
        }

    });

}


document.addEventListener("keydown", function (event) {

    if (!modal || !modal.classList.contains("active")) {
        return;
    }

    if (event.key === "Escape") {
        cerrarGaleria();
    }

    if (event.key === "ArrowLeft") {
        imagenAnterior();
    }

    if (event.key === "ArrowRight") {
        imagenSiguiente();
    }

});


/* =====================================================
   PROTECCIÓN BÁSICA DEL SITIO
===================================================== */

document.addEventListener("contextmenu", function (event) {
    event.preventDefault();
});


/* =====================================================
   FORMULARIO CON EMAILJS
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const formulario = document.getElementById("contactForm");

    if (!formulario) {
        return;
    }

    if (typeof emailjs === "undefined") {
        console.error("EmailJS no está cargado.");
        return;
    }

    emailjs.init({
        publicKey: "5f1M7I51Zw5bALWBc"
    });

    formulario.addEventListener("submit", function (event) {

        event.preventDefault();

        const botonEnviar =
            formulario.querySelector('button[type="submit"]');

        if (botonEnviar) {
            botonEnviar.disabled = true;
            botonEnviar.textContent = "Enviando...";
        }

        emailjs.sendForm(
            "service_8zsx485",
            "template_rizo0z5",
            formulario
        )
        .then(function () {

            alert("¡Mensaje enviado correctamente!");

            formulario.reset();

        })
        
.catch(function (error) {

    console.error("Error completo:", error);

    alert(
        "Estado: " + error.status + "\n" +
        "Detalle: " + error.text
    );

})




        .finally(function () {

            if (botonEnviar) {
                botonEnviar.disabled = false;
                botonEnviar.innerHTML =
                    '<i class="fas fa-paper-plane"></i> Enviar mensaje';
            }

        });

    });

});









