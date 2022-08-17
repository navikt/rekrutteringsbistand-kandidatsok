import React from 'react';
import { createRoot } from 'react-dom/client';
import Navspa from '@navikt/navspa';
import Utviklingsapp from './utviklingsapp/Utviklingsapp';
import { Router } from 'react-router-dom';
import App, { AppProps } from './App';
import { setupMock } from './mocks/mockSetup';
import '@navikt/ds-css';
import { Modal } from '@navikt/ds-react';

const skalEksporteres = process.env.REACT_APP_EXPORT || process.env.NODE_ENV === 'production';

if (process.env.REACT_APP_MOCK) {
    setupMock();
}

const AppMedRouter = (props: AppProps) => (
    <Router navigator={props.history} location={props.history.location}>
        <App {...props} />
    </Router>
);

if (skalEksporteres) {
    const container = document.getElementById('rekrutteringsbistand-container');
    Modal.setAppElement!(container);

    Navspa.eksporter('rekrutteringsbistand-kandidatsok', AppMedRouter);
} else {
    const app = document.getElementById('utviklingsapp');
    const root = createRoot(app!);

    Modal.setAppElement!(app);

    root.render(<Utviklingsapp />);
}
