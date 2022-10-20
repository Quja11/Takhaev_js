const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
const input = document.getElementById("input")
const btns = document.querySelectorAll(".btn")
const player = document.getElementById("player")
const validText = document.querySelector(".invalid")
const audioWin = document.getElementById("win")
const audioDraw = document.getElementById("draw")
const bt1 = document.querySelectorAll(".bt1")
const bt2 = document.querySelectorAll(".bt2")
const defaultBoardSize = 400

let step = 1
let arr = []

input.value = 5

canvas.width = canvas.height = defaultBoardSize

///////////////////////////////////
for (let btn of bt1) {
btn.addEventListener("click", function () {
    if (setBoard) {
      clear()
    }
	setBoard()
	startGame()
  })
}
for (let btn of bt2) {
btn.addEventListener("click", function () {
    if (setBoard) {
      clear()
    }
	setBoard()
	startGame()
     count1=0;
     count2 =0;
	 alert("Игрок х: "+count2+'Игрок о: '+count1);
  })
}

for (let btn of btns) {
btn.addEventListener("click", function () {
      if (input.value < 5) return
    validText.textContent = ""
    if (setBoard) {
      clear()
    }
    setBoard()
    startGame()
  })
}
function startGame() {
  modalEl.getElementsByTagName("h2")[0].textContent = 'Идёт игра'
  const sizeBox = defaultBoardSize / input.value
  player.textContent = step === 1 ? "Ходит игрок: Х" : "Ходит игрок: О"
  canvas.onclick = function (event) {
    let x = event.offsetX
    let y = event.offsetY
    x = Math.floor(x / sizeBox)
    y = Math.floor(y / sizeBox)

    draw(sizeBox, x, y)
    checkWin(x, y)
  }
}
var count1=0;
var count2 =0;

function checkWin(x, y) {
  if (
    testWin(-1, 1, -1, 1, x, y) == 4 ||
    testWin(1, 1, 1, 1, x, y) == 4 ||
    testWin(0, 1, 0, 1, x, y) == 4 ||
    testWin(1, 0, 1, 0, x, y) == 4
  ) {
	  /////
     if (arr[y][x]=="O") {
		 count1++;
	 } else { count2++;}
	 /////
    showWinner(arr[y][x])
    canvas.onclick = function (event) {
      event.stopPropagation()
    }
    return
  }

  let flag = false

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (arr[i][j] == 0) {
        flag = true
      }
    }
  }

  if (!flag) {
    showNoWin()
    canvas.onclick = function (event) {
      event.stopPropagation()
    }
  }
}

function draw(sizeBox, x, y) {
  if (arr[y][x] == 0) {
    let csize = 10
    if (step % 2 !== 0) {
      ctx.beginPath()
      ctx.strokeStyle = "#000000"
      ctx.lineWidth = 1

      ctx.moveTo(
        x * sizeBox + (csize * sizeBox) / 100,
        y * sizeBox + sizeBox - (csize * sizeBox) / 100
      )
      ctx.lineTo(
        x * sizeBox + sizeBox - (csize * sizeBox) / 100,
        y * sizeBox + (csize * sizeBox) / 100
      )

      ctx.moveTo(
        x * sizeBox + sizeBox - (csize * sizeBox) / 100,
        y * sizeBox + sizeBox - (csize * sizeBox) / 100
      )
      ctx.lineTo(
        x * sizeBox + (csize * sizeBox) / 100,
        y * sizeBox + (csize * sizeBox) / 100
      )

      ctx.stroke()

      arr[y][x] = "X"
      player.textContent = "Ходит игрок: O"
    } else {
      ctx.beginPath()
      ctx.strokeStyle = "#000000"
      ctx.lineWidth = 1
      ctx.arc(
        x * sizeBox + sizeBox / 2,
        y * sizeBox + sizeBox / 2,
        sizeBox / 2 - (csize * sizeBox) / 100,
        0,
        Math.PI * 2
      )
      ctx.stroke()

      arr[y][x] = "O"
      player.textContent = "Ходит игрок: Х"
    }

    step++
  }
}

function clear() {
  if (!modalEl.classList.contains("hidden")) {
    modalEl.classList.add("hidden")
  }
  ctx.clearRect(0, 0, defaultBoardSize, defaultBoardSize)
  arr = []
  step = Math.random() > 0.5 ? 2 : 1
}

function setBoard() {
  const sizeBox = defaultBoardSize / input.value

  for (let i = 0; i <= defaultBoardSize; i += sizeBox) {
    for (let j = 0; j <= defaultBoardSize; j += sizeBox) {
      ctx.beginPath()
      ctx.lineWidth = 1
      ctx.strokeStyle = "#000000"
      ctx.strokeRect(i, j, sizeBox, sizeBox)
      ctx.stroke()
    }
  }

  let massive = [] 

  for (let i = 0; i < input.value; i++) {
    massive[i] = 0
  }
  for (let i = 0; i < input.value; i++) {
    arr[i] = massive.slice()
  }
}

function testWin(
  horizontalRight,
  verticalTop,
  horizontalLeft,
  verticalBottom,
  x,
  y
) {
  const winOnX = [x]
  const winOnY = [y]
  let count = 0
  let i = 1
  let j = 1

  while (count != 4) {
    if (
      arr[y + i * horizontalRight] != undefined &&
      arr[y][x] == arr[y + i * horizontalRight][x + i * verticalTop]
    ) {
      count++
      winOnX.push(x + i * horizontalRight)
      winOnY.push(y + i * verticalTop)
      i++
      continue
    } else {
      if (
        arr[y - j * horizontalLeft] != undefined &&
        arr[y][x] == arr[y - j * horizontalLeft][x - j * verticalBottom]
      ) {
        count++
        winOnX.push(x - j * horizontalLeft)
        winOnY.push(y - j * verticalBottom)
        j++
        continue
      }
    }

    return count
  }

  return count
}

const modalEl = document.getElementById("modal")
function showWinner(winner) {
  let header = modalEl.getElementsByTagName("h2")[0]
  header.textContent = `Победитель ${winner}`
   alert("Игрок О: "+count1+" Игрок х: "+count2);
}

function showNoWin() {
  let header = modalEl.getElementsByTagName("h2")[0]
  header.textContent = `Победила дружба`
   alert("Игрок О: "+count1+" Игрок х: "+count2);
}

validText.textContent = ""
    if (setBoard) {
      clear()
    }
setBoard()
startGame()