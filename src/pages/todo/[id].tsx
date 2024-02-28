import { useState } from 'react';
import { useFetchTodoById } from "@/src/helpers/getTodoId";
import Vanta from "@/src/vanta/Vanta";
import Link from "next/link";
import { useDeleteTodo } from "@/src/helpers/deleteTodo";
import { useRouter } from 'next/router';

const TodoDetailPage = () => {
    const [deleteTodo] = useDeleteTodo();
    const [isDeleted, setIsDeleted] = useState(false);
    const router = useRouter()
    const { id } = router.query;

    const todo = useFetchTodoById(id);
    console.log(todo);

    const handleDeleteTodo = async () => {
        await deleteTodo({ id: todo[0].id });
        setIsDeleted(true);
    };

    return (
        <div className="relative">
            <Vanta/>
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
                {isDeleted ? (
                    <h2 className="flex justify-center items-center text-3xl font-bold text-center m-8">
                        Здесь пусто, нет задач
                    </h2>
                ) : (
                    <div className="mb-4 p-8 border rounded-md cursor-pointer bg-blue-300">
                        <h2 className={`text-2xl font-semibold ${todo[0]?.completed ? 'line-through' : ''}`}>
                            {todo[0]?.id && (
                                <span className="text-gray-500 cursor-pointer">Номер todo {todo[0].id} -</span>
                            )}
                            {todo[0]?.title}
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
                )}
            </div>
        </div>
    );
};

export default TodoDetailPage;