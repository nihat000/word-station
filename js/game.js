const btnGenerate = document.getElementById('btn-generate')


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
   words: ['online', 'chemistry', 'revision', 'aids'],
   direction: 'x',
   maxX: 20,
   maxY: 20,
   x: 2,
   y: 2,
}


btnGenerate.addEventListener('click', btnGenerateClick)

function btnGenerateClick() {
   const loadingBar = document.getElementById('loading-bar')
   let startPoint = 0;
   const timeInterval = Math.floor(10 + Math.random() * 5)
   const timerID = setInterval(() => {
      if (startPoint >= 100) {
         loadingBar.style.width = "100%"
         clearInterval(timerID)
      }
      startPoint += (3)
      loadingBar.style.width = startPoint + "%"
   }, timeInterval)
}




Array.prototype.random = function () {
   return this[Math.floor(Math.random() * this.length)]
}
String.prototype.random = function () {
   return this[Math.floor(Math.random() * this.length)]
}

function createGrid() {

   for (let i = 1; i <= 40; i++) {
      for (let j = 1; j <= 40; j++) {
         let el = document.createElement('div')
         el.classList = `a-${j}-${i} game-board-el`
         document.querySelector('.game-board').append(el)
      }
   }


}
function changeDirection() {
   direction = direction == 'x' ? 'y' : 'x';
}

function moveD(step) {
   if (direction == 'x') {
      x += step
   } else if (direction == 'y') {
      y += step
   }
}




function print(w, wi) {
   for (let i = 0; i < w.length; i++) {
      let span = document.createElement('span')
      span.innerText = w[i]
      let el = document.querySelector(`.a-${x}-${y}`)
      if (el.childElementCount == 0) {
         el.classList.add(`bg-${wi + 1}`)
         el.append(span)
      }

      if (direction == 'x' && i < w.length - 1) {
         x++;
      } else if (direction == 'y' && i < w.length - 1) {
         y++;
      }
   }
   console.log(`Printed ${w}`)
}

// createGrid();



function printAll() {
   print(words[0], 0)
   for (let i = 1; i < words.length; i++) {
      let count = 0;
      while (true) {
         // let letter = words[i - 1].random();
         let letter = words[i - 1][words[i - 1].length - 1 - count]
         let firstOffset = words[i - 1].indexOf(letter) + 1 - words[i - 1].length  // negative
         let commonLetterIndex = words[i].indexOf(letter)
         // console.log(`firstOffset ${firstOffset}  commonLetterIndex ${commonLetterIndex} , x= ${x} y=${y}  `);
         if (commonLetterIndex > -1) {

            moveD(firstOffset)
            changeDirection()
            moveD(-commonLetterIndex)
            print(words[i], i)
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



const inputEl = document.querySelector('.generator-head-search input')
inputEl.addEventListener('keydown', keydown)

function keydown(e) {
   console.log(e.key)
   if (e.key == ' ') {
      console.log('debug');
      let span = document.createElement('span')
      span.innerText = e.target.value;
      e.target.value = ""
      span.classList.add('added-word')
      document.querySelector('.generator-head-search').append(span)

   }
}

