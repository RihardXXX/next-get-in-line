import { Metadata } from 'next';
import Wrap from '@/components/base/wrap';

export const metadata: Metadata = {
    title: 'Главная страница',
};

export default function Home() {
    return (
        <Wrap>
            <h1>Домашняя страница</h1>
        </Wrap>
    );
}
