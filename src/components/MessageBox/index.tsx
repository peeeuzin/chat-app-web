import React from 'react';
import styles from './styles.module.scss';

type Props = {
    isMe: boolean;
    message: string;
    author?: string;
};

function MessageBox({ isMe, message, author }: Props) {
    function setIsMe() {
        if (isMe) {
            return {
                borderBottomRightRadius: 0,
                backgroundColor: '#DAD88E',
                color: 'black',
            };
        } else {
            return { borderBottomLeftRadius: 0, backgroundColor: '#242426' };
        }
    }

    return (
        <div
            className={styles.wrapper}
            style={{
                borderRadius: 99,
                ...setIsMe(),
            }}
        >
            {!isMe && <p className={styles.author}>{author}</p>}
            {message}
        </div>
    );
}

export { MessageBox };
