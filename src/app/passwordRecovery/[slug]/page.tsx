'use client';
import { FormEvent, useEffect, useCallback } from 'react';
import useSWRMutation from 'swr/mutation';
import { Input, Chip, Button } from '@nextui-org/react';
import Wrap from '@/components/base/wrap';
import { useState } from 'react';
import { authUrls } from '@/api/urls';
import { authUserFetcher } from '@/api/swr';
import DeleteBtnForInput from '@/components/ui/DeleteBtnForInput';
import { useRouter, useParams } from 'next/navigation';
import useClientRecoveryPasswordValidation from '@/validation/useClientRecoveryPasswordValidation';
import useErrorCheck from '@/validation/useErrorCheck';
import { FaEye } from 'react-icons/fa';
import { IoEyeOffSharp } from 'react-icons/io5';
import { ActiveModeRecoveryInterface } from '@/interfaces/users';

type step = 'first' | 'second' | 'third';
// first заполнение поля ввода пароля
// second уведомление о том, что пароль сменили

export default function PasswordRecovery() {
    const [isVisiblePassword, setIsVisiblePassword] = useState(false);
    const [isVisiblePasswordRepeat, setIsVisiblePasswordRepeat] =
        useState(false);
    const [disabledInput, setDisabledInput] = useState(false);
    const [step, setStep] = useState<step>('first');
    const [secondStepText, setSecondStepText] = useState('');
    // password for change
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const { recoveryPasswordAuthorizationSchema } =
        useClientRecoveryPasswordValidation();

    const { checkError, errorsType, setErrorsType, errorsList, setErrorsList } =
        useErrorCheck();

    const router = useRouter();

    const params = useParams();

    const toggleVisibilityPassword = () =>
        setIsVisiblePassword(!isVisiblePassword);
    const toggleVisibilityRepeatPassword = () =>
        setIsVisiblePasswordRepeat(!isVisiblePasswordRepeat);

    // first render fetch slug for change password = mode
    useEffect(() => {
        if (!params.slug) {
            return;
        }

        const [_id, otp] = (params.slug as string).split('-') as string[];

        setActiveModeChangePassword({ _id, otp })
            .then(() => {
                setStep('second');
                localStorage.setItem('_id', _id);
            })
            .catch(() => {
                setStep('first');
            });
    }, []);

    const onAuthorizationPage = () => {
        router.push('/authorization');
    };

    const inputHandler = async (
        e: FormEvent<HTMLInputElement>,
        key: 'password' | 'repeatPassword',
    ) => {
        const value = e.currentTarget.value.trim();
        if (key === 'password') {
            setPassword(value);
        } else {
            setRepeatPassword(value);
        }
    };

    const clearInputClickIcon = (key: 'password' | 'repeatPassword') => {
        if (key === 'password') {
            setPassword('');
        } else {
            setRepeatPassword('');
        }
    };

    const urlRecoveryPassword = authUrls.getChangePassword();
    const urlNewPassword = authUrls.getNewPassword();

    // send data for send link on email for change password
    // useSWR + мутация-подобное API, но запрос не запускается автоматически.
    // данные не определены, пока не будет вызван триггер
    const { trigger: triggerChangePassword } = useSWRMutation(
        urlRecoveryPassword,
        authUserFetcher,
    );

    // для смены пароля после переключения на режим смены пароля
    const { trigger: triggerNewPassword } = useSWRMutation(
        urlNewPassword,
        authUserFetcher,
    );

    const setActiveModeChangePassword = useCallback(
        ({ _id, otp }: ActiveModeRecoveryInterface) => {
            return triggerChangePassword({ _id, otp });
        },
        [triggerChangePassword],
    );

    const resetErrors = () => {
        setErrorsList([]);
        setErrorsType([]);
    };

    const changePassword = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        resetErrors();

        try {
            // проверка чтобы в обеих полях данные совпадали
            if (password !== repeatPassword) {
                // console.log(112)
                throw new Error(
                    'Поле ввода нового пароля и поле повторить пароль должны совпадать',
                );
            }

            const _id = localStorage.getItem('_id') || '';

            // === validation client ===
            const user = await recoveryPasswordAuthorizationSchema.validate(
                {
                    password,
                },
                {
                    abortEarly: false,
                },
            );

            setDisabledInput(true);
            const res = await triggerNewPassword({ _id, password });
            setSecondStepText(res.message);
            setStep('third');
            localStorage.removeItem('_id');
        } catch (e) {
            // console.log('dd')
            checkError(e);
        } finally {
            setDisabledInput(false);
        }
    };

    return (
        <Wrap>
            <div className="flex justify-center items-center h-20 bg-zinc-900">
                <h1 className="text-2xl font-bold !text-slate-300">
                    Смена пароля
                </h1>
            </div>

            {step === 'first' && (
                <Chip
                    className="mt-4 !static !max-w-full !flex text-center ml-2 mr-2 p-6 text-xl text-wrap h-auto"
                    color="primary"
                    radius="sm"
                >
                    ссылка не действительна. Вы не можете сменить пароль
                </Chip>
            )}

            {step === 'second' && (
                <>
                    <Chip
                        className="mt-4 !static !max-w-full !flex text-center ml-2 mr-2 p-6"
                        color="primary"
                    >
                        введите новый пароль
                    </Chip>

                    <form
                        action=""
                        className="w-full pl-2 pr-2 mt-4"
                        onSubmit={changePassword}
                    >
                        <Input
                            isDisabled={disabledInput}
                            type={isVisiblePassword ? 'text' : 'password'}
                            label="* новый пароль"
                            className="w-full mt-4"
                            size="lg"
                            value={password}
                            endContent={
                                <>
                                    <button
                                        className="focus:outline-none h-full {}"
                                        type="button"
                                        onClick={toggleVisibilityPassword}
                                    >
                                        {isVisiblePassword ? (
                                            <FaEye className="text-2xl text-default-400 pointer-events-none" />
                                        ) : (
                                            <IoEyeOffSharp className="text-2xl text-default-400 pointer-events-none" />
                                        )}
                                    </button>
                                    {!!password && (
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

                        <Input
                            isDisabled={disabledInput}
                            type={isVisiblePasswordRepeat ? 'text' : 'password'}
                            label="* повторите новый пароль"
                            className="w-full mt-4"
                            size="lg"
                            value={repeatPassword}
                            endContent={
                                <>
                                    <button
                                        className="focus:outline-none h-full {}"
                                        type="button"
                                        onClick={toggleVisibilityRepeatPassword}
                                    >
                                        {isVisiblePasswordRepeat ? (
                                            <FaEye className="text-2xl text-default-400 pointer-events-none" />
                                        ) : (
                                            <IoEyeOffSharp className="text-2xl text-default-400 pointer-events-none" />
                                        )}
                                    </button>
                                    {!!repeatPassword && (
                                        <DeleteBtnForInput
                                            className="ml-4"
                                            onClick={() =>
                                                clearInputClickIcon(
                                                    'repeatPassword',
                                                )
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
                            onInput={(e) => inputHandler(e, 'repeatPassword')}
                        />

                        <Button
                            className="block mt-6 w-full h-16 bg-zinc-900 font-bold !text-slate-300"
                            size="lg"
                            isLoading={false}
                            type={'submit'}
                        >
                            отправить новый пароль
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

            {step === 'third' && (
                <>
                    {!!secondStepText && (
                        <Chip
                            className="mt-4 !static !max-w-full !flex text-center ml-2 mr-2 p-6 text-xl text-wrap h-auto"
                            color="primary"
                            radius="sm"
                        >
                            {secondStepText}
                        </Chip>
                    )}
                    <Button
                        className="!block mt-8 !w-4/6 h-16 bg-zinc-900 font-bold !text-slate-300 mb-4 ml-auto mr-auto"
                        size="lg"
                        isLoading={false}
                        onClick={onAuthorizationPage}
                    >
                        на страницу авторизации
                    </Button>
                </>
            )}
        </Wrap>
    );
}
