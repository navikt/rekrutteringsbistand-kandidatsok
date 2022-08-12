import React from 'react';
import { Loader } from '@navikt/ds-react';
import { History } from 'history';

import Resultat from './resultat/Resultat';
import useRespons from './hooks/useRespons';
import Fritekstsøk from './filter/Fritekstsøk';
import PorteføljeTabs from './filter/PorteføljeTabs';
import useInnloggetBruker from './hooks/useBrukerensIdent';
import css from './App.module.css';
import VelgInnsatsgruppe from './filter/VelgInnsatsgruppe';
import TømFiltre from './filter/TømFiltre';
import useMarkerteKandidater from './hooks/useMarkerteKandidater';

export type AppProps = {
    navKontor: string | null;
    history: History;
};

const App = ({ navKontor }: AppProps) => {
    const innloggetBruker = useInnloggetBruker(navKontor);
    const respons = useRespons(innloggetBruker);

    const { markerteKandidater, onMarkerKandidat, fjernMarkering } = useMarkerteKandidater();

    return (
        <div className={css.container}>
            <Placeholder />
            <TømFiltre />
            <aside className={css.filter}>
                <Fritekstsøk />
                <VelgInnsatsgruppe />
            </aside>
            <main>
                <PorteføljeTabs>
                    {respons.kind === 'laster-inn' && (
                        <Loader variant="interaction" size="2xlarge" className={css.lasterInn} />
                    )}
                    {(respons.kind === 'suksess' || respons.kind === 'oppdaterer') && (
                        <Resultat
                            respons={respons.data}
                            markerteKandidater={markerteKandidater}
                            onMarkerKandidat={onMarkerKandidat}
                            fjernMarkering={fjernMarkering}
                        />
                    )}
                </PorteføljeTabs>
            </main>
        </div>
    );
};

const Placeholder = () => <span />;

export default App;
