import React, { FunctionComponent, useContext } from 'react';
import useInnloggetBruker from './hooks/useBrukerensIdent';
import useKontekstAvKandidatlisteEllerStilling from './hooks/useKontekstAvKandidatlisteEllerStilling';
import useNavigeringsstate from './hooks/useNavigeringsstate';
import { ØktContext, ØktContextProvider } from './Økt';
import Kandidatsøk from './Kandidatsøk';
import { History } from 'history';
import { useNavKontorIAmplitude } from './amplitude';
import { useHarTilgangTilAutomatiskMatching } from './hooks/useHarTilgangTilAutomatiskMatching';

export type MicrofrontendProps = {
    navKontor: string | null;
    history: History;
};

const App: FunctionComponent<MicrofrontendProps> = ({ navKontor }) => {
    useNavKontorIAmplitude(navKontor);

    const kandidatsøkØkt = useContext(ØktContext);
    const navigeringsstate = useNavigeringsstate();

    const forrigeØkt =
        navigeringsstate.brukKriterierFraStillingen || navigeringsstate.fraMeny
            ? null
            : kandidatsøkØkt.forrigeØkt;

    const innloggetBruker = useInnloggetBruker(navKontor);
    const kontekstAvKandidatlisteEllerStilling =
        useKontekstAvKandidatlisteEllerStilling(navigeringsstate);
    const harTilgangTilAutomatiskMatching = useHarTilgangTilAutomatiskMatching();

    return (
        <Kandidatsøk
            forrigeØkt={forrigeØkt}
            setØkt={kandidatsøkØkt.setØkt}
            navKontor={navKontor}
            innloggetBruker={innloggetBruker}
            kontekstAvKandidatlisteEllerStilling={kontekstAvKandidatlisteEllerStilling}
            harTilgangTilAutomatiskMatching={harTilgangTilAutomatiskMatching}
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
