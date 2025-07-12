const input = document.querySelector(".todos-input")
const toDosList = document.querySelector(".todos-list")
const errorMsg = document.querySelector(".error-msg")

const storage = localStorage.getItem("toDos")
let toDos = storage ? JSON.parse(storage) : []

input.addEventListener("change", function () { // don't use arrow functions if you are to use `this` inside the function block as it will lead to Window global object instead of the input
  if (!(this.value).trim()) {
    errorMsg.style.visibility = "visible"
    return;
  } else {
    errorMsg.style.visibility = "hidden"
  }

  toDos.unshift({ value: this.value, isDone: false }) // use Array.unshift to add item (todo) at beginning of array, hence recently created to-dos will appear topmost
  localStorage.setItem("toDos", JSON.stringify(toDos))

  const newToDoElement = createToDoElement(this)
  appendToDo(newToDoElement)

  this.value = "" //use formElem.reset() if using <form>
})

document.addEventListener("DOMContentLoaded", function () {
  if (toDos.length < 1) return;
  toDos
    .reverse()
    .forEach(toDo => {
      const toDoElement = createToDoElement(toDo)
      appendToDo(toDoElement)
    });
})

function removeToDo(text) {
  const updatedToDos = toDos.filter(toDo => toDo.value !== text)
  toDos = updatedToDos // 1. updated the local array

  localStorage.setItem("toDos", JSON.stringify(updatedToDos)) // 2. update the localStorage (for persistence in case of reload later)

  toDosList.querySelector(`[data-text="${text}"]`).remove() // 3. update the DOM
}

function appendToDo(toDoElement) {
  const firstChild = toDosList.firstChild
  if (firstChild) {
    toDosList.insertBefore(toDoElement, firstChild)
  } else {
    toDosList.appendChild(toDoElement)
  }
}

function createToDoElement({ value, isDone }) {
  const newToDo = document.createElement("li")
  newToDo.dataset.text = value
  newToDo.classList.add("todos-item", "lato-bold")

  const checkbox = document.createElement("input")
  checkbox.type = "checkbox"
  checkbox.id = value
  checkbox.checked = isDone
  checkbox.addEventListener("change", function () {
    if (this.checked) {
      this.parentElement.style.textDecoration = "line-through"
    } else {
      this.parentElement.style.textDecoration = "none"
    }

    const toDo = toDos.find(t => t.value === value)
    toDo.isDone = !toDo.isDone
    localStorage.setItem("toDos", JSON.stringify(toDos))
  })

  const label = document.createElement("label")
  label.textContent = value
  label.htmlFor = value
  label.style.textDecoration = isDone ? "line-through" : "none"

  const checkBoxLabelGroup = document.createElement("span")
  checkBoxLabelGroup.append(checkbox, label)

  const cross = document.createElement("span")
  cross.textContent = "×"
  cross.classList.add("cross")
  cross.addEventListener("click", function () {
    removeToDo(this.parentElement.dataset.text)
  })

  newToDo.append(checkBoxLabelGroup, cross)
  return newToDo
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    createToDoElement,
    appendToDo,
    removeToDo
  }
}