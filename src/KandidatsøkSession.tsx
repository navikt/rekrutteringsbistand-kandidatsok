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
    sistBesøkteKandidat: string;
    markerteKandidater: string[];
    kandidater: string[];
    searchParams: string;
    sisteScrollposisjon: number;
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

    const onSetSessionState = (oppdaterteFelter: SessionState) => {
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
                setSessionState: onSetSessionState,
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
        const { markerteKandidater, ...verdier } = JSON.parse(session);

        return {
            ...verdier,
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
