import React, {useState} from 'react';
import {useCreateTodo} from "@/src/helpers/createTodo";
import {useRouter} from 'next/router';
import Vanta from "@/src/vanta/Vanta";
import Link from "next/link";

type TodoFormValues = {
    title: string;
    completed: boolean;
};

type Props = {
    onSubmit: (values: TodoFormValues) => void;
    defaultValues?: TodoFormValues;
};

const TodoForm = ({defaultValues}: Props) => {
    const [createTodo] = useCreateTodo();
    const router = useRouter();

    const [values, setValues] = useState<TodoFormValues>({
        title: '',
        completed: false,
        ...defaultValues,
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value, type, checked} = event.target;

        setValues((prevValues) => ({
            ...prevValues,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log(values);
        setValues(values)
        createTodo({data: values})
        setValues({title: '', completed: false});
    };

    return (
        <div className="relative">
            <Vanta/>
            <div className="flex flex-col items-center justify-center h-screen relative z-10">
                <ul className="flex space-x-4">
                    <li>
                        <Link href={`/`} className="text-blue-500 hover:underline relative z-20">Главная страница</Link>
                    </li>
                    <li>
                        <Link href={`/todo`} className="text-blue-500 hover:underline relative z-20">Список todo</Link>
                    </li>
                </ul>
                <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto p-6  bg-gray-300 shadow-md rounded-md">
                    <label className="block mb-2">
                        Title:
                        <input
                            type="text"
                            name="title"
                            value={values.title}
                            onChange={handleChange}
                            placeholder="Title"
                            className="w-full mt-1 p-2 border rounded-md"
                        />
                    </label>
                    <div className="mb-4">
                        <label className="flex items-center">
                            Completed:
                            <input
                                type="checkbox"
                                name="completed"
                                checked={values.completed}
                                onChange={handleChange}
                                className="ml-2"
                            />
                        </label>
                    </div>
                    <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-md">
                        Save
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TodoForm;