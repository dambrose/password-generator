export default function Button({children, onClickButton, className, id}) {

    return (

        <div class="d-grid gap-2 col-6 mx-auto">
            <button type="button" className="btn btn-primary"
                    id={id}
                    onClick={onClickButton}
            >
                {children}
            </button>
        </div>

        /*<button className={className}
                id={id}
                onClick={onClickButton}
        >
            {label}
        </button>*/
    );
}