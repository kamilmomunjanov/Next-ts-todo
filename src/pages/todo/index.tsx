import React from 'react';
import { Todo } from "../../dataType";
import { getTodos, useGetTodos } from "@/src/helpers/getTodo";
import ItemTodo from "@/src/pages/todo/ItemTodo";
import Vanta from "@/src/vanta/Vanta";
import Link from "next/link";
import { GetServerSideProps } from 'next';

interface Props {
    todos: Todo[]
}

const TodoPage = ({ todos }: Props) => {

    const [data, { isLoading, error }] = useGetTodos(todos);

    if (isLoading) return <div className="text-center mt-4">Loading...</div>;

    if (error) return <div className="text-center mt-4">An error has occurred: {error.message}</div>;

    return (
        <div className="relative">
            <Vanta />
            <div className="h-screen flex justify-center  relative z-10">
                <ul className="flex item-center space-x-4 ">
                    <li>
                        <Link href={`/`} className="text-blue-500 hover:underline relative z-20">Главная страница</Link>
                    </li>
                    <li>
                        <Link href={`/todo/create`} className="text-blue-500 hover:underline relative z-20">Создать todo</Link>
                    </li>
                </ul>
                <ul className="absolute z-10  max-w-screen-xl mx-auto w-full">
                    {data && data.length > 0 ? <h1 className="text-3xl font-bold text-center mt-6 mb-2">Все задачи</h1>
                        : <p className="text-3xl font-bold text-center mt-6 mb-8">Задач нет</p>
                    }

                    {data.map((todo) => (
                        <li key={todo.id}
                            className="py-4 mb-4 flex justify-center  border rounded-lg bg-blue-300 max-w-2xl mx-auto">
                            <div className="text-center p-4 whitespace-nowrap">
                                <h2 className="text-2xl font-bold mb-2">{todo.title}</h2>
                                <ItemTodo data={todo} />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TodoPage;


export const getServerSideProps: GetServerSideProps<Props, {}> = async (ctx) => {

    const data = await getTodos();

    return {
        props: {
            todos: data,
        },
    }
}