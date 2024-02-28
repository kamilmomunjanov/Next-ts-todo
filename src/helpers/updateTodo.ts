import { useMutation, useQueryClient } from "@tanstack/react-query";
import { baseAxios } from "../api/axios";
import { Todo } from "../dataType";


type UpdateTodoArgs = {
    id: number;
    title: string;
    completed: boolean;
}

export const updateTodo = async (arg: UpdateTodoArgs): Promise<Todo> => {
    try {
        const { data: updatedTodo } = await baseAxios.put<Todo>(
            `/todos/${arg.id}`,
            {
                title: arg.title,
                completed: arg.completed,
            }
        )
        return updatedTodo;
    } catch (error) {
        console.error("Error deleting todo:", error);
        throw error;
    }
}

export const useUpdateTodo = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: updateTodo,
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({
                predicate(query) {
                    return query.queryKey[0] === "todos";
                },
            });
            alert("Todo изменено");
        },
    });

    console.log(mutation)

    return [mutation.mutate, mutation] as const;
}