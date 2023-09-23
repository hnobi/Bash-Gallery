interface Board{
    columns:Map<TypedColumn,Column>;
}

type TypedColumn="todo"|"inprogress"|"done"

interface Column {
    id:TypedColumn;
    todos:Todo[];
}

interface Todo {
    $id:string;
    $createdAt:string;
    title:string;
    status:TypedColumn;
    image:Image;
    // u can change the logic of whether some can have images here with image?
}

interface Image{
bucketId:string;
fileId:string;
}