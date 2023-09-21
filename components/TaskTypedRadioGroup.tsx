'use client'

import { useBoardStore } from "@/store/BoardStore"

const types=[
    {
        id:"todo",
        name:"Todo",
        description:"A new Image to be added",
        color:"bg-red-500",
    },
    {
        id:"inprogress",
        name:"In Progress",
        description:"A task that is currently being worked on",
        color:"bg-yellow-500",
    },
    {
        id:"done",
        name:"Done",
        description:"A task that has been completed",
        color:"bg-green-500",
    },
]

function TaskTypedRadioGroup() {
    const[setNewTaskType,newtaskType]=useBoardStore((state)=>[
        state.setNewTaskType,
        state.newTaskType,
    ])
  return (
    <div>

    </div>
  )
}

export default TaskTypedRadioGroup