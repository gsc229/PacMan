import {layout1 as layout} from './layouts.js'

/* ==================================== GAME SETUP  =====================================================  */
  export const grid = document.querySelector('.grid')
         
  export const scoreDisplay = document.getElementById('score')
  
  export const width = 28 // 28 * 28 = 784 squares
  export const length = width
  export const area = length * width
  
  // 0 - pac-dots
  // 1 - wall
  // 2 - ghost-lair
  // 3 - power-pellet
  // 4 - empty
  export const squares = []
  // create board
  function createBoard(){

    /* Construct the nodes */
    for(let i = 0; i < layout.length; i++){

      const x = i % width
      const y = Math.floor(i/width)
      /* Determine if on edge */
     
      
      // Create the Node
      const square = document.createElement('div')
      square.setAttribute('id', i)
      grid.appendChild(square)
      squares.push(square)
      // add the layout class:
      // 0 - pac-dots
      // 1 - wall
      // 2 - ghost-lair
      // 3 - power-pellet
      // 4 - empty
      if(layout[i] === 0){
        squares[i].classList.add('pac-dot')
      } else if(layout[i] === 1){
        squares[i].classList.add('wall')
      } else if(layout[i] === 2){
        squares[i].classList.add('ghost-lair')
      } else if(layout[i]===3){
        squares[i].classList.add('power-pellet')
      } else if(layout[i]===4){
        squares[i].classList.add('empty')
      }

      /* if(x===0 || y===0 || x===width - 1  || y===width - 1){
        squares[i].classList.add('edge-piece')
      } */
    }
  }
  createBoard()