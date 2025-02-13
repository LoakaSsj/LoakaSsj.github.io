const yesButton = document.getElementById('yes-button');
const noButton = document.getElementById('no-button');
const messageDiv = document.getElementById('message');
let noCount = 0;

noButton.addEventListener('click', () => {
    noCount++;
    noButton.style.fontSize = `${parseFloat(window.getComputedStyle(noButton).fontSize) * 0.8}px`;
    noButton.style.position = 'absolute';
    noButton.style.top = `${Math.random() * (window.innerHeight - 50)}px`;
    noButton.style.left = `${Math.random() * (window.innerWidth - 50)}px`;
    yesButton.style.fontSize = `${parseFloat(window.getComputedStyle(yesButton).fontSize) * 1.2}px`;
});

yesButton.addEventListener('click', () => {
    document.querySelector('.buttons').style.display = 'none';
    messageDiv.style.display = 'block';
});
