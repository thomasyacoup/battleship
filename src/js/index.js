import '../css/style.css';
import GameBoard from './modules/gameBoard';
import { Player, ComputerPlayer } from "./modules/player"
import GameCell from "./modules/gameCell"
import getStarterShips from "./modules/ship"

function getCellElement(matrixEl, row, col) {
  return matrixEl.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`)
}

function initPlacementPhase(player, computerPlayer, onPlacementComplete) {
  const ships = document.querySelectorAll(".ships > .ship")
  const changeDirectionsBtn = document.getElementById("changeDirectionsBtn")
  const startGameBtn = document.getElementById("startGameBtn")

  startGameBtn.disabled = true

  // toggling vertical mode logic
  let isVertical = false
  const handleChangeDirections = () => {
    ships.forEach(ship => { if (!ship.classList.contains("placed")) ship.classList.toggle("vertical") })
    isVertical = !isVertical
  }
  changeDirectionsBtn.addEventListener("click", handleChangeDirections)

  // placing ships logic
  let activePlacementShip = null
  function changeActivePlacementShip(ship) {
    if (activePlacementShip) activePlacementShip.classList.remove("active")
    if (ship) ship.classList.add("active")
    activePlacementShip = ship
  }

  function checkAllShipsPlaced() {
    const allPlaced = [...ships].every(ship => ship.classList.contains("placed"))
    startGameBtn.disabled = !allPlaced
  }

  function placeShip(ship, cell) {
    if (!activePlacementShip) return
    try {
      player.placeShip(player.ships[ship.dataset.index], +cell.dataset.col, +cell.dataset.row, isVertical)
      changeActivePlacementShip(null)
      cell.appendChild(ship)
      ship.removeEventListener("click", handleShipClick)
      ship.classList.add("placed")
      checkAllShipsPlaced()
    } catch {
      cell.classList.add("invalid-placement")
      setTimeout(() => cell.classList.remove("invalid-placement"), 300)
    }
  }

  const handleShipClick = (event) => changeActivePlacementShip(event.currentTarget)
  ships.forEach(ship => ship.addEventListener("click", handleShipClick))

  document.querySelectorAll(".player.matrix .cell").forEach(cell =>
    cell.addEventListener("click", (event) => placeShip(activePlacementShip, event.currentTarget))
  )

  computerPlayer.randomAllShipsPlacement()

  startGameBtn.addEventListener("click", () => {
    if (startGameBtn.disabled) return
    onPlacementComplete()
  })
}

function initBattlePhase(player, computerPlayer) {
  const playerMatrixEl = document.querySelector(".player.matrix")
  const computerMatrixEl = document.querySelector(".computer.matrix")
  const placementContainer = document.querySelector(".placement-container")

  placementContainer.style.display = "none"
  computerMatrixEl.style.display = "grid"

  let isPlayerTurn = true
  let isGameOver = false

  function renderAttackResult(matrixEl, row, col, cellData) {
    const cellEl = getCellElement(matrixEl, row, col)
    cellEl.classList.add("damaged")
    if (cellData.ship) cellEl.classList.add("has-ship")
  }

  function isDefeated(playerObj) {
    return playerObj.ships.every(ship => ship.isSunk())
  }

  function endGame(winnerName) {
    isGameOver = true

    const overlay = document.getElementById("game-over-overlay")
    const messageEl = document.getElementById("game-over-message")

    messageEl.textContent = `${winnerName} Wins!`
    overlay.classList.toggle("winner", winnerName === "Player")
    overlay.classList.toggle("loser", winnerName === "Computer")
    overlay.classList.remove("hidden")
  }

  function handleComputerTurn() {
    const [row, col] = computerPlayer.randomAttack(player)
    const cellData = player.gameBoard.matrix[row][col]
    renderAttackResult(playerMatrixEl, row, col, cellData)

    if (isDefeated(player)) {
      endGame("Computer")
      return
    }
    isPlayerTurn = true
  }

  function handlePlayerAttack(event) {
    if (!isPlayerTurn || isGameOver) return

    const cellEl = event.currentTarget
    const row = +cellEl.dataset.row
    const col = +cellEl.dataset.col
    const cellData = computerPlayer.gameBoard.matrix[row][col]

    if (cellData.isShot) return

    player.attack(computerPlayer, col, row)
    renderAttackResult(computerMatrixEl, row, col, cellData)

    if (isDefeated(computerPlayer)) {
      endGame("Player")
      return
    }

    isPlayerTurn = false
    setTimeout(handleComputerTurn, 500)
  }

  computerMatrixEl.querySelectorAll(".cell").forEach(cell =>
    cell.addEventListener("click", handlePlayerAttack)
  )
}

function init() {
  const playerGameBoard = new GameBoard(GameCell)
  const player = new Player(playerGameBoard, getStarterShips())

  const computerGameBoard = new GameBoard(GameCell)
  const computerPlayer = new ComputerPlayer(computerGameBoard, getStarterShips())

  initPlacementPhase(player, computerPlayer, () => {
    initBattlePhase(player, computerPlayer)
  })
}

document.addEventListener('DOMContentLoaded', init);