import { useMutation, useQueryClient } from "@tanstack/react-query";
import { baseAxios } from "../api/axios";
import { Todo } from "../dataType";

type CreateTodoArgs = {
    data: {

    };
}

export const createTodo = async (arg: CreateTodoArgs): Promise<Todo> => {
    const { data: createdTodo } = await baseAxios.post<Todo>('/todos', arg.data);
    return createdTodo;
}

export const useCreateTodo = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: createTodo,
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({
                predicate(query) {
                    return query.queryKey[0] === "todos";
                },
            });
            alert("Todo создано");
        }
    });

    console.log(mutation)
        // ? alert("Todo создано") : alert("Todo не создано")

    return [mutation.mutate, mutation] as const;
}