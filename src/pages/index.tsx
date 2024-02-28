import Link from 'next/link';
import { Inter } from "next/font/google";
import Vanta from '@/src/vanta/Vanta';
import React from "react";
import { Todo as TodoType } from "@/src/dataType";
import ItemTodo from "@/src/pages/todo/ItemTodo";



const inter = Inter({ subsets: ["latin"] });

export default function Home() {

    return (
        <div className="relative">
            <Vanta />
            <div className="container h-screen mx-auto flex flex-col justify-center items-center p-8 text-center relative z-10">
                <h1 className="text-5xl font-extrabold mb-8 text-indigo-700">Home Page</h1>
                <ul className="mt-4">
                    <li className="mb-2">
                        <Link href="/todo">
                            <h2 className="text-3xl font-semibold text-blue-700 hover:underline">TODO List</h2>
                        </Link>
                    </li>
                    <li className="mb-2">
                        <Link href="/todo/create">
                            <h2 className="text-3xl font-semibold text-blue-700 hover:underline">Create TODO</h2>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>

    );
}
