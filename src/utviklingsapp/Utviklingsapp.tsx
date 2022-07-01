import React, { useEffect, useState } from 'react';
import { Heading } from '@navikt/ds-react';
import { Route, Router, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import App from '../App';
import css from './Utviklingsapp.module.css';

const history = createBrowserHistory();

const Utviklingsapp = () => {
    const [navKontor, setNavKontor] = useState<string | null>(null);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setNavKontor('0239');
        }, 500);

        return () => {
            clearTimeout(timeout);
        };
    });

    return (
        <Router history={history}>
            <header className={css.utviklingsapp}>
                <Heading size="medium" level="1">
                    Utviklingsapp for rekrutteringsbistand-kandidatsok
                </Heading>
            </header>
            <Switch>
                <Route path="/kandidater/kandidat">Kandidatside</Route>
                <Route>
                    <main>
                        <App navKontor={navKontor} history={history} />
                    </main>
                </Route>
            </Switch>
        </Router>
    );
};

export default Utviklingsapp;
