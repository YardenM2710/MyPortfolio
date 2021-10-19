var WALL = 'WALL';
var FLOOR = 'FLOOR';
var BALL = 'BALL';
var GAMER = 'GAMER';
var PASSAGE = 'PASSAGE'
var GLUE = 'GLUE'

var GAMER_IMG = '<img class="gamer" src="img/gamer.png" />';
var BALL_IMG = '<img src="img/ball.png" />';
var GLUE_IMG = '<img  src="img/glue.png" />';
var GAMER_GLUED_IMG = '<img class="glued" src="img/gamer-purple.png" />';
var WALL_IMG = '<img src="img/wall.png" />'
var sound = new Audio()
sound.src = 'sound/mixkit-hungry-man-eating-2252.wav'
var gluingSound = new Audio()
gluingSound.src = 'sound/wah-wah-sad-trombonewav-6347.mp3'

var gBoard;
var gameIsStarted = false
var gGamerPos;
var gIntervalBall;
var gIntervalGlue;
var ballCount = 0
var ballsOnBoard = 0
var gCurrGluePos
var isGlued = false
var isGameWon = false

function initGame() {
	isGameWon = false
	gGamerPos = { i: 2, j: 9 };
	gBoard = buildBoard();
	renderBoard(gBoard);
	gIntervalBall = setInterval(pushRandomBall, 3000)
	gIntervalGlue = setInterval(pushGlue, 5000)

}


function buildBoard() {
	// Create the Matrix
	var board = createMat(10, 12)

	// Put FLOOR everywhere and WALL at edges
	for (var i = 0; i < board.length; i++) {
		for (var j = 0; j < board[0].length; j++) {
			// Put FLOOR in a regular cell
			var cell = { type: FLOOR, gameElement: null };
			// Place Walls at edges
			if (i === 0 || i === board.length - 1 || j === 0 || j === board[0].length - 1) {
				cell.type = WALL;
			}

			if (i === 0 && j === 6 || i === 5 && j === 0 || i === 5 && j === board[0].length - 1 || i === board.length - 1 && j === 6) {
				cell.type = PASSAGE
			}
			// Add created cell to The game board
			board[i][j] = cell;
		}
	}

	// Place the gamer at selected position
	board[gGamerPos.i][gGamerPos.j].gameElement = GAMER;

	return board;
}

function getEmptyCels(board) {
	var emptyCels = []
	for (var i = 0; i < board.length; i++) {
		for (var j = 0; j < board[0].length; j++) {
			if (board[i][j].gameElement === null && board[i][j].type === FLOOR) {
				var emptyCelsPos = { i: i, j: j }
				emptyCels.push(emptyCelsPos)
			}
		}
	}
	return emptyCels
}

function pushRandomBall() {
	gameIsStarted = true
	var emptyCels = getEmptyCels(gBoard)
	var randIdx = getRandomInt(0, emptyCels.length - 1)
	var position = emptyCels.splice(randIdx, 1)[0]
	gBoard[position.i][position.j].gameElement = BALL;
	renderCell(position, BALL_IMG);
	ballsOnBoard++
}

function pushGlue() {
	var emptyCels = getEmptyCels(gBoard)
	var randIdx = getRandomInt(0, emptyCels.length - 1)
	var position = emptyCels.splice(randIdx, 1)[0]
	gCurrGluePos = position
	gBoard[position.i][position.j].gameElement = GLUE;
	renderCell(position, GLUE_IMG);
	setTimeout(clearGlue, 3000)
}

