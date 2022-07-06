import React from 'react';
import { BrowserHistory } from 'history';
import { Heading, Loader, TextField } from '@navikt/ds-react';
import Resultat from './resultat/Resultat';
import useRespons from './useRespons';
import css from './App.module.css';

export type AppProps = {
    navKontor: string | null;
    history: BrowserHistory;
};

const App = ({ history }: AppProps) => {
    const respons = useRespons();

    return (
        <>
            <Heading size="medium" level="1">
                Kandidatsøk
            </Heading>
            <div className={css.container}>
                <aside>
                    <TextField
                        type="text"
                        label="Søk på kandidat"
                        description="F.eks navn, fødselsnummer eller yrke"
                    />
                </aside>
                {respons.kind === 'laster-inn' && <Loader />}
                {respons.kind === 'suksess' && <Resultat respons={respons.data} />}
            </div>
        </>
    );
};

export default App;
