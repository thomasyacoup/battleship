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

class ComputerPlayer extends Player {
  
  randomShipPlacement(ship) {
    try {
      const isVertical = Math.random() < 0.5
      const row        = Math.floor(Math.random() * 10)
      const col        = Math.floor(Math.random() * 10)

      this.placeShip(ship, col, row, isVertical)
    } catch {
      this.randomShipPlacement(ship)
    }
  }

  randomAllShipsPlacement() {
    this.ships.forEach(ship => this.randomShipPlacement(ship))
  }

  randomAttack(otherPlayer) {
    const row = Math.floor(Math.random() * 10)
    const col = Math.floor(Math.random() * 10)

    this.attack(otherPlayer, col, row)
  }
}

export { Player, ComputerPlayer }