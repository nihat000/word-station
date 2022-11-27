const btnGenerate = document.getElementById('btn-generate')
const inputEl = document.querySelector('.generator-head-box .words input')


btnGenerate.addEventListener('click', btnGenerateClick)
inputEl.addEventListener('keydown', inputKeydown)

const Game = {
   settings: {
      words: {
         min: 1,
         max: 10,
         default: ['online', 'chemistry', 'revision', 'aids'],
      },
      maxX: {
         min: 10,
         max: 30,
         default: 20,
      },
      maxY: {
         min: 10,
         max: 30,
         default: 20,
      },
      style: {
         border: "0 solid none",
         background: 'purple',
         color: "#fff",
      }
   },
   words: ['dama', 'adam',],
   direction: 'y',
   maxX: 20,
   maxY: 20,
   x: 2,
   y: 2,
}




function btnGenerateClick() {
   const loadingBar = document.getElementById('loading-bar')
   let startPoint = 1;
   const timeInterval = Math.floor(10 + Math.random() * 5)

   const timerID = setInterval(() => {
      if (startPoint + 3 >= 98) {
         loadingBar.style.width = "97.5%"
         generate();
         clearInterval(timerID)
      } else {
         startPoint += (2)
         loadingBar.style.width = startPoint + "%"

      }
   }, timeInterval)
}




Array.prototype.random = function () {
   return this[Math.floor(Math.random() * this.length)]
}
String.prototype.random = function () {
   return this[Math.floor(Math.random() * this.length)]
}

function createGrid() {
   const width = 900;

   const generatorBody = document.querySelector('.generator-body')
   generatorBody.innerHTML = ''
   generatorBody.style.width = width + 'px';
   for (let i = 1; i <= Game.maxY; i++) {
      for (let j = 1; j <= Game.maxX; j++) {
         let el = document.createElement('div')
         el.style.width = width / Game.maxX + 'px';
         el.style.height = width / Game.maxY + 'px';
         el.classList = `a-${j}-${i} `
         generatorBody.append(el)
      }

   }



}
function changeDirection() {
   Game.direction = Game.direction == 'x' ? 'y' : 'x';
}

function moveD(step) {
   if (Game.direction == 'x') {
      Game.x += step
   } else if (Game.direction == 'y') {
      Game.y += step
   }
}




function print(w, wi) {
   for (let i = 0; i < w.length; i++) {
      let el = document.createElement('span')
      el.innerText = w[i]
      let parentEl = document.querySelector(`.a-${Game.x}-${Game.y}`)
      if (parentEl) {
         break
      }
      if (parentEl.childElementCount == 0) {
         parentEl.classList.add('bg-purple')
         parentEl.classList.add('border-style-1')
         el.classList.add('text-white')
         parentEl.append(el)
      }

      if (Game.direction == 'x' && i < w.length - 1) {
         Game.x++;
      } else if (Game.direction == 'y' && i < w.length - 1) {
         Game.y++;
      }
   }
   console.log(`Printed ${w}`)
}


function printAll() {
   let safety = 0;
   print(Game.words[0], 0)
   for (let i = 1; i < Game.words.length; i++) {
      let count = 0;
      while (true) {
         safety++; if (safety > 1000) break;
         // let letter = Game.words[i - 1].random();
         let letter = Game.words[i - 1][Game.words[i - 1].length - 1 - count]
         let firstOffset = Game.words[i - 1].indexOf(letter) + 1 - Game.words[i - 1].length  // negative
         let commonLetterIndex = Game.words[i].indexOf(letter)
         // console.log(`firstOffset ${firstOffset}  commonLetterIndex ${commonLetterIndex} , x= ${x} y=${y}  `);
         if (commonLetterIndex > -1) {

            moveD(firstOffset)
            changeDirection()
            moveD(-commonLetterIndex)
            print(Game.words[i], i)
            break;
         }
         count++;

      }
   }
}


// function removeEmptyGrid() {
//    for (let i = 1; i <= 10; i++) {
//       let hasYElement = false;
//       let hasXElement = false
//       for (let j = 1; j <= 10; j++) {
//          console.log(`debug `);
//          if (document.querySelector(`.a-${j}-${i}`).childElementCount > 0) {
//             hasXElement = true
//          }
//          if (document.querySelector(`.a-${i}-${j}`).childElementCount > 0) {
//             hasYElement = true
//          }
//          console.log(`hasXelement hasYelement ${hasXElement} ${hasYElement}`);
//          if (!hasXElement && !hasYElement) {
//             break;
//          }
//          for (let k = 0; k < 10; k++) {
//             if (hasXElement) {
//                document.querySelector(`.a-${k}-${i}`).remove()
//             }
//             if (hasYElement) {
//                document.querySelector(`.a-i-${k}`).remove();
//             }
//          }
//       }


//    }

// }

// removeEmptyGrid()





function inputKeydown(e) {
   console.log(e.key)
   if (e.key == ' ') {
      console.log('debug');
      let span = document.createElement('span')
      span.innerText = e.target.value;
      document.querySelector('.generator-head-box .words .list').append(span)

   }
}


function generate() {
   const maxX = parseInt(document.querySelector('.generator-head-box .settings .g-x').value)
   const maxY = parseInt(document.querySelector('.generator-head-box .settings .g-y').value)

   Game.maxX = maxX > 30 || maxX < 10 ? 10 : maxX;
   Game.maxY = maxY > 30 || maxY < 10 ? 10 : maxY;

   createGrid()
   // print(Game.words[0])
   printAll();
}