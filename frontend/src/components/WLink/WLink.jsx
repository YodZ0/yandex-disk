import './WLink.css';

export default function WLink({ url, children }) {
    return (
        <a href={url} className='button-link'>
            <div className='button-link-children'>{children}</div>
        </a>
    );
}
