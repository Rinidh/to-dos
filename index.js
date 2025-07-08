const input = document.querySelector(".todos-input")
const toDosList = document.querySelector(".todos-list")

const storage = localStorage.getItem("toDos")
const toDos = storage ? JSON.parse(storage) : []

input.addEventListener("change", function () { // don't use arrow functions if you are to use `this` inside the function block as it will lead to Window global object instead of the input
  if (!this.value) return

  toDos.unshift({ value: this.value, isDone: false }) // use Array.unshift to add item (todo) at beginning of array, hence recently created to-dos will appear topmost
  localStorage.setItem("toDos", JSON.stringify(toDos))

  const newToDo = toDoHTML(this.value)
  toDosList.innerHTML = newToDo + toDosList.innerHTML

  this.value = ""
})

document.addEventListener("DOMContentLoaded", function () {
  if (toDos.length < 1) return;

  const toDosHTML = toDos.map(toDo => toDoHTML(toDo.value))
  toDosList.innerHTML = toDosHTML.join("")
})

function toDoHTML(text) {
  return `<li class="todos-item lato-bold">
            <span>
              <input type="checkbox" id="${text}">
              <label htmlFor="${text}">${text}</label>
            </span>
            <span class="cross">×</span>
          </li>`
}


