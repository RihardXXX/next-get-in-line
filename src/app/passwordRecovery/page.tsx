'use client';
import { FormEvent } from 'react';
import useSWRMutation from 'swr/mutation';
import { Input, Chip, Button } from '@nextui-org/react';
import Wrap from '@/components/base/wrap';
import { useState } from 'react';
import { authUrls } from '@/api/urls';
import { authUserFetcher } from '@/api/swr';
import DeleteBtnForInput from '@/components/ui/DeleteBtnForInput';
import { useRouter } from 'next/navigation';
import useClientRecoveryPasswordValidation from '@/validation/useClientRecoveryPasswordValidation';
import useErrorCheck from '@/validation/useErrorCheck';
import { useAuthStore } from '@/stores/useAuthStore';

type step = 'first' | 'second';
// first стартовый шаг вводя почты для восстановления
// second об уведомлении пользователя о том, что на его почту отправлено сообщение

export default function PasswordRecovery() {
    const [disabledInput, setDisabledInput] = useState(false);
    const [step, setStep] = useState<step>('first');
    const [secondStepText, setSecondStepText] = useState('');

    const { recoveryEmailAuthorizationSchema } =
        useClientRecoveryPasswordValidation();

    const { checkError, errorsType, setErrorsType, errorsList, setErrorsList } =
        useErrorCheck();

    // email login recovery
    const [email, setEmail] = useState('');

    const router = useRouter();

    const onMainPage = () => {
        router.push('/');
    };

    const emailHandler = async (e: FormEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value.trim();
        setEmail(value);
    };

    const clearInputClickIcon = (key: string) => {
        setEmail('');
    };

    const urlRecoveryPassword = authUrls.getRecoveryPassword();

    // send data for send link on email for change password
    // useSWR + мутация-подобное API, но запрос не запускается автоматически.
    // данные не определены, пока не будет вызван триггер
    const { trigger: triggerSendLinkOnEmail } = useSWRMutation(
        urlRecoveryPassword,
        authUserFetcher,
    );

    const resetErrors = () => {
        setErrorsList([]);
        setErrorsType([]);
    };

    const loginUser = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        resetErrors();

        try {
            // === validation client ===
            const user = await recoveryEmailAuthorizationSchema.validate(
                {
                    email,
                },
                {
                    abortEarly: false,
                },
            );

            setDisabledInput(true);
            const res = await triggerSendLinkOnEmail({ email });
            setSecondStepText(res.message);
            setStep('second');
        } catch (e) {
            checkError(e);
        } finally {
            setDisabledInput(false);
        }
    };

    return (
        <Wrap>
            <div className="flex justify-center items-center h-20 bg-zinc-900">
                <h1 className="text-2xl font-bold !text-slate-300">
                    Восстановление пароля
                </h1>
            </div>

            {step === 'first' && (
                <>
                    <Chip
                        className="mt-4 !static !max-w-full !flex text-center ml-2 mr-2 p-6"
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
                            value={email}
                            color={
                                errorsType.includes('email')
                                    ? 'danger'
                                    : undefined
                            }
                            endContent={
                                !!email.length && (
                                    <DeleteBtnForInput
                                        onClick={() =>
                                            clearInputClickIcon('email')
                                        }
                                    />
                                )
                            }
                            onInput={(e) => emailHandler(e)}
                        />

                        <Button
                            className="block mt-6 w-full h-16 bg-zinc-900 font-bold !text-slate-300"
                            size="lg"
                            isLoading={false}
                            type={'submit'}
                        >
                            восстановить пароль
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
                        onClick={onMainPage}
                    >
                        на главную
                    </Button>
                </>
            )}
        </Wrap>
    );
}
