class Ship {
  constructor(length) {
    this.length = length
    this.health = length
  }

  isSunk() {
    return this.health == 0 ? true : false
  }
  
  damage() {
    if (this.health == 0) throw new Error("This ship is already destoryed")
    this.health--
  }
}

class Carrier extends Ship {
  constructor() {
    super(5)
  }
}

class Battleship extends Ship {
  constructor() {
    super(4)
  }
}

class Destroyer extends Ship {
  constructor() {
    super(3)
  }
}

class Submarine extends Ship {
  constructor() {
    super(2)
  }
}

function getStarterShips() {
  return [new Carrier(), new Battleship(), new Destroyer(), new Destroyer(), new Submarine(), new Submarine()]
}

export default getStarterShips