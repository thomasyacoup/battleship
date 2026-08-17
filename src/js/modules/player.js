class Player {
  constructor(gameBoard, shipsList, ) {
    this.ships = shipsList
    this.gameBoard = gameBoard
  }

  attack(otherPlayer, col, row) {
    otherPlayer.gameBoard.matrix[row][col].damage()
  }

  placeShip(ship, col, row, isVertical = false) {
    try {
      this.gameBoard.placeShip(ship, col, row, isVertical)
      this.gameBoard.filter(item => item != ship)
    } catch {
      console.log("Wrong placement")
    }
  }
}

export default Player