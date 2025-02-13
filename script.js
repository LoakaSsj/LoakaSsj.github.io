const yesButton = document.getElementById('yes-button');
const noButton = document.getElementById('no-button');
const messageDiv = document.getElementById('message');
const questionText = document.querySelector('h1');
const carouselImages = document.querySelector('.carousel-images');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
let noCount = 0;
let currentPosition = 0;
let imageWidth = 0; // Inicializar

// ... (código para el botón "No")

// Manejar el click en "Sí"
yesButton.addEventListener('click', () => {
    // ... (código para mostrar el mensaje)

    // Esperar a que las imágenes se carguen completamente
    const images = carouselImages.querySelectorAll('img');
    let imagesLoaded = 0;
    images.forEach(img => {
        if (img.complete) {
            imagesLoaded++;
            if (imagesLoaded === images.length) {
                calculateImageWidth();
            }
        } else {
            img.addEventListener('load', () => {
                imagesLoaded++;
                if (imagesLoaded === images.length) {
                    calculateImageWidth();
                }
            });
        }
    });
});

function calculateImageWidth() {
    imageWidth = carouselImages.querySelector('img').offsetWidth;
    updateCarousel();
}

// Carrusel de imágenes (código corregido)

nextButton.addEventListener('click', () => {
    currentPosition = (currentPosition + 1) % carouselImages.children.length;
    updateCarousel();
});

prevButton.addEventListener('click', () => {
    currentPosition = (currentPosition - 1 + carouselImages.children.length) % carouselImages.children.length;
    updateCarousel();
});

function updateCarousel() {
    carouselImages.style.transform = `translateX(-${currentPosition * imageWidth}px)`;
}
