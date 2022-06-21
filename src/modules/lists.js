import { v4 as uuid } from "uuid"
const listContainer = document.querySelector(".lists-container")
const listForm = document.querySelector(".new-list-form")
const listFormInput = document.querySelector("[data-new-list-input]")
const deleteList = document.querySelector("[data-delete-list")
const editForm = document.querySelector(".edit-list-form")
const editListFormInput = document.querySelector("[data-edit-list-input]")
const closeListsFormsButton = document.querySelector("[data-close-lists")

const newTaskform = document.querySelector("[data-new-task-form]")
const openNewList = document.querySelector("[data-open-add-list]")
const openEditList = document.querySelector("[data-open-edit-list]")


const LOCAL_STORAGE_LIST_KEY = "task.lists"
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = "task.selectedListID"
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY)
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || []
let selectedList = lists.find(list =>list.id === selectedListId)

openNewList.addEventListener("click", () =>{
    // listForm.classList.toggle("hide")
    // editForm.classList.toggle("hide")
    // closeListsForms()
    listForm.classList.toggle("hide")
    
})
openEditList.addEventListener("click", () =>{
    // closeListsForms()
    if(selectedListId === null) return    
    editForm.classList.toggle("hide")
    let foundList = lists.find(li => li.id ===selectedListId)
    editListFormInput.value = foundList.name
})

listForm.addEventListener("submit", e =>{
    e.preventDefault()
    if (listFormInput.value == null || listFormInput.value === ""){
        return
    }
    new list (`${listFormInput.value}`)
    saveLists()
    RenderLists()
    listFormInput.value = null
    listForm.classList.add("hide")
})
editForm.addEventListener("submit", e =>{
    e.preventDefault()
    if (editListFormInput.value == null || editListFormInput.value === ""){
        return
    }
    let foundList = lists.find(li => li.id ===selectedListId)
    foundList.name = editListFormInput.value
    saveLists()
    RenderLists()
    editListFormInput.value = null
    editForm.classList.add("hide")
})

listContainer.addEventListener("click", e =>{
    if (e.target.tagName.toLowerCase() === "li"){
        selectedListId = e.target.dataset.listId
        // e.target.classList.add("active-list") 
        saveLists() 
        RenderLists()
        renderTasks()
    }    
})

deleteList.addEventListener("click", () => {
    lists = lists.filter(li => li.id !== selectedListId)
    saveLists()
    selectedListId = null
    RenderLists()
    renderTasks()
    
    })
const closeListsForms = () =>{
    listForm.classList.add("hide")
    editForm.classList.add("hide")
}
closeListsFormsButton.addEventListener("click", () => closeListsForms())

const saveLists = () =>{
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY,JSON.stringify(lists))
    localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY,selectedListId)
    selectedList = lists.find(list =>list.id === selectedListId)
}
const clearElement = (element) => {
    while (element.firstChild){
        element.removeChild(element.firstChild)
        }
}

const RenderLists = () => {
    clearElement(listContainer)
    lists.forEach(li =>{
        const listElement= document.createElement("li")
        listElement.classList.add("list-item")
        listElement.dataset.listId=li.id
        listElement.innerText = li.name
        if (li.id === selectedListId){
            listElement.classList.add("active-list")
                       
        }
        listContainer.appendChild(listElement)
        
    })
}
class list {
    constructor(name){
        this.name = name
        this.id = uuid()       
        this.tasks = []
        lists.push(this)        
    }
    
}
const todoContainer = document.querySelector(".todo-container")
const tasksContainer = document.querySelector(".tasks-container")
const OpenNewTask = document.querySelector("[data-open-add-task]")


class task {
    constructor(taskName,priority,description,dueDate){
    this.taskName = taskName
    
    if(priority){
        this.priority = priority
    }
    this.description = description
    this.dueDate = dueDate
    this.id = uuid()
    }
}

