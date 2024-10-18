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
        " grid-template-columns:repeat(7, 75px)"]);
    container.appendChild(gameField);
    for (let i = 0; i < lines; ++i) {
        for (let j = 0; j < columns; ++j) {
            const button = addAttributes(document.createElement("button"),
                ["type", "button", "class", "button", "id", `${i},${j}`,
                "onclick", "markButton(this)"]);
            gameField.appendChild(button);
        }
    }
}

function checkConnect(discs) {
    for (let i = 1; i < discs.length; ++i) {
        if (!discs[i].style.backgroundColor
            || discs[i].style.backgroundColor !== discs[i - 1].style.backgroundColor) {
            return false;
        }
    }
    return true;
}

function checkDirections(line, column, direction) {
    const discs = [];
    for (let i = 0; i < 4; ++i) {
        const row = line + i * direction[0];
        const col = column + i * direction[1];
        const id = `${row},${col}`;
        const disc = document.getElementById(id);
        if (disc) {
            discs[i] = disc;
        }
    }
    return discs.length === 4 && checkConnect(discs);
}

function checkWinner() {
    const directions = [
        [0, 1], [1, 0], [1, 1], [1, -1],
    ];
    for (let i = 0; i < lines; ++i) {
        for (let j = 0; j < columns; ++j) {
            for (let k = 0; k < directions.length && !gameOver; ++k) {
                if (checkDirections(i, j, directions[k])) {
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
        button.style.backgroundColor = "yellowgreen";
    } else {
        button.style.backgroundColor = "darkred";
    }
    ++turn;
    button.setAttribute("disabled", "true");
    checkWinner();
}
