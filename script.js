const yesButton = document.getElementById('yes-button');
const noButton = document.getElementById('no-button');
const messageDiv = document.getElementById('message');
const questionText = document.querySelector('h1');
const carouselImages = document.querySelector('.carousel-images');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
let currentPosition = 0;
let imageWidth = 0;

// Hacer que el botón "No" huya cuando el mouse se acerque
noButton.addEventListener('mousemove', (event) => {
    const buffer = 50;
    const rect = noButton.getBoundingClientRect();
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    if (
        mouseX > rect.left - buffer && mouseX < rect.right + buffer &&
        mouseY > rect.top - buffer && mouseY < rect.bottom + buffer
    ) {
        let newX, newY;
        let attempts = 0;

        do {
            const maxX = window.innerWidth - noButton.offsetWidth;
            const maxY = window.innerHeight - noButton.offsetHeight;

            newX = Math.random() * maxX;
            newY = Math.random() * maxY;

            attempts++;

            if (attempts > 100) {
                console.warn("No se encontró una posición válida después de 100 intentos.");
                break;
            }

        } while (checkOverlap(newX, newY));

        noButton.style.position = 'absolute';
        noButton.style.left = `${newX}px`;
        noButton.style.top = `${newY}px`;
    }
});

// Función para verificar si el botón "No" se superpone con el botón "Sí"
function checkOverlap(x, y) {
    const yesRect = yesButton.getBoundingClientRect();
    const noRect = {
        left: x,
        top: y,
        right: x + noButton.offsetWidth,
        bottom: y + noButton.offsetHeight
    };

    return !(
        noRect.right < yesRect.left ||
        noRect.left > yesRect.right ||
        noRect.bottom < yesRect.top ||
        noRect.top > yesRect.bottom
    );
}

// Registrar la cantidad de veces que se hizo click en "No" y cambiar el tamaño de los botones
noButton.addEventListener('click', () => {
    // Reducir tamaño de "No" y aumentar tamaño de "Sí"
    noButton.style.transform = 'scale(0.8)';
    yesButton.style.transform = 'scale(1.2)';
    
    // Hacer que el "No" cambie de posición
    const maxX = window.innerWidth - noButton.offsetWidth;
    const maxY = window.innerHeight - noButton.offsetHeight;
    noButton.style.position = 'absolute';
    noButton.style.left = `${Math.random() * maxX}px`;
    noButton.style.top = `${Math.random() * maxY}px`;
});

// Manejar el click en "Sí"
yesButton.addEventListener('click', () => {
    document.querySelector('.buttons').style.display = 'none';
    messageDiv.style.display = 'block';
    messageDiv.innerHTML = '<h2>TE AMO MI FLAQUITA HERMOSA</h2>'; // Mostrar el mensaje

    questionText.style.display = 'none';

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

// Carrusel de imágenes
nextButton.addEventListener('click', () => {
    currentPosition = (currentPosition + 1) % carouselImages.children.length;
    updateCarousel();
});

prevButton.addEventListener('click', () => {
    currentPosition = (currentPosition - 1 + carouselImages.children.length) % carouselImages.children.length;
    updateCarousel();
});

function updateCarousel() {
    carouselImages.style.transition = 'transform 0.5s ease-in-out';
    carouselImages.style.transform = `translateX(-${currentPosition * imageWidth}px)`;
}

