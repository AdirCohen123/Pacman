'use strict'
const PACMAN = '😱';


var gPacman;

function createPacman(board) {
    gPacman = {
        location: {
            i: 5,
            j: 15
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function movePacman(ev) {
    if (!gGame.isOn) return;

    var nextLocation = getNextLocation(ev)
    if (!nextLocation) return;

    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    switch (nextCell) {
        case WALL:
            return;
        case FOOD:
            // eatAudio.play()
            updateScore(1);
            gFoodCollected++
            console.log('COLLECTED', gFoodCollected);
            break;
        case SUPER_FOOD:
            // superAudio.play();
            if (!gPacman.isSuper) {
                activeIsSuper();
                updateScore(2);

            } else return;
            break;
        case CHERRY:
            // cherryAudio.play()
            updateScore(10);
            break;
        case GHOST:
            if (gPacman.isSuper) {
                var ghostIdx = getGhostPos(nextLocation.i, nextLocation.j);
                gDltGhost.push(gGhosts.splice(ghostIdx, 1)[0]);
            } else {
                gameOver()
                renderCell(gPacman.location, EMPTY);
                return;
            }
        default:
            break;
    }


    //  update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
        // update the DOM
    renderCell(gPacman.location, EMPTY)
        // Move the pacman
    gPacman.location = nextLocation
        //  update the model
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN
        // update the DOM
    renderCell(gPacman.location, PACMAN)
    if (gFoodCollected === gNumbersOfFood) {
        isVictory()
    }


}

function activeIsSuper() {
    gDltGhost = [];
    gPacman.isSuper = true;
    setTimeout(disableIsPower, 5000);
}

function disableIsPower() {
    gPacman.isSuper = false;
    for (var i = 0; i < gDltGhost.length; i++) {
        gGhosts.push(gDltGhost[i]);
    }
}


function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            nextLocation.i--
                break;
        case 'ArrowDown':
            nextLocation.i++
                break;
        case 'ArrowLeft':
            nextLocation.j--
                break;
        case 'ArrowRight':
            nextLocation.j++
                break;
        default:
            return null
    }
    return nextLocation;
}