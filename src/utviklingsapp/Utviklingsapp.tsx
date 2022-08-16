import React, { useEffect, useState } from 'react';
import { Heading } from '@navikt/ds-react';
import { Link, Route, Routes } from 'react-router-dom';

import App from '../App';
import css from './Utviklingsapp.module.css';
import { createBrowserHistory } from 'history';
import CustomRouter from './CustomRouter';
import Kandidatside from './KandidatsideForUtvikling';
import KandidatsideForUtvikling from './KandidatsideForUtvikling';

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
        <CustomRouter history={history}>
            <header className={css.utviklingsapp}>
                <Heading size="medium" level="1">
                    Utviklingsapp for rekrutteringsbistand-kandidatsok
                </Heading>
                <Link to="/kandidatsok" className="navds-link">
                    Kandidatsøk
                </Link>
            </header>
            <Routes>
                <Route
                    path="/kandidater/kandidat/:kandidatNr/cv"
                    element={<KandidatsideForUtvikling />}
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
