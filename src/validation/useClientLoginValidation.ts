import { object, ObjectSchema, string } from 'yup';
import {
    UserAuthorizationInterface,
    UserVerifyOtpInterface,
} from '@/interfaces/users';

import { textRequired } from '@/utils/common';

function useClientLoginValidation() {
    // схема валидации в библиотеке на первом шаге
    const userAuthorizationSchema: ObjectSchema<UserAuthorizationInterface> =
        object({
            email: string()
                .trim()
                .email('неверный формат почты')
                .required(() => textRequired('почта')),
            password: string()
                .min(8, 'пароль должен состоять более 8 символов')
                .required(() => textRequired('пароль')),
        });

    // схема валидации в библиотеке на втором шаге
    const userVerifyOtpSchema: ObjectSchema<UserVerifyOtpInterface> = object({
        email: string()
            .trim()
            .email('неверный формат почты')
            .required(() => textRequired('почта')),
        otp: string()
            .min(6, 'пароль одноразовый должен состоять из 6 символов')
            .required(() => textRequired('пароль')),
    });

    return {
        userAuthorizationSchema,
        userVerifyOtpSchema,
    };
}

export default useClientLoginValidation;
