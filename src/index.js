import "./styles.css"
import { RenderLists,renderTasks } from "./modules/lists"



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

RenderLists()
renderTasks()
// localStorage.clear()
