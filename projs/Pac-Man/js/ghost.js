//images
const GHOST1_IMG = '<img class="ghost" src="img/ghost1.png" />'
const GHOST2_IMG = '<img class="ghost" src="img/ghost2.png" />'
const GHOST3_IMG = '<img class="ghost" src="img/ghost3.png" />'
const EATABLE_GHOSTS = '<img class="ghost" src="img/blue.png"/>'
const DOT_IMG = '<div class="dot"></div>';

//data model
const GHOST = 'GHOST'
const GHOST_ON_FOOD = 'GHOST_ON_FOOD'
var gGhosts = []
var gIntervalGhosts;

//create
function createGhost(board) {
    var ghost = {
        location: {
            i: 3,
            j: 3
        },
        currCellContent: FOOD,
        isAlive: true
    }
    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = GHOST_ON_FOOD
}

function createGhosts(board) {
    gGhosts = [];
    createGhost(board)
    createGhost(board)
    createGhost(board)
    gIntervalGhosts = setInterval(moveGhosts, 1000)

}

function moveGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];
        if (!ghost.isAlive) continue
        moveGhost(ghost, i)

    }

}
function moveGhost(ghost, idx) {
    var moveDiff = getMoveDiff();
    var nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    }
    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    if (nextCell === WALL) return;
    if (nextCell === GHOST) return;
    if (nextCell === GHOST_ON_FOOD) return;
    if (nextCell === SUPER_FOOD) return;
    if (nextCell === CHERRY) return;
    if (nextCell === PACMAN) {
        gameOver();
        // soundLoosing.play()
        return;
    }
    //current cell
    let currCell 
    if( ghost.currCellContent === FOOD){
        currCell = FOOD
    } else {
        currCell = EMPTY
    }
        gBoard[ghost.location.i][ghost.location.j] = currCell
    // dom
    renderCell(ghost.location, ghost.currCellContent === '.' ? DOT_IMG :ghost.currCellContent)
    // next move
    // model
    ghost.location = nextLocation;
    ghost.currCellContent = gBoard[ghost.location.i][ghost.location.j]
    let nextCellValue 
    if ( ghost.currCellContent === FOOD){
        nextCellValue = GHOST_ON_FOOD
    } else {
        nextCellValue = GHOST
    }
    gBoard[ghost.location.i][ghost.location.j] = nextCellValue

    // dom
    renderCell(ghost.location, getGhostHTML(idx))
}

function getMoveDiff() {
    var randNum = getRandomInt(0, 100);
    if (randNum < 25) {
        return { i: 0, j: 1 }
    } else if (randNum < 50) {
        return { i: -1, j: 0 }
    } else if (randNum < 75) {
        return { i: 0, j: -1 }
    } else {
        return { i: 1, j: 0 }
    }
}


function getGhostHTML(idx) {
    let strHTML = `<span class ="ghost">`
    if (gIsSuper) {
        strHTML += EATABLE_GHOSTS
    }
    else {
        if (idx === 0) strHTML += GHOST1_IMG
       else if (idx === 1) strHTML += GHOST2_IMG
       else if (idx === 2) strHTML += GHOST3_IMG

    }
    strHTML += `</span>`
    return strHTML
}