OpenNewTask.addEventListener("click", () => {
    newTaskform.classList.toggle("hide")    
})
newTaskform.addEventListener("submit", e =>{
    e.preventDefault()
    createTask()
    saveLists()
    renderTasks()
    clearTaskForm()
})
const createTask = () =>{
    let taskName = document.querySelector("[data-task-name]").value
    let description = document.querySelector("[data-task-description]").value
    let dueDate = document.querySelector("[data-due-date]").value
    let priority = document.querySelector("[data-priority]").value
    let newTask = new task (taskName,priority,description,dueDate)
    selectedList.tasks.push(newTask)
}
const clearTaskForm = () =>{
    let taskName = document.querySelector("[data-task-name]")
    let description = document.querySelector("[data-task-description]")
    let dueDate = document.querySelector("[data-due-date]")
    let priority = document.querySelector("[data-priority]")
    taskName.value = null
    description.value = null
    dueDate.value = null
    priority.selectedIndex = "0"
    newTaskform.classList.add("hide")
}
const createTaskElement = (task) =>{
    let taskCard = document.createElement("div")
    let titleDiv = document.createElement("div")
    let informationDiv = document.createElement("div")
    let iconDiv = document.createElement("div")
    let taskName = document.createElement("h3")
    let description = document.createElement("p")
    let dueDate = document.createElement("p")
    let priority = document.createElement("p")
    let trashIcon = document.createElement("i")
    let circleIcon = document.createElement("i")
    let expandIcon = document.createElement("i")
    trashIcon.classList.add("fa-solid","fa-trash-can","trash-icon")
    trashIcon.addEventListener("click", () => deleteTask(task.id))
    circleIcon.addEventListener("click", () => completeTask(task.id, circleIcon))
    circleIcon.classList.add("fa-regular", "fa-circle")
    expandIcon.classList.add("fa-solid", "fa-angles-down")
    expandIcon.addEventListener("click", () => expandTask(expandIcon,informationDiv))
    taskCard.id = task.id
    taskName.innerText = task.taskName
    description.innerText = task.description
    dueDate.innerText = `Due by: ${task.dueDate}`
    priority.innerText = `Priority: ${task.priority.toUpperCase()}`
    titleDiv.append(taskName,expandIcon)
    titleDiv.classList.add("task-title")
    informationDiv.append(description,dueDate,priority)
    informationDiv.classList.add("hide")
    iconDiv.append(circleIcon,trashIcon)
    taskCard.append(titleDiv,informationDiv,iconDiv)
    tasksContainer.append(taskCard)
    taskCard.classList.add("task-item")
}
const renderTasks = () => { 
    clearElement(tasksContainer)    
    if (selectedListId=== null) {
        todoContainer.classList.add("hide")
        return
    }        
    todoContainer.classList.remove("hide")
    let h1 = document.createElement("h1")
    h1.innerText = selectedList.name
    tasksContainer.append(h1)
    selectedList.tasks.forEach(task => {
        let element = createTaskElement(task)
        
    })
}
const expandTask =(icon, informationDiv) =>{
    informationDiv.classList.toggle("hide")
    icon.classList.toggle("fa-angles-down")
    icon.classList.toggle("fa-angles-up")

    console.log("task expanded")

}

const completeTask = (target, icon) => {
    let parentElement = document.getElementById(`${target}`)
    if(parentElement.classList.contains("task-complete")){
        parentElement.classList.remove("task-complete")
        icon.classList.toggle("fa-circle")
        icon.classList.toggle("fa-circle-check")
        return
    }    
    parentElement.classList.add("task-complete")
    icon.classList.toggle("fa-circle-check")
    icon.classList.toggle("fa-circle")
}
// tasksContainer.addEventListener("click", e =>{
//     
//     }
//     if(e.target.tagName === "P" || e.target.tagName === "H3"){
//         e.target.parentElement.classList.add("task-complete")
               
//     }    
// })
const deleteTask = (target) =>{
    selectedList.tasks = selectedList.tasks.filter(task => task.id !== target)
    saveLists()
    renderTasks()
}



export {RenderLists,renderTasks}
// localStorage.clear();