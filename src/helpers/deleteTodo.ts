import { useMutation, useQueryClient } from "@tanstack/react-query";
import { baseAxios } from "../api/axios";
import { Todo } from "../dataType";


type DeleteTodoArgs = {
    id: number;
}

export const deleteTodo = async (arg: DeleteTodoArgs): Promise<Todo> => {
    try {
        const { data: deletedTodo } = await baseAxios.delete<Todo>(`/todos/${arg.id}`);
        return deletedTodo;
    } catch (error) {
        console.error("Error deleting todo:", error);
        throw error;
    }
}

export const useDeleteTodo = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: deleteTodo,
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({
                predicate(query) {
                    return query.queryKey[0] === "todos";
                },
            });
            alert("Todo удалено");
        },
    });

    console.log(mutation)

    return [mutation.mutateAsync, mutation] as const;
}