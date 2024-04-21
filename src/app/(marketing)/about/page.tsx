
// эта страница необходима для прямой маршрутизации в url только с новым макетом к примеру

import { Metadata } from 'next';
import Wrap from '@/components/base/wrap';

export const metadata: Metadata = {
    title: 'Личный кабинет главная',
    description: 'Страница личный кабинета главная',
};
export default function About() {
    return (
        <Wrap>
            <h1>О нас</h1>
        </Wrap>
    );
}