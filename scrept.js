let imagenes = [
    "ami/1.jpg", "ami/2.jpg", "ami/3.jpg", 
    "ami/4.jpg", "ami/5.jpg", "ami/6.jpg", 
    "ami/7.jpg", "ami/8.jpg", "ami/9.jpg", 
    "ami/10.jpg", "ami/11.jpg", "ami/12.jpg",
    "ami/13.jpg", "ami/14.jpg", "ami/15.jpg",
    "ami/16.jpg", "ami/17.jpg", "ami/18.jpg",
    "ami/19.jpg", "ami/20.jpg", "ami/21.jpg",
    "ami/22.jpg", "ami/23.jpg", "ami/24.jpg", "ami/25.jpg", "ami/v1.mp4"
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
