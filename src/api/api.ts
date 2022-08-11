import { Query, Respons } from '../elasticSearchTyper';

const kandidatsøkProxy = `/kandidatsok-proxy`;

export const søk = async (query: Query): Promise<Respons> => {
    const respons = await post(kandidatsøkProxy, query);

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

export const get = (url: string) =>
    fetch(url, {
        method: 'GET',
        credentials: 'include',
    });

const videresendTilInnlogging = () => {
    window.location.href = `/oauth2/login?redirect=${window.location.pathname}`;
};
