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
import {
    UserAuthorizationInterface,
    UserVerifyOtpInterface,
} from '@/interfaces/users';
import { authUserFetcher } from '@/api/swr';
import DeleteBtnForInput from '@/components/ui/DeleteBtnForInput';
import { useRouter } from 'next/navigation';

type error = string | undefined;

type step = 'first' | 'second' | 'last';
// first стартовый шаг вводя логина и пароля
// second шаг ввода одноразового пароля
// last шаг на котором покажется страница, что одноразовый пароль введен успешно и редирект в личный кабинет

export default function Registration() {
    const [isVisiblePassword, setIsVisiblePassword] = useState(false);
    const [disabledInput, setDisabledInput] = useState(false);
    const [errorsList, setErrorsList] = useState([] as Array<string>);
    const [errorsType, setErrorsType] = useState([] as Array<error>);
    const [step, setStep] = useState<step>('first');
    const [secondStepText, setSecondStepText] = useState('');

    // first login and password state
    const [newUser, setNewUser] = useState({
        email: '',
        password: '',
    } as UserAuthorizationInterface);

    // otp password for user
    const [otpUser, setOtpUser] = useState({
        email: '',
        otp: '',
    } as UserVerifyOtpInterface);

    const router = useRouter();

    const inputHandler = async (
        e: FormEvent<HTMLInputElement>,
        key: string,
    ) => {
        const value = e.currentTarget.value.trim();
        setNewUser({ ...newUser, [key]: value });
    };

    const inputHandlerOtp = (e: FormEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value.trim();
        setOtpUser((prevOtpUser) => ({ ...prevOtpUser, otp: value }));
    };

    const clearInputClickIcon = (key: string) => {
        setNewUser((newUser) => ({
            ...newUser,
            [key]: '',
        }));
    };

    const textRequired = (name: string) => `поле ${name} является обязательным`;

    // схема валидации в библиотеке на первом шаге
    const userSchema: ObjectSchema<UserAuthorizationInterface> = object({
        email: string()
            .trim()
            .email('неверный формат почты')
            .required(() => textRequired('почта')),
        password: string()
            .min(8, 'пароль должен состоять более 8 символов')
            .required(() => textRequired('пароль')),
    });

    // схема валидации в библиотеке на втором шаге
    const otpUserSchema: ObjectSchema<UserVerifyOtpInterface> = object({
        email: string()
            .trim()
            .email('неверный формат почты')
            .required(() => textRequired('почта')),
        otp: string()
            .min(6, 'пароль одноразовый должен состоять из 6 символов')
            .required(() => textRequired('пароль')),
    });

    type Schema = InferType<typeof userSchema>;

    interface ValidErrorInterface extends Error {
        errors: string | Array<string>;
        name: string;
        inner: ValidationError[];
    }

    const urlLogin = authUrls.getLoginUrl();

    // send data for register
    // useSWR + мутация-подобное API, но запрос не запускается автоматически.
    // данные не определены, пока не будет вызван триггер
    const { data: resRegister, trigger } = useSWRMutation(
        urlLogin,
        authUserFetcher,
    );

    const loginUser = async (event: FormEvent<HTMLFormElement>) => {
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

            setSecondStepText(res.message);
            setStep('second');
            localStorage.setItem('email', newUser.email);
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

    const verifyUser = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setErrorsList([]);
        setErrorsType([]);
        try {
        } catch (e) {
        } finally {
        }
    };

    const passwordRecoveryPage = () => {
        router.push('/passwordRecovery');
    };

    const toggleVisibility = () => setIsVisiblePassword(!isVisiblePassword);

    return (
        <Wrap>
            <div className="flex justify-center items-center h-20 bg-zinc-900">
                <h1 className="text-2xl font-bold !text-slate-300">
                    Авторизация
                </h1>
            </div>

            {step === 'first' && (
                <>
                    <Chip
                        className="mt-4 !static !max-w-full !flex text-center ml-2 mr-2 p-6 text-xl"
                        color="primary"
                    >
                        Поля со звездочкой обязательны
                    </Chip>

                    <form
                        action=""
                        className="w-full pl-2 pr-2 mt-4"
                        onSubmit={loginUser}
                    >
                        <Input
                            isDisabled={disabledInput}
                            type="email"
                            label="* почта"
                            className="w-full mt-4"
                            size="lg"
                            value={newUser.email}
                            color={
                                errorsType.includes('email')
                                    ? 'danger'
                                    : undefined
                            }
                            endContent={
                                !!newUser.email.length && (
                                    <DeleteBtnForInput
                                        onClick={() =>
                                            clearInputClickIcon('email')
                                        }
                                    />
                                )
                            }
                            onInput={(e) => inputHandler(e, 'email')}
                        />

                        <Input
                            isDisabled={disabledInput}
                            type={isVisiblePassword ? 'text' : 'password'}
                            label="* пароль"
                            className="w-full mt-4"
                            size="lg"
                            value={newUser.password}
                            endContent={
                                <>
                                    <button
                                        className="focus:outline-none h-full {}"
                                        type="button"
                                        onClick={toggleVisibility}
                                    >
                                        {isVisiblePassword ? (
                                            <FaEye className="text-2xl text-default-400 pointer-events-none" />
                                        ) : (
                                            <IoEyeOffSharp className="text-2xl text-default-400 pointer-events-none" />
                                        )}
                                    </button>
                                    {!!newUser.password.length && (
                                        <DeleteBtnForInput
                                            className="ml-4"
                                            onClick={() =>
                                                clearInputClickIcon('password')
                                            }
                                        />
                                    )}
                                </>
                            }
                            color={
                                errorsType.includes('password')
                                    ? 'danger'
                                    : undefined
                            }
                            onInput={(e) => inputHandler(e, 'password')}
                        />

                        <Button
                            className="block mt-6 w-full h-16 bg-zinc-900 font-bold !text-slate-300"
                            size="lg"
                            isLoading={false}
                            type={'submit'}
                        >
                            авторизация
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
                </>
            )}

            {step === 'second' && (
                <>
                    <Chip
                        className="mt-4 !static !max-w-full !flex text-center ml-2 mr-2 p-6 text-xl"
                        color="primary"
                    >
                        {secondStepText}
                    </Chip>

                    <form
                        action=""
                        className="w-full pl-2 pr-2 mt-4"
                        onSubmit={verifyUser}
                    >
                        <Input
                            isDisabled={disabledInput}
                            type="number"
                            label="* одноразовый пароль"
                            className="w-full mt-4"
                            size="lg"
                            value={String(otpUser.otp)}
                            maxLength={6}
                            endContent={
                                !!String(otpUser.otp).length && (
                                    <DeleteBtnForInput
                                        className="ml-4"
                                        onClick={() =>
                                            setOtpUser((prev) => ({
                                                ...prev,
                                                otp: '',
                                            }))
                                        }
                                    />
                                )
                            }
                            color={
                                errorsType.includes('otp')
                                    ? 'danger'
                                    : undefined
                            }
                            onInput={inputHandlerOtp}
                        />

                        <Button
                            className="block mt-6 w-full h-16 bg-zinc-900 font-bold !text-slate-300"
                            size="lg"
                            isLoading={false}
                            type={'submit'}
                        >
                            отправить
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
                </>
            )}

            <div className="fixed left-0 bottom-20 w-full pl-2 pr-2">
                <Button
                    className="!block mt-8 w-full h-16 bg-zinc-900 font-bold !text-slate-300 mb-4"
                    size="lg"
                    isLoading={false}
                    onClick={passwordRecoveryPage}
                >
                    забыли пароль
                </Button>
            </div>
        </Wrap>
    );
}
