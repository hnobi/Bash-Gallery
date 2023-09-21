import { NextResponse } from "next/server";
import openai from "@/opeani";
export async function POST(request:Request) {
const {todos}=await request.json();
console.log(todos)    
//communicate with open ai 

const response=await openai.createChatCompletion({
model:"gpt-3.5-turbo",
temperature:0.8,
n:1,
stream:false,
message:[
    {
        role:"system",
        content:`When responding,welcome the user always as Mr Bashir and say welcomt to bash-gallery Todo App
        Limit the response to 200 characters`
    },
    {
        role:"user",
        content:`Hi there,provide a summary of the following images as todos.Count how many todos are in each category
        such as To do,in progress and done,then tell the user to have a productive day!heres the data:${JSON.
            stringify(
                todos
                )}` ,
    },
]
});
const {data}=response;


return NextResponse.json(data.choices[0].message);
}