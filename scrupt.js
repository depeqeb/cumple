let imagenes = [
    "arg/1.jpeg", "arg/2.jpeg", "arg/3.jpeg", 
    "arg/4.jpeg", "arg/5.jpeg", "arg/6.jpeg", 
    "arg/7.jpeg", "arg/8.jpeg", "arg/9.jpeg", 
    "arg/10.jpeg", "arg/11.jpeg", "arg/12.jpeg",
    "arg/13.jpeg", "arg/14.jpeg", "arg/15.jpeg",
    "arg/16.jpeg", "arg/17.jpeg", "arg/18.jpeg",
    "arg/19.jpeg", "arg/20.jpeg", "arg/21.jpeg",
    "arg/22.jpeg", "arg/23.jpeg", "arg/v1.mp4",
    "arg/v3.mp4", "arg/v2.mp4" // Asegúrate de que la extensión sea .mp4
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
