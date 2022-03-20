import React, { createContext, ReactNode, useEffect, useState } from 'react';
import axios from '@services/axios';

type User = {
    id: string;
    name: string;
    login: string;
    // eslint-disable-next-line camelcase
    avatar_url: string;
};

type AuthContextData = {
    user: User | null;
    isLoggedIn: boolean;
    isLoading: boolean;
    signInUrl: () => void;
    signOut: () => void;
};

const AuthContext = createContext({} as AuthContextData);

type propsAuthProvider = {
    children: ReactNode;
};

type AuthResponse = {
    token: string;
    user: User;
};

function AuthProvider(props: propsAuthProvider) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const signInUrl = () => {
        window.location.assign(
            `${import.meta.env.VITE_BACKEND_URL}/auth/github`
        );
    };

    const signIn = async (code: string) => {
        const response = await axios.post<AuthResponse>('/auth', {
            code,
        });

        const { token, user } = response.data;

        localStorage.setItem('@chat-app:token', token);

        axios.defaults.headers.common.authorization = `Bearer ${token}`;

        setIsLoggedIn(true);
        setUser(user);
    };

    const signOut = () => {
        setIsLoggedIn(false);
        setUser(null);
        localStorage.removeItem('@chat-app:token');
    };

    useEffect(() => {
        const token = localStorage.getItem('@chat-app:token');

        if (token) {
            axios.defaults.headers.common.authorization = `Bearer ${token}`;

            axios.get<User>('profile').then((res) => {
                setIsLoggedIn(true);
                setUser(res.data);
            });
        } else {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        const url = window.location.href;
        const hasGithubCode = url.includes('?code=');

        if (hasGithubCode) {
            const [urlWithoutCode, code] = url.split('?code=');

            window.history.pushState({}, '', urlWithoutCode);

            setIsLoggedIn(true);
            signIn(code);
        }
    }, []);

    useEffect(() => {
        if (user) {
            setIsLoading(false);
        }
    }, [user]);

    return (
        <AuthContext.Provider
            value={{ signInUrl, user, signOut, isLoggedIn, isLoading }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}

export { AuthProvider, AuthContext };
