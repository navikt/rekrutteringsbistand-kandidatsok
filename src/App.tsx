import React, { FunctionComponent, useContext } from 'react';
import useInnloggetBruker from './hooks/useBrukerensIdent';
import useKontekstAvKandidatliste from './hooks/useKontekstAvKandidatliste';
import useNavigeringsstate from './hooks/useNavigeringsstate';
import { ØktContext, ØktContextProvider } from './Økt';
import Kandidatsøk from './Kandidatsøk';
import { History } from 'history';

export type MicrofrontendProps = {
    navKontor: string | null;
    history: History;
};

const App: FunctionComponent<MicrofrontendProps> = ({ navKontor }) => {
    const kandidatsøkØkt = useContext(ØktContext);
    const navigeringsstate = useNavigeringsstate();
    const forrigeØkt =
        navigeringsstate.brukKriterierFraStillingen || navigeringsstate.fraMeny
            ? null
            : kandidatsøkØkt.forrigeØkt;

    const innloggetBruker = useInnloggetBruker(navKontor);
    const kontekstAvKandidatliste = useKontekstAvKandidatliste();

    return (
        <Kandidatsøk
            forrigeØkt={forrigeØkt}
            setØkt={kandidatsøkØkt.setØkt}
            navKontor={navKontor}
            navigeringsstate={navigeringsstate}
            innloggetBruker={innloggetBruker}
            kontekstAvKandidatliste={kontekstAvKandidatliste}
        />
    );
};

const AppMedContext: FunctionComponent<MicrofrontendProps> = (props) => {
    return (
        <ØktContextProvider>
            <App {...props} />
        </ØktContextProvider>
    );
};

export default AppMedContext;
