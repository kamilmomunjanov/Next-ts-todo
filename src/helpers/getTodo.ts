import { useQuery } from "@tanstack/react-query";
import { baseAxios } from "../api/axios";
import { Todo } from "../dataType";

export const getTodos = async (): Promise<Todo[]> => {
    const { data: todos } = await baseAxios.get<Todo[]>('/todos');
    return todos;
}

export const useGetTodos = () => {
    const { isPending, error, data } = useQuery({
        queryFn: () => getTodos(),
        queryKey: ['todos'],
    });


    return [data || [], isPending, error ] as const;
}