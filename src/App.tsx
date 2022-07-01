import { BrowserHistory } from 'history';
import React from 'react';

export type AppProps = {
    navKontor: string | null;
    history: BrowserHistory;
};

const App = ({ history }: AppProps) => {
    return <div>Kandidatsøk</div>;
};

export default App;
