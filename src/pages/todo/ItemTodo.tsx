import {useDeleteTodo} from "@/src/helpers/deleteTodo";
import {Todo} from "../../dataType";
import {useRouter} from 'next/router';
import Vanta from "@/src/vanta/Vanta";
import React from "react";
import Link from "next/link";


type Props = {
    data: Todo;
}

const TodoItem = ({data}: Props) => {
    const [deleteTodo] = useDeleteTodo();
    const router = useRouter();

    const onRouter = () => {
        router.push(`/todo/${data.id}`);
        console.log("Click")
    }


    return (
            <div className="mb-4 p-4 border rounded-md cursor-pointer ">
                <h2 onClick={onRouter}
                    className={`text-xl font-semibold ${data.completed ? 'line-through' : ''}`}>
                    <span className="text-gray-500">Номер задачи {data.id} -</span> {data.title}
                    {/*<button*/}
                    {/*    // onClick={(e) => {*/}
                    {/*    //     e.stopPropagation()*/}
                    {/*    //     deleteTodo({id: data.id})*/}
                    {/*    // }}*/}
                    {/*    className="ml-2 p-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"*/}
                    {/*>*/}
                    {/*    x*/}
                    {/*</button>*/}
                </h2>
                <ul className="flex space-x-4">
                    <li>
                        <Link href={`/todo/${data.id}`} className="text-blue-500 hover:underline relative z-20">Детализация todo</Link>
                    </li>
                    <li>
                        <Link href={`/todo/update/${data.id}`} className="text-blue-500 hover:underline relative z-20">Обновление todo</Link>
                    </li>
                </ul>
            </div>
    )
}

export default TodoItem