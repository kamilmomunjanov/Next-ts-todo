import { useQuery } from "@tanstack/react-query";
import { baseAxios } from "../api/axios";
import { Todo } from "../dataType";

type ArgsId = {
    id: string;
}

export const getTodoId = async (arg: ArgsId): Promise<Todo> => {
    const { data: todo } = await baseAxios.get<Todo>(`/todos/${arg.id}`);
    return todo;
}

export const useFetchTodoById = (id: string) => {
    const query = useQuery({
        queryFn: () => {
            if (id !== undefined) {
                return getTodoId({ id });
            } else {
                return Promise.resolve(null);
            }
        },
        queryKey: ['todos', id],

    });

    return [query.data ?? null, query] as const;
}