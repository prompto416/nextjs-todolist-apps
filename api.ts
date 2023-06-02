import { ITask } from "./types/tasks";
import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';

const baseUrl = 'http://localhost:3001';

//mockapi
// const baseUrl = 'https://647845ec362560649a2d7164.mockapi.io/api/v1/';

export const getAllTodos = async (): Promise<ITask[]> => {
    const { data } = await axios.get(`${baseUrl}/tasks`);
    return data;
}


export const addTodo = async(todo: ITask): Promise<ITask> => {
    const { data } = await axios.post(`${baseUrl}/tasks`, todo);
    return data;
}

export const editTodo = async(todo: ITask): Promise<ITask> => {
    const { data } = await axios.put(`${baseUrl}/tasks/${todo.id}`, todo);
    return data;
}

export const deleteTodo = async(id:string): Promise<void> => {
    await axios.delete(`${baseUrl}/tasks/${id}`);
}


//react query hooks 

export const useGetAllTodos = () => {
    return useQuery<ITask[], Error>('todos', getAllTodos);
  };



export const useDeleteTodo = () => {
    const queryClient = useQueryClient();
    return useMutation(deleteTodo, {
      onSuccess: () => {
        queryClient.invalidateQueries('todos');
      },
    });
};