/ function setLetters() {
//    let vowelCount = 0;
//    let vowelArr = [];
//    let vowelArr_ = [];
//    let consonantCount = 0;
//    let consonantArr = [];


//    while (vowelCount < Game.settings.vowelCount) {
//       let vowel = data.alphabet.vowel.random();
//       let result = true;
//       for (let i = 0; i < vowelArr.length; i++) {
//          if (vowelArr[i][0] = vowel) {
//             if (vowelArr[i][1] > 2) {
//                result = false
//             } else {
//                vowelArr[i][1]++
//             }
//             break;
//          }
//       }
//       if (result) {

//       }

//    }



//    while (vowelCount < Game.settings.vowelCount) {
//       let vowel = data.alphabet.vowel.random();
//       let hasSame = false;
//       for (let i = 0; i < vowelArr.length; i++) {
//          if (vowelArr[i][0] == vowel) {
//             hasSame = true
//             break
//          }
//       }
//       if (!hasSame) {
//          vowelArr.push(vowel)
//          vowelCount++
//       }
//    }
//    while (consonantCount < Game.settings.consonantCount) {
//       let consonant = data.alphabet.consonant.random();
//       let hasSame = false;
//       for (let i = 0; i < consonantArr.length; i++) {
//          if (consonantArr[i] == consonant) {
//             hasSame = true
//             break
//          }
//       }
//       if (!hasSame) {
//          consonantArr.push(consonant)
//          consonantCount++
//       }
//    }

//    Game.letters = [...vowelArr, ...consonantArr]



// }