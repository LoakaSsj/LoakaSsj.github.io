const yesButton = document.getElementById('yes-button');
const noButton = document.getElementById('no-button');
const messageDiv = document.getElementById('message');
const questionText = document.querySelector('h1');
const carouselImages = document.querySelector('.carousel-images');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
let noCount = 0;
let index = 0;

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

// Función para cambiar la imagen en el carrusel
function updateCarousel() {
    const images = document.querySelectorAll('.carousel-images img');
    const imageWidth = images[0].clientWidth;
    carouselImages.style.transform = `translateX(-${index * imageWidth}px)`;
}

// Botón siguiente
nextButton.addEventListener('click', () => {
    const images = document.querySelectorAll('.carousel-images img');
    if (index < images.length - 1) {
        index++;
    } else {
        index = 0; // Regresa al inicio
    }
    updateCarousel();
});

// Botón anterior
prevButton.addEventListener('click', () => {
    const images = document.querySelectorAll('.carousel-images img');
    if (index > 0) {
        index--;
    } else {
        index = images.length - 1; // Va al final
    }
    updateCarousel();
});
