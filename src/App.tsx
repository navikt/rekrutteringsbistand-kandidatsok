import React, { FunctionComponent } from 'react';
import useInnloggetBruker from './hooks/useBrukerensIdent';
import useKontekstAvKandidatliste from './hooks/useKontekstAvKandidatliste';
import useNavigeringsstate from './hooks/useNavigeringsstate';
import { useKandidatsøkØkt, ØktContextProvider } from './Økt';
import Kandidatsøk from './Kandidatsøk';
import { History } from 'history';

export type MicrofrontendProps = {
    navKontor: string | null;
    history: History;
};

const App: FunctionComponent<MicrofrontendProps> = ({ navKontor }) => {
    const navigeringsstate = useNavigeringsstate();
    const kandidatsøkØkt = useKandidatsøkØkt();
    const forrigeØkt =
        navigeringsstate.brukKriterierFraStillingen || navigeringsstate.fraMeny
            ? null
            : kandidatsøkØkt.forrigeØkt;

    const innloggetBruker = useInnloggetBruker(navKontor);
    const kontekstAvKandidatliste = useKontekstAvKandidatliste();

    return (
        <ØktContextProvider>
            <Kandidatsøk
                forrigeØkt={forrigeØkt}
                setØkt={kandidatsøkØkt.setØkt}
                navKontor={navKontor}
                navigeringsstate={navigeringsstate}
                innloggetBruker={innloggetBruker}
                kontekstAvKandidatliste={kontekstAvKandidatliste}
            />
        </ØktContextProvider>
    );
};

export default App;
