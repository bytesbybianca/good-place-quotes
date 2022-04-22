// when user clicks on 'get random quote', run function to set fetch url parameter to random
document.querySelector('button').addEventListener('click', getRandomURL)

// when user clicks on character square, run function to set fetch url parameter character name
let square = document.querySelectorAll('.square')
square.forEach(character => character.addEventListener('click', function () {
  getCharacter(character.className.split(' ')[1]) // character name retrieved from class name
}))

// in mobile, exit quote
document.querySelector('.exitQuote').addEventListener('click', mobileExitQuote)

function mobileExitQuote() {
    // quote display slides left/close
    document.querySelector('.quoteDisplay').classList.add('closeQuote');
    document.querySelector('.quote').classList.remove('fadeIn');
    document.querySelector('.characterName').classList.remove('fadeIn');
    // photo close
    document.querySelector('.characterMain img').classList.add('close');
}

// runs fetch function by character clicked
function getCharacter(characterChosen) {
  getFetch(`character/${characterChosen}`)
  console.log(`character/${characterChosen}`)
}

// runs fetch function by random parameter
function getRandomURL() {
  getFetch(`random`)
}

function quoteSlide() {
  // quote display slides left/close
  document.querySelector('.quoteDisplay').classList.add('closeQuote');
  document.querySelector('.quote').classList.remove('fadeIn');
  document.querySelector('.characterName').classList.remove('fadeIn');

  // delay quote box appearance to time with photo
  setTimeout(function() {
    document.querySelector('.quoteDisplay').classList.remove('closeQuote');
  }, 1000)
  // delay to allow quote box to appear before fading in quote text
  setTimeout(function() {
    document.querySelector('.quote').classList.add('fadeIn');
    document.querySelector('.characterName').classList.add('fadeIn');
  }, 1650)

}

// slide photo down
function photoSlideDown() {
  document.querySelector('.characterMain img').classList.add('close');
  // document.querySelector('.characterMain img').classList.add('hidden');
  // delay slide photo up to allow for photo change
  setTimeout(function() {
    document.querySelector('.characterMain img').classList.remove('close')
    document.querySelector('.characterMain img').classList.remove('hidden');
  }, 800)
}

// fetch function
function getFetch(urlEnding){
  let url = `https://good-place-quotes.herokuapp.com/api/${urlEnding}`

  fetch(url)
  .then(res => res.json()) // parse response as JSON
  .then(data => {
 
    // for random index within specified character's data object
    let charRandomIndex 
    console.log(charRandomIndex)
    function newNumber() {
      charRandomIndex = Math.round(Math.random()*(data.length-1))
    }

    newNumber()

    console.log(charRandomIndex)
    console.log(data)
    // console.log(data[r].character)

    let dataFetched
    // selecting by character data object with character array  (each character has more than one object)
    if(data.length) {
      dataFetched = data[charRandomIndex]
    // selecting random returns a single array
    } else {
      dataFetched = data
    }

    // delay on DOM display to allow for photo change
    setTimeout(function() {
      // display quote and character name in DOM
      document.querySelector('.quote').innerText = `"${dataFetched.quote}"`
      document.querySelector('.characterName').innerText = `-${dataFetched.character}`
    
      // display character main photo
      document.querySelector('.characterMain > img').src = 
      dataFetched.character === 'Eleanor' ? `img/main-eleanor.png` :
      dataFetched.character === 'Chidi' ? `img/main-chidi.png` : 
      dataFetched.character === 'Tahani' ? `img/main-tahani.png` :
      dataFetched.character === 'Michael' ? `img/main-michael.png` : 
      dataFetched.character === 'Janet' ? `img/main-janet.png` : 
      dataFetched.character === 'Jason' ? `img/main-jason.png` :
      dataFetched.character === 'Pillboi' ? `img/main-pillboi.png` : 
      dataFetched.character === 'Derek' ? `img/main-derek.png` : ''
      }, 600)
    
      console.log(data.length)
      console.log(data.index)

      // document.querySelector('charArrLEngt')

    // call slide photo down every time new character/quote is chosen
    photoSlideDown()
    // call to close quote every time new character/quote is chosen
    quoteSlide()


  })
  .catch(err => {
      console.log(`error ${err}`)
  });

}


// getFetch()

// finding unique characters within api
// function findUniqueCharacters() {
//   const url = `https://good-place-quotes.herokuapp.com/api/`

//   fetch(url)
//       .then(res => res.json()) // parse response as JSON
//       .then(data => {
//         console.log(data)

//         // Finding unique characters in data
//         let uniqueCharacters = []
//         data.map((characterCheck,i) => {
//           uniqueCharacters.includes(data[i].character) ? true : uniqueCharacters.push(data[i].character)
//           }
//         )
//         console.log(`These are unique characters ${uniqueCharacters}`)

    
        

//       })
//       .catch(err => {
//           console.log(`error ${err}`)
//       });
// }

// findUniqueCharacters()