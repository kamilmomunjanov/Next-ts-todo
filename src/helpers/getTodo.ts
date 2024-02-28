import { useQuery } from "@tanstack/react-query";
import { baseAxios } from "../api/axios";
import { Todo } from "../dataType";

export const getTodos = async (): Promise<Todo[]> => {
    const { data: todos } = await baseAxios.get<Todo[]>('/todos');
    return todos;
}

export const useGetTodos = (defaultData?: Todo[]) => {
    const query = useQuery({
        queryFn: () => getTodos(),
        queryKey: ['todos'],
        initialData: defaultData
    });

    return [query.data ?? [], query] as const;
}