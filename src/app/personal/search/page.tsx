import { Metadata } from 'next';
import Wrap from '@/components/base/wrap';

export const metadata: Metadata = {
    title: 'Личный кабинет поиск',
    description: 'Страница личный кабинета поиск',
};
export default function Page() {
    return (
        <Wrap>
            <h1>Страница поиска</h1>
        </Wrap>
    );
}
