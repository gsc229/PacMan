import {squares, width} from './gameBoard.js'
import {checkForGameOver, handleScore, pacManIndex} from './app.js'
import {getCoodinates} from './getCoodinates.js'

class Ghost {
  constructor(className, startIndex, speed){
    this.className = className
    this.startIndex = startIndex
    this.speed = speed
    this.currentIndex = startIndex
    this.timerId = NaN
    this.leftPacDot = false
    this.prevIndex = startIndex
  }
}

export const ghosts = [
  new Ghost('blinky', 146, 100),
  new Ghost('pinky', 161, 100),
  new Ghost('inky', 668, 110),
  new Ghost('clyde', 647, 110)
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
  

  const directions = [-1, +1, width, -width]
  let direction = directions[Math.floor(Math.random() * directions.length)]

  /* SET TIME INTERVAL - THIS FUNCTION EXECUTES EVERY 300 MILISECONDS */
  ghost.timerId = setInterval(()=>{
    
    // if the next square in the ghost's direction does NOT contain a wall and another ghost, you can go
    if(!squares[ghost.currentIndex + direction].classList.contains('wall') && !squares[ghost.currentIndex + direction].classList.contains('ghost')){
      const [ghostX, ghostY] = getCoodinates(ghost.currentIndex)
      const [pacmanX, pacmanY] = getCoodinates(pacManIndex)
      const [ghostNewX, ghostNewY ] = getCoodinates(ghost.currentIndex + direction)
    
      function isXCloser(){
        return((ghostX < ghostNewX < pacmanX) || (ghostX > ghostNewX > pacmanX))
      }

      function isYCloser(){
        return((ghostY < ghostNewY < pacmanY) || (ghostY > ghostNewY > pacmanY))
      }



      /* IF the ghosts are getting closer to pacman */
      if(isXCloser() && isYCloser()){
        ////console('PAC MAN INDEX: ', pacManIndex)
        
        // you can go here
        // remove all ghost related classes
        squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
        // Add class pac-dot to the square about to leave if the square also has the class of 'empty'
        if(ghost.leftPacDot && !squares[ghost.prevIndex].classList.contains('empty') && !squares[ghost.prevIndex].classList.contains('power-pellet') ){
          squares[ghost.prevIndex].classList.add('pac-dot')
        }
        
        // make a copy of current index before it changes
        const oldGhostIndex = ghost.currentIndex
        // determine if the next square has a pac-dot
        const nextSquareIsPacDot = squares[ghost.currentIndex + direction].classList.contains('pac-dot') ? true : false
        // if the next square has a pac-dot, remove it before entering it:
        if(nextSquareIsPacDot){
          // if there was a pac-dot at the new index remove it and keep track of it in the ghost object.
          squares[ghost.currentIndex + direction].classList.remove('pac-dot')
          ghost.leftPacDot = nextSquareIsPacDot
          
        }
        // give ghost a new index based on direct
        ghost.currentIndex += direction
        
        // set the prevIndex on the ghost object
        ghost.prevIndex = oldGhostIndex
        
        // When the current index of the ghost updated to match the square's index, add the class name ghost to the square
        squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
      } else{
        squares[ghost.currentIndex].classList.add('ghost')
        direction = directions[Math.floor(Math.random() * directions.length)]
      }
      
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




