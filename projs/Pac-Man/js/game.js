//data model
const WALL = '#'
const FOOD = '.'
const EMPTY = ' ';
const SUPER_FOOD = 'superfood'
const CHERRY = 'cherry'

var gBoard;
var gGame = {
    score: 0,
    isOn: false
}
var gIntervalCherry


//images
const WALL_IMG = '<img src="img/wall.jpg"/>'
const SUPERFOOD_IMG = '👻'
const CHERRY_IMG = '🍒'
//sound
var soundBeginning = new Audio()
soundBeginning.src = 'sounds/pacman_beginning.wav'
var soundEating = new Audio()
soundEating.src = 'sounds/pacman_chomp.wav'
var soundLoosing = new Audio()
soundLoosing.src = 'sounds/pacman_death.wav'
var soundEatingGhost = new Audio()
soundEatingGhost.src = 'sounds/pacman_eatghost.wav'


//init
function init() {
    gBoard = buildBoard()
    createPacman(gBoard);
    createGhosts(gBoard);
    createSuperFoods(gBoard)
    gIntervalCherry = setInterval(pushRandomCherry, 15000, gBoard)
    printMat(gBoard, '.board-container')
    gGame.isOn = true
    // soundBeginning.play()
}

//restart
function restartGame() {
    init()
    gGame.score = 0
    document.querySelector('h2 span').innerText = gGame.score
    var elModal = document.querySelector('.modal')
    elModal.style.visibility = 'hidden'
    document.querySelector('.loosing-img').style.visibility = 'hidden'
    gFoodOnBoard = 55

}
//actions
function getEmptyCels(board) {
    var emptyCels = []
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (board[i][j] === EMPTY) {
                var emptyCelsPos = { i: i, j: j }
                emptyCels.push(emptyCelsPos)
            }
        }
    }
    return emptyCels
}

function pushRandomCherry(board) {
    gGame.isOn = true
    var emptyCels = getEmptyCels(board)
    var randIdx = getRandomInt(0, emptyCels.length - 1)
    var position = emptyCels.splice(randIdx, 1)[0]
    board[position.i][position.j] = CHERRY
    renderCell(position, CHERRY_IMG);
}

function createSuperFood(board, i, j) {
    var superFood = {
        location: {
            i,
            j
        },
        currCellContent: SUPER_FOOD,
    }
    board[superFood.location.i][superFood.location.j] = SUPER_FOOD
}

function createSuperFoods(board) {
    createSuperFood(board, 1, 1)
    createSuperFood(board, 1, 8)
    createSuperFood(board, 8, 1)
    createSuperFood(board, 8, 8)
}

function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2 ||
                    j === 6 && i > 1 && i < SIZE - 3)) {

                board[i][j] = WALL;
            }
        }
    }
    return board;
}


function updateScore(diff) {
    gGame.score += diff;
    document.querySelector('h2 span').innerText = gGame.score
}

function gameOver() {
    gGame.isOn = false;
    var elModal = document.querySelector('.modal')
    document.querySelector('.modal h1').innerText = 'You Looose'
    elModal.style.visibility = 'visible'
    document.querySelector('.loosing-img').style.visibility = 'visible'
    var elScoreSpan = document.querySelector('.score')
    elScoreSpan.innerText = ` ${gGame.score}`
    clearInterval(gIntervalGhosts)
    clearInterval(gIntervalCherry)
}

function gameWon() {
    gGame.isOn = false
    var elModal = document.querySelector('.modal')
    document.querySelector('.modal h1').innerText = 'You Won'
    elModal.style.visibility = 'visible'

    var elScoreSpan = document.querySelector('.score')
    elScoreSpan.innerText = ` ${gGame.score}`
    clearInterval(gIntervalGhosts)
    clearInterval(gIntervalCherry)
}

