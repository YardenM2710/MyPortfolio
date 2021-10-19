//data
const PACMAN = 'P';
var gPacman;
var currDirection = 'right'
var gIsSuper = false
var gFoodOnBoard = 55;

//img
const PACMAN_RIGHT_IMG = '<img src="img/pacmanRight.gif"/>'
const PACMAN_UP_IMG = '<img src="img/pacmanUp.gif"/>'
const PACMAN_LEFT_IMG = '<img src="img/pacmanLeft.gif"/>'
const PACMAN_DOWN_IMG = '<img src="img/pacmanDown.gif"/>'

function createPacman(board) {
    gPacman = {
        location: {
            i: 3,
            j: 5
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}
function movePacman(ev) {

    if (!gGame.isOn) return;
    // console.log('ev', ev);
    var nextLocation = getNextLocation(ev)

    if (!nextLocation) return;
    // console.log('nextLocation', nextLocation);

    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    if (nextCell === WALL) return;
    if (nextCell === SUPER_FOOD && gIsSuper) return
    if (nextCell === FOOD || nextCell === SUPER_FOOD) {
        soundEating.play()
        updateScore(1);
        gFoodOnBoard--
        console.log('food on board', gFoodOnBoard)
    }
    if (gFoodOnBoard === 0){
        gameWon()
        return
    } 

    if (nextCell === GHOST || nextCell === GHOST_ON_FOOD && !gIsSuper) {
        // soundLoosing.play()
        gameOver();
        renderCell(gPacman.location, EMPTY)
        return;
    }
    if (nextCell === GHOST && gIsSuper) {
        onEatGhost(nextLocation.i, nextLocation.j)
        soundEatingGhost.play()
        updateScore(1);
    }
    if (nextCell === GHOST_ON_FOOD) {
        onEatGhost(nextLocation.i, nextLocation.j)
        // soundEatingGhost.play()
        updateScore(1);
        gFoodOnBoard--
        console.log('Eated ghost with food: ', gFoodOnBoard)
    }

    if (nextCell === SUPER_FOOD) {
        onSuperFood()
    }
    if (nextCell === CHERRY) {
        updateScore(10)
    }
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;

    // update the dom
    renderCell(gPacman.location, EMPTY);

    gPacman.location = nextLocation;

    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
    // update the dom
    renderCell(gPacman.location, getPacmanByDirection());

}


function getPacmanByDirection() {
    let img
    switch (currDirection) {
        case 'up':
            img = PACMAN_UP_IMG;
            break;
        case 'down':
            img = PACMAN_DOWN_IMG;
            break;
        case 'right':
            img = PACMAN_RIGHT_IMG;
            break;
        case 'left':
            img = PACMAN_LEFT_IMG;
            break;
    }

    return img
}



function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            nextLocation.i--;
            currDirection = 'up'
            break;
        case 'ArrowDown':
            nextLocation.i++;
            currDirection = 'down'
            break;
        case 'ArrowLeft':
            nextLocation.j--;
            currDirection = 'left'
            break;
        case 'ArrowRight':
            nextLocation.j++;
            currDirection = 'right'
            break;
        default:
            return null;
    }
    return nextLocation;
}
function onSuperFood() {
    toggleSuper()
    setTimeout(toggleSuper, 5000)

}
function toggleSuper() {
    gIsSuper = !gIsSuper
}

function onEatGhost(iIdx, jIdx) {
    for (var i = 0; i < gGhosts.length; i++) {
        var currGhost = gGhosts[i]
        if (currGhost.location.i === iIdx && currGhost.location.j === jIdx) currGhost.isAlive = false
        setTimeout(function () {
            currGhost.isAlive = true
        }, 5000)
    }
}