import { create } from "zustand";
import { getTodosGroupedByColumn } from "@/lib/getTodosGroupedByColumn";
import { databases,storage } from "@/appwrite";

interface BoardState {
  board: Board;
  getBoard: () => void;
  setBoardState: (board: Board) => void;
  updateTodoInDB: (todo: Todo, columnId: TypedColumn) => void;
  newTaskInput: string;
  newTaskType:TypedColumn;

  searchString: string;
  setSearchString: (searchString: string) => void;
  deleteTask: (taskIndex: number, todoId: Todo, id: TypedColumn) => void;
  setNewtaskInput: (input:string)=>void
  setNewTaskType:(columnId:TypedColumn)=>void
}

export const useBoardStore = create<BoardState>((set,get) => ({
  board:{
    columns:new Map<TypedColumn,Column>()
  },
  searchString:"",
  newTaskInput:"",
  newTaskType:"todo",
  setSearchString:(searchString)=>set({searchString}),
  getBoard:async()=>{
   const board=await getTodosGroupedByColumn()
   set({board})
  },
  setBoardState:(board)=>set({board}),
  
  deleteTask:async(taskIndex:number,todo:Todo,id:TypedColumn)=>{
    const newColumns=new Map(get().board.columns)
    // delete todoId from newCOlumns
    newColumns.get(id)?.todos.splice(taskIndex,1)

    set({board:{columns:newColumns}})
    if(todo.image){
      await storage.deleteFile(todo.image.bucketId,todo.image.fileId)
    }

    await databases.deleteDocument(process.env.NEXT_PUBLIC_DATABASE_ID!,process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,todo.$id);

  },
setNewtaskInput:(input:string)=>set({newTaskInput:input}), 
setNewTaskType:(columnId:TypedColumn)=>set({newTaskType:columnId}),
 updateTodoInDB:async(todo,columnId)=>{
  await databases.updateDocument(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
    todo.$id,
    {
      title:todo.title,
      status:columnId
    }
  )
 }
}));