import {ghosts} from './ghosts.js'
import {squares, scoreDisplay, width, nodeDictionary} from './gameBoard.js'
import {getCoodinates} from './getCoodinates.js'
  console.log('LOADED')
  /* ==================== GAME LOGIC ========================================== */
  // start position
  export let score = 0
  export let pacManIndex = 490
  console.log('PACKMAN Coords: ', getCoodinates(pacManIndex))
  
  squares[pacManIndex].classList.add('pac-man')

  export const handleScore = (points) => {
    score += points
    console.log('SCORE + ', points)
  }

  
  // move
  function move(e){
    squares[pacManIndex].classList.remove('pac-man')
    console.log(e.keyCode)
    switch (e.keyCode) {
      // LEFT
      case 37:
        if(pacManIndex % width !== 0 && !squares[pacManIndex -1].classList.contains('wall') && !squares[pacManIndex -1].classList.contains('ghost-lair')) pacManIndex -= 1
        // if pacman is at the left exit
        if(squares[pacManIndex].classList.contains('edge-piece')){
          pacManIndex = pacManIndex + (width - 2)
        }
        break;
      // UP
      case 38:
        if(pacManIndex - width >= 0 && !squares[pacManIndex - width].classList.contains('wall') && !squares[pacManIndex - width].classList.contains('ghost-lair')) pacManIndex -= width
        break;
      // RIGHT
      case 39:
        if(pacManIndex % width < width -1 && !squares[pacManIndex + 1].classList.contains('wall') && !squares[pacManIndex + 1].classList.contains('ghost-lair')) pacManIndex += 1
        if(squares[pacManIndex].classList.contains('edge-piece')){
          pacManIndex = pacManIndex - (width - 2)
        }
        break;
      // DOWN
      case 40:
        if(pacManIndex + width < width * width && !squares[pacManIndex + width].classList.contains('wall') && !squares[pacManIndex + width].classList.contains('ghost-lair')) pacManIndex += width
        break;

      default:
        break;
    }

    squares[pacManIndex].classList.add('pac-man')
    let currentNode = nodeDictionary[pacManIndex]
    console.log('Node', currentNode.index, 'Row:', currentNode.row, 'Column: ' , currentNode.col, 'Classes: ', ...currentNode.classes)
    pacDotEaten()
    powerPelletEaten()
    checkForGameOver()
    checkForWin()
  } /* SWITCH */



document.addEventListener('keyup', move)

function pacDotEaten(){
  if(squares[pacManIndex].classList.contains('pac-dot')){
    handleScore(1)
    scoreDisplay.innerHTML = score
    squares[pacManIndex].classList.remove('pac-dot')
  }
}

function powerPelletEaten(){
  if(squares[pacManIndex].classList.contains('power-pellet')){
    handleScore(10)
    scoreDisplay.innerHTML = score
    squares[pacManIndex].classList.remove('power-pellet')
    ghosts.forEach(ghost => ghost.isScared = true)
    setTimeout(unScareGhost, 10000)
  }
}

function unScareGhost(){
  ghosts.forEach(ghost => ghost.isScared = false)
}


export const checkForGameOver = () => {
  if(squares[pacManIndex].classList.contains('ghost') && !squares[pacManIndex].classList.contains('scared-ghost')){
    ghosts.forEach(ghost => clearInterval(ghost.timerId))
    document.removeEventListener('keyup', move)
    setTimeout(()=> window.alert('You Lose!'), 500)
    scoreDisplay.innerHTML = 'GAME OVER!'
  }
}

const checkForWin = () => {
  if(score > 274){
    ghosts.forEach(ghost=> clearInterval(ghost.timerId))
    document.removeEventListener('keyup', move)
    scoreDisplay.innerHTML = 'YOU WIN'
    setTimeout(() => window.alert('YOU WON!!!!'), 500)
  }
}













