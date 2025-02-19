let imagenes = [
    "fam/1.jpeg", "fam/2.jpeg", "fam/3.jpeg", 
    "fam/4.jpeg", "fam/5.jpeg", "fam/6.jpeg", 
    "fam/7.jpeg", "fam/8.jpeg", "fam/9.jpeg", 
    "fam/10.jpeg", "fam/11.jpg", "fam/12.jpg",
    "fam/13.jpg", "fam/14.jpg", "fam/15.jpg",
     "fam/v1.mp4"
];

let indiceActual = 0;
const overlay = document.getElementById("overlay");
const imagenGrande = document.getElementById("imagen-grande");
const videoGrande = document.getElementById("video-grande");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
    
// Mostrar imagen o video en el overlay
function mostrarImagen(indice) {
    indiceActual = indice;
    let ruta = imagenes[indiceActual];

    if (ruta.endsWith(".mp4")) {
        imagenGrande.style.display = "none";
        videoGrande.style.display = "block";
        videoGrande.src = ruta;
        videoGrande.load(); // Asegura que el video se cargue correctamente
        videoGrande.play().catch(error => {
            console.log("Reproducción bloqueada, usuario debe interactuar primero:", error);
        });
    } else {
        videoGrande.style.display = "none";
        imagenGrande.style.display = "block";
        imagenGrande.src = ruta;
    }
    
    overlay.style.display = "flex";
    overlay.classList.add("mostrar");
}

// Cerrar imagen o video
function cerrarImagen() {
    overlay.classList.remove("mostrar");
    setTimeout(() => {
        overlay.style.display = "none";
        videoGrande.pause();  // Pausar el video al cerrar
        videoGrande.src = ""; 
    }, 300);
}

// Cambiar imagen/video correctamente
function cambiarImagen(direccion) {
    if (direccion === -1) {
        indiceActual = (indiceActual === 0) ? imagenes.length - 1 : indiceActual - 1;
    } else if (direccion === 1) {
        indiceActual = (indiceActual === imagenes.length - 1) ? 0 : indiceActual + 1;
    }
    
    mostrarImagen(indiceActual);
}

// Evitar propagación del clic en botones
prevButton.addEventListener("click", function (event) {
    event.stopPropagation();
    cambiarImagen(-1);
    cambiarImagen(1);
});

nextButton.addEventListener("click", function (event) {
    event.stopPropagation();
    cambiarImagen(1);
    cambiarImagen(-1);
});

// Permitir cambiar imágenes con teclado
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        cerrarImagen();
    } else if (event.key === "ArrowRight") {
        cambiarImagen(1);
    } else if (event.key === "ArrowLeft") {
        cambiarImagen(-1);
    }
});
