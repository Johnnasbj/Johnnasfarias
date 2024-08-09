const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const resetButton = document.getElementById('resetButton');
const counterElement = document.getElementById('counter');
const decreaseSizeButton = document.getElementById('decreaseSize');
const increaseSizeButton = document.getElementById('increaseSize');
let drawing = false;
let currentColor = getRandomColor();
let drawCount = 0;
let lineWidth = 5;
const backgroundImage = new Image();
backgroundImage.src = 'diamond2.jpg';

backgroundImage.onload = function() {
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
};

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function startDrawing(e) {
    drawing = true;
    currentColor = getRandomColor();
    drawCount++;
    counterElement.textContent = drawCount;
    draw(e);
}

function stopDrawing() {
    drawing = false;
    ctx.beginPath();
}

function draw(e) {
    if (!drawing) return;

    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.strokeStyle = currentColor;
    ctx.shadowBlur = 10;
    ctx.shadowColor = currentColor;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

function resetCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    drawCount = 0;
    counterElement.textContent = drawCount;
}

function increaseLineWidth() {
    lineWidth += 2;
}

function decreaseLineWidth() {
    if (lineWidth > 2) {
        lineWidth -= 2;
    }
}

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);
canvas.addEventListener('mousemove', draw);

resetButton.addEventListener('click', resetCanvas);
increaseSizeButton.addEventListener('click', increaseLineWidth);
decreaseSizeButton.addEventListener('click', decreaseLineWidth);
