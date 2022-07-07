import React, { useState } from 'react';
import { BrowserHistory } from 'history';
import { Heading, Loader, Search } from '@navikt/ds-react';
import Resultat from './resultat/Resultat';
import useRespons from './useRespons';
import css from './App.module.css';

export type AppProps = {
    navKontor: string | null;
    history: BrowserHistory;
};

const App = ({ history }: AppProps) => {
    const respons = useRespons();
    const [query, setQuery] = useState<string>('');

    const onSearchChange = (query: string) => {
        setQuery(query.trim());
    };

    const onSearchApply = () => {
        history.replace({
            search: query ? `?q=${query}` : '',
        });
    };

    return (
        <>
            <Heading size="medium" level="1">
                Kandidatsøk
            </Heading>
            <div className={css.container}>
                <aside>
                    <Search
                        type="text"
                        label="Søk på kandidat"
                        description="F.eks navn, fødselsnummer eller yrke"
                        onChange={onSearchChange}
                        hideLabel={false}
                    >
                        <Search.Button onClick={onSearchApply} />
                    </Search>
                </aside>
                {respons.kind === 'laster-inn' && <Loader />}
                {respons.kind === 'suksess' && <Resultat respons={respons.data} />}
            </div>
        </>
    );
};

export default App;
