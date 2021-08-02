'use strict'
const GHOST = '⩍';


var gGhosts;
var gIntervalGhosts;
var gDltGhost = [];

function createGhost(board) {
    var ghost = {
        location: {
            i: 5,
            j: 9
        },
        currCellContent: FOOD,
        color: getRandomColor()
    }

    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = GHOST
}

function createGhosts(board) {
    gGhosts = []
    createGhost(board)
    createGhost(board)
    createGhost(board)

    gIntervalGhosts = setInterval(moveGhosts, 800)
}

function moveGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i]
        moveGhost(ghost)
    }
}

function getGhostPos(i, j) {
    for (var i = 0; i < gGhosts.length; i++) {
        if (gGhosts[i].location.i === i && gGhosts[i].location.j === j) {

            return gGhosts[i];
        }
    }
    return null;
}

function moveGhost(ghost) {
    var moveDiff = getMoveDiff()
    var nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    }
    var nextCell = gBoard[nextLocation.i][nextLocation.j]

    if (nextCell === WALL || nextCell === GHOST) return;
    if (nextCell === PACMAN) {
        if (!gPacman.isSuper) {
            gameOver()
        } else {
            return;
        }
    }

    // update the model
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
        // update the DOM
    renderCell(ghost.location, ghost.currCellContent)

    //Move the ghost
    ghost.location = nextLocation
        // update the model
    ghost.currCellContent = gBoard[ghost.location.i][ghost.location.j]
    gBoard[ghost.location.i][ghost.location.j] = GHOST
        // update the DOM
    renderCell(ghost.location, getGhostHTML(ghost))
}

function getMoveDiff() {
    var randNum = getRandomIntInclusive(1, 100);

    if (randNum <= 25) {
        return { i: 0, j: 1 }
    } else if (randNum <= 50) {
        return { i: -1, j: 0 }
    } else if (randNum <= 75) {
        return { i: 0, j: -1 }
    } else {
        return { i: 1, j: 0 }
    }
}

function getGhostHTML(ghost) {

    var ghostColor = gPacman.isSuper ? 'blue' : ghost.color;

    return `<span class="ghost" style="color: ${ghostColor}">${GHOST}</span>`
}