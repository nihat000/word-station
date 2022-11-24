let data;
const Game = {
   settings: {
      getlettersCount: function () {
         this.vowelCount + this.consonantCount;
      },
      vowelCount: 3,
      consonantCount: 4,
      wordCount: 7
   },
   letters: [],
   words: []

}

fetch("../api/az.json")
   .then(res => res.json())
   .then(res => { data = res; main() })


Array.prototype.random = function () {
   return this[Math.floor(Math.random() * this.length)]
}


   /

   // function setWords() {
   //    while (Game.words.length <= Game.settings.wordCount) {
   //       let word = data.words.random()
   //       let checkWord = true
   //       let letters = Game.letters
   //       for (let i = 0; i < word.length; i++) {
   //          let checkLetter = false
   //          for (let j = 0; j < letters.length; j++) {
   //             if (word[i] == letters[j]) {
   //                checkLetter = true
   //                // letters.splice(j, 1)
   //                break
   //             }
   //          }
   //          if (!checkLetter) {
   //             checkWord = false
   //             break
   //          }
   //       }
   //       if (checkWord) {
   //          Game.words.push(word)
   //       } else {
   //          console.log("Still loading")
   //       }



   //    }
   // }




   function main() {
      setLetters()
      setWords();
   }


function setLetters() {
   let safety = 1;

   let vowelCount = 0;
   let vowelObj = {}

   let consonantCount = 0
   let consonantObj = {}


   while (vowelCount < Game.settings.vowelCount) {
      safety++; if (safety >= 10000) { console.log("Infinity loop"); break }
      let isExist = false;
      let vowel = data.alphabet.vowel.random();
      for (const key in vowelObj) {
         // console.log(key)
         if (key == vowel) {
            isExist = true
            break;
         }
      }
      // console.log(vowelObj, vowel)
      if (!isExist) {
         vowelObj[vowel] = 1
         vowelCount++
      } else {
         for (const key in vowelObj) {
            if (key == vowel) {
               if (vowelObj[key] <= 2) {
                  vowelObj[key]++
                  vowelCount++
                  break;
               }
            }
         }
      }
   }


   while (consonantCount < Game.settings.consonantCount) {
      safety++; if (safety >= 10000) { console.log("Infinity loop"); break }
      let isExist = false;
      let consonant = data.alphabet.consonant.random();
      for (const key in consonantObj) {
         // console.log(key)
         if (key == consonant) {
            isExist = true
            break;
         }
      }
      // console.log(consonantObj, consonant)
      if (!isExist) {
         consonantObj[consonant] = 1
         consonantCount++
      } else {
         for (const key in consonantObj) {
            if (key == consonant) {
               if (consonantObj[key] <= 2) {
                  consonantObj[key]++
                  consonantCount++
                  break;
               }
            }
         }
      }
   }


   let lettersObj = {
      ...consonantObj,
      ...vowelObj
   }

   for (const key in lettersObj) {
      for (let i = 1; i <= lettersObj[key]; i++) {
         Game.letters.push(key)
      }
   }



}


function setWords() {
   if (i)
}



