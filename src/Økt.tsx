import React, {
    createContext,
    FunctionComponent,
    ReactNode,
    useCallback,
    useMemo,
    useRef,
    useState,
} from 'react';

const SessionStorageKey = 'kandidatsøk';

export type Økt = Partial<{
    sistBesøkteKandidat: string;
    markerteKandidater: string[];
    kandidater: string[];
    searchParams: string;
}>;

export const ØktContext = createContext<{
    forrigeØkt: Økt;
    setØkt: (økt: Økt) => void;
}>({
    forrigeØkt: {},
    setØkt: () => {},
});

type Props = {
    children: ReactNode;
};

export const ØktContextProvider: FunctionComponent<Props> = ({ children }) => {
    const forrigeØkt = useRef(lesSessionStorage());

    const [økt, setØkt] = useState<Økt>(forrigeØkt.current);

    const context = useMemo(() => {
        const onSetØkt = (oppdaterteFelter: Økt) => {
            const oppdatertØkt = {
                ...økt,
                ...oppdaterteFelter,
            };

            skrivSessionStorage(oppdatertØkt);
            setØkt(oppdatertØkt);
        };

        return {
            forrigeØkt: forrigeØkt.current,
            setØkt: onSetØkt,
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(økt)]);

    return <ØktContext.Provider value={context}>{children}</ØktContext.Provider>;
};

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
