const yesButton = document.getElementById('yes-button');
const noButton = document.getElementById('no-button');
const messageDiv = document.getElementById('message');
let noCount = 0;

noButton.addEventListener('mouseover', () => {
    const maxX = window.innerWidth - noButton.offsetWidth;
    const maxY = window.innerHeight - noButton.offsetHeight;
    
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;
    
    noButton.style.position = 'absolute';
    noButton.style.left = `${randomX}px`;
    noButton.style.top = `${randomY}px`;
});

yesButton.addEventListener('click', () => {
    document.querySelector('.buttons').style.display = 'none';
    messageDiv.style.display = 'block';
});

