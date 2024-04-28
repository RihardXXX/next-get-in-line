'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {Divider} from '@nextui-org/react';
import classNames from 'classnames';

export function FooterNav() {

    // активный путь
    const pathname = usePathname();

    const linkClass = (linkName: string, currentPath: string) => classNames([
        'link',
        {'text-indigo-700': linkName === currentPath}
    ]);

    return (
        <footer  className="absolute bottom-0 w-full bg-zinc-900">
            <Divider className="bg-slate-900 h-0.5" />
            <nav className="pl-2 pr-2">
                <ul className="flex justify-between items-center h-20 text-xl font-bold gap-0 text-slate-300">
                    <li className="text-center">
                        <Link className={linkClass('/', pathname)} href="/">
                            главная
                        </Link>
                    </li>
                    <li className="text-center">
                        <Link className={linkClass('/registration', pathname)} href="/registration">
                            регистрация
                        </Link>
                    </li>
                    <li className="text-center">
                        <Link className={linkClass('/authorization', pathname)} href="/authorization">
                            авторизация
                        </Link>
                    </li>
                </ul>
            </nav>
        </footer>
    );

}