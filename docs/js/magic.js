const bodyEl = document.getElementById('bodyEl')
const brandEl = document.getElementById('brand')
const carousel = document.querySelector(".carousel")
const arrowIcons = document.querySelectorAll(".wrapper i")
const firstDiv = carousel.querySelector("div")

function switchDarkLight(){
  bodyEl.classList.toggle('light-mode')
  bodyEl.classList.toggle('dark-mode')
  
}

let isDragging = false, isSliding = false, prevPageX, prevScrollLeft, positionDiff
let firstDivWidth = firstDiv.clientWidth

arrowIcons.forEach(icon => {
  icon.addEventListener("click", () => {
    if(icon.id == "right" && carousel.scrollLeft == carousel.scrollWidth - carousel.clientWidth) return carousel.scrollLeft = 0
    if(icon.id == "left" && carousel.scrollLeft == 0) return carousel.scrollLeft = carousel.scrollWidth - carousel.clientWidth
    carousel.scrollLeft += icon.id === "left" ? -firstDivWidth : firstDivWidth

    
  })
})

const autoSlide = () => {
  positionDiff = Math.abs(positionDiff)
  let valDifference = firstDivWidth - positionDiff

  if(carousel.scrollLeft > prevScrollLeft) return carousel.scrollLeft += positionDiff > firstDivWidth / 3 ? valDifference : -positionDiff
  carousel.scrollLeft -= positionDiff > firstDivWidth / 3 ? valDifference : -positionDiff
}

const dragToggle = () => {
  isDragging = !isDragging
}

const dragStart = (e) => {
  isDragging = true
  prevPageX = e.pageX || e.touches[0].pageX
  prevScrollLeft = carousel.scrollLeft
  carousel.classList.add("dragging")
}

const dragStop = () => {
  isDragging = false
  carousel.classList.remove("dragging")
  autoSlide()
}


const dragging = (e) => {
  if(!isDragging) return
  e.preventDefault()
  positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX
  carousel.scrollLeft = prevScrollLeft - positionDiff
  
  
}

carousel.addEventListener("mousedown", dragStart)
carousel.addEventListener("touchstart", dragStart)

carousel.addEventListener("mousemove", dragging)
carousel.addEventListener("touchmove", dragging)


document.addEventListener("mouseup", dragStop)
document.addEventListener("touchend", dragStop)
