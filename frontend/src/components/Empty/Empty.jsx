import { SlInfo } from "react-icons/sl";

import './Empty.css';

export default function Empty() {  
    return (
        <div className='empty'>
            <div className='empty-icon'><SlInfo /></div>
            <div className='empty-text'>Empty data</div>
        </div>
    );
}
