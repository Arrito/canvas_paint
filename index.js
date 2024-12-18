const canvas = document.getElementById("canvas_plot");
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let currentColor = '#000000';

const colorPalette = document.getElementById("color-palette");
const clearButton = document.getElementById("clear-button");

// Обработчик для выбора цвета из палитры
colorPalette.addEventListener('click', (e) => {
    if (e.target.classList.contains('color-box')) {
        currentColor = e.target.getAttribute('data-color');
    }
});

clearButton.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Обработчик для начала рисования
const startDrawing = (e) => {
    isDrawing = true;
    lastX = e.offsetX || e.touches[0].clientX - canvas.offsetLeft;
    lastY = e.offsetY || e.touches[0].clientY - canvas.offsetTop;
};

// Обработчик для остановки рисования
const stopDrawing = () => {
    isDrawing = false;
};

// Обработчик для рисования
const draw = (e) => {
    if (!isDrawing) return;
    const currentX = e.offsetX || e.touches[0].clientX - canvas.offsetLeft;
    const currentY = e.offsetY || e.touches[0].clientY - canvas.offsetTop;
    
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(currentX, currentY);
    ctx.strokeStyle = currentColor;
    ctx.lineWidth = 5;
    ctx.stroke();
    lastX = currentX;
    lastY = currentY;
};

// Обработчики для событий мыши
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mousemove', draw);

// Обработчики для событий на сенсорных экранах
canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    startDrawing(e);
});
canvas.addEventListener('touchend', stopDrawing);
canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    draw(e);
});
