import {
    UserRegisterInterface,
    UserAuthorizationInterface,
    UserVerifyOtpInterface,
    PasswordRecoveryInterface,
    EmailRecoveryInterface,
    ActiveModeRecoveryInterface,
    NewPasswordRecoveryInterface,
} from '@/interfaces/users';

const fetcher = (...args: Parameters<typeof fetch>) =>
    fetch(...args).then((res) => {
        if (!res.ok) {
            throw Error('Error status request');
        }
        return res.json();
    }) as Promise<void>;

// fetcher for register user
type baseType =
    | UserAuthorizationInterface
    | UserRegisterInterface
    | UserVerifyOtpInterface
    | PasswordRecoveryInterface
    | EmailRecoveryInterface
    | ActiveModeRecoveryInterface
    | NewPasswordRecoveryInterface;

async function authUserFetcher(url: string, { arg }: { arg: baseType }) {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(arg),
    });

    if (!res.ok) {
        const errorText = await res.json();
        throw Error(errorText.message);
    }

    return res.json();
}

export { fetcher, authUserFetcher };
