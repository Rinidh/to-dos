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

  const newToDo = toDoHTML(this.value)
  toDosList.innerHTML = newToDo + toDosList.innerHTML
  addDeleteToDoListeners()

  this.value = ""
})

document.addEventListener("DOMContentLoaded", function () {
  if (toDos.length < 1) return;

  const toDosHTML = toDos.map(toDo => toDoHTML(toDo.value))
  toDosList.innerHTML = toDosHTML.join("")

  addDeleteToDoListeners()
})

function toDoHTML(text) {
  return (
    `<li class="todos-item lato-bold" data-text="${text}">
      <span>
        <input type="checkbox" id="${text}">
        <label htmlFor="${text}">${text}</label>
      </span>
      <span class="cross">×</span>
    </li>`)
}

function removeToDo(text) {
  const updatedToDos = toDos.filter(toDo => toDo.value !== text)
  console.log(updatedToDos)
  toDos = updatedToDos // 1. updated the local array
  localStorage.setItem("toDos", JSON.stringify(updatedToDos)) // 2. update the localStorage (for persistence in case of reload later)
  toDosList.innerHTML = updatedToDos.map(toDo => toDoHTML(toDo.value)).join("") // 3. update the DOM
  addDeleteToDoListeners()
}

function addDeleteToDoListeners() {
  const toDoItems = [...toDosList.querySelectorAll(".todos-item")]
  toDoItems.forEach(toDoItem => toDoItem.addEventListener("click", function (e) {
    if (e.target.className !== "cross") return
    removeToDo(toDoItem.dataset.text)
  }))
}


