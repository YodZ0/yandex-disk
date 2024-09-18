import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const OAuthContext = createContext();

export function AuthProvider({ children }) {
    const [isLogged, setIsLogged] = useState(!!Cookies.get('oauth_token'));

    useEffect(() => {
        const token = Cookies.get('oauth_token');
        if (token) {
            setIsLogged(true);
        } else {
            setIsLogged(false);
        }
    }, []);

    const login = () => {
        setIsLogged(true);
    };

    const logout = () => {
        Cookies.remove('oauth_token');
        setIsLogged(false);
    };

    return (
        <OAuthContext.Provider value={{ isLogged, login, logout }}>
            {children}
        </OAuthContext.Provider>
    );
}

export const useAuth = () => useContext(OAuthContext);
