import React, {
    createContext,
    FunctionComponent,
    ReactNode,
    useContext,
    useRef,
    useState,
} from 'react';
import useNavigeringsstate, { Navigeringsstate } from './hooks/useNavigeringsstate';

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
    navigeringsstate: Navigeringsstate;
    children: ReactNode;
};

export const ØktContextProvider: FunctionComponent<Props> = ({ navigeringsstate, children }) => {
    const forrigeØkt = useRef(hentForrigeØkt(navigeringsstate));

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
        <ØktContext.Provider
            value={{
                forrigeØkt: forrigeØkt.current,
                setØkt: onSetØkt,
            }}
        >
            {children}
        </ØktContext.Provider>
    );
};

export const hentForrigeØkt = (navigeringsstate: Navigeringsstate) => {
    if (navigeringsstate.brukKriterierFraStillingen || navigeringsstate.brukNyØkt) {
        return {};
    } else {
        return lesSessionStorage();
    }
};

export const useKandidatsøkØkt = () => {
    const { forrigeØkt, setØkt } = useContext(ØktContext);
    const navigeringsstate = useNavigeringsstate();

    console.log('NAVIGERINGSSTATE:', navigeringsstate);

    return {
        forrigeØkt:
            navigeringsstate.brukKriterierFraStillingen || navigeringsstate.brukNyØkt
                ? {}
                : forrigeØkt,
        setØkt,
    };
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
