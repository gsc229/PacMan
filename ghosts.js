import {squares, width} from './gameBoard.js'
import {checkForGameOver, handleScore} from './app.js'


class Ghost {
  constructor(className, startIndex, speed){
    this.className = className
    this.startIndex = startIndex
    this.speed = speed
    this.currentIndex = startIndex
    this.timerId = NaN
  }
}

export const ghosts = [
  new Ghost('blinky', 348, 250),
  new Ghost('pinky', 376, 400),
  new Ghost('inky', 351, 300),
  new Ghost('clyde', 379, 500)
]


ghosts.forEach(ghost => {
  squares[ghost.currentIndex].classList.add(ghost.className)
  squares[ghost.currentIndex].classList.add('ghost')
  
})

ghosts.forEach(ghost => {
  moveGhost(ghost)
})

// write the function to move the ghosts
function moveGhost(ghost){
  console.log('GHOST: ', ghost)
  const directions = [-1, +1, width, -width]
  let direction = directions[Math.floor(Math.random() * directions.length)]
  console.log(direction)
  ghost.timerId = setInterval(()=>{
    // if the next square in the ghost's direction does NOT contain a wall and another ghost, you can go
    if(!squares[ghost.currentIndex + direction].classList.contains('wall') && !squares[ghost.currentIndex + direction].classList.contains('ghost')){
      // you can go here
      // remove all ghost related classes
      //console.log('SQUARE', squares[ghost.currentIndex]) 
      squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
      // add the classes to the new index
      ghost.currentIndex += direction
      //console.log('NEW GHOST CURRENT INDEX: ', ghost.currentIndex)
      squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
    } else{
      direction = directions[Math.floor(Math.random() * directions.length)]
    }

    // scared ghost
    if(ghost.isScared){
      squares[ghost.currentIndex].classList.add('scared-ghost')
    }
    // pacman eats ghost
    if(ghost.isScared && squares[ghost.currentIndex].classList.contains('pac-man')){
      squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
      ghost.currentIndex = ghost.startIndex
      handleScore(100)
      squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
    }

    checkForGameOver()
  }, ghost.speed)

}




