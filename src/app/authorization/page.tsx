'use client';
import { FormEvent, useEffect } from 'react';
import useSWRMutation from 'swr/mutation';
import { Input, Chip, Button } from '@nextui-org/react';
import { FaEye } from 'react-icons/fa';
import { IoEyeOffSharp } from 'react-icons/io5';
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
import useClientLoginValidation from '@/validation/useClientLoginValidation';
import useErrorCheck from '@/validation/useErrorCheck';
import { useAuthStore } from '@/stores/useAuthStore';

type step = 'first' | 'second' | 'last';
// first стартовый шаг вводя логина и пароля
// second шаг ввода одноразового пароля
// last шаг на котором покажется страница, что одноразовый пароль введен успешно и редирект в личный кабинет

export default function Registration() {
    const [isVisiblePassword, setIsVisiblePassword] = useState(false);
    const [disabledInput, setDisabledInput] = useState(false);
    const [step, setStep] = useState<step>('first');
    const [secondStepText, setSecondStepText] = useState('');

    const { userVerifyOtpSchema, userAuthorizationSchema } =
        useClientLoginValidation();

    const { checkError, errorsType, setErrorsType, errorsList, setErrorsList } =
        useErrorCheck();

    const router = useRouter();

    const { getUserInfo } = useAuthStore();

    // first login and password state
    const [login, setLogin] = useState({
        email: '',
        password: '',
    } as UserAuthorizationInterface);

    // otp password for user
    const [otpUser, setOtpUser] = useState({
        email: '',
        otp: '',
    } as UserVerifyOtpInterface);

    const inputHandler = async (
        e: FormEvent<HTMLInputElement>,
        key: string,
    ) => {
        const value = e.currentTarget.value.trim();
        setLogin({ ...login, [key]: value });
    };

    const inputHandlerOtp = (e: FormEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value.trim();
        setOtpUser((prevOtpUser) => ({ ...prevOtpUser, otp: value }));
    };

    const clearInputClickIcon = (key: string) => {
        setLogin((login) => ({
            ...login,
            [key]: '',
        }));
    };

    const urlLogin = authUrls.getLoginUrl();
    const urlVerify = authUrls.getVerifyUrl();

    // send data for register
    // useSWR + мутация-подобное API, но запрос не запускается автоматически.
    // данные не определены, пока не будет вызван триггер
    const { trigger: triggerLogin } = useSWRMutation(urlLogin, authUserFetcher);

    const { trigger: triggerVerify } = useSWRMutation(
        urlVerify,
        authUserFetcher,
    );

    const loginUser = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setErrorsList([]);
        setErrorsType([]);

        try {
            // === validation client ===
            const user = await userAuthorizationSchema.validate(login, {
                abortEarly: false,
            });

            setDisabledInput(true);
            const res = await triggerLogin(user);

            setSecondStepText(res.message);
            setStep('second');
            localStorage.setItem('email', login.email);
        } catch (e) {
            checkError(e);
        } finally {
            setDisabledInput(false);
        }
    };

    // на втором шаге заполняем поле почты автоматически
    useEffect(() => {
        if (step === 'second') {
            const emailStorage = localStorage.getItem('email') || '';

            setOtpUser((prevOtpUser) => ({
                ...prevOtpUser,
                email: login.email || emailStorage,
            }));
        }
    }, [step, login.email]);

    const verifyUser = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setErrorsList([]);
        setErrorsType([]);
        try {
            // === validation client ===
            const newOtpUser = await userVerifyOtpSchema.validate(otpUser, {
                abortEarly: false,
            });

            setDisabledInput(true);

            const res = await triggerVerify(newOtpUser);

            setStep('last');
            await getUserInfo(); // fetch user info if cookie token set backend
            router.push('/personal');
        } catch (e) {
            checkError(e);
        } finally {
            setDisabledInput(false);
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
                            value={login.email}
                            color={
                                errorsType.includes('email')
                                    ? 'danger'
                                    : undefined
                            }
                            endContent={
                                !!login.email.length && (
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
                            value={String(login.password)}
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
                                    {!!login.password && (
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
                        className="mt-4 !static !max-w-full !flex text-center ml-2 mr-2 p-6 text-xl text-wrap h-auto"
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
