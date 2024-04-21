import { Metadata } from 'next';
import Wrap from '@/components/base/wrap';

export const metadata: Metadata = {
    title: 'Авторизация',
    description: 'Страница авторизации',
};
export default function Authorization() {
    return (
        <Wrap>
            <h1>Авторизация</h1>
        </Wrap>
    );
}