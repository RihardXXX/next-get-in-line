'use client';
import { FormEvent, useEffect, useRef } from 'react';
import useSWRMutation from 'swr/mutation';
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
import { UserRegisterInterface } from '@/interfaces/users/UserRegisterInterface';
import { registerUserFetcher } from '@/api/swr';
import DeleteBtnForInput from '@/components/ui/DeleteBtnForInput';
import { useRouter } from 'next/navigation';

type error = string | undefined;

export default function Registration() {
    const [isVisiblePassword, setIsVisiblePassword] = useState(false);
    const [disabledInput, setDisabledInput] = useState(false);
    const [errorsList, setErrorsList] = useState([] as Array<string>);
    const [errorsType, setErrorsType] = useState([] as Array<error>);
    const [registerSuccess, setRegisterSuccess] = useState(false);
    const [registerSuccessText, setRegisterSuccessText] = useState('');
    const [seconds, setSeconds] = useState(20);

    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
    } as UserRegisterInterface);

    const router = useRouter();

    const inputHandler = async (
        e: FormEvent<HTMLInputElement>,
        key: string,
    ) => {
        const value = e.currentTarget.value.trim();
        setNewUser({ ...newUser, [key]: value });
    };

    const clearInputClickIcon = (key: string) => {
        setNewUser((newUser) => ({
            ...newUser,
            [key]: '',
        }));
    };

    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const startTimer = (delay: number) => {
        intervalRef.current = setInterval(() => {
            // сохраняем идентификатор интервала в intervalRef.current
            setSeconds((prevSeconds) => prevSeconds - 1);
        }, delay);
    };

    useEffect(() => {
        if (registerSuccess) {
            startTimer(1000); // запускаем таймер при успешной регистрации
        }
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [registerSuccess]);

    useEffect(() => {
        if (seconds === 0) {
            clearInterval(intervalRef.current!); // очищаем интервал, когда время истекает
            router.push('/');
        }
    }, [seconds, router]);

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

    const urlRegister = authUrls.getRegisterUrl();

    // send data for register
    // useSWR + мутация-подобное API, но запрос не запускается автоматически.
    // данные не определены, пока не будет вызван триггер
    const { data: resRegister, trigger } = useSWRMutation(
        urlRegister,
        registerUserFetcher,
    );

    const registerUser = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setErrorsList([]);
        setErrorsType([]);

        try {
            // === validation client ===
            const user = await userSchema.validate(newUser, {
                abortEarly: false,
            });

            setDisabledInput(true);

            const res = await trigger(user);

            setRegisterSuccessText(res.message);
            setRegisterSuccess(true);
        } catch (e) {
            // =======

            // for front client validate
            // отлавливание ошибок валидаци на клиенте
            if ((e as ValidErrorInterface).inner) {
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

            // отлавливание ошибок валидации на сервере
            const errorText = (e as Error).message;
            // for server validate error
            if (errorText) {
                setErrorsList([errorText]);
            }
        } finally {
            setDisabledInput(false);
        }
        // ==========================
    };

    const toggleVisibility = () => setIsVisiblePassword(!isVisiblePassword);

    // если регистрация прошла успешно показываем сообщение это
    if (registerSuccess) {
        return (
            <Wrap>
                <div className="flex justify-center items-center h-20 bg-zinc-900">
                    <h1 className="text-2xl font-bold !text-slate-300">
                        Регистрация
                    </h1>
                </div>

                <Chip
                    className="mt-4 !static !max-w-full !flex text-center ml-2 mr-2 p-6 text-xl"
                    color="primary"
                >
                    Регистрация прошла успешно
                </Chip>

                <Chip
                    className="mt-8 !static !max-w-full !flex text-center ml-2 mr-2 p-6 text-2xl text-wrap h-auto"
                    color="success"
                    radius="sm"
                >
                    {registerSuccessText}
                </Chip>

                <Chip
                    className="mt-8 !static !max-w-full !flex text-center ml-2 mr-2 p-4 text-2xl text-wrap h-auto"
                    color="warning"
                >
                    Через <span className="!font-bold">{seconds}</span> вы
                    будете перенаправлены на главную страницу
                </Chip>
            </Wrap>
        );
    }

    return (
        <Wrap>
            <div className="flex justify-center items-center h-20 bg-zinc-900">
                <h1 className="text-2xl font-bold !text-slate-300">
                    Регистрация
                </h1>
            </div>

            <Chip
                className="mt-4 !static !max-w-full !flex text-center ml-2 mr-2 p-6 text-xl"
                color="primary"
            >
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
                    value={newUser.name}
                    color={errorsType.includes('name') ? 'danger' : undefined}
                    endContent={
                        !!newUser.name.length && (
                            <DeleteBtnForInput
                                onClick={() => clearInputClickIcon('name')}
                            />
                        )
                    }
                    onInput={(e) => inputHandler(e, 'name')}
                />

                <Input
                    isDisabled={disabledInput}
                    type="email"
                    label="* почта"
                    className="w-full mt-4"
                    size="lg"
                    value={newUser.email}
                    color={errorsType.includes('email') ? 'danger' : undefined}
                    endContent={
                        !!newUser.email.length && (
                            <DeleteBtnForInput
                                onClick={() => clearInputClickIcon('email')}
                            />
                        )
                    }
                    onInput={(e) => inputHandler(e, 'email')}
                />

                <Input
                    isDisabled={disabledInput}
                    type="number"
                    label="телефон"
                    className="w-full mt-4"
                    size="lg"
                    value={newUser.phone}
                    endContent={
                        !!newUser.phone?.length && (
                            <DeleteBtnForInput
                                onClick={() => clearInputClickIcon('phone')}
                            />
                        )
                    }
                    onInput={(e) => inputHandler(e, 'phone')}
                />

                <Input
                    isDisabled={disabledInput}
                    type={isVisiblePassword ? 'text' : 'password'}
                    label="* пароль"
                    className="w-full mt-4"
                    size="lg"
                    value={newUser.password}
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
