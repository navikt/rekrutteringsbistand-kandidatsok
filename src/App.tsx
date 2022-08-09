import React from 'react';
import { Loader } from '@navikt/ds-react';
import { useLocation } from 'react-router-dom';
import { History } from 'history';

import Resultat from './resultat/Resultat';
import useRespons from './useRespons';
import Fritekstsøk from './filter/Fritekstsøk';
import css from './App.module.css';

export type AppProps = {
    navKontor: string | null;
    history: History;
};

type Navigeringsstate = {
    kandidat?: string;
};

const App = (_: AppProps) => {
    const respons = useRespons();
    const { state } = useLocation();

    const sisteBesøkteKandidat = (state as Navigeringsstate)?.kandidat;

    return (
        <div className={css.container}>
            <aside>
                <Fritekstsøk />
            </aside>
            {respons.kind === 'laster-inn' && (
                <Loader variant="interaction" size="2xlarge" className={css.lasterInn} />
            )}
            {(respons.kind === 'suksess' || respons.kind === 'oppdaterer') && (
                <Resultat respons={respons.data} sisteBesøkteKandidat={sisteBesøkteKandidat} />
            )}
        </div>
    );
};

export default App;
