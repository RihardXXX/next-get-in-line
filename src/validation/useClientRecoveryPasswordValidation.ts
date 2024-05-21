import { object, ObjectSchema, string } from 'yup';
import { PasswordRecoveryInterface } from '@/interfaces/users';
import { textRequired } from '@/utils/common';

function useClientRecoveryPasswordValidation() {
    // схема валидации в библиотеке
    const recoveryPasswordAuthorizationSchema: ObjectSchema<PasswordRecoveryInterface> =
        object({
            email: string()
                .trim()
                .email('неверный формат почты')
                .required(() => textRequired('почта')),
        });

    return {
        recoveryPasswordAuthorizationSchema,
    };
}

export default useClientRecoveryPasswordValidation;
