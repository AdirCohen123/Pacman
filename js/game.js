'use strict'
const WALL = '🧱'
const FOOD = 'º'
const EMPTY = ' ';
const SUPER_FOOD = '🍖';
const CHERRY = '🍒';

const winAudio = new Audio('sounds/pacman_win.wav');
const deathAudio = new Audio('sounds/pacman_death.wav');
const cherryAudio = new Audio('sounds/pacman_eatfruit.wav');
const eatAudio = new Audio('sounds/pacman_chomp.wav');
const superAudio = new Audio('sounds/pacman_super.wav');

var gNumbersOfFood;
var gFoodCollected;
var gBoard;
var gCherryInterval;

var gGame = {
    score: 0,
    isOn: false,
}

function init() {
    closeModal();
    document.querySelector('.restart-game').style.display = 'none';
    gGame.score = 0;
    document.querySelector('h3 span').innerText = gGame.score
    gNumbersOfFood = 1;
    gFoodCollected = 0;
    gBoard = buildBoard()
    createPacman(gBoard);
    createGhosts(gBoard);
    renderMat(gBoard, '.board-container')
    gGame.isOn = true
    document.querySelector('h3').style.visibility = "visible";
    gCherryInterval = setInterval(addCherry, 10000);
}

function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE + 10; j++) {
            board[i][j] = FOOD;
            gNumbersOfFood++;
            if (i === 1 && j === 1 ||
                i === SIZE - 2 && j === 1 ||
                i === SIZE - 2 && j === SIZE + 8 ||
                i === 1 && j === SIZE + 8) {
                board[i][j] = SUPER_FOOD;
                gNumbersOfFood--

            }
            if (i === 0 || i === SIZE + 4 ||
                j === 0 || j === SIZE + 9 ||
                i === SIZE - 1 ||
                (j > 6 && j < 9 && i === 4) ||
                (i === 6 && j > 6 && j < 13) ||
                (i > 3 && i < 7 && j === 12) ||
                (j === 11 && i > 3 && i < 5) ||
                (i > 1 && i < 4 && j === 4) ||
                (i === 3 && j === 3) ||
                (i === 6 && j < 5 && j > 2) ||
                (i === 7 && j === 4) ||
                (i > 1 && i < 4 && j === 15) ||
                (i === 3 && j === 16) ||
                (i === 6 && j < 17 && j > 14) ||
                (i === 7 && j === 15) ||
                (j === 7 && i > 4 && i < SIZE - 3)) {
                board[i][j] = WALL;
                gNumbersOfFood--;
            }
        }
    }
    console.log(gNumbersOfFood);
    return board;
}



function updateScore(diff) {
    gGame.score += diff
    document.querySelector('h3 span').innerText = gGame.score
}

function isVictory() {
    // winAudio.play()
    document.querySelector('.restart-game').style.display = 'block';
    document.querySelector('h3 span').style.display = 'none';
    console.log('winn');
    gGame.isOn = false;
    clearInterval(gIntervalGhosts)
    clearInterval(gCherryInterval);
    showModal(`YOW WIN!\nYour score is: ${gGame.score}`);
}

function gameOver() {
    console.log('Game Over');
    // deathAudio.play();
    document.querySelector('.restart-game').style.display = 'block';
    document.querySelector('h3').style.visibility = "hidden";
    gGame.isOn = false
    clearInterval(gIntervalGhosts);
    clearInterval(gCherryInterval);
    showModal(`GAME OVER\nYour score is: ${gGame.score}`);
}


function addCherry(location = getCell()) {
    if (!location) return;
    var currI = location.i;
    var currJ = location.j;
    gBoard[currI][currJ] = CHERRY;
    renderCell(location, CHERRY);
}

function showModal(text) {
    document.querySelector('.modal h2 span').innerText = text;
    var elModal = document.querySelector('.modal');
    elModal.style.display = 'block';
}

function closeModal() {
    var elModal = document.querySelector('.modal');
    elModal.style.display = 'none';

}