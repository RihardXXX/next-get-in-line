import { Metadata } from 'next';
import {Button} from '@nextui-org/react';
import Wrap from '@/components/base/wrap';

// получение данных
// 1. На сервере с fetch
// 2. На сервере со сторонними библиотеками
// 3. На клиенте через обработчик маршрута Route Handlers
// 4. На клиенте со сторонними библиотеками .

// async function getData() {
//     const res = await fetch('https://api.example.com/...',
//         {
//          next: {
//                 revalidate: 3600, // время жизни кэша
//                 tags: ['collection'], // тег кеша
//             },
//         }
// cache: 'no-store', // отказ от кеша
//     )
//     // The return value is *not* serialized
//     // You can return Date, Map, Set, etc.
//
//     if (!res.ok) {
//         // This will activate the closest `error.js` Error Boundary
//         throw new Error('Failed to fetch data')
//     }
//
//     return res.json()
// }


export const metadata: Metadata = {
    title: 'Главная страница',
};

export default function Home() {
    return (
        <Wrap>
            <h1>Домашняя страница</h1>
            <Button color="primary">
                Button
            </Button>
        </Wrap>
    );
}
