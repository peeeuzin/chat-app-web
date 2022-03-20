import React from 'react';
import styles from './styles.module.scss';

type Props = {
    profileImage?: string;
    profileName?: string;
    signOut: () => void;
};

function Header({ profileImage, signOut, profileName }: Props) {
    function showProfileName() {
        const profileNameElement = document.getElementById('profileName');

        if (profileNameElement) {
            profileNameElement.style.transition = '0.2s';
            profileNameElement.style.opacity = '1';
        }
    }
    function unshowProfileName() {
        const profileNameElement = document.getElementById('profileName');

        if (profileNameElement) {
            profileNameElement.style.transition = '0.2s';
            profileNameElement.style.opacity = '0';
        }
    }

    return (
        <header className={styles.wrapper}>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
            >
                <img
                    className={styles.profileImg}
                    src={profileImage}
                    height={50}
                    onMouseEnter={showProfileName}
                    onMouseLeave={unshowProfileName}
                />
                <p
                    className={styles.profileName}
                    style={{
                        marginLeft: 10,
                        fontSize: 14,
                        opacity: 0,
                    }}
                    id="profileName"
                >
                    {profileName}
                </p>
            </div>
            <div>
                <button className={styles.button} onClick={signOut}>
                    Sign Out
                </button>
            </div>
        </header>
    );
}

export { Header };
