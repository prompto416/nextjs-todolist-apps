import { useMutation, useQuery, useQueryClient } from 'react-query';
import { ITask } from './types/tasks';
import { getAllTodos, addTodo, editTodo, deleteTodo } from './api';

export const useTodos = () => {
    return useQuery<ITask[], Error>('todos', getAllTodos);
}

export const useAddTodo = () => {
    const queryClient = useQueryClient();

    return useMutation(addTodo, {
        onSuccess: () => {
            queryClient.invalidateQueries('todos');
        },
    });
}

export const useEditTodo = () => {
    const queryClient = useQueryClient();

    return useMutation(editTodo, {
        onSuccess: () => {
            queryClient.invalidateQueries('todos');
        },
    });
}

export const useDeleteTodo = () => {
    const queryClient = useQueryClient();

    return useMutation(deleteTodo, {
        onSuccess: () => {
            queryClient.invalidateQueries('todos');
        },
    });
}
