import { useAuth } from '@context/useAuth';
import axios from '@services/axios';
import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { User } from 'src/@types/user';

type PropsUser = {
    user: User;
    onClick?: (user: User) => void;
};

function UserComponent({ user, onClick }: PropsUser) {
    return (
        <div
            className={styles.user}
            onClick={() => {
                if (onClick) onClick(user);
            }}
        >
            <img src={user.avatar_url} height={60} />
            <p>{user.name ?? user.login}</p>
        </div>
    );
}

type PropsUsers = {
    onClickOnUser?: (user: User) => void;
};

function Users({ onClickOnUser }: PropsUsers) {
    const [users, setUsers] = useState<User[]>([]);
    const { user } = useAuth();

    // const getUsers = async () => {
    //     const { data: usersResponse } = await axios.get<IUser[]>('/users/all');

    //     setUsers((oldState) => [...oldState, ...usersResponse]);
    // };

    useEffect(() => {
        axios.get<User[]>('/users/all').then(({ data }) => {
            setUsers(data);
        });
    }, []);

    return (
        <div className={styles.wrapper}>
            {users.map((_user, index) => {
                return (
                    <div key={_user.id}>
                        {_user.id !== user?.id && (
                            <UserComponent
                                onClick={onClickOnUser}
                                user={_user}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export { Users };
