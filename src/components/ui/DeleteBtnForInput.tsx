import { TiDeleteOutline } from 'react-icons/ti';

function DeleteBtnForInput({ onClick }: { onClick: () => void }) {
    return (
        <button
            className="focus:outline-none h-full"
            type="button"
            onClick={onClick}
        >
            <TiDeleteOutline className="text-3xl text-default-400 pointer-events-none" />
        </button>
    );
}

export default DeleteBtnForInput;
