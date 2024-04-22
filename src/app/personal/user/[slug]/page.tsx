
import Wrap from '@/components/base/wrap';

export default function UserDetail({ params }: { params: { slug: string } }) {
    // если статической генерации приложения заранее хотим генерировать маршруты
    // const posts = await fetch('https://.../posts').then((res) => res.json())
    //
    // return posts.map((post) => ({
    //     slug: post.slug,
    // }))

    return (
        <Wrap>
            <h1>Пользователь детальная</h1>
            <div>slug: {params.slug}</div>
        </Wrap>
    );
}