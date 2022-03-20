import { Header } from '@components/Header';
import { useAuth } from '@context/useAuth';
import { AuthPage } from '@pages/Auth';
import { LoadingPage } from '@pages/Loading';
import { FiSend } from 'react-icons/fi';
import React, { useEffect, useState } from 'react';
import styles from './App.module.scss';
import { SendMessage } from '@services/SendMessage';
import io from '@services/socket';
import { Message } from './@types/message';
import { MessageBox } from '@components/MessageBox';
import axios from '@services/axios';

function App() {
    const { isLoggedIn, isLoading, signOut, user } = useAuth();
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        const contentElement = document.getElementById('content');

        if (contentElement) {
            contentElement.scrollTop = contentElement.scrollHeight;
        }
    }, []);

    useEffect(() => {
        axios.get<Message[]>('/message/all').then(({ data }) => {
            setMessages(data);
        });
    }, []);

    useEffect(() => {
        io.on('new_message', (data: Message) => {
            setMessages((oldState) => [...oldState, data]);
        });

        return () => {
            io.removeAllListeners('new_message');
        };
    }, []);

    if (isLoading) return <LoadingPage />;
    if (!isLoggedIn) return <AuthPage />;

    const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (input.trim() === '' || input.length > 100) return;

        SendMessage(input);
        setInput('');
    };

    return (
        <div id="content">
            <Header
                profileImage={user?.avatar_url}
                signOut={signOut}
                profileName={user?.name ?? user?.login}
            />

            <div className={styles.content}>
                <div>
                    {messages.map((message, index) => {
                        return (
                            <div
                                key={index}
                                style={{
                                    display: 'flex',
                                    justifyContent:
                                        message.user.id === user?.id
                                            ? 'end'
                                            : 'start',
                                }}
                            >
                                <MessageBox
                                    message={message.text}
                                    isMe={message.user.id === user?.id}
                                    author={
                                        message.user.name ?? message.user.login
                                    }
                                />
                            </div>
                        );
                    })}
                </div>
                <form className={styles.bottom} onSubmit={handleSendMessage}>
                    <input
                        className={styles.input}
                        value={input}
                        placeholder="Send some message!"
                        type="text"
                        onChange={(e) => {
                            setInput(e.target.value);
                        }}
                    />
                    <button
                        style={{
                            backgroundColor: 'transparent',
                            border: 'none',
                        }}
                    >
                        <FiSend className={styles.send} size={30} />
                    </button>
                </form>
            </div>
        </div>
    );
}

export default App;
