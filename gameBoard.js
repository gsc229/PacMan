/* ==================================== GAME SETUP  =====================================================  */
  export const grid = document.querySelector('.grid')
  export const scoreDisplay = document.getElementById('score')
  export const width = 28 // 28 * 28 = 784 squares
  export const length = width
  export const area = length * width
  export const layout = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1, // 0-27
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1, // 28 - 55
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1, // 56 - 83
    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1, // 84 - 111
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
  ]
  // 0 - pac-dots
  // 1 - wall
  // 2 - ghost-lair
  // 3 - power-pellet
  // 4 - empty
  export const squares = []
  export const nodeDictionary = {
    contents: {
      structureOfDictionary: {
        nodeIndex: {
          row: 0,
          column:  0,
        }
      }
    }
  }
  // create board
  function createBoard(){

    let nextRightEdgeIndex
    let currentRow = 0
    let currentColumn = 0

    /* Construct the nodes */
    for(let i = 0; i < layout.length; i++){

      
      /* Determine if on edge */
      const onLeftEdge = i === 0 || i%28 === 0
      const onRightEdge = i === nextRightEdgeIndex
      const onTopEdge = i <= width
      const onBottomEdge = nextRightEdgeIndex === area - 1
      
      // Create the Node
      const square = document.createElement('div')
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
      if(onLeftEdge || onTopEdge || onRightEdge || onBottomEdge){
        squares[i].classList.add('edge-piece')
        console.log('EDGE PIECE')
      }

      /* Save node info to the dictionary:  */
      const classList = JSON.parse(JSON.stringify(square.classList))
      nodeDictionary[i] = {
        index: i,
        row: currentRow, 
        col: currentColumn,
        classes: Object.values(classList)
     }
      
      //console.log(nodeDictionary)

      /* Set the   */
      if(onLeftEdge) nextRightEdgeIndex = i + width - 1
      if(onRightEdge) currentRow += 1
      currentColumn = currentColumn === width - 1 ? 0 : currentColumn + 1
      
    }

    //console.log('GRID: ',grid)
    //console.log('SQUARES: ', squares)
  }

  createBoard()