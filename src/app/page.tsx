import { Metadata } from 'next';
import React from 'react';
import { Chip, Accordion, AccordionItem, Avatar } from '@nextui-org/react';
import Wrap from '@/components/base/wrap';
import { NotificationIcon } from '@/components/Icons/NotificationIcon';
import CardList from '@/components/base/cardList';
import { dataLanding } from '@/mocksData/landing';

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
    const titleFirst = 'Лучшее приложение';
    const titleSecond = 'для назначения встреч';

    return (
        <Wrap>
            {!!titleFirst && (
                <Chip
                    color="primary"
                    variant="bordered"
                    size="lg"
                    className="block text-3xl mt-2 !ml-auto !mr-auto h-auto p-1.5"
                >
                    {titleFirst}
                </Chip>
            )}

            {!!titleSecond && (
                <Chip
                    endContent={<NotificationIcon size={18} />}
                    variant="flat"
                    color="secondary"
                    className="text-xl mt-2 !ml-auto h-auto p-2 relative left-2/4 -translate-x-2/4"
                >
                    {titleSecond}
                </Chip>
            )}

            <CardList dataLanding={dataLanding} />
        </Wrap>
    );
}
