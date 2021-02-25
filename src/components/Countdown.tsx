import { useState, useEffect, useContext } from 'react'
import { ChallengesContexts } from '../contexts/ChallengesContexts'
import styles from '../styles/components/Countdown.module.css'

let countdownTimeout: NodeJS.Timeout

export function Countdown() {
    const { startNewChallenge } = useContext(ChallengesContexts)

    const [time, setTime] = useState(0.1 * 60)
    const [isActive, setisActive] = useState(false)
    const [hasFinished, setHasFinished] = useState(false)

    const minutes = Math.floor(time / 60)
    const seconds = time % 60

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')

    function startCountDown() {
        setisActive(true)
    }

    function resetCountDown() {
        clearTimeout(countdownTimeout)
        setisActive(false)
        setTime(0.1 * 60)
    }

    useEffect(() => {
        if (isActive && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1)
            }, 1000)
        } else if (isActive && time === 0) {
            setHasFinished(true)
            setisActive(false)
            startNewChallenge()
        }
    }, [isActive, time])

    return (
        <div>
            <div className={styles.CountdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>

            {hasFinished ? (
                <button disabled className={styles.countdownButton}>
                    Ciclo encerrado
                </button>
            ) : (
                    <>
                        {isActive ? (
                            <button type="button" className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                                onClick={resetCountDown}>
                                Abandonar ciclo
                            </button>
                        ) : (
                                <button type="button" className={styles.countdownButton} onClick={startCountDown}>
                                    Iniciar um ciclo
                                </button>
                            )
                        }
                    </>
                )
            }







        </div>

    )
}