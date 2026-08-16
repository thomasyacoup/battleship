class GameBoard {
  /* 
    game borad should have:
    10x10 grid of cells -> { isShot, haveShip }
    method to place a ship
  */

  constructor(Cell) {
    this.matrix = this._createMatrix(Cell)
  }

  _createMatrix(Cell) {
    const matrix = []
    
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        matrix.push(
          [
            new Cell(), new Cell(), new Cell(), new Cell(), new Cell(), 
            new Cell(), new Cell(), new Cell(), new Cell(), new Cell(),
          ]
        )
      }
    }

    return matrix
  }

  // eslint-disable-next-line no-unused-vars
  _checkPlacement(ship, col, row, isVerical = false) {
    return true // for now
  }

  placeShip(ship, col, row, isVerical = false) {
    if (!this._checkPlacement(ship, col, row, isVerical)) {
      throw new Error("Wrong Placement")
    }
    
    for (let i = 0; i < ship.length; i++) {
      if (!isVerical) this.matrix[row][col+i].ship = ship
      else this.matrix[row+i][col].ship = ship
    }

  }
}

export default GameBoard