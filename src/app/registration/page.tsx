'use client';
import { Input, Chip, Button } from '@nextui-org/react';
import { FaEye } from 'react-icons/fa';
import { IoEyeOffSharp } from 'react-icons/io5';
import Wrap from '@/components/base/wrap';
import { useState } from 'react';

export default function Registration() {
    const [isVisiblePassword, setIsVisiblePassword] = useState(false);

    const toggleVisibility = () => setIsVisiblePassword(!isVisiblePassword);

    // name, email, phone, password, btn
    return (
        <Wrap>
            <div className="flex justify-center items-center h-20 bg-zinc-900">
                <h1 className="text-2xl font-bold !text-slate-300">
                    Регистрация
                </h1>
            </div>

            <Chip className="mt-2 ml-2" color="primary">
                Поля со звездочкой обязательны
            </Chip>

            <form action="" className="w-full pl-2 pr-2 mt-4">
                <Input
                    isDisabled={false}
                    label="* имя"
                    className="w-full"
                    size="lg"
                    color="danger"
                />

                <Input
                    isDisabled={false}
                    type="email"
                    label="* почта"
                    className="w-full mt-4"
                    size="lg"
                    color="success"
                />

                <Input
                    isDisabled={false}
                    type="number"
                    label="телефон"
                    className="w-full mt-4"
                    size="lg"
                />

                <Input
                    isDisabled={false}
                    type={isVisiblePassword ? 'text' : 'password'}
                    label="* пароль"
                    className="w-full mt-4"
                    size="lg"
                    endContent={
                        <button
                            className="focus:outline-none h-full"
                            type="button"
                            onClick={toggleVisibility}
                        >
                            {isVisiblePassword ? (
                                <FaEye className="text-2xl text-default-400 pointer-events-none" />
                            ) : (
                                <IoEyeOffSharp className="text-2xl text-default-400 pointer-events-none" />
                            )}
                        </button>
                    }
                />

                <Button
                    className="block mt-6 w-full h-16 bg-zinc-900 font-bold !text-slate-300"
                    size="lg"
                    isLoading={false}
                >
                    Регистрация
                </Button>
            </form>
        </Wrap>
    );
}
