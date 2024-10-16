const container = document.getElementById("createGameHere");
const result = document.getElementById("result");
const lines = 6;
const columns = 7;
let turn = 0;
let gameOver = false;

function addAttributes(element, attributes) {
    for (let i = 0; i < attributes.length; i += 2) {
        element.setAttribute(attributes[i], attributes[i + 1]);
    }
    return element;
}

function createGame(button) {
    button.innerHTML = "Restart Game";
    button.setAttribute("onclick", "window.location.reload()");
    const gameField = addAttributes(document.createElement("div"),
        ["style", "justify-content:center; display:grid;" +
        "grid-template-columns:repeat(7, 75px)"]);
    container.appendChild(gameField);
    for (let i = 0; i < lines; ++i) {
        for (let j = 0; j < columns; ++j) {
            const button = addAttributes(document.createElement("button"),
                ["type", "button", "class", "button", "id", i + "," + j,
                    "onclick", "markButton(this)"]);
            gameField.appendChild(button);
        }
    }
}

function checkConnect(disc1, disc2, disc3, disc4) {
    return disc1.style.backgroundColor
        && disc1.style.backgroundColor === disc2.style.backgroundColor
        && disc1.style.backgroundColor === disc3.style.backgroundColor
        && disc1.style.backgroundColor === disc4.style.backgroundColor;
}

function checkWinner() {
    for (let i = 0; i < lines; ++i) {
        for (let j = 0; j < columns; ++j) {
            if (j + 3 < columns) {
                const disc1 = document.getElementById(i + "," + j);
                const disc2 = document.getElementById(i + "," + (j + 1));
                const disc3 = document.getElementById(i + "," + (j + 2));
                const disc4 = document.getElementById(i + "," + (j + 3));
                if (checkConnect(disc1, disc2, disc3, disc4)) {
                    gameOver = true;
                }
            }
            if (i + 3 < lines) {
                const disc1 = document.getElementById(i + "," + j);
                const disc2 = document.getElementById((i + 1) + "," + j);
                const disc3 = document.getElementById((i + 2) + "," + j);
                const disc4 = document.getElementById((i + 3) + "," + j);
                if (checkConnect(disc1, disc2, disc3, disc4)) {
                    gameOver = true;
                }
            }
            if (i + 3 < lines && j + 3 < columns) {
                const disc1 = document.getElementById(i + "," + j);
                const disc2 = document.getElementById((i + 1) + "," + (j + 1));
                const disc3 = document.getElementById((i + 2) + "," + (j + 2));
                const disc4 = document.getElementById((i + 3) + "," + (j + 3));
                if (checkConnect(disc1, disc2, disc3, disc4)) {
                    gameOver = true;
                }
            }
            if (i + 3 < lines && j - 3 >= 0) {
                const disc1 = document.getElementById(i + "," + j);
                const disc2 = document.getElementById((i + 1) + "," + (j - 1));
                const disc3 = document.getElementById((i + 2) + "," + (j - 2));
                const disc4 = document.getElementById((i + 3) + "," + (j - 3));
                if (checkConnect(disc1, disc2, disc3, disc4)) {
                    gameOver = true;
                }
            }
        }
    }
    if (gameOver) {
        displayWinner();
    } else if (!gameOver && turn === lines * columns) {
        result.innerText = "IT'S A DRAW!";
    }
}

function displayWinner() {
    if ((turn - 1) % 2) {
        result.innerText = "PLAYER 2 WINS!";
    } else {
        result.innerText = "PLAYER 1 WINS!";
    }
}

function markButton(button) {
    if (gameOver) {
        return;
    }
    if (turn % 2) {
        button.setAttribute("style", "background-color:yellowgreen");
    } else {
        button.setAttribute("style", "background-color:darkred");
    }
    ++turn;
    button.setAttribute("disabled", "true");
    checkWinner();
}