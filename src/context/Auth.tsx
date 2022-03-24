import React, { createContext, ReactNode, useEffect, useState } from 'react';
import axios from '@services/axios';
import { useSocket } from '@services/useSocket';
import { Socket } from 'socket.io-client';

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
    socket: Socket | null;
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
    const [socket, setSocket] = useState<Socket | null>(null);

    const signInUrl = () => {
        window.location.assign(
            `${import.meta.env.VITE_BACKEND_URL}/auth/github`
        );
    };

    const signIn = async (code: string) => {
        setIsLoading(true);

        const response = await axios.post<AuthResponse>('/auth', {
            code,
        });
        const { token, user } = response.data;

        setSocket(await useSocket(token));

        localStorage.setItem('@chat-app:token', token);

        axios.defaults.headers.common.authorization = `Bearer ${token}`;

        setUser(user);
    };

    const signOut = () => {
        setIsLoading(false);
        setUser(null);
        localStorage.removeItem('@chat-app:token');
    };

    useEffect(() => {
        const token = localStorage.getItem('@chat-app:token');

        if (token) {
            axios.defaults.headers.common.authorization = `Bearer ${token}`;
            setIsLoading(true);
            useSocket(token).then((socket) => {
                setSocket(socket);
            });

            axios
                .get<User>('profile')
                .then((res) => {
                    setUser(res.data);
                })
                .catch((e) => {
                    if (e.response.status === 401) {
                        signOut();
                    }
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

            signIn(code);
        }
    }, []);

    useEffect(() => {
        setIsLoggedIn(!!user);
        if (user) {
            setIsLoading(false);
        }
    }, [user]);

    return (
        <AuthContext.Provider
            value={{ signInUrl, user, signOut, isLoggedIn, isLoading, socket }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}

export { AuthProvider, AuthContext };
