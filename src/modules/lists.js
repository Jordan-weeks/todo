import { renderTasks } from "./tasks"
import { task } from "./tasks"
const listContainer = document.querySelector(".lists-container")
const listForm = document.querySelector(".new-list-form")
const listFormInput = document.querySelector("[data-new-list-input]")
const deleteList = document.querySelector("[data-delete-list")
const editForm = document.querySelector(".edit-list-form")
const editListFormInput = document.querySelector("[data-edit-list-input]")

const newTaskform = document.querySelector("[data-new-task-form]")
const openNewList = document.querySelector("[data-open-add-list]")
const openEditList = document.querySelector("[data-open-edit-list]")


const LOCAL_STORAGE_LIST_KEY = "task.lists"
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = "task.selectedListID"
export let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY)
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || []

openNewList.addEventListener("click", () =>{
    listForm.classList.remove("hide")
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

listContainer.addEventListener("click", e =>{
    if (e.target.tagName.toLowerCase() === "li"){
        selectedListId = e.target.dataset.listId
        // e.target.classList.add("active-list") 
        saveLists() 
        RenderLists()
    }    
})

newTaskform.addEventListener("submit", e =>{
    e.preventDefault()
    let taskName = document.querySelector("[data-task-name]").value
    let description = document.querySelector("[data-task-description]").value
    let dueDate = document.querySelector("[data-due-date]").value
    let priority = document.querySelector("[data-priority]").value
    let newTask = new task(taskName,priority,description,dueDate)
    lists.forEach(list =>{
        if(list.id === selectedListId){
            list.tasks.push(newTask)
        }
    })
    saveLists()
    RenderLists()
})
deleteList.addEventListener("click", () => {
    lists = lists.filter(li => li.id !== selectedListId)
    saveLists()
    selectedListId = null
    RenderLists()
    renderTasks()
    
    })
const saveLists = () =>{
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY,JSON.stringify(lists))
    localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY,selectedListId)
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
            renderTasks(li)
            
        }
        listContainer.appendChild(listElement)
        
    })
}
class list {
    constructor(name,id){
        this.name = name
        this.id = Date.now().toString()
        if(id){
            this.id = id
        }
       
        this.tasks = []
        lists.push(this)
        
    }
    addTask(){
        new task ("this is a new task")
    }
}
export {RenderLists, clearElement}
// localStorage.clear();