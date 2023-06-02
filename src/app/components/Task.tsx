"use client";
import { FormEventHandler, useEffect, useState } from "react";
import { ITask } from "../../../types/tasks"
import {FiEdit, FiTrash2} from 'react-icons/fi'
import Modal from './Modal'
import {useRouter} from "next/navigation";
import { deleteTodo, editTodo } from "../../../api";

interface ITaskProps {
    task: ITask
}

const Task: React.FC<ITaskProps> = ({task}) => {
    const router = useRouter();
    const [isDone, setIsDone] = useState<boolean>(false);
    const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
    const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
    const [taskToEdit, setTaskToEdit] = useState<string>(task.text)
    const [taskClassName, setTaskClassName] = useState('w-full');
  
    const handleSubmitEditTodo : FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        await editTodo({
          id: task.id,
          text: taskToEdit
        })
        console.log(taskToEdit);
        setTaskToEdit('');
        setOpenModalEdit(false);
        router.refresh()
      }

    const handleDeleteTask = async (id:string) => {
        
        await deleteTodo(id);
        setOpenModalDelete(false);
        router.refresh()
    }

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        
        const isChecked = event.target.checked;
        setIsDone(isChecked);
        
     

        if (isChecked) {
          setTaskClassName('w-full text-crossed-out');
          setTimeout(() => {
            handleDeleteTask(task.id);
          }, 750);
        }
      };

      useEffect(() => {
        // Reset the class name when task or isDone changes
       
        setTaskClassName(isDone ? 'w-full text-crossed-out' : 'w-full');
        
    }, [task, isDone]);

    // const handleKeyPress: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    //     if (event.key === 'Enter') {
    //       handleSubmitEditTodo(event as any); // Cast the event to any to avoid type error
    //     }
    //   };

  return (
    <tr  key={task.id}>
    <td className={taskClassName}>{task.text}</td>
    <td className="flex gap-5">
        <FiEdit onClick={()=> setOpenModalEdit(true)
        } cursor='pointer' className="text-blue-500" size={20}/>
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
        <form onSubmit={handleSubmitEditTodo}>
          <h3 className='font-bold text-lg'> Edit Task</h3>
          <div className="modal-action">
          <input value= {taskToEdit}
          onChange={(e) => setTaskToEdit(e.target.value)}
        //   onKeyDown={handleKeyPress}
          type="text" 
          placeholder="Type here" 
          className="input input-bordered w-full " />
          <button type='submit' className="btn">Edit Task</button>
          </div>
        </form>
       </Modal>
       <FiTrash2 onClick={()=>{setOpenModalDelete(true)}} cursor='pointer'  className="text-red-500" size={21}/>
       <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDelete}>
       <h3 className="text-lg">Are you sure, you want to delete task?</h3>
       <div className="modal-action">
        <button onClick={()=> handleDeleteTask(task.id)}
        className="btn">Yes</button>
       </div>
       </Modal>

        <input 
        type="checkbox" 
        checked={isDone} 
        className="checkbox" 
        onChange={handleCheckboxChange}
        />
    </td>
  </tr>
  )
}

export default Task