import './Label.css';

export default function Label({ children, position = 'top' }) {
    return (
        <label className={`label ${position}`}>
            {children}
        </label>
    )
};