import React from 'react';
import styles from './styles.module.scss';

type Props = {
    isMe: boolean;
    message: string;
    author?: string;
};

function MessageBox({ isMe, message, author }: Props) {
    return (
        <>
            {isMe ? (
                <div
                    className={styles.wrapper}
                    style={{
                        borderTopRightRadius: 99,
                        borderTopLeftRadius: 99,
                        borderBottomLeftRadius: 99,
                        borderBottomRightRadius: 0,
                        backgroundColor: '#DAD88E',
                        color: 'black',
                    }}
                >
                    {!isMe && <p className={styles.author}>{author}</p>}
                    {message}
                </div>
            ) : (
                <div
                    className={styles.wrapper}
                    style={{
                        borderTopRightRadius: 99,
                        borderTopLeftRadius: 99,
                        borderBottomLeftRadius: 0,
                        borderBottomRightRadius: 99,
                        backgroundColor: '#242426',
                        color: 'white',
                    }}
                >
                    {!isMe && <p className={styles.author}>{author}</p>}
                    {message}
                </div>
            )}
        </>
    );
}

export { MessageBox };
