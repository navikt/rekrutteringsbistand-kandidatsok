import { useEffect, useRef } from 'react';

export type SessionState = Partial<{
    lastScrollPosition: number;
}>;

const useSessionStorage = (lastScrollPosition: number) => {
    const sessionStorage = useRef<SessionState>(readSessionStorage());

    useEffect(() => {
        writeSessionStorage({
            lastScrollPosition,
        });
    }, [lastScrollPosition]);

    return sessionStorage.current;
};

const readSessionStorage = () => {
    const lastScrollPositionValue = window.sessionStorage.getItem('lastScrollPosition');

    return {
        lastScrollPosition: lastScrollPositionValue
            ? parseInt(lastScrollPositionValue, 10)
            : undefined,
    };
};

const writeSessionStorage = (sessionState: SessionState) => {
    if (sessionState.lastScrollPosition) {
        window.sessionStorage.setItem(
            'lastScrollPosition',
            sessionState.lastScrollPosition.toString()
        );
    }
};

export default useSessionStorage;
