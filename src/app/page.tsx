"use client";

import {  useGetAllTodos } from "../../api";
import AddTask from "./components/AddTask";
import Todolist from './components/Todolist';




export default function Home() {


  const { data: tasks, isLoading, isError, error } = useGetAllTodos();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <main className="max-w-4xl mx-auto mt-4">
      <div className="text-center my-5 flex flex-col gap-4">
        <h1 className='text-2xl font-bold'>To Do List</h1>
        <AddTask/>
      </div>
      {tasks && <Todolist tasks={tasks} />  }
    </main>
  );
}






// export default async function Home() {
//   const  tasks = await getAllTodos();
 
//   return (
//     <main className="max-w-4xl mx-auto mt-4">
//       <div className="text-center my-5 flex flex-col gap-4">
//           <h1 className='text-2xl font-bold'>To Do List</h1>
//           <AddTask/>
//       </div>
//       <Todolist tasks={tasks}/>
//     </main>
//   )
// }
