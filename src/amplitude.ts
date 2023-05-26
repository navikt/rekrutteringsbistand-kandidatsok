import amplitudeJs, { AmplitudeClient } from 'amplitude-js';
import { useEffect } from 'react';
import { hentMiljø, Miljø } from './utils';

const getApiKey = () => {
    return hentMiljø() === Miljø.ProdGcp
        ? 'a8243d37808422b4c768d31c88a22ef4'
        : '6ed1f00aabc6ced4fd6fcb7fcdc01b30';
};

const client: AmplitudeClient = amplitudeJs.getInstance();

if (import.meta.env.PROD) {
    client.init(getApiKey(), '', {
        apiEndpoint: 'amplitude.nav.no/collect',
        saveEvents: false,
        includeUtm: true,
        batchEvents: false,
        includeReferrer: false,
    });
}

export const useNavKontorIAmplitude = (navKontor: string | null) => {
    useEffect(() => {
        if (navKontor) {
            client.setUserProperties({
                navKontor,
            });
        }
    }, [navKontor]);
};

export const sendEvent = (område: string, hendelse: string, data?: Object): void => {
    client.logEvent(['#rekrutteringsbistand', område, hendelse].join('-'), data);
};
