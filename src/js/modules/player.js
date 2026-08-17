class Player {
  constructor(gameBoard, shipsList, ) {
    this.ships = shipsList
    this.gameBoard = gameBoard
  }

  attack(otherPlayer, col, row) {
    otherPlayer.gameBoard.matrix[row][col].damage()
  }
}

export default Player