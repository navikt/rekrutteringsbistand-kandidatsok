import { Query, Respons } from '../elasticSearchTyper';

const kandidatsøkProxy = `/kandidatsok-proxy`;
const aktivIndeks = `veilederkandidat_current`;

export const søk = async (query: Query): Promise<Respons> => {
    const respons = await post(`${kandidatsøkProxy}/${aktivIndeks}/_search`, query);

    if (respons.ok) {
        return await respons.json();
    } else if (respons.status === 401) {
        videresendTilInnlogging();
        throw new Error('Er ikke logget inn');
    } else {
        throw new Error(`Klarte ikke å søke: ${respons.statusText}`);
    }
};

const post = (url: string, body: object) =>
    fetch(url, {
        body: JSON.stringify(body),
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    });

const videresendTilInnlogging = () => {
    window.location.href = `/oauth2/login?redirect=${window.location.pathname}`;
};