function clearGlue() {

	if (gBoard[gCurrGluePos.i][gCurrGluePos.j].gameElement === GAMER) return

	gBoard[gCurrGluePos.i][gCurrGluePos.j].gameElement = FLOOR;
	renderCell(gCurrGluePos, '');
}
function renderBoard(board) {
	var strHTML = '';
	for (var i = 0; i < board.length; i++) {
		strHTML += '<tr>\n';
		for (var j = 0; j < board[0].length; j++) {
			var currCell = board[i][j];

			var cellClass = getClassName({ i: i, j: j })

			currCell.type === FLOOR || currCell.type === PASSAGE ? cellClass += ' floor' : null;
			currCell.type === WALL ? cellClass += ' wall' : null

			strHTML += `\t<td class="cell ' ${cellClass}
				'"  onclick="moveTo(' ${i} ',' ${j}  ')" >\n`;



			switch (currCell.gameElement) {
				case GAMER:
					strHTML += GAMER_IMG;
					break;
				case BALL:
					strHTML += BALL_IMG;
					break;
				case GLUE:
					strHTML += GLUE_IMG
					break;
			}

			strHTML += '\t</td>\n';
		}
		strHTML += '</tr>\n';
	}

	var elBoard = document.querySelector('.board');
	elBoard.innerHTML = strHTML;

}
function gameWon() {
	isGameWon = true
	var elModal = document.querySelector('.modal')
	elModal.style.visibility = 'visible'
	elH2 = document.querySelector('.score-modal')
	elH2.innerText = `The score is: ${ballCount}`

	clearInterval(gIntervalBall)
	clearInterval(gIntervalGlue)

}
function restartGame() {
	initGame()
	ballsOnBoard = 0
	ballCount = 0
	var elModal = document.querySelector('.modal')
	elModal.style.visibility = 'hidden'

	var elH2 = document.querySelector('.count')
	elH2.innerText = `Balls Count :${ballCount}`
}

// Move the player to a specific location
function moveTo(i, j) {
	var isPassage = false
	//check if in passage
	if (i === -1) {
		i = 9
		isPassage = true
	}
	else if (i === 10) {
		i = 0
		isPassage = true
	}
	if (j === -1) {
		j = 11
		isPassage = true
	}
	else if (j === 12) {
		j = 0
		isPassage = true
	}
	var elH2 = document.querySelector('.count')
	var targetCell = gBoard[i][j];
	if (targetCell.type === WALL) return;
	if (isGameWon) return;
	if (isGlued) {
		return
	}


	// Calculate distance to make sure we are moving to a neighbor cell
	var iAbsDiff = Math.abs(i - gGamerPos.i);
	var jAbsDiff = Math.abs(j - gGamerPos.j);

	// If the clicked Cell is one of the four allowed
	if ((iAbsDiff === 1 && jAbsDiff === 0) || (jAbsDiff === 1 && iAbsDiff === 0) || isPassage) {

		if (targetCell.gameElement === BALL) {
			ballCount++
			elH2.innerText = `Balls Count :${ballCount}`
			sound.play()
			ballsOnBoard--
		}
		else if (targetCell.gameElement === GLUE) {
			gluingSound.play()
			toggleGlued()
			setTimeout(toggleGlued, 3000)
		}

		if (ballsOnBoard === 0 && gameIsStarted) {
			gameWon()
			gameIsStarted = false
		}

		// MOVING from current position
		// Model:
		gBoard[gGamerPos.i][gGamerPos.j].gameElement = null;
		// Dom:
		renderCell(gGamerPos, '');

		// MOVING to selected position
		// Model:
		gGamerPos.i = i;
		gGamerPos.j = j;
		gBoard[gGamerPos.i][gGamerPos.j].gameElement = GAMER;
		// DOM:
		renderCell(gGamerPos, isGlued ? GAMER_GLUED_IMG : GAMER_IMG);

	} // else console.log('TOO FAR', iAbsDiff, jAbsDiff);

}
function toggleGlued() {
	isGlued = !isGlued
	renderCell(gGamerPos, GAMER_IMG);
}


// Convert a location object {i, j} to a selector and render a value in that element
function renderCell(location, value) {
	var cellSelector = '.' + getClassName(location)
	var elCell = document.querySelector(cellSelector);
	elCell.innerHTML = value;
}

// Move the player by keyboard arrows
function handleKey(event) {

	var i = gGamerPos.i;
	var j = gGamerPos.j;


	switch (event.key) {
		case 'ArrowLeft':
			moveTo(i, j - 1);
			break;
		case 'ArrowRight':
			moveTo(i, j + 1);
			break;
		case 'ArrowUp':
			moveTo(i - 1, j);
			break;
		case 'ArrowDown':
			moveTo(i + 1, j);
			break;

	}

}

// Returns the class name for a specific cell
function getClassName(location) {
	var cellClass = 'cell-' + location.i + '-' + location.j;
	return cellClass;
}

