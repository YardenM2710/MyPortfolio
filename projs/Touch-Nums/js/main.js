'use strict'
var gNums = []
var gBoard = []
var gDifficulty = 0
var gNextNum = 1
var gInterval

function init() {
    createBoard()
}

//data model
function createBoard(difficulty = 16) {
    gDifficulty = difficulty
    var board = []
    gNums = createGNums(difficulty)
    for (var i = 0; i < difficulty; i++) {
        board.push(drawNum(gNums))
    }
    gBoard = board
    renderBoard(difficulty)
}
//view
function renderBoard(size) {
    var strHtml = '<tbody class="board fade-in">'
    for (var i = 0; i < Math.sqrt(size); i++) {
        strHtml += '<tr>'
        for (var j = 0; j < Math.sqrt(size); j++) {
            var cell = gBoard.pop()
            strHtml += `<td class="cell" data-i="${i}" data-j="${j}"
            onclick="cellClicked(this,${i},${j})"
            >${cell}</td>`
        }
        strHtml += '</tr>'
    }
    strHtml += '</tbody>'
    var elBoard = document.querySelector('.table')
    elBoard.innerHTML = strHtml
}
//action
function cellClicked(elCell) {
    var cellNum = parseInt(elCell.innerText)
    if (cellNum !== gNextNum) return
    elCell.classList.add('marked')
    gNextNum++
    if (gNextNum === 2) start()
    if (gNextNum - 1 === gDifficulty) {
        pause()
        gameWon()
    }
}

function gameWon() {
    var elModal = document.querySelector('.modal')
    elModal.style.visibility = 'visible'
    sound.play()
}

function restartGame() {
    createBoard(gDifficulty)
    gNextNum = 1
    reset()
    var elModal = document.querySelector('.modal')
    elModal.style.visibility = 'hidden'
}

