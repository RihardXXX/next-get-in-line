import { UserRegisterInterface } from '@/interfaces/users/UserRegisterInterface';

const fetcher = (...args: Parameters<typeof fetch>) =>
    fetch(...args).then((res) => {
        if (!res.ok) {
            throw Error('Error status request');
        }
        return res.json();
    }) as Promise<void>;

// fetcher for register user
async function registerUserFetcher(
    url: string,
    { arg }: { arg: UserRegisterInterface },
) {
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

export { fetcher, registerUserFetcher };
