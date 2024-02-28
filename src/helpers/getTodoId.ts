import { useQuery } from "@tanstack/react-query";
import { baseAxios } from "../api/axios";
import { Todo } from "../dataType";

type ArgsId = {
    id: number;
}

export const getTodoId = async (arg: ArgsId): Promise<Todo> => {
    const { data: todo } = await baseAxios.get<Todo>(`/todos/${arg.id}`);
    return todo;
}

export const useFetchTodoById = (id: number) => {
    const {data, isPending, error,  } = useQuery({
        queryFn: () => {
            if (id !== undefined) {
                return getTodoId({ id });
            } else {
                return Promise.resolve(null);
            }
        },
        queryKey: ['todos', id],
    });

    return [data || null] as const;
}