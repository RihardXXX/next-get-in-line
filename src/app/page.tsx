import { Metadata } from "next";
import { Button, Chip } from "@nextui-org/react";
import Wrap from "@/components/base/wrap";

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
    title: "Главная страница",
};

export default function Home() {
    const titleFirst = "Лучшее приложение";
    const titleSecond = "для назначения встреч";
    const description =
        "Вы перестанете опаздывать на встречи, а Ваш партнер будет рад, что вы пришли вовремя";

    const links = [
        {
            label: "1. Пройдите регистрацию или авторизуйтесь",
            icon: "i-heroicons-arrow-right-start-on-rectangle-16-solid",
            children: [
                {
                    label: "1.1. Если вы впервые в приложении то нажмите на кнопку регистрации внизу и пройдите регистрацию",
                },
                {
                    label: "1.2. Если вы уже зарегистрированы то нажмите на кнопку авторизация и авторизуйтесь",
                },
                {
                    label: "1.3. Обращаем Ваше внимания для сохранения и защиты ваших персональных данных, в приложении работает двухфакторная авторизация",
                },
            ],
        },
        {
            label: "2. Найдите пользователя в поиске или по QRCODE",
            icon: "i-heroicons-finger-print-20-solid",
            children: [
                {
                    label: "2.1. Перейдите в раздел поиска после регистрации",
                },
                {
                    label: "2.2. Найдите пользователя вводя имя или по QRCODE",
                },
                {
                    label: "2.3. Перейдите на его страницу",
                },
            ],
        },
        {
            label: "3. Выберите дату и время встречи",
            icon: "i-heroicons-clock",
            children: [
                {
                    label: "3.1. Выберите дату и время, в которое хотите явится к пользователю",
                },
                {
                    label: "3.2. Отправьте запрос на встречу",
                },
            ],
        },
        {
            label: "4. Дождитесь ответа",
            icon: "i-heroicons-pencil-square-solid",
            children: [
                {
                    label: "4.1. Проверьте статус встречи, одобрена ли она со стороны пользователя",
                },
            ],
        },
        {
            label: "5. Дождитесь ответа-одобрения от партнера",
            icon: "i-heroicons-hand-thumb-up",
            children: [
                {
                    label: "5.1. После одобрения встречи от партнера, можете смело идти на встречу",
                },
                {
                    label: "5.2. При встрече можете показать партнеру QRCODE встречи",
                },
            ],
        },
    ];

    return (
        <Wrap>
            {!!titleFirst && (
                <Chip
                    color="primary"
                    variant="bordered"
                    size="lg"
                    className="block text-2xl mt-2 !ml-auto !mr-auto h-auto"
                >
                    {titleFirst}
                </Chip>
            )}

            {!!titleSecond && (
                <Chip color="warning" variant="dot">
                    {titleSecond}
                </Chip>
            )}

            <h1>Домашняя страница</h1>
        </Wrap>
    );
}
