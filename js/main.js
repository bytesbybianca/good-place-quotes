// when user clicks on 'get random quote', run function to set fetch url parameter to random
document.querySelector('button').addEventListener('click', getRandomURL)

// when user clicks on character square, run function to set fetch url parameter character name
let square = document.querySelectorAll('.square')
square.forEach(character => character.addEventListener('click', function () {
  getCharacter(character.className.split(' ')[1]) // character name retrieved from class name
}))

// runs fetch function by character clicked
function getCharacter(characterChosen) {
  getFetch(`character/${characterChosen}`)
  console.log(`character/${characterChosen}`)
}

// runs fetch function by random parameter
function getRandomURL() {
  getFetch(`random`)
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
    // selecting by character data object with character array 
    if(data.length) {
      dataFetched = data[charRandomIndex]
    // selecting random returns a singly array
    } else {
      dataFetched = data
    }

    // display quote and character name in DOM
    document.querySelector('.quote').innerText = `"${dataFetched.quote}"`
    document.querySelector('.characterName').innerText = `-${dataFetched.character}`

// read to slide image up
// https://stackoverflow.com/questions/36316862/how-to-get-a-div-to-slide-up-from-the-bottom-of-the-page-using-css
    // // set background image
    // let bgImageUrl = data.image
    // document.querySelector('body').style.backgroundImage = `url('${bgImageUrl}')`
    

      document.querySelector('.characterMain > img').src = 
      dataFetched.character === 'Eleanor' ? `/img/eleanor1.png` :
      dataFetched.character === 'Chidi' ? `/img/chidi1.png` : 
      dataFetched.character === 'Tahani' ? `/img/tahani1.png` :
      dataFetched.character === 'Michael' ? `/img/michael1.png` : 
      dataFetched.character === 'Janet' ? `/img/janet1.png` : 
      dataFetched.character === 'Jason' ? `/img/jason2.png` :
      dataFetched.character === 'Pillboi' ? `/img/pillboi1.png` : 
      dataFetched.character === 'Derek' ? `/img/derek1.png` : ''


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