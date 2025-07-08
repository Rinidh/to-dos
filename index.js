const input = document.querySelector(".todos-input")
const toDosList = document.querySelector(".todos-list")

const storage = localStorage.getItem("toDos")
const toDos = storage ? JSON.parse(storage) : []
// DUMMY:
// [
//   {
//     "value": "krishna",
//     "isDone": false
//   },
//   {
//     "value": "radhe",
//     "isDone": false
//   }
// ]

input.addEventListener("change", function () { // don't use arrow functions if you are to use `this` inside the function block as it will lead to Window global object instead of the input
  if (!this.value) return

  toDos.push({ value: this.value, isDone: false })
  localStorage.setItem("toDos", JSON.stringify(toDos))

  const newToDo = `<li class="todos-item lato-bold"> <input type="checkbox" id="${this.value}"> <label htmlFor="${this.value}">${this.value}</label> </li>`
  toDosList.innerHTML = newToDo + toDosList.innerHTML

  this.value = ""
})

document.addEventListener("DOMContentLoaded", function () {
  if (toDos.length < 1) return;

  const toDosHTML = toDos.map(toDo => `<li class="todos-item lato-bold"> <input type="checkbox" id="${toDo.value}"> <label htmlFor="${toDo.value}">${toDo.value}</li>`)
  toDosList.innerHTML = toDosHTML.join("")
})


