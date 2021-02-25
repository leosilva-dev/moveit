import { useContext } from 'react'
import { ChallengesContexts } from '../contexts/ChallengesContexts'
import styles from '../styles/components/Profile.module.css'

export function Profile() {

    const { level } = useContext(ChallengesContexts)

    return (
        <div className={styles.profileContainer}>
            <img src="https://github.com/leosilva-dev.png" alt="Leonardo Silva" />
            <div>
                <strong>Leonardo Silva</strong>
                <p>
                    <img src="icons/level.svg" alt="level" />
                    Level {level}
                </p>
            </div>
        </div>
    )
}