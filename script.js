const form = document.querySelector("#new-item-form")
const input = document.querySelector("#todo-input")
const list = document.querySelector("#list")

let todos = []

// Load existing tasks on startup
const localValue = localStorage.getItem("ITEMS")
if (localValue != null) {
  try {
    todos = JSON.parse(localValue)
    todos.forEach(renderTodo)
  } catch (e) {
    console.error("Error reading local storage items:", e)
    todos = []
  }
}

// Save tasks to local storage
function saveTodos() {
  localStorage.setItem("ITEMS", JSON.stringify(todos))
}

// Form submission to add new todo
form.addEventListener("submit", (e) => {
  e.preventDefault()

  const title = input.value.trim()
  if (title === "") return

  const newTodo = {
    id: crypto.randomUUID(),
    title: title,
    completed: false,
  }

  todos.push(newTodo)
  renderTodo(newTodo)
  saveTodos()

  input.value = ""
})

// Create and append todo elements to DOM
function renderTodo(todo) {
  const li = document.createElement("li")
  
  const label = document.createElement("label")
  const checkbox = document.createElement("input")
  checkbox.type = "checkbox"
  checkbox.checked = todo.completed
  
  checkbox.addEventListener("change", () => {
    todo.completed = checkbox.checked
    saveTodos()
  })

  const span = document.createElement("span")
  span.innerText = todo.title

  label.appendChild(checkbox)
  label.appendChild(span)

  const button = document.createElement("button")
  button.innerText = "Delete"
  button.classList.add("btn", "btn-danger")
  
  button.addEventListener("click", () => {
    li.remove()
    todos = todos.filter((t) => t.id !== todo.id)
    saveTodos()
  })

  li.appendChild(label)
  li.appendChild(button)
  list.appendChild(li)
}
