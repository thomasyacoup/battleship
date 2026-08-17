class GameCell {
  constructor() {
    this.isShot   = false
    this.ship = null
  }
  
  damage() {
    this.isShot = true
    if (this.ship) this.ship.damage()
  }
}

export default GameCell