const container = document.querySelector('.container');
const gridSizeButton = document.querySelector('#size');
const clearButton = document.querySelector('#clear');
const randomButton = document.querySelector('#random');
const rainbowButton = document.querySelector('#rainbow');

let gridColor;
let gridSize = 16;
let random = false;
let rainbowButtonLabel = () => (random) ? 'Rainbow Enabled' : 'Rainbow Disabled';
let color = () => Math.round(Math.random() * 255);

generateGrid();
setColor(color(), color(), color());

function generateGrid() {
    for (let i = 0; i < gridSize * gridSize; i++) {
        const div = document.createElement('div');
    
        div.style.width = `${container.clientWidth / gridSize}px`;
        div.style.height = `${container.clientWidth / gridSize}px`;
        div.style.backgroundColor = 'gold';
        div.style.outline = '1px solid black';

        div.addEventListener('mouseover', () => {
            div.style.backgroundColor = (!random) ? gridColor : `rgb(${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)})`;
        });
    
        container.appendChild(div);
    }

    rainbowButton.textContent = rainbowButtonLabel();
}

function destroyGrid() {
    const childCount = container.childElementCount;

    for (let i = 0; i < childCount; i++) {
        container.removeChild(container.firstChild);
    }
}

function askGridSize() {
    const promptMsg = "Enter an integer number from 1 to 100 to set the size of each side of the grid:";

    while ((gridSize = prompt(promptMsg)) != null && (Number(gridSize) < 1 || Number(gridSize) > 100)) {
        gridSize = Number(prompt(promptMsg));
    }

    gridSize = (gridSize == null) ? 16 : gridSize;
}

function setColor(red, green, blue) {
    gridColor = `rgb(${red}, ${green}, ${blue})`;
}

gridSizeButton.addEventListener('click', () => {
    askGridSize();
    destroyGrid();
    generateGrid();
});

clearButton.addEventListener('click', () => {
    container.childNodes.forEach(grid => {
        grid.style.backgroundColor = 'gold';
    });
});

randomButton.addEventListener('click', () => {
    setColor(color(), color(), color());
});

rainbowButton.addEventListener('click', () => {
    random = !random;
    rainbowButton.textContent = rainbowButtonLabel();
    rainbowButton.style.backgroundColor = (random) ? 'aliceblue' : 'gray';
    rainbowButton.style.transform = (random) ? 'scale(.9)' : 'scale(1)';
});