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
    console.log('url', url);
    console.log('arg', arg);

    const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(arg),
    });

    if (!res.ok) {
        throw Error('Error status request');
    }

    return res.json();
}

export { fetcher, registerUserFetcher };
