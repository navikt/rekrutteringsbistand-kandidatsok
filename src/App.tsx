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
import useStilling from './hooks/useStilling';
import Stillingsbanner from './stillingsbanner/Stillingsbanner';

export type AppProps = {
    navKontor: string | null;
    history: History;
};

const App = ({ navKontor }: AppProps) => {
    const innloggetBruker = useInnloggetBruker(navKontor);
    const respons = useRespons(innloggetBruker);
    const navigeringsstate = useNavigeringsstate();
    const kontekstAvStilling = useStilling();

    const { markerteKandidater, onMarkerKandidat, fjernMarkering } = useMarkerteKandidater(
        navigeringsstate.markerteKandidater
    );

    return (
        <>
            {kontekstAvStilling !== null && (
                <Stillingsbanner
                    kandidatliste={kontekstAvStilling.kandidatliste}
                    stillingsId={kontekstAvStilling.stillingsId}
                />
            )}
            <div className={css.container}>
                <TømFiltre />
                <aside className={css.filter}>
                    <Fritekstsøk />
                    <VelgInnsatsgruppe />
                </aside>
                <PorteføljeTabs>
                    <main className={css.hovedinnhold}>
                        {respons.kind === 'laster-inn' && (
                            <Loader
                                variant="interaction"
                                size="2xlarge"
                                className={css.lasterInn}
                            />
                        )}
                        {(respons.kind === 'suksess' || respons.kind === 'oppdaterer') && (
                            <Resultat
                                respons={respons.data}
                                kontekstAvStilling={kontekstAvStilling}
                                navigeringsstate={navigeringsstate}
                                markerteKandidater={markerteKandidater}
                                onMarkerKandidat={onMarkerKandidat}
                                fjernMarkering={fjernMarkering}
                            />
                        )}
                    </main>
                </PorteføljeTabs>
            </div>
        </>
    );
};

export default App;
