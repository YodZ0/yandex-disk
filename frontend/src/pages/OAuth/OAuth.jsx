import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import API from '../../services/api.jsx';

import OAuthForm from '../../components/OAuthForm/OAuthForm.jsx';
import Button from '../../components/Button/Button.jsx';

import './OAuth.css';

export default function OAuth() {
    const navigate = useNavigate();

    const [isTokenValid, setIsTokenValid] = useState(false);
    const [token, setToken] = useState(null);

    function handleTokenValidation(isValid, validatedToken) {
        setIsTokenValid(isValid);
        setToken(validatedToken);
    }

    async function handleLogin() {
        console.log('Token to be saved:', token);
        // Запрос на сохранение токена в cookie
        const response = await API.post('/v1/test/set', {token: token}, {withCredentials: true});
        if (response.data && response.data.status==="200") {
            navigate('/content');
        } else {
            console.log('Error')
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
                <Button title="Login" onClick={handleLogin} />
            )}
        </div>
    );
}
