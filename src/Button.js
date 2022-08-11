export default function Button({label, onClickButton, className, id}) {

    return (
        <button className={className}
                id={id}
                onClick={onClickButton}
        >
            {label}
        </button>
    );
}