const yesButton = document.getElementById('yes-button');
const noButton = document.getElementById('no-button');
const messageDiv = document.getElementById('message');
const questionText = document.querySelector('h1');
const carouselImages = document.querySelector('.carousel-images');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
let noCount = 0;
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
        const maxX = window.innerWidth - noButton.offsetWidth;
        const maxY = window.innerHeight - noButton.offsetHeight;

        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;

        noButton.style.position = 'absolute';
        noButton.style.left = `${randomX}px`;
        noButton.style.top = `${randomY}px`;
    }
});

// Registrar la cantidad de veces que se hizo click en "No"
noButton.addEventListener('click', () => {
    noCount++;
});

// Manejar el click en "Sí"
yesButton.addEventListener('click', () => {
    document.querySelector('.buttons').style.display = 'none';
    messageDiv.style.display = 'block';
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




onst yesButton = document.getElementById('yes-button');
const noButton = document.getElementById('no-button');
const messageDiv = document.getElementById('message');
const questionText = document.querySelector('h1');
let noCount = 0;

// Hacer que el botón "No" huya cuando el mouse se acerque
noButton.addEventListener('mousemove', (event) => {
    const buffer = 50; // Distancia en la que el botón empieza a moverse
    const rect = noButton.getBoundingClientRect();
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    if (
        mouseX > rect.left - buffer && mouseX < rect.right + buffer &&
        mouseY > rect.top - buffer && mouseY < rect.bottom + buffer
    ) {
        const maxX = window.innerWidth - noButton.offsetWidth;
        const maxY = window.innerHeight - noButton.offsetHeight;
        
        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;
        
        noButton.style.position = 'absolute';
        noButton.style.left = `${randomX}px`;
        noButton.style.top = `${randomY}px`;
    }
});

// Registrar la cantidad de veces que se hizo click en "No"
noButton.addEventListener('click', () => {
    noCount++;
});

// Manejar el click en "Sí"
yesButton.addEventListener('click', () => {
    document.querySelector('.buttons').style.display = 'none';
    messageDiv.style.display = 'block';
    questionText.style.display = 'none'; // Ocultar la pregunta

    // Enviar solicitud al servidor para registrar el log y mandar correo
    fetch('/send_email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ noCount: noCount })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('Correo enviado correctamente y log registrado.');
        } else {
            console.error('Error al enviar correo:', data.error);
        }
    });
});

