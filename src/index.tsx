import React from 'react';
import { createRoot } from 'react-dom/client';
import Navspa from '@navikt/navspa';
import Utviklingsapp from './utviklingsapp/Utviklingsapp';
import { BrowserRouter } from 'react-router-dom';
import App, { AppProps } from './App';
import '@navikt/ds-css';

const skalEksporteres = process.env.REACT_APP_EXPORT || process.env.NODE_ENV === 'production';

const AppMedRouter = (props: AppProps) => (
    <BrowserRouter>
        <App {...props} />
    </BrowserRouter>
);

if (skalEksporteres) {
    Navspa.eksporter('rekrutteringsbistand-kandidatsok', AppMedRouter);
} else {
    const app = document.getElementById('utviklingsapp');
    const root = createRoot(app!);

    root.render(<Utviklingsapp />);
}
