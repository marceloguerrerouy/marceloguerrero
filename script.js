

/* =====================================================
   GALERÍAS DE COMPAÑÍAS ASEGURADORAS
===================================================== */

const imagenes = {

    berkley: [
        "berkley-fotos/foto-1.webp"
    ],

    bse: [
        "bse-fotos/foto-1.webp",
         "bse-fotos/foto-2.webp",
    "bse-fotos/foto-3.webp",
    "bse-fotos/foto-4.webp",
    "bse-fotos/foto-5.webp"
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
    
modal.classList.toggle("has-multiple", currentGallery.length > 1);


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


document.addEventListener("DOMContentLoaded", function () {

    const formulario = document.getElementById("contactForm");

    if (!formulario) {
        return;
    }

    if (typeof emailjs === "undefined") {
        formulario.addEventListener("submit", function (event) {
            event.preventDefault();
            alert("No se pudo cargar el envío. Podés contactarme por WhatsApp o correo.");
        });
        console.error("EmailJS no está cargado.");
        return;
    }

    emailjs.init({
        publicKey: "5f1M7I51Zw5bALWBc"
    });

    formulario.addEventListener("submit", function (event) {

        event.preventDefault();
                const ultimoEnvio = Number(localStorage.getItem("mggUltimoEnvio") || 0);
        if (Date.now() - ultimoEnvio < 300000) {
            alert("Ya enviaste una consulta hace un momento. Esperá unos minutos antes de enviar otra.");
            return;
        }

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
                        localStorage.setItem("mggUltimoEnvio", String(Date.now()));

        })
        
.catch(function (error) {
    console.error("Error completo:", error);
    alert("No se pudo enviar tu consulta. Por favor, escribinos por WhatsApp.");

})




        .finally(function () {

            if (botonEnviar) {
                botonEnviar.disabled = false;
                botonEnviar.innerHTML =
                                        '<i class="fas fa-paper-plane"><svg class="icono" aria-hidden="true"><use href="#i-avion"/></svg></i> Enviar mensaje';
            }

        });

    });

});



/* =====================================================
   BOTÓN WHATSAPP DEL HERO
===================================================== */

document.addEventListener("DOMContentLoaded", function () {
    const botonSeguroWhatsapp =
        document.getElementById("botonSeguroWhatsapp");

    if (!botonSeguroWhatsapp) {
        return;
    }

    botonSeguroWhatsapp.addEventListener("click", function (event) {
        event.preventDefault();

        const enlaceWhatsapp = botonSeguroWhatsapp.href;

        window.location.href = enlaceWhatsapp;
    });
});






