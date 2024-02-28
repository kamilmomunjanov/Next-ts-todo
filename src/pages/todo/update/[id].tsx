import {useRouter} from 'next/router';
import React, {useState, useEffect} from "react";
import Vanta from "@/src/vanta/Vanta";
import {useFetchTodoById} from "@/src/helpers/getTodoId";
import {useUpdateTodo} from "@/src/helpers/updateTodo";
import Link from "next/link";

type TodoFormValues = {
    title: string;
    completed: boolean;
    id:number
};

type Props = {
    onSubmit: (values: TodoFormValues) => void;
    defaultValues?: TodoFormValues;
};


const TodoUpdatePage = ({defaultValues}: Props) => {
    const [updateTodo] = useUpdateTodo()
    const router = useRouter();
    const {id} = router.query;
    const todo  = useFetchTodoById(id);
    const [updatedTitle, setUpdatedTitle] = useState(todo[0]?.title || "");
    const [values, setValues] = useState<TodoFormValues>(todo[0]);
    console.log(todo)

    useEffect(() => {
        setValues((prevValues) => ({
            ...prevValues,
            title: updatedTitle,
        }));
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type, checked } = event.target;

        setValues((prevValues) => ({
            ...prevValues,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        await updateTodo({ id: values.id, title: values.title, completed: values.completed });
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
                {values && id ? (
                    <div className="mb-4 p-8 border rounded-md cursor-pointer bg-blue-300">
                        <h2 className={`text-2xl font-semibold 
                    ${values.completed ? 'line-through' : ''}`}
                        >
                            <input
                                type="checkbox"
                                name="completed"
                                checked={values.completed}
                                onChange={(e) => handleChange(e)}
                                className="ml-2 mr-2 "
                            />
                            {todo[0]?.id && (
                                <span className="text-gray-500 cursor-pointer">Номер задачи {todo[0]?.id || values.id} -</span>
                            )}
                            <input
                                type="text"
                                name="title"
                                value={updatedTitle || values.title || todo[0]?.title}
                                onChange={(e) => {
                                    setUpdatedTitle(e.target.value)
                                    handleChange(e)
                                }}
                                placeholder="Title"
                                className={`mt-1 p-2 rounded-md bg-blue-300 outline-none focus:outline-none focus:border-none ${values.completed ? 'line-through' : ''}`}
                            />

                            <button
                                onClick={handleSubmit}
                                className="ml-2 p-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                            >
                                Сохранить
                            </button>
                        </h2>
                    </div>
                ) : (
                    <h2 className="flex justify-center items-center text-3xl font-bold text-center m-8">
                        Здесь пусто, нет задач
                    </h2>
                )}
            </div>
        </div>
    );
};

export default TodoUpdatePage;