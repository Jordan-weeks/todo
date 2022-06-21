// import * as fromLists from "./lists"

// const todoContainer = document.querySelector(".todo-container")
// const tasksContainer = document.querySelector(".tasks-container")
// const OpenNewTask = document.querySelector("[data-open-add-task]")
// const newTaskform = document.querySelector("[data-new-task-form]")
// // let selectedList = fromLists.lists.find(list => list.id === fromLists.selectedListId)

// class task {
//     constructor(taskName,priority,description,dueDate){
//     this.taskName = taskName
    
//     if(priority){
//         this.priority = priority
//     }
//     this.description = description
//     this.dueDate = dueDate
//     this.id = Date.now().toString()
//     }
// }

// OpenNewTask.addEventListener("click", () => {
//     newTaskform.classList.remove("hide")    
// })
// newTaskform.addEventListener("submit", e =>{
//     e.preventDefault()
//     console.log("task added")
// })

//     let taskName = document.querySelector("[data-task-name]").value
//     let description = document.querySelector("[data-task-description]").value
//     let dueDate = document.querySelector("[data-due-date]").value
//     let priority = document.querySelector("[data-priority]").value
//     let newTask = new task(taskName,priority,description,dueDate)
//     console.log(fromLists.lists)
//     //         if(list.id === selectedListId){
//     //             list.tasks.push(newTask)
//     //         }
//     //     })
//         // fromLists.saveLists()
//     //     RenderLists()
//     // })})

// const renderTasks = (li) => { 
//     fromLists.clearElement(tasksContainer)
//     if (fromLists.selectedListId=== null) {
//         console.log("is null")
//         todoContainer.classList.add("hide")
//         return}
//     todoContainer.classList.remove("hide")    
//     const h1 = document.createElement("h1")
//         // h1.innerText= "test list"
//         tasksContainer.appendChild(h1)
//         h1.innerText = `${li.name}`
//     li.tasks.forEach(task =>{   
//         console.log(task.name)    
//         const element= document.createElement("li")
//         element.classList.add("list-item")
//         // element.dataset.taskId=task.id
//         element.innerText = task.taskName
//         // if (li.id === selectedListID){listElement.classList.add("active-list")}
//         tasksContainer.appendChild(element)
        
//     })
// }



// export {renderTasks}
// export {task}