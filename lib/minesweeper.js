// alert("Good luck!"); // Of course you can remove this (annoying) line ;)

const gameBoard = document.querySelector("tbody");
const nRows = 8;
const nCols = 8;

let gameover = false;

let minePos = [];
let cellPos = [];

const getAdjacentCells = (cell) => {
  const x = parseInt(cell.id.split("-")[0], 10);
  const y = parseInt(cell.id.split("-")[1], 10);
  const adjacent = [];
  for (let xOff = -1; xOff < 2; xOff += 1) {
    for (let yOff = -1; yOff < 2; yOff += 1) {
      const newX = x + xOff;
      const newY = y + yOff;
      if (newY >= 0 && newY < nRows && newX >= 0 && newX < nCols && (xOff + yOff !== 0)) {
        adjacent.push(`${newX}-${newY}`);
      }
    }
  }
  console.log(adjacent);
  return adjacent;
};

const clickCell = (cell) => {
  if (gameover) { return; }
  if (cell.classList.contains("opened")) { return; }
  if (minePos.includes(cell.id)) {
    gameover = true;
    cell.className = "mine";
    document.querySelector(".smiley").innerText = "🤯";
    minePos.forEach((cellID) => {
      document.getElementById(cellID).className = "mine";
    });
    return;
  }
  cell.className = "opened";
  let mineCount = 0;
  const adjacent = getAdjacentCells(cell);
  adjacent.forEach((cellID) => {
    if (minePos.includes(cellID)) {
      mineCount += 1;
    }
  });
  if (mineCount > 0) {
    cell.classList.add(`mine-neighbour-${mineCount}`);
  } else {
    adjacent.forEach((cellID) => {
      const adjCell = document.getElementById(cellID);
      clickCell(adjCell);
    });
  }
};

const initializeCell = (cell) => {
  cell.addEventListener('click', (elem) => {
    console.log(elem.currentTarget.id);
    clickCell(cell);
  });
};

function shuffleArray(array) {
  let currentIndex = array.length; let randomIndex;
  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

const makeBoard = () => {
  cellPos = [];
  gameBoard.innerText = "";
  for (let y = 0; y < nRows; y += 1) {
    const newRow = gameBoard.insertRow();
    for (let x = 0; x < nCols; x += 1) {
      const newCell = newRow.insertCell();
      newCell.className = "unopened";
      newCell.id = `${x}-${y}`;
      cellPos.push(`${x}-${y}`);
      initializeCell(newCell);
    }
    const cellPosCopy = cellPos.slice();
    const totalMines = Math.ceil(cellPos.length / 8);
    minePos = shuffleArray(cellPosCopy).slice(0, totalMines);
    console.log("new minePos:", minePos);
  }
};

makeBoard();
