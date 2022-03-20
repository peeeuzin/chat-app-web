import { useAuth } from '@context/useAuth';
import React from 'react';
import { VscGithubInverted } from 'react-icons/vsc';
import styles from './styles.module.scss';

function AuthPage() {
    const { signInUrl } = useAuth();

    return (
        <div className={styles.wrapper}>
            <div className={styles.loginBoxWrapper}>
                <button onClick={signInUrl} className={styles.signInWithGithub}>
                    <VscGithubInverted size="24" />
                    Sign in with Github
                </button>
            </div>
        </div>
    );
}

export { AuthPage };
