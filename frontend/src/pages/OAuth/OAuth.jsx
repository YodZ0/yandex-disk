import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { SlLogin } from "react-icons/sl";

import API from '../../services/api.jsx';
import { useAuth } from '../../OAuthContext.jsx';

import OAuthForm from '../../components/OAuthForm/OAuthForm.jsx';
import Button from '../../components/Button/Button.jsx';

import './OAuth.css';

export default function OAuth() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [isTokenValid, setIsTokenValid] = useState(false);
    const [token, setToken] = useState(null);

    function handleTokenValidation(isValid, validatedToken) {
        setIsTokenValid(isValid);
        setToken(validatedToken);
    }

    async function handleLogin() {
        if (window.confirm('Accept cookie?')) {
            const response = await API.post('/v1/auth/set', { token: token }, { withCredentials: true });
            if (response.data && response.data.status === "200") {
                login();
                navigate('/content');
            } else {
                console.log('Error')
            }
        }

    }

    return (
        <div className="oauth-page">
            <h1 className="oauth-title">OAuth</h1>
            <a
                className="small-link"
                target='_blank'
                href="https://oauth.yandex.ru/authorize?response_type=token&client_id=8b473093d78c4c6099fad6ddbb3f12df"
            >
                Get token
            </a>
            <OAuthForm onTokenValidated={handleTokenValidation} />
            {isTokenValid && (
                <Button title="Login" icon={<SlLogin />} onClick={handleLogin} />
            )}
        </div>
    );
};