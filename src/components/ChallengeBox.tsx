import { useContext } from 'react'
import { ChallengesContexts } from '../contexts/ChallengesContexts'
import { CountdownContext } from '../contexts/CountdownContext'
import styles from '../styles/components/ChallengeBox.module.css'

export function ChallengeBox() {

    const { activeChallenge, resetChallenge, completeChallenge } = useContext(ChallengesContexts)
    const { resetCountDown } = useContext(CountdownContext)

    function handleChallengeSucceeded() {
        completeChallenge()
        resetCountDown()
    }

    function handleChallengefailed() {
        resetChallenge()
        resetCountDown()

    }

    return (
        <div className={styles.ChallengeBoxContainer}>
            {activeChallenge ? (
                <div className={styles.ChallengeActive}>
                    <header>
                        Ganhe {activeChallenge.amount} xp
                    </header>

                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`} />
                        <strong>Novo desafio</strong>
                        <p>{activeChallenge.description}
                        </p>
                    </main>

                    <footer>
                        <button type="button" className={styles.challengeFailedButton} onClick={handleChallengefailed}>
                            Falhei
                        </button>

                        <button type="button" className={styles.challengeSucceededButton} onClick={handleChallengeSucceeded}>
                            Completei
                        </button>
                    </footer>
                </div>
            ) : (
                    <div className={styles.ChallengeNotActive}>
                        <strong>Finalize um ciclo para receber desafios</strong>
                        <p>
                            <img src="icons/level-up.svg" alt="Level Up" />
                        Avance de level completando desafios
                    </p>
                    </div>
                )}
        </div>
    )
}