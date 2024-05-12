import {
    UserRegisterInterface,
    UserAuthorizationInterface,
} from '@/interfaces/users';

const fetcher = (...args: Parameters<typeof fetch>) =>
    fetch(...args).then((res) => {
        if (!res.ok) {
            throw Error('Error status request');
        }
        return res.json();
    }) as Promise<void>;

// fetcher for register user
type user = UserAuthorizationInterface | UserRegisterInterface;
async function authUserFetcher(url: string, { arg }: { arg: user }) {
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
