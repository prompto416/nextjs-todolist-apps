import { getAllTodos } from "../../api";
import AddTask from "./components/AddTask";
import Todolist from './components/Todolist';

export default async function Home() {
  const  tasks = await getAllTodos();
  console.log(tasks,"mytask");
  return (
    <main className="max-w-4xl mx-auto mt-4">
      <div className="text-center my-5 flex flex-col gap-4">
          <h1 className='text-2xl font-bold'>To Do List</h1>
          <AddTask/>
      </div>
      <Todolist/>
    </main>
  )
}
