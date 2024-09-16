import './Button.css';

export default function Button({
    title = undefined,
    onClick,
    type = "button",
    icon = undefined,
    onFileChange = undefined,
}) {
    return (
        <button
            className='button'
            onClick={onClick}
            type={type !== "file" ? type : undefined}
        >
            <div className='button-children'>
                {icon}
                {title}
            </div>
            {type === "file" && (
                <input
                    type="file"
                    className="file-input"
                    onChange={onFileChange}
                />
            )}
        </button>
    )
}