import React from 'react';
import { Loader } from '@navikt/ds-react';
import { History } from 'history';

import Resultat from './resultat/Resultat';
import useRespons from './hooks/useRespons';
import Fritekstsøk from './filter/Fritekstsøk';
import PorteføljeTabs from './filter/PorteføljeTabs';
import useInnloggetBruker from './hooks/useBrukerensIdent';
import css from './App.module.css';

export type AppProps = {
    navKontor: string | null;
    history: History;
};

const App = ({ navKontor }: AppProps) => {
    const innloggetBruker = useInnloggetBruker(navKontor);
    const respons = useRespons(innloggetBruker);

    return (
        <div className={css.container}>
            <aside>
                <Fritekstsøk />
            </aside>
            <main>
                <PorteføljeTabs medNavKontor={navKontor !== null}>
                    {respons.kind === 'laster-inn' && (
                        <Loader variant="interaction" size="2xlarge" className={css.lasterInn} />
                    )}
                    {(respons.kind === 'suksess' || respons.kind === 'oppdaterer') && (
                        <Resultat respons={respons.data} />
                    )}
                </PorteføljeTabs>
            </main>
        </div>
    );
};

export default App;
