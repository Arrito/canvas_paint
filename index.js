const canvas = document.getElementById("canvas_plot");
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let currentColor = '#000000';

const colorPalette = document.getElementById("color-palette");

// Обработчик для выбора цвета из палитры
colorPalette.addEventListener('click', (e) => {
    if (e.target.classList.contains('color-box')) {
        currentColor = e.target.getAttribute('data-color');
    }
});

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    lastX = e.offsetX;
    lastY = e.offsetY;
});

canvas.addEventListener('mouseup', () => {
    isDrawing = false;
});

canvas.addEventListener('mousemove', (e) => {
    if (!isDrawing) return;
    const currentX = e.offsetX;
    const currentY = e.offsetY;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(currentX, currentY);
    ctx.strokeStyle = currentColor;
    ctx.lineWidth = 5;
    ctx.stroke();
    lastX = currentX;
    lastY = currentY;
});

canvas.addEventListener('dblclick', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});
