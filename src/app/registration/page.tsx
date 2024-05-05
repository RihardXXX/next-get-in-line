'use client';
import { FormEvent } from 'react';
import { Input, Chip, Button } from '@nextui-org/react';
import { FaEye } from 'react-icons/fa';
import { IoEyeOffSharp } from 'react-icons/io5';
import {
    object,
    string,
    type InferType,
    ObjectSchema,
    ValidationError,
} from 'yup';
import Wrap from '@/components/base/wrap';
import { useState } from 'react';
import { authUrls } from '@/api/urls';

interface UserRegisterInterface {
    name: string;
    email: string;
    phone?: string;
    password: string;
}

type error = string | undefined;

export default function Registration() {
    const [isVisiblePassword, setIsVisiblePassword] = useState(false);
    const [disabledInput, setDisabledInput] = useState(false);
    const [errorsList, setErrorsList] = useState([] as Array<string>);
    const [errorsType, setErrorsType] = useState([] as Array<error>);

    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
    } as UserRegisterInterface);

    const inputHandler = async (
        e: FormEvent<HTMLInputElement>,
        key: string,
    ) => {
        const value = e.currentTarget.value.trim();
        setNewUser({ ...newUser, [key]: value });
    };

    const textRequired = (name: string) => `поле ${name} является обязательным`;

    // схема валидации в библиотеке
    const userSchema: ObjectSchema<UserRegisterInterface> = object({
        name: string()
            .trim()
            .min(5, 'Ваше имя должно быть больше 5 символов')
            .required(() => textRequired('имя')),
        email: string()
            .trim()
            .email('неверный формат почты')
            .required(() => textRequired('почта')),
        phone: string().optional(),
        password: string()
            .min(8, 'пароль должен состоять более 8 символов')
            .required(() => textRequired('пароль')),
    });

    type Schema = InferType<typeof userSchema>;

    interface ValidErrorInterface extends Error {
        errors: string | Array<string>;
        name: string;
        inner: ValidationError[];
    }

    const registerUser = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('user');
        console.log(authUrls.getRegisterUrl());

        setErrorsList([]);
        setErrorsType([]);

        // === validation client ===
        try {
            const user = await userSchema.validate(newUser, {
                abortEarly: false,
            });
        } catch (e) {
            // type errors
            const newErrorsType = (e as ValidErrorInterface).inner.map(
                (err: ValidationError) => err.path,
            );
            // duplicate name remove
            setErrorsType(Array.from(new Set(newErrorsType)));

            // message errors
            const errors = (e as ValidErrorInterface).errors;
            const newErrorsList =
                typeof errors === 'string' ? [errors] : errors;
            setErrorsList(newErrorsList);
            return;
        }
        // ==========================

        setDisabledInput(true);
        // send user for register
    };

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

            <form
                action=""
                className="w-full pl-2 pr-2 mt-4"
                onSubmit={registerUser}
            >
                <Input
                    isDisabled={disabledInput}
                    label="* имя"
                    className="w-full"
                    size="lg"
                    color={errorsType.includes('name') ? 'danger' : undefined}
                    onInput={(e) => inputHandler(e, 'name')}
                />

                <Input
                    isDisabled={disabledInput}
                    type="email"
                    label="* почта"
                    className="w-full mt-4"
                    size="lg"
                    color={errorsType.includes('email') ? 'danger' : undefined}
                    onInput={(e) => inputHandler(e, 'email')}
                />

                <Input
                    isDisabled={disabledInput}
                    type="number"
                    label="телефон"
                    className="w-full mt-4"
                    size="lg"
                    onInput={(e) => inputHandler(e, 'phone')}
                />

                <Input
                    isDisabled={disabledInput}
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
                    color={
                        errorsType.includes('password') ? 'danger' : undefined
                    }
                    onInput={(e) => inputHandler(e, 'password')}
                />

                <Button
                    className="block mt-6 w-full h-16 bg-zinc-900 font-bold !text-slate-300"
                    size="lg"
                    isLoading={false}
                    type={'submit'}
                >
                    Регистрация
                </Button>

                {!!errorsList.length && (
                    <div className="mt-2 text-red-500">
                        <h2 className="text-red-500 text-2xl text-center mt-1">
                            Внимание
                        </h2>
                        <ul>
                            {errorsList.map((text: string, index) => (
                                <li key={`error- ${text}`}>
                                    {index + 1}. {text}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </form>
        </Wrap>
    );
}
