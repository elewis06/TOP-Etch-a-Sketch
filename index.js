let currentNumSquares = 20;

function colorCell(elem) {
    let elemBackgroundColor = elem.style.backgroundColor;
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    let colorArr = elemBackgroundColor.slice( 
        elemBackgroundColor.indexOf("(") + 1,  
        elemBackgroundColor.indexOf(")") 
    ).split(", ");
    let a = parseFloat(colorArr[3]);

    if (!a) {
        a = 0.1;
    } else if (a != 1.0) {
        a += 0.1;
    }

    elem.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${a})`;
}

function openCustomDimensionsPopup() {
    let userInputPopup = document.querySelector(".pop-up-container");
    userInputPopup.showModal();
}

function closeCustomDimensionsPopup() {
    let userInputPopup = document.querySelector(".pop-up-container");
    let createGridForm = document.querySelector("#createGridForm");
    userInputPopup.close();
    createGridForm.reset();
}

function generateGrid(numRows = 16, numCols = 16) {
    for (let row = 1; row <= numRows; row++) {
        let gridRow = document.createElement("div");
        gridRow.classList.add("grid-row", `row-${row}`);
        gridContainer.appendChild(gridRow);
        for (let col = 1; col <= numCols; col++) {
            let gridCell = document.createElement("div");
            gridCell.classList.add("grid-cell", `row-${row}`, `cell-${col}`);
            gridCell.addEventListener("mouseover", (e) => {
                let element = e.target;
                colorCell(element);
            });
            gridRow.appendChild(gridCell);
        }
    }
}

function clearGrid() {
    deleteGrid();
    generateGrid(currentNumSquares, currentNumSquares);
}

function deleteGrid() {
    let gridContainer = document.querySelector(".grid-container");
    gridContainer.innerHTML = "";
}

function submitGridForm(e) {
    e.preventDefault();
    let userInputPopup = document.querySelector(".pop-up-container");
    let createGridForm = document.querySelector("#createGridForm");
    let squaresInputVal = e.target.querySelector("#numSquares").value;

    currentNumSquares = squaresInputVal;
    deleteGrid();
    generateGrid(squaresInputVal, squaresInputVal);
    userInputPopup.close();
    createGridForm.reset();
}

let gridContainer = document.querySelector(".grid-container");
let body = document.querySelector("body");

let numCols = currentNumSquares;
let numRows = currentNumSquares;

generateGrid(numRows, numCols);


let customDimensionsButton = document.querySelector("#customDimensionsButton");
customDimensionsButton.addEventListener("click", openCustomDimensionsPopup);

let clearGridButton = document.querySelector("#clearGridButton");
clearGridButton.addEventListener("click", clearGrid);

let closeCustomDimensiomsModalButton = document.querySelector("#closeButton");
closeCustomDimensiomsModalButton.addEventListener("click", closeCustomDimensionsPopup);


let gridForm = document.querySelector("#createGridForm");
gridForm.addEventListener("submit", submitGridForm);