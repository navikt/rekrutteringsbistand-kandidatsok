import React, {
    createContext,
    FunctionComponent,
    ReactNode,
    useContext,
    useRef,
    useState,
} from 'react';

const SessionStorageKey = 'kandidatsøk';

export type Økt = Partial<{
    sistBesøkteKandidat: string;
    markerteKandidater: string[];
    kandidater: string[];
    searchParams: string;
    sisteScrollposisjon: number;
}>;

export const KandidatsøkSession = createContext<{
    forrigeØkt: Økt;
    setØkt: (økt: Økt) => void;
}>({
    forrigeØkt: {},
    setØkt: () => {},
});

type Props = {
    children: ReactNode;
};

export const KandidatsøkSessionProvider: FunctionComponent<Props> = ({ children }) => {
    const forrigeØkt = useRef(lesSessionStorage());

    const [økt, setØkt] = useState<Økt>(forrigeØkt.current);

    const onSetØkt = (oppdaterteFelter: Økt) => {
        const oppdatertØkt = {
            ...økt,
            ...oppdaterteFelter,
        };

        skrivSessionStorage(oppdatertØkt);
        setØkt(oppdatertØkt);
    };

    return (
        <KandidatsøkSession.Provider
            value={{
                forrigeØkt: forrigeØkt.current,
                setØkt: onSetØkt,
            }}
        >
            {children}
        </KandidatsøkSession.Provider>
    );
};

export const useKandidatsøkSession = () => useContext(KandidatsøkSession);

export const lesSessionStorage = (): Økt => {
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

const skrivSessionStorage = ({ markerteKandidater, ...verdier }: Økt) => {
    window.sessionStorage.setItem(
        SessionStorageKey,
        JSON.stringify({
            ...verdier,
            markerteKandidater: Array.from(markerteKandidater || []),
        })
    );
};
