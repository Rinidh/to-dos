const input = document.querySelector(".todos-input")
const toDosList = document.querySelector(".todos-list")

input.addEventListener("change", function () { // don't use arrow functions if you are to use `this` inside the function block as it will lead to Window global object instead of the input
  if (!this.value) return

  const newToDo = document.createElement("li")
  newToDo.textContent = this.value
  newToDo.classList.add("todos-item")

  toDosList.appendChild(newToDo)
  this.value = ""
})
