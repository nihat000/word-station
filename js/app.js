let level;
let Game = {
   level: 1,
   eraser: 3,
   money: 1500,
   letters: ['a', 'd', 'a', 'm'],
   words: ['adam', 'dama', 'dam', 'ada'],
   lang: "az",
   words: [],
   isPenDown: false,
   penArr: [],
   penIdArr: [],
   revealedWords: [],
   revealedWordsCount: 0,

   squareSize: 40,


}


const loadingScreen = document.querySelector('.loading-screen')
const startScreen = document.querySelector('.start-screen')
const gameScreen = document.querySelector('.game-screen')

const boardEl = document.querySelector('.game-screen .board')
const gamePadEl = document.querySelector('.game-screen .gamepad')





setTimeout(fetchData, 1100)

function fetchData() {
   fetch(`./api/levels/${Game.level}.json`)
      .then(res => res.json())

      .then(res => { level = res; App() })
}


function App() {
   loadingScreen.classList.toggle('d-none')
   startScreen.classList.toggle('d-none')

}

function toggleInfo() {
   if (document.querySelector('.start-screen-info').style.display == 'block') {

      document.querySelector('.start-screen h2').style.display = "block";
      document.querySelector('.start-screen .stage').style.display = "block";
      document.querySelector('.start-screen .actions').style.display = "block";
      document.querySelector('.start-screen-info').style.display = "none";
   }
   else {
      document.querySelector('.start-screen h2').style.display = "none";
      document.querySelector('.start-screen .stage').style.display = "none";
      document.querySelector('.start-screen .actions').style.display = "none";
      document.querySelector('.start-screen-info').style.display = "block";
   }

}

function closeInfo() {

}


function play() {
   startScreen.classList.toggle('d-none')
   gameScreen.classList.toggle('d-none')
   buildInput(level.lang[Game.lang].letters)
   buildBoard(level.lang[Game.lang].words)
}




function buildInput(arr) {

   let parentEl = document.querySelector('.gamepad')
   let degree = 360 / arr.length;
   for (let i = 0; i < arr.length; i++) {
      let finalDegree = i * degree;

      let btn = document.createElement('button')
      btn.innerText = arr[i];
      btn.addEventListener('mousedown', mouseDown)
      btn.addEventListener('mousemove', mouseMove)
      btn.classList.add('gamepad-square')
      btn.dataset.id = i;

      if (0 <= finalDegree && finalDegree <= 45) {
         btn.style.top = 0
         btn.style.left = 50 + finalDegree / 90 * 100 + "%"
         btn.style.transform = ` translateX(-50%) `
      } else if (45 < finalDegree && finalDegree <= 135) {
         btn.style.right = 0
         btn.style.top = (finalDegree - 45) / 90 * 100 + "%"
         btn.style.transform = `translateY(-50%)`
      } else if (135 < finalDegree && finalDegree <= 225) {
         btn.style.bottom = 0
         btn.style.right = (finalDegree - 135) / 90 * 100 + "%"
         btn.style.transform = `translateX(50%)`
      } else if (225 < finalDegree && finalDegree < 360) {
         btn.style.left = 0;
         btn.style.bottom = (finalDegree - 225) / 90 * 100 + "%"
         btn.style.transform = `translateY(50%)`
      }
      parentEl.append(btn)
   }
   document.body.addEventListener('mouseup', mouseUp)
}

function buildBoard(arr) {
   boardEl.innerHTML += "";
   for (let i = 0; i < arr.length; i++) {
      const obj = JSON.parse(JSON.stringify(arr[i]))
      let { word, start, direction } = obj

      for (let j = 0; j < word.length; j++) {
         let div = document.createElement('div')
         div.classList.add('board-square')
         div.style.left = start[0] * Game.squareSize + 'px'
         div.style.top = start[1] * Game.squareSize + 'px'
         boardEl.append(div)
         if (direction == 'x') {
            start[0]++
         }
         else if (direction == 'y') {
            start[1]++
         }
      }
   }

}




function mouseDown(e) { Game.isPenDown = true }
function mouseUp(e) {

   Game.isPenDown = false; document.querySelectorAll('.gamepad-square').forEach(b => { b.style.backgroundColor = '' });
   let word = '';
   for (let i = 0; i < Game.penArr.length; i++) {
      word += Game.penArr[i];
   }
   console.log(word);
   Game.penArr = []
   Game.penIdArr = [];
   const words = level.lang[Game.lang].words;

   let isCorrect = false;
   let i = 0;
   for (; i < words.length; i++) {
      if (word == words[i].word) {
         isCorrect = true;
         break;
      }
   }
   if (isCorrect) {
      console.log('You found it')
      showWord(words[i])
      Game.revealedWords.push(words[i])
      checkFinish()
   } else {
      gamePadEl.style.animation = ".2s shake"
   }


}

function mouseMove(e) {
   if (!Game.isPenDown) {
      return false
   }
   // console.log(e.target)
   if (Game.penIdArr.indexOf(e.target.dataset.id) == -1) {
      Game.penIdArr.push(e.target.dataset.id)
      Game.penArr.push(e.target.innerText)
      e.target.style.backgroundColor = "#ac92ec"

   }

}


function checkFinish() {
   if (Game.revealedWords.length == level.lang[Game.lang].words.length) {
      console.log('You won')
      showNextLevel()
   }
}


function showNextLevel() {
   document.querySelector('.modal-won').classList.toggle('d-none')
}

function restartLevel() {
   Game.revealedWords = []
   document.querySelector('.modal-won').classList.toggle('d-none')
   buildInput(level.lang[Game.lang].letters)
   buildBoard(level.lang[Game.lang].words)
}

function nextLevel() {
   Game.revealedWords = []
   Game.level++
   fetch(`./api/levels/${Game.level}.json`)
      .then(res => res.json())

      .then(res => {
         level = res;
         document.querySelector('.modal-won').classList.toggle('d-none')
         buildInput(level.lang[Game.lang].letters)
         buildBoard(level.lang[Game.lang].words)

      })


}



function showWord(obj_) {
   let obj = JSON.parse(JSON.stringify(obj_))
   let { start, direction, word } = obj;
   for (let j = 0; j < word.length; j++) {

      let div = document.createElement('div')
      div.innerText = word[j]
      div.classList.add('board-letter')
      div.style.left = start[0] * Game.squareSize + 'px'
      div.style.top = start[1] * Game.squareSize + 'px'
      boardEl.append(div)
      if (direction == 'x') {
         start[0]++
      }
      else if (direction == 'y') {
         start[1]++
      }
   }
}


// buildGrid()

// Game.words.forEach(a => print(a))


function animate(element, name, duration) {
   if (name == 'shake') {
      let num = 0;
      let checkpoint = 0;
      const timerId = setInterval(() => {
         num = 0;
         if (checkpoint == 0) {
            num++;
         }

      }, 50)
   }
}


function eraserClick() {
   const words = level.lang[Game.lang].words;
   for (let i = 0; i < words.length; i++) {
      let isRevealed = false
      for (let j = 0; j < Game.revealedWords.length; j++) {
         console.log(Game.revealedWords[j].word, words[i].word)
         if (Game.revealedWords[j].word == words[i].word) {
            isRevealed = true;
            break;
         }
      }
      if (!isRevealed) {
         console.log(words[i])
         let div = document.createElement('div')
         div.innerText = words[i].word[0]
         div.classList.add('board-letter')
         div.style.left = words[i].start[0] * Game.squareSize + 'px'
         div.style.top = words[i].start[1] * Game.squareSize + 'px'
         boardEl.append(div)

         break;
      }
   }
}