class GameBoard {
  /* 
    game borad should have:
    10x10 grid of cells -> { isShot, haveShip }
    method to place a ship
  */

  constructor(Cell) {
    this.matrix = this._createMatrix(Cell)
    this.ships = []
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

  _validatePlacement(ship, col, row, isVertical = false) {
    // two cases of unvalid placement 
    // 1 - the ship is out of grid range

    // horizontal : ship.length <= (10 - col)
    if (!isVertical && ship.length > (10 - col)) return false
    // vertical : ship.length <= (10 - row)  
    if (isVertical && ship.length > (10 - row)) return false

    // 2 - the ship is crossing with other ship already in the grid
    for (let i = 0; i < ship.length; i++) {
      if (!isVertical && this.matrix[row][col+i].ship) return false
      if (isVertical && this.matrix[row+i][col].ship) return false
    }

    return true
  }

  placeShip(ship, col, row, isVertical = false) {
    if (!this._validatePlacement(ship, col, row, isVertical)) {
      throw new Error("Wrong Placement")
    }

    this.ships.push(ship)
    
    for (let i = 0; i < ship.length; i++) {
      if (!isVertical) this.matrix[row][col+i].ship = ship
      else this.matrix[row+i][col].ship = ship
    }

  }
}

export default GameBoard