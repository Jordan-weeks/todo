import * as fromLists from "./lists"

const todoContaner = document.querySelector(".todo-container")
const tasksContainer = document.querySelector(".tasks-container")
// let selectedList = fromLists.lists.find(list => list.id === fromLists.selectedListId)

let tasks = [{
    taskName: "make app",
    dueDate: "6/24/22",
    priority: "high",
    description: "Build todo list app to progress further in the lessons",
    id: 1
    },
    {
    taskName: "add date features",
    dueDate: "6/24/22",
    priority: "high",
    description: "add date functions to app",
    id: 2
    }
]

const renderTasks = (li) => { 
    fromLists.clearElement(tasksContainer)
    if (fromLists.selectedListId=== null) {
        console.log("is null")
        return}
        
    const h1 = document.createElement("h1")
        // h1.innerText= "test list"
        tasksContainer.appendChild(h1)
        h1.innerText = `${li.name}`
    li.tasks.forEach(task =>{   
        console.log(task.name)    
        const element= document.createElement("li")
        element.classList.add("list-item")
        // element.dataset.taskId=task.id
        element.innerText = task.taskName
        // if (li.id === selectedListID){listElement.classList.add("active-list")}
        tasksContainer.appendChild(element)
        
    })
}

class task {
    constructor(taskName,priority,description,dueDate){
    this.taskName = taskName
    
    if(priority){
        this.priority = priority
    }
    this.description = description
    this.dueDate = dueDate
    this.id = Date.now().toString()
    }
}

export {renderTasks}
export {task}