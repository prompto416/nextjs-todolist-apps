"use client";
import {AiOutlinePlus} from 'react-icons/ai'
import Modal from './Modal'
import { FormEventHandler, useState } from 'react';
import { addTodo } from '../../../api';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';


const AddTask = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newTaskValue, setNewTaskValue] = useState<string>('');

  const handleSubmitNewTask: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await addTodo({
      id: uuidv4(),
      text: newTaskValue
    })
    console.log(newTaskValue);
    setNewTaskValue('');
    setModalOpen(false);
    router.refresh()
  }

  const handleKeyPress: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === 'Enter') {
      handleSubmitNewTask(event as any); // Cast the event to any to avoid type error
    }
  };

  return (
    <div>
        <button onClick={()=> setModalOpen(true)} className="btn btn-primary text-white bg-blue-400 hover:bg-blue-700 w-full" >Add New Task 
        <AiOutlinePlus/>
        </button>
       
       <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form onSubmit={handleSubmitNewTask}>
          <h3 className='font-bold text-lg'> Add New Task</h3>
          <div className="modal-action">
          <input value= {newTaskValue}
          onChange={(e) => setNewTaskValue(e.target.value)}
          onKeyDown={handleKeyPress}
          type="text" 
          placeholder="Type here" 
          className="input input-bordered w-full " />
          <button type='submit' className="btn">Add Task</button>
          </div>
        </form>
       </Modal>
    </div>
  )
}

export default AddTask