import React, { useEffect } from 'react';
import { useAuth } from '@context/useAuth';
import { AuthPage } from '@pages/Auth';
import { ChatPage } from '@pages/Chat';
import { genKeyAndSave } from '@services/key';
import { LoadingPage } from '@pages/Loading';

function App() {
    const { isLoggedIn, isLoading } = useAuth();
    // e2ee
    useEffect(() => {
        const keys = localStorage.getItem('@chat-app:keys');

        if (!keys) {
            genKeyAndSave();
        }
    }, []);
    if (isLoading) return <LoadingPage />;
    if (!isLoggedIn) return <AuthPage />;

    return <ChatPage />;
}

export default App;
