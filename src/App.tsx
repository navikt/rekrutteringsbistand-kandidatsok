import React from 'react';
import { BrowserHistory } from 'history';
import { Heading, Loader } from '@navikt/ds-react';
import Resultat from './Resultat';
import useRespons from './useRespons';

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
            {respons.kind === 'laster-inn' && <Loader />}
            {respons.kind === 'suksess' && <Resultat respons={respons.data} />}
        </>
    );
};

export default App;
