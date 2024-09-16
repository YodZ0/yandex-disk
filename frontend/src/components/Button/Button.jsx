import './Button.css';

export default function Button({ title, onClick, type}) {
    return (
        <button className='button' onClick={onClick} type={type}>{title}</button>
    )
}