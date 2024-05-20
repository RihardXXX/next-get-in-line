import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { authUrls } from '@/api/urls';

interface UserInterface {
    name: 'string';
    email: 'string';
    qrCode: 'string';
    phone: 'string';
}

interface AuthStateInterface {
    isLoggedIn: boolean;
    token: string;
    user: {} | UserInterface;
    setIsLoggedIn: (status: boolean) => void;
    setToken: (token: string) => void;
    getUserInfo: () => Promise<void>;
}

const useAuthStore = create<AuthStateInterface>()(
    devtools(
        persist(
            (set) => ({
                isLoggedIn: false,
                token: '',
                user: {},
                setIsLoggedIn: (status: boolean) => {
                    set((state) => ({ ...state, isLoggedIn: status }));
                },
                setToken: (token: string) => {
                    set((state) => ({ ...state, token }));
                },
                getUserInfo: async () => {
                    const url = authUrls.getUserInfoUrl();

                    try {
                        const res = await fetch(url, {
                            method: 'GET',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                            },
                        });

                        if (!res.ok) {
                            const errorText = await res.json();
                            Error(errorText.message);
                        }

                        const response = await res.json();

                        set((state) => ({
                            ...state,
                            isLoggedIn: true,
                            user: response.user,
                        }));
                    } catch (e) {
                        console.log('getUserInfo error', e);
                    }
                },
            }),
            {
                name: 'auth-state',
            },
        ),
    ),
);

export { useAuthStore };
