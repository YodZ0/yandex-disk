import { useState } from 'react';

import { SlKey } from "react-icons/sl";

import API from '../../services/api.jsx';

import Button from '../Button/Button.jsx';
import Label from '../Label/Label.jsx';
import Input from '../Input/Input.jsx';

import './OAuthForm.css';

export default function OAuthForm({ onTokenValidated }) {
    const [token, setToken] = useState('');
    const [responseMessage, setResponseMessage] = useState(null);

    async function validateToken(event) {
        event.preventDefault();
        try {
            const response = await API.post('/v1/auth/validate', { token });
            if (response.data && response.data.user) {
                const user = response.data.user;
                setResponseMessage(
                    <>
                        <p>Login: {user.login}</p>
                        <p>Name: {user.display_name}</p>
                    </>
                );
                onTokenValidated(true, token);
            } else {
                setResponseMessage('Invalid token');
                onTokenValidated(false, null);
            }
        } catch (error) {
            setResponseMessage('Error validating token');
            onTokenValidated(false, null);
            console.error(error);
        }
    }

    return (
        <div className="form-container">
            <form className="form" onSubmit={validateToken}>
                <Label>
                    Enter OAuth-token:
                    <Input
                        name="token"
                        hint="Enter token"
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                    />
                </Label>
                <Button title="Validate" icon={<SlKey />} type='submit' />
            </form>
            {responseMessage && <div className="response-message">{responseMessage}</div>}
        </div>
    );
}
