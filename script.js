let $start = document.getElementById('start')
let $game = document.getElementById('game')
let $time = document.getElementById('time')
let $result = document.getElementById('result')
let $timeHeader = document.getElementById('time-header')
let $resultHeader = document.getElementById('result-header')
let $gameTime = document.getElementById('game-time')

$start.addEventListener('click', startGame)
$game.addEventListener('click', handleDivClick)
$gameTime.addEventListener('input', setGameTime)

let colors = ['red', 'blue', 'green', 'yellow', 'pink']
let score = 0
let isGameStarted = false

function show ($el) {
    $el.classList.remove('hide')
}

function hide ($el) {
    $el.classList.add('hide')
}

function startGame () {
    score = 0
    setGameTime()
    $gameTime.setAttribute('disabled', true)
    
    isGameStarted = true
    $game.style.backgroundColor = 'white'
    hide($start)
    

    let intervar = setInterval(() => {
        let time = parseFloat($time.textContent)

        if(time <= 0){
            clearInterval(intervar)
            endGame()
        }else {
            $time.textContent = (time - 0.1).toFixed(1)
        }

    }, 100);

    renderBox()
}

function endGame () {
    $gameTime.removeAttribute('disabled', false)
    isGameStarted = false
    setGameScore()
    show($start)
    $game.style.backgroundColor = '#ccc'
    $game.innerHTML = ''
    hide($timeHeader)
    show($resultHeader)
}

function setGameTime () {
    let time = +$gameTime.value
    $time.textContent = time.toFixed(1)
    show($timeHeader)
    hide($resultHeader)
}

function setGameScore () {
    $result.textContent = score.toString()
}

function handleDivClick (event) {
    if(!isGameStarted) {
        return 
    }
    if(event.target.dataset.box){
        score++
        renderBox()
    }
}

function getRandom (min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}



function renderBox() {
    $game.innerHTML = ''

    let divSize = getRandom(20, 45)
    let randomDiv = document.createElement('div')
    let gameSize = $game.getBoundingClientRect()
    let maxTop = gameSize.height - divSize
    let maxLeft = gameSize.width - divSize
    let randomColor = getRandom(0, colors.length)

    randomDiv.style.width = randomDiv.style.height = divSize + 'px'
    randomDiv.style.position = 'absolute'
    randomDiv.style.backgroundColor = colors[randomColor]
    randomDiv.style.cursor = 'pointer'
    randomDiv.style.top = getRandom(0, maxTop) + 'px'
    randomDiv.style.left = getRandom(0, maxLeft) + 'px'
    randomDiv.setAttribute('data-box', 'true')

    $game.appendChild(randomDiv)
}