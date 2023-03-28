import React, { useEffect, useState } from 'react';
import { Heading } from '@navikt/ds-react';
import { Link, Route, Routes } from 'react-router-dom';

import { createBrowserHistory } from 'history';
import App from '../App';
import CustomRouter from './CustomRouter';
import KandidatsideForUtvikling from './kandidatside/KandidatsideForUtvikling';
import css from './Utviklingsapp.module.css';

const history = createBrowserHistory();

const Utviklingsapp = () => {
    const [navKontor, setNavKontor] = useState<string | null>(null);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setNavKontor('1860');
        }, 500);

        return () => {
            clearTimeout(timeout);
        };
    });

    return (
        <CustomRouter history={history}>
            <header className={css.utviklingsapp}>
                <Heading size="medium" level="1">
                    Utviklingsapp for rekrutteringsbistand-kandidatsok
                </Heading>
                <Link to="/kandidatsok" state={{ fraMeny: true }} className="navds-link">
                    Kandidatsøk
                </Link>
                <Link
                    to="/kandidatsok?kandidatliste=123&brukKriterierFraStillingen=true"
                    className="navds-link"
                >
                    Finn kandidater til kandidatliste tilknyttet stilling med kandidatlisteId
                </Link>
                <Link
                    to="/kandidatsok?stilling=abc&brukKriterierFraStillingen=true"
                    className="navds-link"
                >
                    Finn kandidater til kandidatliste tilknyttet stilling med stillingId
                </Link>
                <Link
                    to="/kandidatsok?kandidatliste=789&brukKriterierFraStillingen=false"
                    className="navds-link"
                >
                    Finn kandidater til kandidatliste ikke tilknyttet stilling
                </Link>
            </header>
            <Routes>
                <Route
                    path="/kandidater/kandidat/:kandidatNr/cv"
                    element={<KandidatsideForUtvikling navKontor={navKontor} />}
                />
                <Route
                    path="/kandidatsok"
                    element={
                        <main>
                            <App navKontor={navKontor} history={history} />
                        </main>
                    }
                />
            </Routes>
        </CustomRouter>
    );
};

export default Utviklingsapp;
