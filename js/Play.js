let Game = {
   level: 1,
   eraser: 3,
   money: 1500,
   letters: ['a', 'd', 'a', 'm'],
   words: ['adam', 'dama', 'dam', 'ada'],
   words: [
      { word: 'dama', start: [7, 2], direction: 'y' },
      { word: 'adam', start: [7, 5], direction: 'x' },
      { word: 'dam', start: [10, 2], direction: 'y' },
   ],
   isPenDown: false,
   penArr: [],
   penIdArr: [],


}

function buildInput() {
   let parentEl = document.querySelector('.letters')
   let degree = 360 / Game.letters.length;
   for (let i = 0; i < Game.letters.length; i++) {
      let finalDegree = i * degree;

      let btn = document.createElement('button')
      btn.innerText = Game.letters[i]
      btn.addEventListener('mousedown', mouseDown)
      btn.addEventListener('mousemove', mouseMove)
      btn.addEventListener('mouseup', mouseUp)
      btn.classList.add('letter')
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
}
buildInput()


function mouseDown(e) { Game.isPenDown = true }
function mouseUp(e) {
   Game.isPenDown = false; document.querySelectorAll('.letters .letter').forEach(b => { b.style.backgroundColor = '' });
   let word = '';
   for (let i = 0; i < Game.penArr.length; i++) {
      word += Game.penArr[i];
   }
   Game.penArr = []
   Game.penIdArr = [];
   console.log(word)
   for (let i = 0; i < Game.words.length; i++) {
      if (Game.words[i].word == word) {
         console.log('You found it')
         showWord(Game.words[i])
         break;
      }
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
      e.target.style.backgroundColor = "purple"
   }

}



function print(obj) {
   const { word, start, direction } = obj;
   const size = 60
   const parentEl = document.querySelector('.g');
   for (let i = 0; i < word.length; i++) {
      let div = document.createElement('div')
      div.innerText = word[i]
      div.style.left = start[0] * size + 'px'
      div.style.top = start[1] * size + 'px'
      parentEl.append(div)
      if (direction == 'x') {
         start[0]++
      }
      else if (direction == 'y') {
         start[1]++
      }
   }
}

function buildGrid() {
   const parentEl = document.querySelector('.g')
   const size = 60
   for (let i = 0; i < Game.words.length; i++) {
      const obj = JSON.parse(JSON.stringify(Game.words[i]))
      let { word, start, direction } = obj

      for (let j = 0; j < word.length; j++) {
         console.log(start, Game.words[i].start)
         let div = document.createElement('div')
         div.classList.add('empty')
         div.style.left = start[0] * size + 'px'
         div.style.top = start[1] * size + 'px'
         parentEl.append(div)
         if (direction == 'x') {
            start[0]++
         }
         else if (direction == 'y') {
            start[1]++
         }
      }
   }

}

function showWord(obj_) {
   const parentEl = document.querySelector('.g')
   const size = 60
   let obj = JSON.parse(JSON.stringify(obj_))
   let { start, direction, word } = obj;
   for (let j = 0; j < word.length; j++) {

      let div = document.createElement('div')
      div.innerText = word[j]
      div.classList.add('show')
      div.style.left = start[0] * size + 'px'

      div.style.top = start[1] * size + 'px'
      parentEl.append(div)
      if (direction == 'x') {
         start[0]++
      }
      else if (direction == 'y') {
         start[1]++
      }
   }
}


buildGrid()

// Game.words.forEach(a => print(a))