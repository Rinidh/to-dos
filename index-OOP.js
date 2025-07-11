const input = document.querySelector(".todos-input")
const toDosList = document.querySelector(".todos-list")
let toDosArray = []

class ToDo {
  constructor(text, parentElement) {
    this.value = text
    this.isDone = false
    this.parentElement = parentElement
  }

  toHTML() {
    return (
      `<li class="todos-item lato-bold" data-text="${this.value}">   
        <span>
          <input type="checkbox" id="${this.value}">
          <label htmlFor="${this.value}">${this.value}</label>
        </span>
        <span class="cross">×</span>
      </li>`)
  }

  insertAsChild() {
    // this.parentElement.innerHTML = this.toHTML() + this.parentElement.innerHTML // blowing away the whole DOM made the previously attached event-listeners to lost and only the most recently inserted item would have the event-listener
    const temporaryDiv = document.createElement("div")
    temporaryDiv.innerHTML = this.toHTML()
    const toDoElement = temporaryDiv.firstElementChild // use a temporary div into which we assign the raw text-html, then get the actual DOM-Element-Node object of the to-do created by `.firstElementChild`
    const firstChild = this.parentElement.firstChild
    this.parentElement.insertBefore(toDoElement, firstChild)

    this.addDeleteListener()
  }

  delete() {
    const toDoElem = document.querySelector(`[data-text="${this.value}"]`)
    if (toDoElem) {
      console.log(toDoElem)
      toDoElem.remove() // prototype meth in Element to make a DOM element node remove itself from the tree
      const updatedToDos = toDosArray.filter(toDo => toDo.value !== this.value)
      toDosArray = updatedToDos
      localStorage.setItem("toDos", JSON.stringify(toDosArray))
    }
  }

  addDeleteListener() {
    const toDoElement = this.parentElement.querySelector(`[data-text="${this.value}"]`)
    toDoElement.addEventListener("click", (e) => {
      if (e.target.className !== "cross") return;
      this.delete()
    })
  }
}

// creating new to-do upon user input
input.addEventListener("change", function () { // don't use arrow functions if you are to use `this` inside the function block as it will lead to Window global object instead of the input
  if (!(this.value).trim()) return

  const newToDo = new ToDo(this.value, toDosList)
  toDosArray.unshift(newToDo) // use Array.unshift to add item (todo) at beginning of array, hence recently created to-dos will appear topmost
  localStorage.setItem("toDos", JSON.stringify(toDosArray))

  newToDo.insertAsChild()
  this.value = ""
})

// reload previous to-dos upon reload
document.addEventListener("DOMContentLoaded", function () {
  const storage = localStorage.getItem("toDos")
  const plainToDoObjs = JSON.parse(storage) // if json-parsed from raw string data stored in localStorage, the parsed objects have only the instance methods eg .value, .isDone and doesn't contain prototype methods eg .toHTML()
  if (plainToDoObjs.length < 1) return;

  if (plainToDoObjs.length && plainToDoObjs.length > 0) {
    plainToDoObjs
      .reverse() // parsed to-do objects from localStorage are in chronological order when they were added to toDos array. Use .reverse() for reverse-chronological order ie most recent appears first
      .forEach(raw => {
        const toDo = new ToDo(raw.value, toDosList)
        toDosArray.unshift(toDo)
        toDo.insertAsChild()
      });
  }
})
