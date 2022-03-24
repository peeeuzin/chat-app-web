import React from 'react';
import { useAuth } from '@context/useAuth';
import { VscGithubInverted } from 'react-icons/vsc';
import styles from './styles.module.scss';
import Icon from '@assets/Icon.svg';

function AuthPage() {
    const { signInUrl } = useAuth();

    return (
        <div className={styles.wrapper}>
            <div className={styles.loginBoxWrapper}>
                <img src={Icon} height={120} />
                <button onClick={signInUrl} className={styles.signInWithGithub}>
                    <VscGithubInverted size="24" />
                    Sign in with Github
                </button>
            </div>
        </div>
    );
}

export { AuthPage };
