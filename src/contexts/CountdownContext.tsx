import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContexts } from "./ChallengesContexts";

interface CountdownContextData {
    minutes: number,
    seconds: number,
    hasFinished: boolean,
    isActive: boolean,
    startCountDown: () => void,
    resetCountDown: () => void
}

interface CountdownProviderProps {
    children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData)

let countdownTimeout: NodeJS.Timeout

export function CountdownProvider({ children }: CountdownProviderProps) {

    const { startNewChallenge } = useContext(ChallengesContexts)

    const [time, setTime] = useState(25 * 60)
    const [isActive, setisActive] = useState(false)
    const [hasFinished, setHasFinished] = useState(false)

    const minutes = Math.floor(time / 60)
    const seconds = time % 60

    function startCountDown() {
        setisActive(true)
    }

    function resetCountDown() {
        clearTimeout(countdownTimeout)
        setisActive(false)
        setTime(25 * 60)
        setHasFinished(false)
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
        <CountdownContext.Provider value={{
            minutes,
            seconds,
            hasFinished,
            isActive,
            startCountDown,
            resetCountDown
        }}>
            {children}
        </CountdownContext.Provider>
    )
}