import { Query, Respons } from '../elasticSearchTyper';
import {
    Kandidatliste,
    LagreKandidaterDto,
} from '../kandidatliste/LagreKandidaterIMineKandidatlisterModal';
import { MineKandidatlister } from '../kandidatliste/useMineKandidatlister';

const kandidatsøkProxy = `/kandidatsok-proxy`;
export const kandidatApi = '/kandidat-api';

export const søk = async (query: Query): Promise<Respons> => {
    const respons = await post(kandidatsøkProxy, query);

    return parseJsonEllerKastFeil(respons, 'Klarte ikke å søke');
};

export const hentMineKandidatlister = async (
    side: number,
    pageSize: number
): Promise<MineKandidatlister> => {
    const respons = await get(
        `${kandidatApi}/veileder/kandidatlister?kunEgne=true&status=ÅPEN&pagesize=${pageSize}${
            side > 1 ? `&pagenumber=${side - 1}` : ''
        }`
    );

    return parseJsonEllerKastFeil(respons, 'Klarte ikke å hente mine kandidatlister');
};

export const hentKandidatlisteMedAnnonsenummer = async (
    annonsenummer: string
): Promise<Kandidatliste> => {
    const respons = await get(
        `${kandidatApi}/veileder/stilling/byNr/${annonsenummer}/kandidatliste`
    );

    return parseJsonEllerKastFeil(
        respons,
        `Fant ikke kandidatliste med annonsenummer ${annonsenummer}`
    );
};

export const hentKandidatlisteMedStillingsId = async (
    stillingsId: string
): Promise<Kandidatliste> => {
    const respons = await get(`${kandidatApi}/veileder/stilling/${stillingsId}/kandidatliste`);

    return parseJsonEllerKastFeil(
        respons,
        `Fant ikke kandidatliste med stillingsId ${stillingsId}`
    );
};

export const lagreKandidaterIValgteKandidatlister = async (
    lagreKandidaterDto: LagreKandidaterDto,
    kandidatlister: string[]
): Promise<MineKandidatlister[]> => {
    return Promise.all(
        kandidatlister.map((kandidatlisteId) =>
            lagreKandidaterIKandidatliste(lagreKandidaterDto, kandidatlisteId)
        )
    );
};

export const lagreKandidaterIKandidatliste = async (
    lagreKandidaterDto: LagreKandidaterDto,
    kandidatlisteId: string
): Promise<MineKandidatlister> => {
    const respons = await post(
        `${kandidatApi}/veileder/kandidatlister/${kandidatlisteId}/kandidater`,
        lagreKandidaterDto
    );

    return parseJsonEllerKastFeil(
        respons,
        `Klarte ikke å lagre kandidater i kandidatliste ${kandidatlisteId}`
    );
};

const parseJsonEllerKastFeil = async (respons: Response, feil: string) => {
    if (respons.ok) {
        return await respons.json();
    } else if (respons.status === 401) {
        videresendTilInnlogging();
        throw new Error('Er ikke logget inn');
    } else {
        throw new Error(feil + `: ${respons.statusText}`);
    }
};

export const post = (url: string, body: object) =>
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
