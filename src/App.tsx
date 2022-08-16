import React from 'react';
import { Loader } from '@navikt/ds-react';
import { History } from 'history';

import Resultat from './resultat/Resultat';
import useRespons from './hooks/useRespons';
import Fritekstsøk from './filter/Fritekstsøk';
import PorteføljeTabs from './filter/PorteføljeTabs';
import useInnloggetBruker from './hooks/useBrukerensIdent';
import VelgInnsatsgruppe from './filter/Jobbmuligheter';
import TømFiltre from './filter/TømFiltre';
import useMarkerteKandidater from './hooks/useMarkerteKandidater';
import useNavigeringsstate from './hooks/useNavigeringsstate';
import css from './App.module.css';

export type AppProps = {
    navKontor: string | null;
    history: History;
};

const App = ({ navKontor }: AppProps) => {
    const innloggetBruker = useInnloggetBruker(navKontor);
    const respons = useRespons(innloggetBruker);
    const navigeringsstate = useNavigeringsstate();

    const { markerteKandidater, onMarkerKandidat, fjernMarkering } = useMarkerteKandidater(
        navigeringsstate.markerteKandidater
    );

    return (
        <div className={css.container}>
            <Placeholder />
            <TømFiltre />
            <aside className={css.filter}>
                <Fritekstsøk />
                <VelgInnsatsgruppe />
            </aside>
            <PorteføljeTabs>
                <main className={css.hovedinnhold}>
                    {respons.kind === 'laster-inn' && (
                        <Loader variant="interaction" size="2xlarge" className={css.lasterInn} />
                    )}
                    {(respons.kind === 'suksess' || respons.kind === 'oppdaterer') && (
                        <Resultat
                            respons={respons.data}
                            navigeringsstate={navigeringsstate}
                            markerteKandidater={markerteKandidater}
                            onMarkerKandidat={onMarkerKandidat}
                            fjernMarkering={fjernMarkering}
                        />
                    )}
                </main>
            </PorteføljeTabs>
        </div>
    );
};

const Placeholder = () => <span />;

export default App;
