// console.log('%c HI', 'color: firebrick')
const imagesUrl = "https://dog.ceo/api/breeds/image/random/4"
fetch(imagesUrl)
.then(result => {
  return result.json()
})
.then(json => {
  // json.message == Array of image urls
    let imagesArray = json.message
    displayImages(imagesArray)
  })
  
function displayImages(array){
  let dogImageDiv = document.getElementById('dog-image-container')
  let ulTag = document.createElement('ul')
  // We are going through the imagesArray
  for (imgUrl of array) {
    // imgUrl is the individual item in the array

    // We create an <li> tag
    let liTag = document.createElement('li')
    // liTag is the <li></li> we are going to
    // insert an <img> tag
    
    // We create the <img> tag
    let imgTag = document.createElement('img')

    // We insert the imgUrl inside the <img> tag
    imgTag.setAttribute('src', imgUrl)

    imgTag.style.width = "50%"

    // we take the <li> tag
    // and insert the <img> tag
    liTag.appendChild(imgTag)

    // with the <ul> tag we insert 
    // the <li> tag with the <img> tag
    ulTag.appendChild(liTag)

    // Now we add all that into the dog-iamge-container
    dogImageDiv.appendChild(liTag)
  }
}

const breedsUrl = 'https://dog.ceo/api/breeds/list/all'

// On page load:
// Fetch the data from breedsUrl
// Save them to a breeds Array
// Get the dog-breeds <ul> tag
// With a for loop iterate over the array
// Add <li></li> elements to the dog-breeds <ul> tag
// Insert each dog breed into each <li> tag


fetch(breedsUrl)
  .then(result => {
    return result.json()
  })
  .then(json => {
    let breedHash = json.message
    // console.log(json)
    getBreed(breedHash)
  })

function getBreed(hash) {
  let breedsArray = []
    
  for (key in hash){
    if (hash[key].length > 0) {
      let subBreeds = hash[key]
      for (index in subBreeds){
        let subBreed = capitalize(subBreeds[index])
        let mainBreed = capitalize(key)
        breedsArray.push(`${subBreed} ${mainBreed}`)
      }
    } else {
      breedsArray.push(capitalize(key))
    }
  }
  let breedsUl = document.getElementById('dog-breeds')
  for (index in breedsArray) {
    let newLi = document.createElement('li')
    newLi.innerText = breedsArray[index]
    breedsUl.appendChild(newLi)
    newLi.setAttribute('id', 'breed')
    newLi.addEventListener('click', function(event) {
      if (event.target.style.color) {
        event.target.style.color = ''
      } else {
        event.target.style.color = 'blue'
      }
    })
  }
}

function genCharArray(charA='A', charZ='Z') {
  var a = [], i = charA.charCodeAt(0), j = charZ.charCodeAt(0);
  for (; i <= j; ++i) {
      a.push(String.fromCharCode(i));
  }
  return a;
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function generateOptions() {
  let dropdown = document.getElementById('breed-dropdown')
  let alphabet = genCharArray()
  for (letter in alphabet) {
    let option = document.createElement('option')
    option.setAttribute('value', letter)
    option.innerText = alphabet[letter]
    dropdown.appendChild(option)
  }
}

window.addEventListener('load', function() {
  generateOptions()
})
