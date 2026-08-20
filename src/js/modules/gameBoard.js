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
      const row = []
      for (let j = 0; j < 10; j++) {
        row.push(new Cell())
      }
      matrix.push(row)
    }

    return matrix
  }

  _isOccupied(row, col) {
    if (row < 0 || row > 9 || col < 0 || col > 9) return false
    return Boolean(this.matrix[row][col].ship)
  }

  _hasAdjacentShip(row, col) {
    // checks all 8 surrounding cells (including diagonals)
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (dr === 0 && dc === 0) continue
        if (this._isOccupied(row + dr, col + dc)) return true
      }
    }
    return false
  }

  _validatePlacement(ship, col, row, isVertical = false) {
    // 1 - the ship is out of grid range

    // horizontal : ship.length <= (10 - col)
    if (!isVertical && ship.length > (10 - col)) return false
    // vertical : ship.length <= (10 - row)
    if (isVertical && ship.length > (10 - row)) return false

    for (let i = 0; i < ship.length; i++) {
      const r = isVertical ? row + i : row
      const c = isVertical ? col : col + i

      // 2 - the ship is crossing with other ship already in the grid
      if (this._isOccupied(r, c)) return false

      // 3 - the ship is touching another ship (no ships allowed side by side)
      if (this._hasAdjacentShip(r, c)) return false
    }

    return true
  }

  placeShip(ship, col, row, isVertical = false) {
    if (!this._validatePlacement(ship, col, row, isVertical)) {
      throw new Error("Wrong Placement")
    }

    for (let i = 0; i < ship.length; i++) {
      if (!isVertical) this.matrix[row][col+i].ship = ship
      else this.matrix[row+i][col].ship = ship
    }

  }
}

export default GameBoard