import { object, ObjectSchema, string } from 'yup';
import {
    PasswordRecoveryInterface,
    EmailRecoveryInterface,
} from '@/interfaces/users';
import { textRequired } from '@/utils/common';

function useClientRecoveryPasswordValidation() {
    // схема валидации в библиотеке
    const recoveryEmailAuthorizationSchema: ObjectSchema<EmailRecoveryInterface> =
        object({
            email: string()
                .trim()
                .email('неверный формат почты')
                .required(() => textRequired('почта')),
        });

    const recoveryPasswordAuthorizationSchema: ObjectSchema<PasswordRecoveryInterface> =
        object({
            password: string()
                .min(8, 'пароль должен состоять более 8 символов')
                .required(() => textRequired('пароль')),
        });

    return {
        recoveryEmailAuthorizationSchema,
        recoveryPasswordAuthorizationSchema,
    };
}

export default useClientRecoveryPasswordValidation;
