import '../css/style.css';
import GameBoard from './modules/gameBoard';
import { Player, ComputerPlayer } from "./modules/player"
import GameCell from "./modules/gameCell"
import getStarterShips from "./modules/ship"

function init() {
  // init players
  const playerGameBoard = new GameBoard(GameCell)
  const player = new Player(playerGameBoard, getStarterShips())

  const computerGameBoard = new GameBoard(GameCell)
  const computerPlayer = new ComputerPlayer(computerGameBoard, getStarterShips())

  // PLACEMENT ROUND
  const ships = document.querySelectorAll(".ships > .ship")
  
  // toggling vertical mode logic
  let isVertical = false
  const changeDirectionsBtn = document.getElementById("changeDirectionsBtn")
  const handleChangeDirections = () => {
    ships.forEach(ship => {if (!ship.classList.contains("placed")) ship.classList.toggle("vertical")})
      
    isVertical = !isVertical
  }
  changeDirectionsBtn.addEventListener("click", handleChangeDirections)
  // ----------------------------------

  // placing ships logic
  let activePlacementShip = null
  function changeActivePlacementShip(ship) {
    if (activePlacementShip) activePlacementShip.classList.remove("active");
    if (ship) ship.classList.add("active");
    activePlacementShip = ship
  }
  function placeShip(ship, cell) {
    if (!activePlacementShip) return;
    try {
      player.placeShip(player.ships[ship.dataset.index], +cell.dataset.col, +cell.dataset.row, isVertical)
      changeActivePlacementShip(null)
      cell.appendChild(ship)
      ship.removeEventListener("click", handleShipClick)
      ship.classList.add("placed")
    } catch {
      console.log("Wrong placement")
    }
  }
  const handleShipClick = () => changeActivePlacementShip(event.currentTarget)
  ships.forEach(ship => ship.addEventListener("click", handleShipClick))
  document.querySelectorAll(".matrix .cell").forEach(cell => cell.addEventListener("click", () => placeShip(activePlacementShip, event.currentTarget)))
  
  computerPlayer.randomAllShipsPlacement()
  // -------------------------------------------

  // starting game logic
  const startGameBtn = document.getElementById("startGameBtn")
  function startGame() {
    let unValidStart = false
    ships.forEach(ship => {
      if (!ship.classList.contains("placed")) unValidStart = true
    })
    if (unValidStart) return;
    document.querySelector(".ships").remove()
    document.querySelector(".btns").remove()
  }
  
  startGameBtn.addEventListener("click", startGame)
  
}


document.addEventListener('DOMContentLoaded', init);
