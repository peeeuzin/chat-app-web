import React from 'react';
import Icon from '@assets/Icon.svg';
import { VscLoading } from 'react-icons/vsc';
import styles from './styles.module.scss';

function LoadingPage() {
    return (
        <div className={styles.wrapper}>
            <img src={Icon} height={80} className={styles.icon} />
            <VscLoading className={styles.loadingIcon} size={30} />
        </div>
    );
}

export { LoadingPage };
