import { ValidationError } from 'yup';
import { useState } from 'react';

type error = string | undefined;
interface ValidErrorInterface extends Error {
    errors: string | Array<string>;
    name: string;
    inner: ValidationError[];
}
function useErrorCheck() {
    const [errorsList, setErrorsList] = useState([] as Array<string>);
    const [errorsType, setErrorsType] = useState([] as Array<error>);
    const checkError = (e: unknown) => {
        // for front client validate
        // отлавливание ошибок валидаци на клиенте
        if ((e as ValidErrorInterface).inner) {
            // type errors
            const newErrorsType = (e as ValidErrorInterface).inner.map(
                (err: ValidationError) => err.path,
            );
            // duplicate name remove
            setErrorsType(Array.from(new Set(newErrorsType)));

            // message errors
            const errors = (e as ValidErrorInterface).errors;
            const newErrorsList =
                typeof errors === 'string' ? [errors] : errors;
            setErrorsList(newErrorsList);

            return;
        }

        // отлавливание ошибок валидации на сервере
        const errorText = (e as Error).message;
        // for server validate error
        if (errorText) {
            setErrorsList([errorText]);
        }
    };

    return {
        checkError,
        errorsList,
        setErrorsList,
        errorsType,
        setErrorsType,
    };
}

export default useErrorCheck;
