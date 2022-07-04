import { Heading, Loader } from '@navikt/ds-react';
import { BrowserHistory } from 'history';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { søk } from './api/api';
import { Nettressurs } from './api/Nettressurs';
import { lagQuery } from './api/query';
import { Respons } from './elasticSearchTyper';
import Resultat from './Resultat';

export type AppProps = {
    navKontor: string | null;
    history: BrowserHistory;
};

const App = ({ history }: AppProps) => {
    const { search } = useLocation();
    const [respons, setRespons] = useState<Nettressurs<Respons>>({
        kind: 'ikkeLastet',
    });

    useEffect(() => {
        const hentKandidater = async () => {
            setRespons({
                kind: 'lasterInn',
            });

            try {
                let respons = await søk(lagQuery(search));

                setRespons({
                    kind: 'suksess',
                    data: respons,
                });
            } catch (e) {
                setRespons({
                    kind: 'feil',
                    error: (e as Error).message,
                });
            }
        };

        hentKandidater();
    }, [search]);

    return (
        <>
            <Heading size="medium" level="1">
                Kandidatsøk
            </Heading>
            {respons.kind === 'lasterInn' && <Loader />}
            {respons.kind === 'suksess' && <Resultat respons={respons.data} />}
        </>
    );
};

export default App;
