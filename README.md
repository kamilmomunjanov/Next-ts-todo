# Тестовое задание Boomerang СРОК ДО 28 ФЕВРАЛЯ 2024 11:00

## Сделайте Todo List

Сделайте Todo List c использованием next.js, react-query, tailwind, typescript

Главные задачи:

- На главном экране можно сделать что угодно
- Стилизовать чтобы было красиво 🤩
- Стили писать только через `tailwind`
- Список TODO на странице `/todo`
- Cоздание TODO на странице `/todo/create`
- Детализация TODO на странице `/todo/[id]`
- Обновление TODO на странице `/todo/update/[id]`
- Удаление TODO в детализации

Рекомендации

- Не использовать готовые библиотеки с компонентами (кроме [shadcn/ui](https://ui.shadcn.com/))
- Показывать уведомления при создании, изменении, удалении todo
  Можно использовать [sonner](https://ui.shadcn.com/docs/components/sonner)

## Запуск REST API сервера

В отдельном терминале пропишите следующую комманду которая запустит локальный сервер по ссылке [http//:localhost:4000](http//:localhost:4000)

```bash
npm run server
```

- GET `http//:localhost:4000/todos` - Список Todo
- POST `http//:localhost:4000/todos` - Создание Todo
- GET `http//:localhost:4000/todos/1` - Todo с id 1
- DELTE `http//:localhost:4000/todos/1` - удалить Todo с id 1
- PATCH `http//:localhost:4000/todos/1` - обновить Todo с id 1

## React-Query

- [Официальная документация](https://tanstack.com/query/latest/docs/framework/react/overview)
- [Видеоурок на русском](https://www.youtube.com/watch?v=wLYCgE-g-Ek)

Ничего страшного если не знаете как пользоватся react-query.
Ниже есть подробные примеры

### Примеры

- настройка `axios`

```ts
import axios from "axios";

export const api = axios.create({
  baseURL: process.env.API_URL, // Берём из .env файла
});
```

- Типы

```ts
export type Book = {
  id: number;
  title: string;
  // ...
};
```

- Запрос

```ts
export type FetchBookByIdFilter = {
  id: number;
};

export const fetchBookById = async (filters: FetchBookByIdFilter) => {
  const { data } = await api.get<Book>(`/books/${filters.id}`);
  return data;
};
```

- Кастомный хук для `GET` запросов

```ts
const useFetchBookById = async (filters: FetchBookByIdFilter) => {
  const query = useQuery({
    queryFn: fetchBookById(filters),
    queryKey: ["books", filters],
  });

  return [query.data ?? null, query] as const;
};
```

- Кастомный хук для `POST`, `PATCH`, `DELETE` запросов

```ts
export const deleteBook = async () => {
  // ...
};

export const useDeleteBook = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteBook,
    onSuccess: (data, varables) => {
      // queryClient.invalidateQueries({ queryKey: ['books'] });
      // queryClient.invalidateQueries({
      //   queryKey: ['books', {id: varables.id}]
      // });
      // Или
      queryClient.invalidateQueries({
        predicate(query) {
          return query.queryKey[0] === "books";
        },
      });
    },
  });

  return [mutation.mutate, mutation] as const;
};
```

- Использование хуков

```ts
const [books] = useFetchTodos();
const [books] = useFetchBookById({ id: bookId });
const [deleteBook] = useDeleteBook();

const onDelete = () => {
  deleteBook({ id: bookId });
};
```

<!-- This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details. -->
