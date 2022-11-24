const startButton = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeElement = document.querySelector('#time')
const board = document.querySelector('#board')

const colors = [
  '#d46ad0',
  '#cc54de',
  '#a954de',
  '#8954de',
  '#7054de',
  '#5459de',
  '#5459de',
  '#6da2de',
  '#6dbcde',
  '#6dd1de'
]

let time = 0
let score = 0

startButton.addEventListener('click', (event) => {
  event.preventDefault()
  screens[0].classList.add('up')
})

timeList.addEventListener('click', (event) => {
  if (event.target.classList.contains('time-btn')) {
    time = parseInt(event.target.getAttribute('data-time'))
    screens[1].classList.add('up')
    startGame()
  }
})

board.addEventListener('click', (event) => {
  if(event.target.classList.contains('circle')) {
    score++
    event.target.remove()
    creatRandomCircle()
  }
})

function startGame() {
  setInterval(decreasTime, 1000)
  creatRandomCircle()
  setTime(time)
}

function decreasTime() {
  if ( time === 0) {
    finishGame()
  } else {
    let current = --time
    if ( current < 10) {
      current = `0${current}`
    }
    setTime(current)
  }
}

export function setTime(value) {
  timeElement.innerHTML = `00:${value}`
}

function finishGame() {
  timeElement.parentNode.classList.add('hide')
  board.innerHTML = `
  <div>
    <h1>Счет: 
      <span class="primary">${score}</span>
    </h1>
    <a href="/" class="start">Переиграть?</a>
  </div>`
}

function creatRandomCircle() {
  const circle = document.createElement('div')
  const size = getRandomNumber(10, 60)
  const {width, height} = board.getBoundingClientRect()

  const x = getRandomNumber(0, width - size)
  const y = getRandomNumber(0, height - size)

  circle.classList.add('circle')
  circle.style.width = `${size}px`
  circle.style.height = `${size}px`
  circle.style.top = `${y}px`
  circle.style.left = `${x}px`
  setColor(circle)

  board.append(circle)
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max-min) + min)
}

function setColor (element) {
  const color = getRandomColor()
  element.style.background = color
  element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`
}

function getRandomColor () {
  const index = Math.floor(Math.random() * colors.length)
  return colors[index]
}
