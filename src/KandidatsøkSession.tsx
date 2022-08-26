import React, {
    createContext,
    FunctionComponent,
    ReactNode,
    useContext,
    useRef,
    useState,
} from 'react';

const SessionStorageKey = 'kandidatsøk';

export type SessionState = Partial<{
    lastScrollPosition: number;
    markerteKandidater: Set<string>;
    kandidater: string[];
}>;

export const KandidatsøkSession = createContext<{
    initialSessionState: SessionState;
    setSessionState: (sessionState: SessionState) => void;
}>({
    initialSessionState: {},
    setSessionState: () => {},
});

type Props = {
    children: ReactNode;
};

export const KandidatsøkSessionProvider: FunctionComponent<Props> = ({ children }) => {
    const initialSessionState = useRef(readSessionStorage());

    const [sessionState, setSessionState] = useState<SessionState>(initialSessionState.current);

    const middleware = (oppdaterteFelter: SessionState) => {
        const oppdatertSessionState = {
            ...sessionState,
            ...oppdaterteFelter,
        };

        writeSessionStorage(oppdatertSessionState);
        setSessionState(oppdatertSessionState);
    };

    return (
        <KandidatsøkSession.Provider
            value={{
                initialSessionState: initialSessionState.current,
                setSessionState: middleware,
            }}
        >
            {children}
        </KandidatsøkSession.Provider>
    );
};

export const useKandidatsøkSession = () => useContext(KandidatsøkSession);

export const readSessionStorage = (): SessionState => {
    const session = window.sessionStorage.getItem(SessionStorageKey);

    if (session) {
        const { lastScrollPosition, markerteKandidater } = JSON.parse(session);

        return {
            lastScrollPosition,
            markerteKandidater: new Set(markerteKandidater),
        };
    } else {
        return {};
    }
};

const writeSessionStorage = ({ markerteKandidater, ...verdier }: SessionState) => {
    window.sessionStorage.setItem(
        SessionStorageKey,
        JSON.stringify({
            ...verdier,
            markerteKandidater: Array.from(markerteKandidater || []),
        })
    );
};
