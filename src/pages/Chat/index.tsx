import { Header } from '@components/Header';
import { useAuth } from '@context/useAuth';
import { FiSend } from 'react-icons/fi';
import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { Message } from '../../@types/message';
import { MessageBox } from '@components/MessageBox';
import axios from '@services/axios';
import { Users } from '@components/Users';
import { User } from 'src/@types/user';
import Icon from '@assets/Icon.svg';

type Chat = {
    id: string;
    messages: Message[];
    users: User[];
};

function ChatPage() {
    const { signOut, user, socket } = useAuth();
    const [currentChat, setCurrentChat] = useState<Chat | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');

    function sendMessage(value: string) {
        if (!currentChat) return;
        if (input.trim() === '' || input.length > 100) return;

        axios.post('/message/create', {
            message: value,
            chatId: currentChat.id,
        });
    }

    useEffect(() => {
        window.scrollTo(0, document.documentElement.scrollHeight);
    }, [messages]);

    useEffect(() => {
        if (!socket) return;
        socket.on('new_message', (data: Message) => {
            setMessages((oldState) => [...oldState, data]);
        });

        return () => {
            socket.removeAllListeners('new_message');
        };
    }, [socket]);

    const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        sendMessage(input);

        setInput('');
    };

    return (
        <div id="content">
            <Header
                profileImage={user?.avatar_url}
                signOut={signOut}
                profileName={user?.name ?? user?.login}
            />

            <Users
                onClickOnUser={(user) => {
                    axios
                        .post<Chat>('/chat/get', {
                            userId: user.id,
                        })
                        .then(({ data: chat }) => {
                            setCurrentChat(chat);
                            setMessages(chat.messages);
                        })
                        .catch((e) => {
                            if (e.response.status === 404) {
                                axios
                                    .post<Chat>('/chat/create', {
                                        userId: user.id,
                                    })
                                    .then(({ data: createdChat }) => {
                                        setCurrentChat(createdChat);
                                        setMessages(createdChat.messages);
                                    });
                            }
                        });
                }}
            />
            <div className={styles.content}>
                <>
                    {currentChat && user ? (
                        <div
                            style={{
                                paddingBottom: 55,
                            }}
                        >
                            {messages.map((message, index) => {
                                return (
                                    <div
                                        key={index}
                                        style={{
                                            display: 'flex',
                                            justifyContent:
                                                message.author.id === user.id
                                                    ? 'end'
                                                    : 'start',
                                        }}
                                    >
                                        <MessageBox
                                            message={message.text}
                                            isMe={message.author.id === user.id}
                                            author={
                                                message.author.name ??
                                                message.author.login
                                            }
                                        />
                                    </div>
                                );
                            })}

                            <form
                                className={styles.bottom}
                                onSubmit={handleSendMessage}
                            >
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
                    ) : (
                        <div className={styles.initialPageChat}>
                            <img src={Icon} height={120} />
                        </div>
                    )}
                </>
            </div>
        </div>
    );
}

export { ChatPage };
