// import formatTodosForAI from "./formatTodosForAI";
// const fetchSuggestion=async(board:Board)=>{
//     const todos=formatTodosForAI(board);
//     console.log('FORMATED TODOS to send>>', todos)
//     const res=await fetch("/api/generateSummary",{
//         method:"POST",
//         headers:{
//             "Content-Type":"application/json",
//         },
//         body:JSON.stringify({todos})
//     });

//     const GPTdata=await res.json();
//     const {content}=GPTdata

//     return content;
// }

// export default fetchSuggestion
import formatTodosForAI from "./formatTodosForAI";

const fetchSuggestion = async (board: Board) => {
  try {
    const todos = formatTodosForAI(board);

    const res = await fetch("api/generateSummary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ todos }),
    });

    if (!res.ok) {
      throw new Error(`Fetch error: ${res.status} ${res.statusText}`);
    }

    const GPTdata = await res.json();
    const { content } = GPTdata;

    return content;
  } catch (error) {
    // Handle the error here
    console.error("Error:", error);
    return null; // or throw an appropriate error or return a default value
  }
};

export default fetchSuggestion;

