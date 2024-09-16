import './Input.css';

export default function Input({
    name,
    type = "text",
    hint = undefined,
    required = true,
    onChange
}) {
    return (
        <input
            className='input'
            placeholder={hint}
            name={name}
            onChange={onChange}
            type={type}
            required={required}
        />
    )
};