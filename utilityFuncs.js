function removeToDo(text, toDosArray, toDosListElement) {
  const updatedToDos = toDosArray.filter(toDo => toDo.value !== text)
  localStorage.setItem("toDos", JSON.stringify(updatedToDos))
  toDosListElement.querySelector(`[data-text="${text}"]`).remove()

  return updatedToDos
}


function appendToDo(toDoElement, toDosListElement) {
  const firstChild = toDosListElement.firstChild
  if (firstChild) {
    toDosListElement.insertBefore(toDoElement, firstChild)
  } else {
    toDosListElement.appendChild(toDoElement)
  }
}

export {
  appendToDo,
  removeToDo
}
