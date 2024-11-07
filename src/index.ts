import { v4 as uuidv4 } from "uuid";

type Task = { 
  id: string
  title: string
  completed: boolean
  createdAt: Date 
}

const list = document.querySelector<HTMLUListElement>("#list")
const form = document.querySelector<HTMLFormElement>("#new-task-form")
const input = document.querySelector<HTMLInputElement>("#new-task-title")
const tasks: Task[] = loadTasks()
tasks.forEach(addListItem)

form?.addEventListener("submit", e => {
  e.preventDefault()

  if (input?.value == "" || input?.value == null) return

  const newTask: Task = {
    id: uuidv4(),
    title: input.value,
    completed: false,
    createdAt: new Date(),
  }
  tasks.push(newTask)
  addListItem(newTask)
  saveTasks()
  input.value = ""
})

function addListItem(task: Task) {
  const item = document.createElement("li")
  const label = document.createElement("label")
  const checkbox = document.createElement("input")
  checkbox.checked = task.completed 
  checkbox.type = "checkbox"
  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked
    saveTasks()
  })
  label.append(checkbox, task.title)
  item.append(label)
  list?.append(item)
}

function saveTasks(){
  localStorage.setItem("TASKS", JSON.stringify(tasks))
}

function loadTasks(): Task[] {
  const taskJson = localStorage.getItem("TASKS")  // Consistent key name
  if(taskJson == null) return []
  const loadedTasks: Task[] = JSON.parse(taskJson)
  return loadedTasks.map(task => ({
    ...task,
    createdAt: new Date(task.createdAt)  // Convert to Date object
  }))
}