class Player {
  constructor(gameBoard, shipsList, ) {
    this.ships = shipsList
    this.gameBoard = gameBoard
  }

  attack(otherPlayer, col, row) {
    otherPlayer.gameBoard.matrix[row][col].damage()
  }

  placeShip(ship, col, row, isVertical = false) {
    this.gameBoard.placeShip(ship, col, row, isVertical)
  }
}

export default Player