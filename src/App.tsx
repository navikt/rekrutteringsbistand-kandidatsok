import React from 'react';
import { Loader } from '@navikt/ds-react';
import { BrowserHistory } from 'history';
import Resultat from './resultat/Resultat';
import useRespons from './useRespons';
import Fritekstsøk from './filter/Fritekstsøk';
import css from './App.module.css';

export type AppProps = {
    navKontor: string | null;
    history: BrowserHistory;
};

const App = ({ history }: AppProps) => {
    const respons = useRespons();

    return (
        <div className={css.container}>
            <aside>
                <Fritekstsøk />
            </aside>
            {respons.kind === 'laster-inn' && <Loader />}
            {respons.kind === 'suksess' && <Resultat respons={respons.data} />}
        </div>
    );
};

export default App;
