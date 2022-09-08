///// Variables /////

const ramenMenu = document.getElementById('ramen-menu')
const ramenDetails = document.getElementById('ramen-detail')
const image = document.querySelector('img.detail-image')
const ramenName = document.querySelector('h2.name')
const restName = document.querySelector('h3.restaurant')
const rating = document.getElementById('rating-display')
const comment = document.getElementById('comment-display')

const createForm = document.getElementById('new-ramen')
const nameInput = document.getElementById('new-name')
const restInput = document.getElementById('new-restaurant')
const imageInput = document.getElementById('new-image')
const ratingInput = document.getElementById('new-rating')
const commentInput = document.getElementById('new-comment')

const ratingForm = document.getElementById('edit-ramen')
const updateRatingInput = document.getElementById('update-rating')
const updateCommentInput = document.getElementById('update-comment')

///// Functions /////

document.addEventListener('DOMContentLoaded', event => {
  fetchRamen()
  createRamen()
})

function fetchRamen() {
  fetch(' http://localhost:3000/ramens')
  .then(resp => resp.json())
  .then(ramens => {
    getRamen(ramens)
    loadFirstRamen(ramens)
  })
}

function getRamen(ramens) {
  ramens.forEach(ramen => {
    const img = document.createElement('img')
    img.setAttribute('src', ramen.image)
    ramenMenu.append(img)
    clickRamen(ramen, img)
  })
}

function clickRamen(ramen, img) {
  img.addEventListener('click', event => {
    image.src = ramen.image
    ramenName.textContent = ramen.name
    restName.textContent = ramen.restaurant
    rating.textContent = ramen.rating
    comment.textContent = ramen.comment
  })
}

function createRamen() {
  createForm.addEventListener('submit', event => {
    event.preventDefault()
    fetch('http://localhost:3000/ramens', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
          "name": nameInput.value,
          "restaurant": restInput.value,
          "image": imageInput.value,
          "rating": parseInt(ratingInput.value),
          "comment": commentInput.value
      })
    })
    .then(resp => resp.json())
    .then(newRamen => {
      const newImg = document.createElement('img')
      newImg.setAttribute('src', newRamen.image)
      ramenMenu.append(newImg)
      clickRamen(newRamen, newImg)
    })
    createForm.reset()
  })
}

function loadFirstRamen(ramens) {
  image.src = ramens[0].image
  ramenName.textContent = ramens[0].name
  restName.textContent = ramens[0].restaurant
  rating.textContent = ramens[0].rating
  comment.textContent = ramens[0].comment
  //editRamen(ramens[0])
}

// function editRamen(ramen) {
//   console.log(ramen)
//   ratingForm.addEventListener('submit', event => {
//     event.preventDefault()
//     fetch(`http://localhost:3000/ramens/${ramen.id}`, {
//       method: 'PATCH',
//       headers: {
//         'Content-Type': 'application/json',
//         Accept: 'application/json'
//       },
//       body: JSON.stringify({
//         'rating': parseInt(updateRatingInput.value),
//         'comment': updateCommentInput.value
//       })
//     })
//     .then(resp => resp.json())
//     .then(newRating => createRamen(newRating))
//   })
// }




