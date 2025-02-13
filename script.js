const yesButton = document.getElementById('yes-button');
const noButton = document.getElementById('no-button');

noButton.addEventListener('click', () => {
    noButton.style.fontSize = `${parseFloat(window.getComputedStyle(noButton).fontSize) * 0.8}px`;
    noButton.style.position = 'absolute';
    noButton.style.top = `${Math.random() * window.innerHeight - noButton.offsetHeight}px`;
    noButton.style.left = `${Math.random() * window.innerWidth - noButton.offsetWidth}px`;
    yesButton.style.fontSize = `${parseFloat(window.getComputedStyle(yesButton).fontSize) * 1.2}px`;
});