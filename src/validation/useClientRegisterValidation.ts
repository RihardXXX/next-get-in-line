import { object, ObjectSchema, string } from 'yup';
import { UserRegisterInterface } from '@/interfaces/users';
import { textRequired } from '@/utils/common';

function useClientRegisterValidation() {
    // схема валидации в библиотеке
    const userRegisterSchema: ObjectSchema<UserRegisterInterface> = object({
        name: string()
            .trim()
            .min(5, 'Ваше имя должно быть больше 5 символов')
            .required(() => textRequired('имя')),
        email: string()
            .trim()
            .email('неверный формат почты')
            .required(() => textRequired('почта')),
        phone: string().optional(),
        password: string()
            .min(8, 'пароль должен состоять более 8 символов')
            .required(() => textRequired('пароль')),
    });

    return {
        userRegisterSchema,
    };
}

export default useClientRegisterValidation;
