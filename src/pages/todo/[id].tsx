import { useState } from 'react';
import { useFetchTodoById } from "@/src/helpers/getTodoId";
import Vanta from "@/src/vanta/Vanta";
import Link from "next/link";
import { useDeleteTodo } from "@/src/helpers/deleteTodo";
import { useRouter } from 'next/router';
import { useParams } from 'next/navigation';

const TodoDetailPage = () => {
    const [deleteTodo] = useDeleteTodo();
    const router = useRouter()
    const params = useParams<{ id: string }>()

    const [todo] = useFetchTodoById(params.id);
    console.log(todo);

    const handleDeleteTodo = async () => {
        if (!todo) return;

        await deleteTodo({ id: todo.id });
        router.push('/todo');
    };

    return (
        <div className="relative">
            <Vanta />
            <div className="flex flex-col justify-center items-center mt-4 h-screen relative z-10">
                <ul className="flex item-center space-x-4 ">
                    <li>
                        <Link href={`/`} className="text-blue-500 hover:underline relative z-20">Главная страница</Link>
                    </li>
                    <li>
                        <Link href={`/todo/create`} className="text-blue-500 hover:underline relative z-20">Создать todo</Link>
                    </li>
                    <li>
                        <Link href={`/todo`} className="text-blue-500 hover:underline relative z-20">Список todo</Link>
                    </li>
                </ul>
                <div className="mb-4 p-8 border rounded-md cursor-pointer bg-blue-300">
                    <h2 className={`text-2xl font-semibold ${todo?.completed ? 'line-through' : ''}`}>
                        {todo?.id && (
                            <span className="text-gray-500 cursor-pointer">Номер todo {todo.id} -</span>
                        )}
                        {todo?.title}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteTodo();
                            }}
                            className="ml-2 p-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                        >
                            х
                        </button>
                    </h2>
                </div>
            </div>
        </div>
    );
};

export default TodoDetailPage;