import { TiDeleteOutline } from 'react-icons/ti';
import classNames from 'classnames';

function DeleteBtnForInput({
    onClick,
    className,
}: {
    onClick: () => void;
    className?: string | object;
}) {
    const classes = classNames([
        'focus:outline-none h-full',
        { [`${className}`]: className },
    ]);

    return (
        <button className={classes} type="button" onClick={onClick}>
            <TiDeleteOutline className="text-3xl text-default-400 pointer-events-none" />
        </button>
    );
}

export default DeleteBtnForInput;
