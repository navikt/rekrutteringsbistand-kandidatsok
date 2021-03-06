import React from 'react';
import { createRoot } from 'react-dom/client';
import Navspa from '@navikt/navspa';
import Utviklingsapp from './utviklingsapp/Utviklingsapp';
import { Router } from 'react-router-dom';
import App, { AppProps } from './App';
import '@navikt/ds-css';

const skalEksporteres = process.env.REACT_APP_EXPORT || process.env.NODE_ENV === 'production';

const AppMedRouter = (props: AppProps) => (
    <Router history={props.history}>
        <App {...props} />
    </Router>
);

if (skalEksporteres) {
    Navspa.eksporter('rekrutteringsbistand-kandidatsok', AppMedRouter);
} else {
    const app = document.getElementById('utviklingsapp');
    const root = createRoot(app!);

    root.render(<Utviklingsapp />);
}
